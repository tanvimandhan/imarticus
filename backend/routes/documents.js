const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const Document = require('../models/Document');
const auth = require('../middleware/auth');
const { summarizeText } = require('../services/aiService');

// upload directory
const uploadDir = path.join(__dirname, '../uploads');

// create upload directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  console.log('creating upload directory');
  fs.mkdirSync(uploadDir, { recursive: true });
}

// configure file storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    const timestamp = Date.now();
    const filename = timestamp + '-' + file.originalname;
    cb(null, filename);
  }
});

// configure file upload
const upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb) {
    console.log('checking file type: ' + file.mimetype);
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    let isAllowed = false;
    for (let i = 0; i < allowedTypes.length; i++) {
      if (allowedTypes[i] === file.mimetype) {
        isAllowed = true;
        break;
      }
    }
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'));
    }
  },
  limits: { fileSize: 50 * 1024 * 1024 }
});

// function to extract text from file
async function extractTextFromFile(filePath, mimeType) {
  try {
    console.log('extracting text from file: ' + filePath);
    console.log('file type: ' + mimeType);
    
    if (mimeType === 'application/pdf') {
      console.log('it is a pdf file');
      const fileData = fs.readFileSync(filePath);
      const pdfData = await pdfParse(fileData);
      const text = pdfData.text || '';
      console.log('extracted text length: ' + text.length);
      return text;
    } else if (mimeType === 'text/plain') {
      console.log('it is a text file');
      const text = fs.readFileSync(filePath, 'utf-8');
      return text;
    } else if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.log('it is a word document, cannot extract text yet');
      return '';
    } else {
      console.log('unknown file type');
      return '';
    }
  } catch (error) {
    console.log('error extracting text: ' + error);
    throw new Error('Failed to extract text from file: ' + error.message);
  }
}

// test route
router.get('/test', function(req, res) {
  res.json({ message: 'Documents route is working' });
});

// upload document
router.post('/upload', auth, upload.single('file'), async function(req, res) {
  try {
    console.log('upload request received');
    
    // check if file was uploaded
    if (!req.file) {
      console.log('no file uploaded');
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    // get form data
    const title = req.body.title;
    const description = req.body.description;
    const courseId = req.body.courseId;
    
    // check required fields
    if (!title || !courseId) {
      console.log('title or courseId missing');
      // delete uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(400).json({ message: 'Title and Course ID are required' });
    }
    
    // extract text from file
    let fileContent = '';
    try {
      console.log('trying to extract text');
      fileContent = await extractTextFromFile(req.file.path, req.file.mimetype);
      console.log('text extracted, length: ' + fileContent.length);
    } catch (extractError) {
      console.log('failed to extract text: ' + extractError);
      fileContent = '';
    }
    
    // create document
    const newDocument = new Document({
      title: title,
      description: description,
      courseId: courseId,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      fileType: req.file.mimetype,
      filePath: req.file.path,
      content: fileContent,
      uploadedBy: req.userId
    });
    
    // save document
    await newDocument.save();
    console.log('document saved with id: ' + newDocument._id);
    
    res.status(201).json({
      message: 'Document uploaded successfully',
      document: newDocument
    });
  } catch (error) {
    console.log('error uploading: ' + error);
    // try to delete file if it exists
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (e) {
        console.log('error deleting file: ' + e);
      }
    }
    res.status(500).json({ message: error.message });
  }
});

// get documents for a course
router.get('/course/:courseId', auth, async function(req, res) {
  try {
    console.log('getting documents for course: ' + req.params.courseId);
    const courseId = req.params.courseId;
    const documents = await Document.find({ courseId: courseId })
      .populate('uploadedBy', 'name email')
      .sort({ createdAt: -1 });
    
    console.log('found ' + documents.length + ' documents');
    res.json(documents);
  } catch (error) {
    console.log('error getting documents: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// get one document
router.get('/:docId', auth, async function(req, res) {
  try {
    console.log('getting document: ' + req.params.docId);
    const docId = req.params.docId;
    const document = await Document.findById(docId)
      .populate('uploadedBy', 'name email');
    
    if (!document) {
      console.log('document not found');
      return res.status(404).json({ message: 'Document not found' });
    }
    
    res.json(document);
  } catch (error) {
    console.log('error getting document: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// view document
router.get('/:docId/view', auth, async function(req, res) {
  try {
    console.log('viewing document: ' + req.params.docId);
    const docId = req.params.docId;
    const document = await Document.findById(docId);
    
    if (!document) {
      console.log('document not found');
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // check if file exists
    if (!fs.existsSync(document.filePath)) {
      console.log('file not found at path: ' + document.filePath);
      return res.status(404).json({ message: 'File not found' });
    }
    
    // set headers
    res.setHeader('Content-Type', document.fileType || 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="' + document.fileName + '"');
    
    // send file
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);
  } catch (error) {
    console.log('error viewing document: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// download document
router.get('/:docId/download', auth, async function(req, res) {
  try {
    console.log('downloading document: ' + req.params.docId);
    const docId = req.params.docId;
    const document = await Document.findById(docId);
    
    if (!document) {
      console.log('document not found');
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // check if file exists
    if (!fs.existsSync(document.filePath)) {
      console.log('file not found');
      return res.status(404).json({ message: 'File not found' });
    }
    
    // download file
    res.download(document.filePath, document.fileName);
  } catch (error) {
    console.log('error downloading: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// summarize document
router.post('/:docId/summarize', auth, async function(req, res) {
  try {
    console.log('summarizing document: ' + req.params.docId);
    const docId = req.params.docId;
    const document = await Document.findById(docId);
    
    if (!document) {
      console.log('document not found');
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // check if summary already exists
    if (document.summary) {
      console.log('summary already exists, returning cached summary');
      return res.json({ summary: document.summary });
    }
    
    // get content
    let content = document.content;
    
    // if no content, try to extract
    if (!content || content.trim().length === 0) {
      console.log('content is missing, trying to extract from file');
      if (document.filePath && fs.existsSync(document.filePath)) {
        try {
          content = await extractTextFromFile(document.filePath, document.fileType);
          document.content = content;
          await document.save();
          console.log('content extracted and saved');
        } catch (extractError) {
          console.log('failed to extract content: ' + extractError);
          return res.status(400).json({ message: 'No content to summarize. Could not extract text from file.' });
        }
      } else {
        console.log('file not found');
        return res.status(400).json({ message: 'No content to summarize and file not found' });
      }
    }
    
    // check if content is still empty
    if (!content || content.trim().length === 0) {
      console.log('content is still empty');
      return res.status(400).json({ message: 'No content to summarize' });
    }
    
    // generate summary
    console.log('calling ai to generate summary');
    const summary = await summarizeText(content);
    
    // save summary
    document.summary = summary;
    await document.save();
    console.log('summary saved');
    
    res.json({ summary: summary });
  } catch (error) {
    console.log('error summarizing: ' + error);
    res.status(500).json({ message: error.message });
  }
});

// delete document
router.delete('/:docId', auth, async function(req, res) {
  try {
    console.log('deleting document: ' + req.params.docId);
    const docId = req.params.docId;
    const document = await Document.findById(docId);
    
    if (!document) {
      console.log('document not found');
      return res.status(404).json({ message: 'Document not found' });
    }
    
    // delete file if exists
    if (document.filePath && fs.existsSync(document.filePath)) {
      console.log('deleting file: ' + document.filePath);
      fs.unlinkSync(document.filePath);
    }
    
    // delete document from database
    await Document.findByIdAndDelete(docId);
    console.log('document deleted');
    
    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.log('error deleting: ' + error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
