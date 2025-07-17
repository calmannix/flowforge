#!/usr/bin/env node

const { MermaidPDFGenerator } = require('../generate-pdf');
const fs = require('fs');
const path = require('path');

const exampleCode = `graph TD
    A[Welcome to FlowForge] --> B{Ready to start?}
    B -->|Yes| C[Create amazing PDFs]
    B -->|No| D[Check the examples]
    C --> E[Success!]
    D --> B
    
    style A fill:#e1f5fe
    style E fill:#e8f5e8
    style C fill:#f3e5f5`;

async function quickStart() {
  console.log('⚡ FlowForge Quick Start');
  console.log('=======================');
  
  try {
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    console.log('📝 Generating welcome PDF...');
    
    const generator = new MermaidPDFGenerator({
      format: 'A4',
      landscape: false,
      scale: 1.0
    });
    
    const outputPath = path.join(outputDir, 'welcome-to-flowforge.pdf');
    await generator.generatePDF(exampleCode, outputPath);
    
    console.log('✅ Welcome PDF generated successfully!');
    console.log(`📄 Location: ${outputPath}`);
    console.log('');
    console.log('🚀 Next steps:');
    console.log('1. Start the web server: npm start');
    console.log('2. Open http://localhost:3000 in your browser');
    console.log('3. Try generating PDFs from your own Mermaid diagrams');
    console.log('');
    console.log('📖 Examples available in the examples/ directory');
    console.log('🔧 CLI usage: node generate-pdf.js input.mmd output.pdf');
    console.log('');
    console.log('Happy forging! ⚡');
    
  } catch (error) {
    console.error('❌ Error during quick start:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  quickStart();
}

module.exports = quickStart; 