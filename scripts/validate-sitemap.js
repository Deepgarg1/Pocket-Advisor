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


const targetSlug = 'how-to-track-spending-automatically-android';
const targetArticle = articles.find(article => article.slug === targetSlug);
if (targetArticle) {
  const articleHtmlPath = path.join(rootDir, 'dist', 'news', targetSlug, 'index.html');
  if (!fs.existsSync(articleHtmlPath)) {
    fail('Built prerendered HTML is missing for /news/' + targetSlug + '.');
  } else {
    const articleHtml = fs.readFileSync(articleHtmlPath, 'utf8');
    const canonical = canonicalOrigin + '/news/' + targetSlug;
    if (!articleHtml.includes('<link rel="canonical" href="' + canonical + '" />')) {
      fail('Built article canonical does not match ' + canonical + '.');
    }
    if (!articleHtml.includes('<meta property="og:image" content="' + canonicalOrigin + targetArticle.coverImage + '" />')) {
      fail('Built article Open Graph image does not use the article cover image.');
    }
    if (!articleHtml.includes('<meta name="twitter:image" content="' + canonicalOrigin + targetArticle.coverImage + '" />')) {
      fail('Built article Twitter image does not use the article cover image.');
    }
    if (!/loading="eager"\s+fetchpriority="high"/i.test(articleHtml)) {
      fail('Built article cover image must be eager-loaded and have high fetch priority.');
    }
    if ((articleHtml.match(/<h1\b/gi) || []).length !== 1) {
      fail('Built article should have exactly one H1 heading.');
    }
    if (!articleHtml.includes('ABC MART') || !articleHtml.includes('developer.android.com/training/permissions/requesting')) {
      fail('Built article is missing the worked example or authoritative Android references.');
    }
    if (/zero internet transmission|end-to-end privacy|entirely offline on your device/i.test(articleHtml)) {
      fail('Built article contains an absolute privacy claim that must be qualified.');
    }

    const schemas = [...articleHtml.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .map(match => {
        try { return JSON.parse(match[1]); } catch { fail('Built article contains invalid JSON-LD.'); return null; }
      }).filter(Boolean);
    const articleSchema = schemas.find(schema => schema['@type'] === 'Article');
    const faqSchema = schemas.find(schema => schema['@type'] === 'FAQPage');
    if (!articleSchema) {
      fail('Built article is missing Article structured data.');
    } else {
      if (articleSchema.headline !== targetArticle.title) fail('Article JSON-LD headline does not match src/data/articles.json.');
      if (articleSchema.description !== targetArticle.excerpt) fail('Article JSON-LD description does not match src/data/articles.json.');
      if (articleSchema.mainEntityOfPage !== canonical) fail('Article JSON-LD canonical URL does not match the canonical article URL.');
      if (articleSchema.image !== canonicalOrigin + targetArticle.coverImage) fail('Article JSON-LD image does not match the cover image.');
    }
    if (!faqSchema) {
      fail('Built article is missing FAQPage structured data.');
    } else {
      const actualFaqs = faqSchema.mainEntity || [];
      if (actualFaqs.length !== (targetArticle.faqs || []).length) fail('FAQPage schema count does not match the article FAQ data.');
      for (const faq of (targetArticle.faqs || [])) {
        const match = actualFaqs.find(item => item.name === faq.question);
        if (!match || !match.acceptedAnswer || match.acceptedAnswer.text !== faq.answer) {
          fail('FAQPage schema is out of sync for question: ' + faq.question);
        }
        if (!articleHtml.includes(escapeHtml(faq.question)) || !articleHtml.includes(escapeHtml(faq.answer))) {
          fail('Visible prerendered FAQ is missing or differs from article data for: ' + faq.question);
        }
      }
    }
  }

  const prerenderContent = fs.readFileSync(path.join(rootDir, 'scripts/prerender-content.js'), 'utf8');
  if (!prerenderContent.includes('renderArticleFromData(article)') ||
      prerenderContent.includes("case 'news/how-to-track-spending-automatically-android':")) {
    fail('The article prerender must render from src/data/articles.json rather than a separate hard-coded copy.');
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
