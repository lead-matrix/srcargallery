const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

const inputJpg = 'C:/Users/mrbar/.gemini/antigravity/brain/51c681bb-4212-4953-832f-533022d7ed51/media__1782075346835.jpg';
const destLogo = path.join(__dirname, '../public/logo.png');
const destFavicon = path.join(__dirname, '../public/favicon-512.png');
const destSvg = path.join(__dirname, '../public/favicon.svg');
const destOg = path.join(__dirname, '../public/og-image.png');

(async () => {
  try {
    console.log('Reading user logo from:', inputJpg);
    const img = await Jimp.read(inputJpg);
    
    // 1. Save as logo.png (original quality PNG)
    console.log('Saving logo.png...');
    await img.write(destLogo);
    
    // 2. Save as favicon-512.png (512x512 PNG)
    console.log('Saving favicon-512.png...');
    const favImg = img.clone();
    favImg.resize({ w: 512, h: 512 });
    await favImg.write(destFavicon);
    
    // 3. Save as favicon.svg (optimized base64 SVG)
    console.log('Generating favicon.svg...');
    const svgImg = img.clone();
    svgImg.resize({ w: 128, h: 128 });
    const buffer = await svgImg.getBuffer('image/png');
    const base64 = buffer.toString('base64');
    
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="100%" height="100%">
  <image href="data:image/png;base64,${base64}" x="0" y="0" width="128" height="128" />
</svg>`;
    fs.writeFileSync(destSvg, svg);
    
    // 4. Save as og-image.png (standard social share 1200x630, logo centered on matching dark background)
    console.log('Generating og-image.png...');
    // Create dark background matching the black logo edges
    const bg = new Jimp({ width: 1200, height: 630, color: 0x000000ff });
    
    // Resize logo to fit nicely in OG share
    const ogLogo = img.clone();
    ogLogo.resize({ w: 560, h: 560 });
    
    // Center it
    const lx = Math.round((1200 - 560) / 2);
    const ly = Math.round((630 - 560) / 2);
    bg.composite(ogLogo, lx, ly);
    
    await bg.write(destOg);
    
    console.log('✓ Success! All branding files generated and updated successfully!');
  } catch (err) {
    console.error('Error processing user logo:', err);
    process.exit(1);
  }
})();
