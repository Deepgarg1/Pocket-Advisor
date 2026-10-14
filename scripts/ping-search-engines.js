import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(rootDir, 'public/sitemap.xml');

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());

console.log(`[SEO Ping] Found ${urls.length} URLs in sitemap.`);

async function pingGoogle() {
  const pingUrl = `https://www.google.com/ping?sitemap=https://www.pocketadvisor.in/sitemap.xml`;
  try {
    const res = await fetch(pingUrl);
    console.log(`[SEO Ping] Google sitemap ping responded with status: ${res.status}`);
  } catch (err) {
    console.warn(`[SEO Ping] Google sitemap ping failed:`, err.message);
  }
}

async function pingIndexNow() {
  const host = 'www.pocketadvisor.in';
  const key = 'pocketadvisor2026indexnow';
  const keyFile = path.join(rootDir, 'public', `${key}.txt`);

  // Ensure key file exists for verification
  if (!fs.existsSync(keyFile)) {
    fs.writeFileSync(keyFile, key, 'utf8');
    console.log(`[SEO Ping] Created verification key file: public/${key}.txt`);
  }

  const payload = {
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: urls
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log(`[SEO Ping] IndexNow (Bing/Yandex/Seznam) submitted ${urls.length} URLs: HTTP ${res.status}`);
  } catch (err) {
    console.warn(`[SEO Ping] IndexNow ping failed:`, err.message);
  }
}

async function main() {
  await Promise.all([pingGoogle(), pingIndexNow()]);
}

main().catch(console.error);
