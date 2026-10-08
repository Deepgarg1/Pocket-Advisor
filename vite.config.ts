import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';

// Local development middleware plugin to handle /api/notion-feed and /api/notion-page on localhost
const notionDevPlugin = (env: Record<string, string>) => ({
  name: 'notion-dev-api',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (req.url.startsWith('/api/notion-feed')) {
        res.setHeader('Content-Type', 'application/json');
        const NOTION_SECRET = env.NOTION_SECRET;
        const DATABASE_ID = env.NOTION_DATABASE_ID;

        if (NOTION_SECRET && DATABASE_ID) {
          try {
            const notionRes = await fetch(`https://api.notion.com/v1/databases/${DATABASE_ID}/query`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ sorts: [{ timestamp: 'created_time', direction: 'descending' }] }),
            });
            if (notionRes.ok) {
              const data = await notionRes.json();
              return res.end(JSON.stringify(data));
            }
          } catch (e) {
            console.warn('[Vite Dev] Notion API fetch failed, serving curated fallback:', e);
          }
        }

        // Curated fallback posts for local development & demonstration
        const fallbackFeed = {
          results: [
            {
              id: '3d9a01dd-6c79-80ea-ac1c-e623f8aa0cf1',
              created_time: '2026-09-12T17:07:00.000Z',
              properties: {
                Name: { title: [{ plain_text: 'Welcome to Pocket Advisor' }] },
                Excerpt: { rich_text: [{ plain_text: 'Stop manually typing every expense. Meet the Android app that automatically tracks your UPI spending, splits group bills effortlessly, and helps you plan your wealth.' }] },
                Image: { files: [{ external: { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80' } }] },
              },
            },
            {
              id: 'local-post-1',
              created_time: '2026-09-12T10:00:00.000Z',
              properties: {
                Name: { title: [{ plain_text: '5 High-Impact Ways to Cut Monthly Expenses Without Compromise' }] },
                Excerpt: { rich_text: [{ plain_text: 'Learn how micro-subscriptions, automated notification detection, and budget caps save an average of ₹12,000 yearly.' }] },
                Image: { files: [{ external: { url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=800&q=80' } }] },
              },
            },
            {
              id: 'local-post-2',
              created_time: '2026-09-10T14:30:00.000Z',
              properties: {
                Name: { title: [{ plain_text: 'The Mathematics of Debt Minimization: Why Greedy Graphs Beat Tangled Splits' }] },
                Excerpt: { rich_text: [{ plain_text: 'Discover how Pocket Advisor simplifies 30 complex group expenses into just 4 direct bilateral payments.' }] },
                Image: { files: [{ external: { url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80' } }] },
              },
            },
            {
              id: 'local-post-3',
              created_time: '2026-09-08T09:15:00.000Z',
              properties: {
                Name: { title: [{ plain_text: 'SIP vs Lumpsum: Maximizing Wealth in Volatile Market Cycles' }] },
                Excerpt: { rich_text: [{ plain_text: 'A practical breakdown of Rupee Cost Averaging, compound growth trajectories, and inflation discounting factors.' }] },
                Image: { files: [{ external: { url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80' } }] },
              },
            },
          ],
        };
        return res.end(JSON.stringify(fallbackFeed));
      }

      if (req.url.startsWith('/api/notion-page')) {
        res.setHeader('Content-Type', 'application/json');
        const urlObj = new URL(req.url, 'http://localhost');
        const id = urlObj.searchParams.get('id');
        const NOTION_SECRET = env.NOTION_SECRET;

        // Serve real notion_blocks.json for the Welcome post
        if (id && (id.includes('3d9a') || id === 'local-post-welcome')) {
          const blocksPath = path.resolve(__dirname, 'notion_blocks.json');
          if (fs.existsSync(blocksPath)) {
            try {
              const fileContent = fs.readFileSync(blocksPath, 'utf8');
              const parsed = JSON.parse(fileContent);
              return res.end(JSON.stringify({ results: parsed }));
            } catch (err) {
              console.warn('[Vite Dev] Failed to parse notion_blocks.json:', err);
            }
          }
        }

        const NOTION_ID_REGEX = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
        if (NOTION_SECRET && id && !id.startsWith('local-') && NOTION_ID_REGEX.test(id)) {
          try {
            const pageRes = await fetch(`https://api.notion.com/v1/blocks/${encodeURIComponent(id)}/children?page_size=100`, {
              headers: {
                Authorization: `Bearer ${NOTION_SECRET}`,
                'Notion-Version': '2022-06-28',
              },
            });
            if (pageRes.ok) {
              const data = await pageRes.json();
              return res.end(JSON.stringify(data));
            }
          } catch (e) {
            console.warn('[Vite Dev] Notion page fetch failed, serving sample blocks:', e);
          }
        }

        // Rich sample blocks for full article reading on localhost demonstrating Notion formatting
        const sampleBlocks = {
          results: [
            {
              type: 'callout',
              callout: {
                icon: { type: 'emoji', emoji: '💡' },
                color: 'blue_background',
                rich_text: [
                  {
                    plain_text: 'Key Takeaway: ',
                    annotations: { bold: true },
                  },
                  {
                    plain_text:
                      'Pocket Advisor automatically detects incoming bank SMS and notification alerts to categorize your expenditures in real time with 0 manual effort.',
                  },
                ],
              },
            },
            {
              type: 'heading_2',
              heading_2: {
                rich_text: [{ plain_text: '1. Audit Invisible Recurring Subscriptions' }],
              },
            },
            {
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  {
                    plain_text:
                      'The fastest leak in modern personal spending is unused digital micro-subscriptions. Using smart notification triggers, you can flag recurring monthly charges before they drain your savings.',
                  },
                ],
              },
            },
            {
              type: 'quote',
              quote: {
                color: 'default',
                rich_text: [
                  {
                    plain_text:
                      '“Beware of little expenses. A small leak will sink a great ship.” — Benjamin Franklin',
                  },
                ],
              },
            },
            {
              type: 'heading_2',
              heading_2: {
                rich_text: [{ plain_text: '2. Checklist for Monthly Savings' }],
              },
            },
            {
              type: 'to_do',
              to_do: {
                checked: true,
                rich_text: [
                  {
                    plain_text: 'Cancel OTT memberships not viewed in past 30 days',
                  },
                ],
              },
            },
            {
              type: 'to_do',
              to_do: {
                checked: false,
                rich_text: [
                  {
                    plain_text: 'Set category hard caps on dining & weekend leisure',
                  },
                ],
              },
            },
            {
              type: 'to_do',
              to_do: {
                checked: false,
                rich_text: [
                  {
                    plain_text: 'Configure SIP auto-debit on the day after salary credit',
                  },
                ],
              },
            },
            {
              type: 'divider',
              divider: {},
            },
            {
              type: 'heading_2',
              heading_2: {
                rich_text: [{ plain_text: '3. Debt Settlement Graph Algorithm' }],
              },
            },
            {
              type: 'paragraph',
              paragraph: {
                rich_text: [
                  {
                    plain_text:
                      'For group trips, Pocket Advisor solves multi-debtor cycles using a 2-stage greedy bipartite settlement model:',
                  },
                ],
              },
            },
            {
              type: 'code',
              code: {
                language: 'typescript',
                rich_text: [
                  {
                    plain_text:
                      '// Greedy debt minimization algorithm\nfunction minimizeDebts(netBalances: Map<string, number>): Settlement[] {\n  const creditors = getCreditors(netBalances);\n  const debtors = getDebtors(netBalances);\n  return resolveBipartiteTransactions(creditors, debtors);\n}',
                  },
                ],
              },
            },
            {
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [
                  {
                    plain_text: '100% Offline & Private: ',
                    annotations: { bold: true },
                  },
                  {
                    plain_text: 'No cloud database or third-party tracking required.',
                  },
                ],
              },
            },
            {
              type: 'bulleted_list_item',
              bulleted_list_item: {
                rich_text: [
                  {
                    plain_text: 'Direct WhatsApp Export: ',
                    annotations: { bold: true },
                  },
                  {
                    plain_text: 'Share exact settlement dues with 1 click.',
                  },
                ],
              },
            },
          ],
        };
        return res.end(JSON.stringify(sampleBlocks));
      }



      next();
    });
  },
});

// Local development middleware plugin to handle /api/save-article and /api/delete-article directly writing to src/data/articles.json
const articleStudioDevPlugin = () => ({
  name: 'article-studio-dev-api',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      // 1. GET /api/articles - Read all articles from articles.json
      if (req.url === '/api/articles' && req.method === 'GET') {
        res.setHeader('Content-Type', 'application/json');
        try {
          const articlesPath = path.resolve(__dirname, 'src/data/articles.json');
          if (fs.existsSync(articlesPath)) {
            const content = fs.readFileSync(articlesPath, 'utf8');
            return res.end(content);
          }
          return res.end(JSON.stringify([]));
        } catch (err: any) {
          res.statusCode = 500;
          return res.end(JSON.stringify({ error: err.message }));
        }
      }

      // 2. POST /api/save-article - Save or update article in articles.json
      if (req.url === '/api/save-article' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { article } = JSON.parse(body);
            if (!article || !article.slug) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Article object with valid slug is required' }));
            }
            const articlesPath = path.resolve(__dirname, 'src/data/articles.json');
            let articles: any[] = [];
            if (fs.existsSync(articlesPath)) {
              articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
            }

            const existingIdx = articles.findIndex((a: any) => a.id === article.id || a.slug === article.slug);
            const now = new Date().toISOString().split('T')[0];
            const updatedArticle = {
              ...article,
              id: article.id || article.slug,
              publishedAt: article.publishedAt || now,
              updatedAt: now,
            };

            if (existingIdx >= 0) {
              articles[existingIdx] = updatedArticle;
            } else {
              articles.unshift(updatedArticle);
            }

            fs.writeFileSync(articlesPath, JSON.stringify(articles, null, 2), 'utf8');
            console.log(`[Studio Dev] Successfully saved article: "${article.title}" (${article.slug})`);
            return res.end(JSON.stringify({ success: true, article: updatedArticle, message: 'Article saved successfully' }));
          } catch (err: any) {
            console.error('[Studio Dev] Failed to save article:', err);
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // 3. POST /api/delete-article - Delete article by slug or id
      if (req.url === '/api/delete-article' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            const { slug, id } = JSON.parse(body);
            const articlesPath = path.resolve(__dirname, 'src/data/articles.json');
            let articles: any[] = [];
            if (fs.existsSync(articlesPath)) {
              articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
            }
            const filtered = articles.filter((a: any) => a.slug !== slug && a.id !== id);
            fs.writeFileSync(articlesPath, JSON.stringify(filtered, null, 2), 'utf8');
            console.log(`[Studio Dev] Deleted article: slug=${slug}, id=${id}`);
            return res.end(JSON.stringify({ success: true }));
          } catch (err: any) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      // 4. POST /api/publish-live - Commit articles.json and push to GitHub (triggers Vercel auto-publish)
      if (req.url === '/api/publish-live' && req.method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        let body = '';
        req.on('data', (chunk: any) => { body += chunk; });
        req.on('end', () => {
          try {
            let commitMsg = 'Publish article updates';
            try {
              const parsed = JSON.parse(body || '{}');
              if (parsed.message) commitMsg = parsed.message;
            } catch (_) {}

            const sanitizedMsg = commitMsg.replace(/["\r\n]/g, ' ').trim();
            const cmd = `git add src/data/articles.json && git commit -m "Publish: ${sanitizedMsg}" && git push origin main`;

            console.log(`[Studio Dev] Running Git deploy: ${cmd}`);
            exec(cmd, { cwd: __dirname }, (error, stdout, stderr) => {
              if (error) {
                const combined = (stdout || '') + ' ' + (stderr || '');
                if (combined.includes('nothing to commit') || combined.includes('working tree clean')) {
                  return res.end(JSON.stringify({
                    success: true,
                    message: 'Articles are already up to date on GitHub and Vercel!',
                    details: combined.trim(),
                  }));
                }
                console.error('[Studio Dev] Git deploy failed:', error, stderr);
                res.statusCode = 500;
                return res.end(JSON.stringify({ error: error.message, details: stderr }));
              }
              console.log('[Studio Dev] Git deploy successful:\n', stdout);
              return res.end(JSON.stringify({
                success: true,
                message: 'Pushed to GitHub! Vercel is auto-deploying to pocketadvisor.in now (~25s).',
                details: stdout.trim(),
              }));
            });
          } catch (err: any) {
            res.statusCode = 500;
            return res.end(JSON.stringify({ error: err.message }));
          }
        });
        return;
      }

      next();
    });
  },
});

// Production plugin to inline the tiny compiled CSS bundle directly into index.html, eliminating render-blocking CSS
const inlineCssPlugin = () => ({
  name: 'inline-css-plugin',
  enforce: 'post' as const,
  transformIndexHtml(html: string, ctx: any) {
    if (!ctx.bundle) return html;
    let newHtml = html;
    for (const [fileName, chunk] of Object.entries(ctx.bundle)) {
      if (fileName.endsWith('.css') && (chunk as any).source) {
        const cssContent = (chunk as any).source.toString();
        const linkRegex = new RegExp(`<link[^>]+href="[^"]*${fileName}"[^>]*>`, 'g');
        newHtml = newHtml.replace(linkRegex, `<style>${cssContent}</style>`);
      }
    }
    return newHtml;
  },
});

export default defineConfig(({ mode }) => {
  // Load environment variables from web/.env, and fall back to root .env
  const localEnv = loadEnv(mode, __dirname, '');
  const parentEnv = loadEnv(mode, path.resolve(__dirname, '..'), '');
  const env = { ...parentEnv, ...localEnv, ...process.env };
  
  const supabaseUrl = env.VITE_SUPABASE_URL || env.SUPABASE_URL || '';
  const supabaseKey = env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_KEY || '';

  return {
    plugins: [react(), notionDevPlugin(env), articleStudioDevPlugin(), inlineCssPlugin()],
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(supabaseKey),
    },
    server: {
      port: 5173,
      host: true,
    },
    esbuild: {
      legalComments: 'none',
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
      treeShaking: true,
    },
    build: {
      target: 'es2020',
      minify: 'esbuild',
      cssMinify: true,
      sourcemap: false,
      rollupOptions: {
        output: {
          compact: true,
          manualChunks: (id) => {
            if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/@supabase')) {
              return 'vendor-supabase';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
  };
});
