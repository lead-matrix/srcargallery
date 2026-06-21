const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const logoPath = path.join(__dirname, '../public/logo.png');
const svgPath = path.join(__dirname, '../public/favicon.svg');

(async () => {
  try {
    console.log('Optimizing logo for SVG favicon...');
    const logo = await Jimp.read(logoPath);
    
    // Resize to height 128 for optimized size while preserving detail
    const targetH = 128;
    const scale = targetH / logo.bitmap.height;
    const targetW = Math.round(logo.bitmap.width * scale);
    logo.resize({ w: targetW, h: targetH });
    
    const buffer = await logo.getBuffer('image/png');
    const base64 = buffer.toString('base64');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${targetW} ${targetH}" width="100%" height="100%">
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="${targetW}" height="${targetH}" />
</svg>`;
    
    fs.writeFileSync(svgPath, svg);
    console.log('✓ SVG favicon optimized and updated successfully!');
  } catch (err) {
    console.error('Error generating SVG favicon:', err);
    process.exit(1);
  }
})();

