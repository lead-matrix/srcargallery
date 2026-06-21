/**
 * remove-bg.mjs
 * Removes white/near-white background from the original SR Car Gallery logo.
 * Uses edge-aware alpha blending so antialiased edges look smooth on dark backgrounds.
 * 
 * Usage: node scripts/remove-bg.mjs
 */

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import Jimp from 'jimp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

const SOURCE = join(ROOT, 'scripts', 'source-logo.png')
const OUT_LOGO   = join(ROOT, 'public', 'logo.png')
const OUT_FAVICON = join(ROOT, 'public', 'favicon-512.png')

// Thresholds — tweak if needed
const PURE_WHITE = 245   // above this on ALL channels = remove fully
const EDGE_START = 190   // below PURE_WHITE, above this = partial transparency (edge smoothing)

async function removeWhiteBackground(inputPath, outputPath) {
  console.log(`Processing: ${inputPath}`)
  const img = await Jimp.read(inputPath)
  const { width, height } = img.bitmap

  img.scan(0, 0, width, height, function (x, y, idx) {
    const r = this.bitmap.data[idx]
    const g = this.bitmap.data[idx + 1]
    const b = this.bitmap.data[idx + 2]

    // Minimum channel: how "white" this pixel truly is
    // (white = all channels high; colored pixels have at least one low channel)
    const minCh = Math.min(r, g, b)

    if (minCh >= PURE_WHITE) {
      // Pure white background → fully transparent
      this.bitmap.data[idx + 3] = 0
    } else if (minCh >= EDGE_START) {
      // Antialiased edge pixels → smooth gradient to transparency
      // Maps EDGE_START..PURE_WHITE → 255..0 alpha
      const alpha = Math.round(255 * (PURE_WHITE - minCh) / (PURE_WHITE - EDGE_START))
      this.bitmap.data[idx + 3] = Math.max(0, Math.min(255, alpha))
    }
    // else: logo pixel → keep fully opaque (alpha stays 255)
  })

  await img.writeAsync(outputPath)
  console.log(`  ✓ Saved → ${outputPath}`)
}

async function createOGImage(logoPath, outputPath) {
  console.log('Creating OG social share image (1200×630)...')

  // Dark gunmetal background
  const bg = new Jimp(1200, 630, 0x0d0d0dff)

  // Load the transparent logo
  const logo = await Jimp.read(logoPath)

  // Scale logo to fit nicely on left side — target ~520px tall, keep aspect
  const logoTargetH = 520
  const scale = logoTargetH / logo.bitmap.height
  logo.scale(scale, Jimp.RESIZE_BICUBIC)

  // Composite logo centred vertically, left-positioned
  const logoY = Math.round((630 - logo.bitmap.height) / 2)
  const logoX = 40
  bg.composite(logo, logoX, logoY, { mode: Jimp.BLEND_SOURCE_OVER, opacitySource: 1, opacityDest: 1 })

  // Copper divider line (right of logo)
  const divX = logoX + logo.bitmap.width + 30
  for (let y = 60; y < 570; y++) {
    bg.setPixelColor(0xC4762Aff, divX, y)
    bg.setPixelColor(0xE8892Aff, divX + 1, y)
  }

  await bg.writeAsync(outputPath)
  console.log(`  ✓ OG image saved → ${outputPath}`)
}

;(async () => {
  try {
    await removeWhiteBackground(SOURCE, OUT_LOGO)
    await removeWhiteBackground(SOURCE, OUT_FAVICON)

    // OG image uses the now-transparent logo
    const OUT_OG = join(ROOT, 'public', 'og-image.png')
    await createOGImage(OUT_LOGO, OUT_OG)

    console.log('\n✅ All done! Files written to public/')
  } catch (err) {
    console.error('Error:', err)
    process.exit(1)
  }
})()
