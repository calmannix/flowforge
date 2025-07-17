# Contributing to FlowForge ⚡

We love your input! We want to make contributing to FlowForge as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## 🚀 Quick Start for Contributors

1. **Fork the repository** to your GitHub account
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/calmannix/flowforge.git
   cd flowforge
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start development server**:
   ```bash
   npm run dev
   ```
5. **Make your changes** and test them
6. **Submit a pull request**

## 🐛 Bug Reports

We use GitHub Issues to track bugs. Report a bug by [opening a new issue](https://github.com/calmannix/flowforge/issues/new).

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample Mermaid code if possible
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Mermaid Code**
If applicable, add the Mermaid code that caused the issue.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
- OS: [e.g. macOS, Windows, Linux]
- Node.js version: [e.g. 18.0.0]
- Browser: [e.g. Chrome, Firefox]
- FlowForge version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

## 💡 Feature Requests

We welcome feature requests! Please [open a new issue](https://github.com/calmannix/flowforge/issues/new) with:

- Clear description of the feature
- Why you think it would be useful
- Any examples or mockups if applicable
- Whether you're willing to implement it

## 🔧 Development Process

We use GitHub Flow, so all code changes happen through pull requests:

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 🏗️ Development Setup

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/calmannix/flowforge.git
cd flowforge

# Install dependencies
npm install

# Start development server (auto-reloads)
npm run dev

# In another terminal, test CLI functionality
npm run generate -- examples/flowchart.mmd test-output.pdf
```

### Project Structure

```
flowforge/
├── generate-pdf.js      # Core PDF generation logic
├── index.js            # Express web server
├── package.json        # Project configuration
├── public/
│   └── index.html      # Web interface
├── examples/           # Sample Mermaid files
├── output/             # Generated PDFs (git-ignored)
├── uploads/            # Uploaded files (git-ignored)
├── README.md           # Project documentation
├── CONTRIBUTING.md     # This file
└── LICENSE             # MIT License
```

## 🎯 Areas for Contribution

### High Priority
- **New diagram types**: Add support for additional Mermaid diagram types
- **Performance improvements**: Optimize PDF generation speed
- **Better error handling**: More descriptive error messages
- **Mobile responsiveness**: Improve web interface on mobile devices

### Medium Priority
- **Batch processing**: Web interface for multiple files
- **Themes**: Custom styling options for PDFs
- **Export options**: Additional output formats (PNG, SVG)
- **Configuration**: User-defined default settings

### Low Priority
- **Docker support**: Containerized deployment
- **API documentation**: OpenAPI/Swagger docs
- **Testing**: Unit and integration tests
- **Internationalization**: Multi-language support

## 📝 Code Style

We follow these conventions:

- **JavaScript**: ES6+ features, async/await preferred
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for strings
- **Semicolons**: Always use semicolons
- **Comments**: JSDoc for functions, inline for complex logic

### Example Code Style

```javascript
/**
 * Generates a PDF from Mermaid code
 * @param {string} mermaidCode - The Mermaid diagram code
 * @param {string} outputPath - Path for the output PDF
 * @param {Object} options - Generation options
 * @returns {Promise<void>}
 */
async function generatePDF(mermaidCode, outputPath, options = {}) {
  const generator = new MermaidPDFGenerator(options);
  await generator.generatePDF(mermaidCode, outputPath);
}
```

## 🧪 Testing

### Manual Testing

Test your changes with various diagram types:

```bash
# Test CLI with different diagram types
node generate-pdf.js examples/flowchart.mmd test-flowchart.pdf
node generate-pdf.js examples/sequence.mmd test-sequence.pdf

# Test web interface
npm start
# Then open http://localhost:3000 and test with different inputs
```

### Test Cases to Verify

- [ ] Basic flowchart generation
- [ ] Complex diagrams with many nodes
- [ ] Different page formats (A4, A3, Letter)
- [ ] Landscape and portrait orientations
- [ ] Various scaling options
- [ ] File upload functionality
- [ ] Error handling for invalid Mermaid code
- [ ] Special characters in labels
- [ ] Long text in nodes

## 📋 Pull Request Process

1. **Update documentation** if you've made changes to APIs or added features
2. **Test thoroughly** with various diagram types and configurations
3. **Update the README.md** with details of changes if applicable
4. **Follow the pull request template** when creating your PR

### Pull Request Template

```markdown
## Description
Brief description of what this PR does

## Type of change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] I have tested this change locally
- [ ] I have tested with various diagram types
- [ ] I have tested both CLI and web interface
- [ ] All existing tests pass

## Checklist
- [ ] My code follows the project's style guidelines
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
```

## 🌟 Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes for significant contributions
- README acknowledgments section

## 📞 Getting Help

- **Questions**: Open a [Discussion](https://github.com/calmannix/flowforge/discussions)
- **Issues**: Open an [Issue](https://github.com/calmannix/flowforge/issues)
- **Security**: Email security@flowforge.dev (if applicable)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thanks for contributing to FlowForge! ⚡** 