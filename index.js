const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');
const { MermaidPDFGenerator } = require('./generate-pdf');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.mmd', '.md', '.txt'];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, allowedExtensions.includes(fileExtension));
  }
});

// Ensure directories exist
fs.ensureDirSync('uploads');
fs.ensureDirSync('output');
fs.ensureDirSync('public');

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate-pdf', async (req, res) => {
  try {
    const { mermaidCode, format = 'A4', landscape = false, scale = 1 } = req.body;
    
    if (!mermaidCode) {
      return res.status(400).json({ error: 'Mermaid code is required' });
    }
    
    // Generate unique filename
    const timestamp = Date.now();
    const outputPath = path.join('output', `mermaid-diagram-${timestamp}.pdf`);
    
    // Create generator and generate PDF
    const generator = new MermaidPDFGenerator({
      format,
      landscape: landscape === 'true',
      scale: parseFloat(scale)
    });
    
    await generator.generatePDF(mermaidCode, outputPath);
    
    // Send file for download
    res.download(outputPath, `mermaid-diagram-${timestamp}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      // Clean up file after download
      fs.unlink(outputPath).catch(console.error);
    });
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

app.post('/upload-file', upload.single('mermaidFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const { format = 'A4', landscape = false, scale = 1 } = req.body;
    
    // Read uploaded file
    const mermaidCode = await fs.readFile(req.file.path, 'utf8');
    
    // Generate unique filename
    const timestamp = Date.now();
    const outputPath = path.join('output', `mermaid-diagram-${timestamp}.pdf`);
    
    // Create generator and generate PDF
    const generator = new MermaidPDFGenerator({
      format,
      landscape: landscape === 'true',
      scale: parseFloat(scale)
    });
    
    await generator.generatePDF(mermaidCode, outputPath);
    
    // Send file for download
    res.download(outputPath, `mermaid-diagram-${timestamp}.pdf`, (err) => {
      if (err) {
        console.error('Error sending file:', err);
      }
      // Clean up files after download
      fs.unlink(outputPath).catch(console.error);
      fs.unlink(req.file.path).catch(console.error);
    });
    
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Failed to process file' });
  }
});

app.listen(PORT, () => {
  console.log(`⚡ FlowForge running on http://localhost:${PORT}`);
  console.log('🔥 Forge professional PDFs from your Mermaid diagrams');
});

module.exports = app; 