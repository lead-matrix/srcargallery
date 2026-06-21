/**
 * remove-bg.cjs — CommonJS version for jimp v1
 * Removes white background from the original SR Car Gallery logo (exact pixel preservation).
 */
const path = require('path')
const { Jimp, BlendMode } = require('jimp')

const ROOT = path.join(__dirname, '..')
const SOURCE  = path.join(__dirname, 'source-logo.png')
const OUT_LOGO    = path.join(ROOT, 'public', 'logo.png')
const OUT_FAVICON = path.join(ROOT, 'public', 'favicon-512.png')
const OUT_OG      = path.join(ROOT, 'public', 'og-image.png')

// Tuning values
const PURE_WHITE = 245  // min channel > this → fully transparent
const EDGE_START = 185  // min channel between EDGE_START..PURE_WHITE → smooth edge

async function removeWhiteBg(src, dest) {
  console.log(`  Reading  ${path.basename(src)}`)
  const img = await Jimp.read(src)
  const { width, height } = img.bitmap

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = img.bitmap.data[idx]
      const g = img.bitmap.data[idx + 1]
      const b = img.bitmap.data[idx + 2]

      // "Whiteness" = minimum channel value (a pure white pixel = all channels 255)
      const minCh = Math.min(r, g, b)

      if (minCh >= PURE_WHITE) {
        img.bitmap.data[idx + 3] = 0           // fully transparent
      } else if (minCh >= EDGE_START) {
        // Linear ramp from 0 (at PURE_WHITE) → 255 (at EDGE_START)
        const alpha = Math.round(255 * (1 - (minCh - EDGE_START) / (PURE_WHITE - EDGE_START)))
        img.bitmap.data[idx + 3] = Math.min(255, Math.max(0, alpha))
      }
      // else: keep original alpha = 255 (logo pixel)
    }
  }

  await img.write(dest)
  console.log(`  ✓ Saved  ${path.basename(dest)}`)
  return img
}

async function createOGImage(transparentLogoPath) {
  console.log('\nBuilding OG social share image (1200×630)...')

  // 1. Dark gunmetal background — same as site background #0d0d0d
  const bg = new Jimp({ width: 1200, height: 630, color: 0x0d0d0dff })

  // 2. Load the transparent logo
  const logo = await Jimp.read(transparentLogoPath)

  // Scale to ~560px tall
  const targetH = 560
  const scale = targetH / logo.bitmap.height
  const targetW = Math.round(logo.bitmap.width * scale)
  logo.resize({ w: targetW, h: targetH })

  // Position: left-aligned, vertically centred with slight padding
  const lx = 30
  const ly = Math.round((630 - logo.bitmap.height) / 2)
  bg.composite(logo, lx, ly)

  // 3. Copper vertical divider line
  const divX = lx + logo.bitmap.width + 30
  for (let y = 50; y < 580; y++) {
    bg.setPixelColor(0xE8892Aff, divX, y)
    bg.setPixelColor(0xC4762Aff, divX + 1, y)
    bg.setPixelColor(0x80400fff, divX + 2, y)
  }

  // 4. Copper bottom border strip
  for (let x = 0; x < 1200; x++) {
    for (let t = 0; t < 4; t++) {
      bg.setPixelColor(0xE8892Aff, x, 626 + t)
    }
  }

  await bg.write(OUT_OG)
  console.log(`  ✓ OG image saved → ${path.basename(OUT_OG)}`)
}

;(async () => {
  try {
    console.log('\n🔧 Processing SR Car Gallery logo...\n')

    // Remove white background from original — save as logo.png and favicon-512.png
    const transparentLogo = await removeWhiteBg(SOURCE, OUT_LOGO)
    await removeWhiteBg(SOURCE, OUT_FAVICON)

    // Build OG image from the transparent logo
    await createOGImage(OUT_LOGO)

    console.log('\n✅ All done! public/ updated:')
    console.log('   • logo.png        (transparent background)')
    console.log('   • favicon-512.png (transparent background)')
    console.log('   • og-image.png    (logo on dark background)')
  } catch (err) {
    console.error('\n❌ Error:', err.message)
    process.exit(1)
  }
})()
