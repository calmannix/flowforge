# ⚡ FlowForge

> **Professional PDF generator for Mermaid diagrams** - forge high-quality flowcharts with ease

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![npm version](https://img.shields.io/npm/v/flowforge.svg)](https://www.npmjs.com/package/flowforge)

FlowForge solves the problem of poor-quality PDF exports from Mermaid diagrams. Instead of pixelated PNGs or inconsistent browser printing, get **vector-based, professional PDFs** that are perfect for documentation, presentations, and reports.

## 🌟 Features

- **🎯 High-Quality Output**: Vector-based PDFs with crisp text and graphics
- **💻 Web Interface**: Beautiful, modern UI with drag-and-drop functionality
- **⚡ CLI Support**: Perfect for automation and batch processing
- **📱 Responsive Design**: Works on desktop, tablet, and mobile
- **🎨 Multiple Formats**: A4, A3, Letter with portrait/landscape options
- **🔧 Flexible Scaling**: 50% to 150% sizing options
- **🚀 Fast Processing**: Optimized rendering with automatic error correction
- **📊 All Diagram Types**: Flowcharts, sequence diagrams, pie charts, Gantt charts, and more

## 🚀 Quick Start

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/calmannix/flowforge.git
cd flowforge

# Install dependencies
npm install

# Quick start (generates a welcome PDF)
npm run quick-start

# Start the web server
npm start
```

Visit `http://localhost:3000` to access the web interface.

### CLI Usage

```bash
# Basic usage
node generate-pdf.js input.mmd output.pdf

# With options
node generate-pdf.js input.mmd output.pdf --format A4 --landscape --scale 1.2

# Help
node generate-pdf.js --help
```

## 📖 Usage Examples

### Web Interface

1. **Open FlowForge** in your browser (`http://localhost:3000`)
2. **Choose your input method**:
   - Paste Mermaid code directly
   - Upload a `.mmd`, `.md`, or `.txt` file
3. **Configure options** (format, orientation, scale)
4. **Generate and download** your PDF

### CLI Examples

```bash
# Generate PDF with default settings
node generate-pdf.js diagram.mmd output.pdf

# A4 landscape with 125% scale
node generate-pdf.js diagram.mmd output.pdf -f A4 -l -s 1.25

# A3 portrait for large diagrams
node generate-pdf.js complex-diagram.mmd large-output.pdf -f A3
```

### Programmatic Usage

```javascript
const { MermaidPDFGenerator } = require('./generate-pdf');

const generator = new MermaidPDFGenerator({
  format: 'A4',
  landscape: true,
  scale: 1.2
});

await generator.generatePDF(mermaidCode, 'output.pdf');
```

## 🎯 Why FlowForge?

### The Problem
- **mermaid.live exports**: Pixelated, low-quality PNGs/SVGs
- **Browser print-to-PDF**: Inconsistent formatting and layout issues
- **Online converters**: Limited customization and quality concerns

### The Solution
- **Vector-based rendering**: Scalable without quality loss
- **High DPI output**: 2x device scale factor for crisp text
- **Professional formatting**: Proper margins and page sizing
- **Robust processing**: Handles complex diagrams with error correction

## 📁 Supported Diagram Types

- **Flowcharts**: Process flows, decision trees
- **Sequence Diagrams**: Message flows, interactions
- **Class Diagrams**: Object relationships, UML
- **State Diagrams**: State transitions, workflows
- **Entity Relationship**: Database schemas
- **Gantt Charts**: Project timelines
- **Pie Charts**: Data visualization
- **User Journey**: User experience flows
- **Git Graphs**: Version control flows

## 🔧 Configuration Options

### CLI Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--format` | `-f` | Page format (A4, A3, Letter) | A4 |
| `--landscape` | `-l` | Landscape orientation | false |
| `--scale` | `-s` | Scale factor (0.5-2.0) | 1.0 |
| `--help` | `-h` | Show help | - |

### Web Interface Options

- **Page Format**: A4, A3, Letter
- **Orientation**: Portrait, Landscape
- **Scale**: 50%, 75%, 100%, 125%, 150%
- **Input Methods**: Direct paste, file upload

## 🏗️ Project Structure

```
flowforge/
├── generate-pdf.js      # Core PDF generation logic
├── index.js            # Web server and API
├── package.json        # Dependencies and scripts
├── public/
│   └── index.html      # Web interface
├── examples/           # Sample Mermaid files
│   ├── flowchart.mmd
│   └── sequence.mmd
├── output/             # Generated PDFs (auto-created)
└── README.md           # This file
```

## 🔧 Development

### Setup Development Environment

```bash
# Clone and install
git clone https://github.com/calmannix/flowforge.git
cd flowforge
npm install

# Start development server (with auto-reload)
npm run dev

# Run CLI tool
npm run generate -- input.mmd output.pdf
```

### API Endpoints

- `GET /` - Web interface
- `POST /generate-pdf` - Generate PDF from Mermaid code
- `POST /upload-file` - Generate PDF from uploaded file

## 🐛 Troubleshooting

### Common Issues

**PDF is blank or empty**
- Ensure Mermaid syntax is valid
- Check for special characters in labels
- Try increasing the scale factor

**Diagram is cut off**
- Use landscape orientation for wide diagrams
- Try a larger page format (A3 instead of A4)
- Increase the scale factor

**Poor text quality**
- Ensure you're using raw Mermaid code (not PNG/SVG)
- FlowForge automatically uses high-DPI rendering

**Server won't start**
- Check if port 3000 is available
- Kill existing processes: `pkill -f "node index.js"`
- Try a different port: `PORT=3001 npm start`

### Debug Mode

```bash
# Enable debug output
DEBUG=* node generate-pdf.js input.mmd output.pdf

# Save HTML for inspection
DEBUG_HTML=1 node generate-pdf.js input.mmd output.pdf
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** and add tests if applicable
4. **Commit your changes**: `git commit -m 'Add amazing feature'`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Test your changes with various diagram types
- Update documentation for new features
- Ensure CLI and web interface both work
- Add examples for new functionality

## 📋 System Requirements

- **Node.js**: 16.0.0 or higher
- **Chrome/Chromium**: Automatically installed with Puppeteer
- **Memory**: 2GB RAM minimum for large diagrams
- **Disk Space**: 500MB for dependencies

## 🔒 Security

- FlowForge runs locally on your machine
- No data is sent to external servers
- Mermaid code is processed entirely offline
- Generated PDFs are stored locally

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mermaid.js](https://mermaid.js.org/) - For the amazing diagram syntax
- [Puppeteer](https://pptr.dev/) - For headless Chrome automation
- [Express.js](https://expressjs.com/) - For the web server
- The open-source community for inspiration and feedback

## 🔗 Links

- [Report Issues](https://github.com/calmannix/flowforge/issues)
- [Request Features](https://github.com/calmannix/flowforge/discussions)
- [Mermaid Documentation](https://mermaid.js.org/intro/)
- [Contribute](https://github.com/calmannix/flowforge/blob/main/CONTRIBUTING.md)

---

**Made with ⚡ by the FlowForge team**

*Forge professional diagrams with ease!* 