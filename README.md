# ⚡ flowforge

Paste Mermaid code. Get a print-ready PDF. That's it.

I built this because every other option was broken: mermaid.live exports pixelated PNGs, browser print-to-PDF produces inconsistent layouts, and online converters don't give you control over page size or scale. flowforge gives you vector-quality output that actually looks good in a deck or doc.

---

## Quick start

```bash
git clone https://github.com/calmannix/flowforge.git
cd flowforge
npm install
npm start
```

Open `http://localhost:3000`, paste your Mermaid code, pick your format, download.

### CLI

```bash
node generate-pdf.js input.mmd output.pdf --format A4 --landscape --scale 1.2
```

---

## Options

| Option | Values | Default |
|--------|--------|---------|
| Format | A4, A3, Letter | A4 |
| Orientation | Portrait, Landscape | Portrait |
| Scale | 50%–150% | 100% |

Handles flowcharts, sequence diagrams, Gantt charts, ER diagrams, pie charts, and more.

---

## Stack

Node.js · Puppeteer · Express

---

Built because I needed it. [Issues welcome.](https://github.com/calmannix/flowforge/issues)
