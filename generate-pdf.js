const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');
const { program } = require('commander');

class MermaidPDFGenerator {
  constructor(options = {}) {
    this.options = {
      format: 'A4',
      landscape: false,
      margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' },
      scale: 1,
      quality: 100,
      ...options
    };
  }

  async generatePDF(mermaidCode, outputPath) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
      const page = await browser.newPage();
      
      // Set viewport for high quality rendering - larger for complex diagrams
      await page.setViewport({
        width: this.options.format === 'A4' ? 1200 : 1600,
        height: this.options.format === 'A4' ? 1600 : 1200,
        deviceScaleFactor: 2 // High DPI for better quality
      });

      // Create HTML template with Mermaid
      const html = this.createHTML(mermaidCode);
      
      // Save HTML for debugging
      if (process.env.DEBUG_HTML) {
        await fs.writeFile('debug-output.html', html);
        console.log('📄 Debug HTML saved to debug-output.html');
      }
      
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      // Enable console logging for debugging
      page.on('console', msg => {
        if (msg.type() === 'error') {
          console.log('Browser error:', msg.text());
        }
      });
      
      // Wait for Mermaid to render with better error handling
      try {
        await page.waitForSelector('#mermaid-diagram svg', { timeout: 15000 });
        console.log('✓ Mermaid diagram SVG found');
        
        // Wait for the diagram to be fully rendered - more lenient approach
        let diagramReady = false;
        let attempts = 0;
        const maxAttempts = 10;
        
        while (!diagramReady && attempts < maxAttempts) {
          await page.waitForTimeout(2000);
          
          const status = await page.evaluate(() => {
            const svg = document.querySelector('#mermaid-diagram svg');
            if (!svg) return { found: false };
            
            const rect = svg.getBoundingClientRect();
            return {
              found: true,
              width: rect.width,
              height: rect.height,
              childCount: svg.children.length,
              hasContent: svg.children.length > 0
            };
          });
          
          console.log(`Attempt ${attempts + 1}: SVG status:`, status);
          
          if (status.found && status.hasContent && (status.width > 0 || status.height > 0)) {
            diagramReady = true;
            console.log('✓ Mermaid diagram ready with dimensions:', status);
          } else {
            attempts++;
            console.log('⏳ Waiting for diagram to render...');
          }
        }
        
        if (!diagramReady) {
          console.log('⚠️ Diagram may not be fully rendered, but proceeding with PDF generation...');
        }
        
        console.log('✓ Mermaid diagram fully rendered');
        
        // Additional wait to ensure complete rendering
        await page.waitForTimeout(1000);
        
      } catch (error) {
        console.error('❌ Mermaid rendering failed:', error);
        
        // Check if there are any error messages on the page
        const errorMessages = await page.evaluate(() => {
          const errors = [];
          const consoleErrors = document.querySelectorAll('.error, .mermaid-error');
          consoleErrors.forEach(err => errors.push(err.textContent));
          return errors;
        });
        
        if (errorMessages.length > 0) {
          console.error('Page errors:', errorMessages);
        }
        
        // Try to proceed anyway in case the diagram is partially rendered
        console.log('⚠️ Proceeding with PDF generation despite rendering issues...');
      }

      // Generate PDF with high quality settings
      await page.pdf({
        path: outputPath,
        format: this.options.format,
        landscape: this.options.landscape,
        margin: this.options.margin,
        scale: this.options.scale,
        printBackground: true,
        preferCSSPageSize: true
      });

      console.log(`✅ PDF generated successfully: ${outputPath}`);
      
    } catch (error) {
      console.error('❌ Error generating PDF:', error);
      throw error;
    } finally {
      await browser.close();
    }
  }

  createHTML(mermaidCode) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mermaid Diagram</title>
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.min.js"></script>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        #mermaid-diagram {
            width: 100%;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        #mermaid-diagram svg {
            max-width: 100% !important;
            max-height: 90vh !important;
            height: auto !important;
            width: auto !important;
            min-width: 800px !important;
            min-height: 600px !important;
        }
        
        /* High quality text rendering */
        * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }
        
        /* Ensure proper scaling */
        .mermaid {
            transform-origin: center center;
            width: 100% !important;
            height: auto !important;
        }
        
        /* Custom styling for better PDF output */
        .node rect, .node circle, .node ellipse, .node polygon {
            stroke-width: 2px;
        }
        
        .edgePath .path {
            stroke-width: 2px;
        }
        
        .edgeLabel {
            font-size: 14px;
            font-weight: 500;
        }
        
        .cluster rect {
            stroke-width: 2px;
        }
        
        /* Print media queries for PDF */
        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            #mermaid-diagram {
                width: 100%;
                height: 100vh;
            }
        }
    </style>
</head>
<body>
    <div id="mermaid-diagram">
        <div class="mermaid">
${mermaidCode}
        </div>
    </div>
    
    <script>
        mermaid.initialize({
            startOnLoad: true,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
            fontSize: 14,
            curve: 'basis',
            htmlLabels: true,
            maxTextSize: 90000,
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true,
                curve: 'basis',
                padding: 20,
                nodeSpacing: 50,
                rankSpacing: 50,
                diagramPadding: 8
            },
            sequence: {
                useMaxWidth: true,
                wrap: true
            },
            gantt: {
                useMaxWidth: true
            },
            journey: {
                useMaxWidth: true
            },
            pie: {
                useMaxWidth: true
            }
        });
        
        // Ensure diagram is properly rendered before PDF generation
        mermaid.run().then(() => {
            const svg = document.querySelector('#mermaid-diagram svg');
            if (svg) {
                // Force SVG dimensions if they're 0
                const rect = svg.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    console.log('Forcing SVG dimensions...');
                    svg.style.width = '100%';
                    svg.style.height = 'auto';
                    svg.style.minWidth = '800px';
                    svg.style.minHeight = '600px';
                    
                    // Try to get the viewBox and use it for sizing
                    const viewBox = svg.getAttribute('viewBox');
                    if (viewBox) {
                        const [x, y, width, height] = viewBox.split(' ').map(Number);
                        if (width > 0 && height > 0) {
                            svg.style.width = Math.min(width, 1200) + 'px';
                            svg.style.height = Math.min(height, 800) + 'px';
                        }
                    }
                }
                
                // Add a marker to indicate rendering is complete
                document.body.setAttribute('data-mermaid-rendered', 'true');
            }
        });
    </script>
</body>
</html>`;
  }
}

// CLI interface
program
  .version('1.0.0')
  .description('Generate high-quality PDF from Mermaid diagrams')
  .argument('<input>', 'Input Mermaid file (.mmd or .md)')
  .argument('<output>', 'Output PDF file')
  .option('-f, --format <format>', 'Page format (A4, A3, Letter)', 'A4')
  .option('-l, --landscape', 'Landscape orientation')
  .option('-s, --scale <scale>', 'Scale factor', parseFloat, 1)
  .action(async (input, output, options) => {
    try {
      // Read Mermaid code from file
      const mermaidCode = await fs.readFile(input, 'utf8');
      
      // Create generator
      const generator = new MermaidPDFGenerator({
        format: options.format,
        landscape: options.landscape,
        scale: options.scale
      });
      
      // Generate PDF
      await generator.generatePDF(mermaidCode, output);
      
    } catch (error) {
      console.error('❌ Error:', error.message);
      process.exit(1);
    }
  });

// Export for programmatic use
module.exports = { MermaidPDFGenerator };

// Run CLI if called directly
if (require.main === module) {
  program.parse();
} 