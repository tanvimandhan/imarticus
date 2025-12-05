import React, { useState, useEffect } from 'react';
import { documentService } from '../services/api';

function DocumentList(props) {
  const courseId = props.courseId;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summaries, setSummaries] = useState({});
  const [summarizing, setSummarizing] = useState({});

  // fetch documents when component loads
  useEffect(function() {
    console.log('fetching documents for course: ' + courseId);
    fetchDocuments();
  }, [courseId]);

  // function to fetch documents
  async function fetchDocuments() {
    try {
      console.log('calling api to get documents');
      const response = await documentService.getDocumentsByCourse(courseId);
      console.log('got documents: ' + response.data.length);
      setDocuments(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error fetching documents: ' + error);
      setLoading(false);
    }
  }

  // handle summarize button click
  async function handleSummarize(docId) {
    console.log('summarize clicked for document: ' + docId);
    
    // set loading state
    const newSummarizing = {};
    for (let key in summarizing) {
      newSummarizing[key] = summarizing[key];
    }
    newSummarizing[docId] = true;
    setSummarizing(newSummarizing);
    
    try {
      console.log('calling api to summarize');
      const response = await documentService.summarizeDocument(docId);
      
      if (response.data && response.data.summary) {
        console.log('got summary');
        const newSummaries = {};
        for (let key in summaries) {
          newSummaries[key] = summaries[key];
        }
        newSummaries[docId] = response.data.summary;
        setSummaries(newSummaries);
      } else {
        throw new Error('No summary received from server');
      }
    } catch (error) {
      console.log('error summarizing: ' + error);
      let errorMessage = 'Failed to generate summary';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      alert('Failed to summarize: ' + errorMessage);
    } finally {
      // remove loading state
      const newSummarizing2 = {};
      for (let key in summarizing) {
        newSummarizing2[key] = summarizing[key];
      }
      newSummarizing2[docId] = false;
      setSummarizing(newSummarizing2);
    }
  }

  // handle view document
  async function handleViewDocument(docId, fileName, fileType) {
    try {
      console.log('viewing document: ' + docId);
      const response = await documentService.viewDocument(docId);
      
      // make blob
      const blob = new Blob([response.data], { type: fileType || 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // open in new tab
      window.open(url, '_blank');
      
      // cleanup after a bit
      setTimeout(function() {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.log('error viewing document: ' + error);
      let errorMessage = error.message || 'Failed to open document';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert('Failed to open document: ' + errorMessage);
    }
  }

  // handle download document
  async function handleDownloadDocument(docId, fileName, fileType) {
    try {
      console.log('downloading document: ' + docId);
      const response = await documentService.downloadDocument(docId);
      
      // make blob
      const blob = new Blob([response.data], { type: fileType || 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // create link and click it
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // cleanup
      setTimeout(function() {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.log('error downloading document: ' + error);
      let errorMessage = error.message || 'Failed to download document';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      }
      alert('Failed to download document: ' + errorMessage);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border"></div>
      </div>
    );
  }

  return (
    <div>
      <h5 className="mb-4">
        <i className="bi bi-file-text"></i> Course Documents
      </h5>
      {documents.length === 0 ? (
        <div className="alert alert-info">No documents available</div>
      ) : (
        documents.map(function(doc) {
          return (
            <div key={doc._id} className="card mb-3">
              <div className="card-body p-3 p-md-4">
                <div className="d-flex justify-content-between align-items-start flex-wrap">
                  <div className="flex-grow-1 mb-3 mb-md-0" style={{ minWidth: '200px' }}>
                    <h6 
                      className="card-title" 
                      style={{ cursor: 'pointer', color: '#0d6efd', fontSize: 'clamp(0.95rem, 2.5vw, 1rem)' }}
                      onClick={function() { handleViewDocument(doc._id, doc.fileName, doc.fileType); }}
                      title="Click to open document"
                    >
                      <i className="bi bi-file-earmark-pdf"></i> {doc.title}
                    </h6>
                    <p className="card-text text-muted small d-none d-md-block">{doc.description}</p>
                    <small className="text-muted d-block">
                      <i className="bi bi-file"></i> {doc.fileName} | {(doc.fileSize / 1024).toFixed(2)} KB
                    </small>
                  </div>
                  <div className="ms-0 ms-md-2 d-flex flex-wrap gap-2 w-100 w-md-auto">
                    <button
                      className="btn btn-sm btn-primary flex-fill flex-md-grow-0"
                      onClick={function() { handleViewDocument(doc._id, doc.fileName, doc.fileType); }}
                    >
                      <i className="bi bi-eye"></i> <span className="d-none d-sm-inline">View</span>
                    </button>
                    <button
                      className="btn btn-sm btn-info flex-fill flex-md-grow-0"
                      onClick={function() { handleDownloadDocument(doc._id, doc.fileName, doc.fileType); }}
                    >
                      <i className="bi bi-download"></i> <span className="d-none d-sm-inline">Download</span>
                    </button>
                    <button
                      className="btn btn-sm btn-success flex-fill flex-md-grow-0"
                      onClick={function() { handleSummarize(doc._id); }}
                      disabled={summarizing[doc._id]}
                    >
                      <i className="bi bi-magic"></i> <span className="d-none d-sm-inline">{summarizing[doc._id] ? 'Summarizing...' : 'Summarize'}</span>
                      <span className="d-sm-none">{summarizing[doc._id] ? '...' : 'AI'}</span>
                    </button>
                  </div>
                </div>
                {summaries[doc._id] && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <strong>AI Summary:</strong>
                    <p className="mt-2 mb-0">{summaries[doc._id]}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default DocumentList;
