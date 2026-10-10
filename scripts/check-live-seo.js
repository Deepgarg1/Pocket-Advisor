const ORIGIN = "https://www.pocketadvisor.in";
const SITEMAP_URL = new URL("/sitemap.xml", ORIGIN).href;
const ROBOTS_URL = new URL("/robots.txt", ORIGIN).href;
const CONCURRENCY = 4;
const failures = [];
const warnings = [];

async function fetchText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "PocketAdvisorSeoHealthCheck/1.0 (+https://www.pocketadvisor.in)" },
    signal: AbortSignal.timeout(20000),
  });
  return { response, text: await response.text() };
}

function decodeXml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");
}

async function checkSiteBasics() {
  const { response: robotsResponse, text: robots } = await fetchText(ROBOTS_URL);
  if (!robotsResponse.ok) failures.push(`robots.txt returned HTTP ${robotsResponse.status}`);
  else if (!/sitemap:\s*https?:\/\/www\.pocketadvisor\.in\/sitemap\.xml/i.test(robots)) {
    failures.push("robots.txt does not declare https://www.pocketadvisor.in/sitemap.xml");
  }

  const { response, text } = await fetchText(SITEMAP_URL);
  if (!response.ok) {
    failures.push(`sitemap.xml returned HTTP ${response.status}`);
    return [];
  }
  if (!/<urlset\b/i.test(text)) {
    failures.push("sitemap.xml does not contain a <urlset> element (sitemap indexes are not handled by this check)");
    return [];
  }

  const urls = [...text.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)]
    .map((match) => decodeXml(match[1].trim()));
  if (urls.length === 0) failures.push("sitemap.xml contains no <loc> URLs");

  const unique = new Set(urls);
  if (unique.size !== urls.length) failures.push("sitemap.xml contains duplicate URLs");

  for (const url of urls) {
    try {
      const parsed = new URL(url);
      if (parsed.origin !== ORIGIN) failures.push(`Sitemap URL uses unexpected host/protocol: ${url}`);
      if (parsed.hash) failures.push(`Sitemap URL contains a fragment: ${url}`);
    } catch {
      failures.push(`Sitemap contains an invalid URL: ${url}`);
    }
  }
  return [...unique];
}

async function checkPage(url) {
  try {
    const { response, text } = await fetchText(url);
    if (response.status !== 200) {
      failures.push(`${url} returned HTTP ${response.status} (final URL: ${response.url})`);
      return;
    }
    if (new URL(response.url).origin !== ORIGIN) {
      failures.push(`${url} redirected to a different host: ${response.url}`);
      return;
    }
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      failures.push(`${url} returned unexpected content type: ${contentType || "(missing)"}`);
      return;
    }

    const canonicalMatch = text.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["'][^>]*>/i)
      || text.match(/<link\b[^>]*\bhref=["']([^"']+)["'][^>]*\brel=["']canonical["'][^>]*>/i);
    if (!canonicalMatch) {
      failures.push(`${url} has no readable canonical link in the raw HTML`);
    } else {
      const canonical = new URL(canonicalMatch[1], response.url).href;
      if (canonical !== url) failures.push(`${url} canonical mismatch: ${canonical}`);
    }

    if (/<meta\b[^>]*\bname=["']robots["'][^>]*\bcontent=["'][^"']*noindex/i.test(text)
      || /<meta\b[^>]*\bcontent=["'][^"']*noindex[^"']*["'][^>]*\bname=["']robots["']/i.test(text)) {
      failures.push(`${url} has a robots noindex directive in raw HTML`);
    }
    if (!/<body\b/i.test(text) || text.length < 1000) {
      warnings.push(`${url} HTML response looks unusually small; verify prerendered content`);
    }
  } catch (error) {
    failures.push(`${url} fetch failed: ${error.message}`);
  }
}

async function main() {
  console.log(`Checking live SEO basics for ${ORIGIN}`);
  const urls = await checkSiteBasics();
  console.log(`Found ${urls.length} unique sitemap URLs`);

  let next = 0;
  async function worker() {
    while (next < urls.length) {
      const index = next++;
      await checkPage(urls[index]);
      console.log(`Checked ${index + 1}/${urls.length}: ${urls[index]}`);
    }
  }
  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker));

  for (const warning of warnings) console.warn(`WARNING: ${warning}`);
  for (const failure of failures) console.error(`FAIL: ${failure}`);

  console.log(`Result: ${failures.length} failure(s), ${warnings.length} warning(s)`);
  if (failures.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
