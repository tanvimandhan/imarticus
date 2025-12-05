import React, { useState } from 'react';
import { documentService } from '../services/api';

function DocumentUpload(props) {
  const courseId = props.courseId;
  const onUploadSuccess = props.onUploadSuccess;
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // handle file change
  function handleFileChange(e) {
    console.log('file selected');
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  }

  // handle title change
  function handleTitleChange(e) {
    console.log('title changed');
    setTitle(e.target.value);
  }

  // handle description change
  function handleDescriptionChange(e) {
    console.log('description changed');
    setDescription(e.target.value);
  }

  // handle form submit
  async function handleSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    
    // check if file and title are filled
    if (!file || !title) {
      console.log('file or title missing');
      setMessage('Please fill in all required fields');
      return;
    }

    // make form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('courseId', courseId);

    setLoading(true);
    try {
      console.log('uploading document');
      await documentService.uploadDocument(formData);
      console.log('upload successful');
      setMessage('Document uploaded successfully!');
      setFile(null);
      setTitle('');
      setDescription('');
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (error) {
      console.log('upload error: ' + error);
      let errorMsg = 'Upload failed';
      if (error.response && error.response.data && error.response.data.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      setMessage('Upload failed: ' + errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // check message type
  let messageClass = 'success';
  if (message.includes('failed')) {
    messageClass = 'danger';
  }

  return (
    <div className="card p-4 mb-4">
      <h5 className="card-title">Upload Document</h5>
      {message && (
        <div className={'alert alert-' + messageClass}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Document Title*</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Select File*</label>
          <input
            type="file"
            className="form-control"
            onChange={handleFileChange}
            accept=".pdf,.txt,.doc,.docx"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
    </div>
  );
}

export default DocumentUpload;
