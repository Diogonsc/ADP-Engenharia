/**
 * Gera variantes WebP/AVIF dimensionadas para o tamanho real exibido na UI.
 * Execute: npm run optimize:images
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const assetsDir = path.join(root, "src/assets");
const outDir = path.join(assetsDir, "optimized");
const publicDir = path.join(root, "public");

const CLIENT_WIDTH = 256;
const LOGO_WIDTHS = [72, 144];
const HERO_WIDTHS = [640, 960, 1280, 1920];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function writeWebp(input, output, width) {
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toFile(output);
}

async function optimizeClients() {
  const dir = path.join(outDir, "clients");
  await ensureDir(dir);

  for (let i = 1; i <= 9; i++) {
    const input = path.join(assetsDir, `${i}.png`);
    const output = path.join(dir, `${i}.webp`);
    await writeWebp(input, output, CLIENT_WIDTH);
  }
}

async function optimizeLogo() {
  const dir = path.join(outDir, "logo");
  await ensureDir(dir);
  const input = path.join(assetsDir, "logo.png");

  for (const width of LOGO_WIDTHS) {
    await writeWebp(input, path.join(dir, `logo-${width}.webp`), width);
  }
}

async function optimizeHero() {
  const dir = path.join(outDir, "hero");
  await ensureDir(dir);
  const input = path.join(assetsDir, "hero-image.jpg");

  for (const width of HERO_WIDTHS) {
    const base = path.join(dir, `hero-${width}`);
    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(`${base}.webp`);

    await sharp(input)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 65, effort: 4 })
      .toFile(`${base}.avif`);
  }

  const lcpWebp = path.join(publicDir, "hero-lcp.webp");
  const lcpAvif = path.join(publicDir, "hero-lcp.avif");
  await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 80, effort: 4 })
    .toFile(lcpWebp);
  await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .avif({ quality: 65, effort: 4 })
    .toFile(lcpAvif);
}

async function main() {
  console.log("Otimizando imagens...");
  await optimizeClients();
  await optimizeLogo();
  await optimizeHero();
  console.log("Concluído:", outDir);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
