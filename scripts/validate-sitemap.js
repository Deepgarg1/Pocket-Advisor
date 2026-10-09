import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
const robotsPath = path.join(rootDir, 'public/robots.txt');
const prerenderPath = path.join(rootDir, 'scripts/prerender.js');
const articlesPath = path.join(rootDir, 'src/data/articles.json');
const canonicalOrigin = 'https://www.pocketadvisor.in';

function fail(message) {
  console.error(`[Sitemap validation] ERROR: ${message}`);
  process.exitCode = 1;
}

const sitemap = fs.readFileSync(sitemapPath, 'utf8');
const robots = fs.readFileSync(robotsPath, 'utf8');
const prerenderSource = fs.readFileSync(prerenderPath, 'utf8');
const articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));

if (!sitemap.includes('<urlset') || !sitemap.includes('</urlset>')) {
  fail('sitemap.xml is missing the urlset root element.');
}

const urlBlocks = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1]);
const entries = urlBlocks.map((block, index) => {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
  const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim();

  if (!loc) fail(`URL entry #${index + 1} has no <loc>.`);
  if (lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
    fail(`Invalid lastmod date "${lastmod}" for ${loc || `entry #${index + 1}`} (expected YYYY-MM-DD).`);
  } else if (lastmod && Number.isNaN(Date.parse(`${lastmod}T00:00:00Z`))) {
    fail(`Unparseable lastmod date "${lastmod}" for ${loc}.`);
  }

  return { loc, lastmod };
}).filter(entry => entry.loc);

if (entries.length !== urlBlocks.length) {
  fail('One or more sitemap URL blocks could not be parsed.');
}

const seen = new Set();
for (const entry of entries) {
  if (seen.has(entry.loc)) fail(`Duplicate sitemap URL: ${entry.loc}`);
  seen.add(entry.loc);

  let parsed;
  try {
    parsed = new URL(entry.loc);
  } catch {
    fail(`Invalid sitemap URL: ${entry.loc}`);
    continue;
  }

  if (parsed.origin !== canonicalOrigin) {
    fail(`Non-canonical host or protocol in sitemap URL: ${entry.loc}`);
  }
  if (parsed.search || parsed.hash) {
    fail(`Sitemap URL must not include a query string or fragment: ${entry.loc}`);
  }
}

const prerenderSlugs = [...prerenderSource.matchAll(/^    slug: '([^']+)',/gm)].map(match => match[1]);
const expectedPaths = new Set(['/', ...prerenderSlugs.map(slug => `/${slug}`)]);
const actualPaths = new Set(entries.map(entry => new URL(entry.loc).pathname));

for (const pathName of expectedPaths) {
  if (!actualPaths.has(pathName)) fail(`Prerendered route is missing from sitemap.xml: ${pathName}`);
}
for (const pathName of actualPaths) {
  if (!expectedPaths.has(pathName)) fail(`Sitemap URL has no matching configured prerender route: ${pathName}`);
}

const articleByPath = new Map(articles.map(article => [`/news/${article.slug}`, article]));
for (const [articlePath, article] of articleByPath) {
  const entry = entries.find(item => new URL(item.loc).pathname === articlePath);
  if (!entry) {
    fail(`Published article is missing from sitemap.xml: ${articlePath}`);
    continue;
  }

  const expectedLastmod = (article.updatedAt || article.publishedAt || '').slice(0, 10);
  if (expectedLastmod && entry.lastmod !== expectedLastmod) {
    fail(`lastmod for ${articlePath} is ${entry.lastmod || 'missing'}; expected article update date ${expectedLastmod}.`);
  }
}

const robotsSitemap = robots.match(/^Sitemap:\s*(\S+)\s*$/mi)?.[1];
if (robotsSitemap !== `${canonicalOrigin}/sitemap.xml`) {
  fail(`robots.txt must point to ${canonicalOrigin}/sitemap.xml; found ${robotsSitemap || 'no Sitemap directive'}.`);
}

if (process.exitCode) {
  console.error('[Sitemap validation] Failed. Fix the issues above before deploying.');
} else {
  console.log(`[Sitemap validation] Passed: ${entries.length} unique canonical URLs, all ${prerenderSlugs.length} prerender routes, ${articles.length} article dates, and robots.txt are consistent.`);
}
