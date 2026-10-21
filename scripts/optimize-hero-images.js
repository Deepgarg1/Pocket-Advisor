import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mockupDir = path.resolve(__dirname, '../public/assets/mockup');

const sourceFiles = [
  'phone-dashboard.webp',
  'phone-history.webp',
  'phone-analytics.webp',
  'phone-splits.webp',
  'phone-planner.webp',
  'phone-tools.webp',
];

const variants = [
  { suffix: '320w', width: 320, quality: 80 },
  { suffix: '640w', width: 640, quality: 82 },
];

async function optimizeHeroImages() {
  console.log('[Image Optimizer] Processing hero mockup variants...');
  let totalSaved = 0;

  for (const filename of sourceFiles) {
    const inputPath = path.join(mockupDir, filename);
    if (!fs.existsSync(inputPath)) {
      console.warn(`[Image Optimizer] Warning: ${filename} not found, skipping.`);
      continue;
    }

    const baseName = path.parse(filename).name;
    const originalStat = fs.statSync(inputPath);

    for (const v of variants) {
      const outputPath = path.join(mockupDir, `${baseName}-${v.suffix}.webp`);

      await sharp(inputPath)
        .resize({ width: v.width, withoutEnlargement: true })
        .webp({ quality: v.quality, effort: 6 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      const savings = originalStat.size - outStat.size;
      console.log(`  -> Generated ${baseName}-${v.suffix}.webp: ${(outStat.size / 1024).toFixed(1)} kB (original: ${(originalStat.size / 1024).toFixed(1)} kB)`);
      if (v.suffix === '320w') totalSaved += savings;
    }
  }

  console.log(`[Image Optimizer] Done. Mobile payload reduction: ${(totalSaved / 1024).toFixed(1)} kB saved across screens.`);
}

optimizeHeroImages().catch((err) => {
  console.error('[Image Optimizer] Error optimizing images:', err);
  process.exit(1);
});
