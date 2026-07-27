const fs = require('fs');
const path = require('path');

function extractJpegs(pdfPath, outputPrefix) {
  const buf = fs.readFileSync(pdfPath);
  let count = 0;
  let pos = 0;

  while (pos < buf.length - 3) {
    // Look for JPEG start header 0xFF 0xD8 0xFF
    if (buf[pos] === 0xFF && buf[pos+1] === 0xD8 && buf[pos+2] === 0xFF) {
      const start = pos;
      // Look for JPEG end header 0xFF 0xD9
      let end = -1;
      for (let j = start + 3; j < buf.length - 1; j++) {
        if (buf[j] === 0xFF && buf[j+1] === 0xD9) {
          end = j + 2;
          break;
        }
      }
      if (end !== -1 && (end - start) > 50000) {
        count++;
        const outName = `${outputPrefix}_${count}.jpg`;
        fs.writeFileSync(outName, buf.slice(start, end));
        console.log('Extracted:', outName, 'Size:', (end - start), 'bytes');
        pos = end;
        continue;
      }
    }
    pos++;
  }
  if (count === 0) console.log('No JPEG extracted for', pdfPath);
}

const dir = 'C:/Users/Dell/.gemini/antigravity-ide/brain/62d9cba7-6236-47c5-8908-a1ad4d8b919a';
extractJpegs(path.join(dir, 'media__1785161941297.pdf'), 'c:/Users/Dell/Documents/portfolio-amour-main/assets/images/certif_english');
extractJpegs(path.join(dir, 'media__1785161941372.pdf'), 'c:/Users/Dell/Documents/portfolio-amour-main/assets/images/certif_licence');
