// Correzione colore uniforme: meno arancione, saturazione contenuta, neri leggermente sollevati
import sharp from 'sharp';
import path from 'path';
const [src, out] = process.argv.slice(2);
const img = sharp(src);
const { channels } = await img.metadata();
await img
  .recomb([
    [0.86, 0.10, 0.04],
    [0.04, 0.92, 0.04],
    [0.02, 0.08, 0.98],
  ])
  .modulate({ saturation: 0.78, brightness: 1.06 })
  .linear(0.9, 14)
  .gamma(1.05)
  .jpeg({ quality: 90 })
  .toFile(out);
