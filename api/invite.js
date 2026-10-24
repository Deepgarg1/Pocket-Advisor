/**
 * GET /api/invite?code=ABCDEF
 * Serverless deep-link landing and direct redirection for Pocket Advisor split group invites.
 * Guarantees HTTP 200, rich OpenGraph preview on WhatsApp/Telegram, and seamless app opening.
 */
export default async function handler(req, res) {
  const rawCode = (req.query.code || req.query.group || req.query.id || '').toString();
  // Strip any trailing slashes, spaces, or query noise
  const code = rawCode.split('/')[0].split('?')[0].trim().toUpperCase();

  const title = code 
    ? `Join Split Group ${code} | Pocket Advisor` 
    : 'Join Split Group | Pocket Advisor';
  const description = code
    ? `You've been invited to join group "${code}" on Pocket Advisor. Tap to view and settle split group expenses.`
    : 'You\'ve been invited to join a group on Pocket Advisor. Tap to split bills and settle debts.';

  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';
  const appSchemeUrl = code ? `pocketadvisor://invite?group=${encodeURIComponent(code)}` : 'pocketadvisor://split';
  const intentUrl = code 
    ? `intent://invite/${encodeURIComponent(code)}#Intent;scheme=pocketadvisor;package=com.pocketadvisor.app;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`
    : `intent://split#Intent;scheme=pocketadvisor;package=com.pocketadvisor.app;S.browser_fallback_url=${encodeURIComponent(playStoreUrl)};end`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="https://www.pocketadvisor.in/invite/${encodeURIComponent(code)}" />
  
  <!-- OpenGraph / WhatsApp / Telegram Preview -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Pocket Advisor" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:image" content="https://www.pocketadvisor.in/logo.png" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="512" />
  <meta property="og:url" content="https://www.pocketadvisor.in/invite/${encodeURIComponent(code)}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="https://www.pocketadvisor.in/logo.png" />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/logo-round.png" />

  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(17, 24, 39, 0.75);
      --card-border: rgba(99, 102, 241, 0.25);
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --accent: #10b981;
      --text: #f8fafc;
      --text-muted: #94a3b8;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 24px;
      line-height: 1.5;
    }
    .container {
      max-width: 480px;
      width: 100%;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 24px;
      padding: 36px 28px;
      text-align: center;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 50px -10px rgba(99, 102, 241, 0.15);
      backdrop-filter: blur(16px);
    }
    .logo {
      width: 64px;
      height: 64px;
      border-radius: 16px;
      margin: 0 auto 16px;
      box-shadow: 0 4px 20px rgba(99, 102, 241, 0.35);
      display: block;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 9999px;
      background: rgba(99, 102, 241, 0.15);
      color: #a5b4fc;
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 16px;
    }
    h1 {
      font-size: 1.45rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      margin-bottom: 8px;
      color: #ffffff;
    }
    p.sub {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 24px;
    }
    .code-box {
      background: rgba(0, 0, 0, 0.4);
      border: 1px dashed rgba(99, 102, 241, 0.45);
      border-radius: 16px;
      padding: 16px;
      margin-bottom: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .code-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--text-muted);
      font-weight: 700;
      text-align: left;
    }
    .code-value {
      font-size: 1.55rem;
      font-weight: 900;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      color: #818cf8;
      letter-spacing: 0.1em;
      text-align: left;
    }
    .btn-copy {
      background: rgba(99, 102, 241, 0.15);
      border: 1px solid rgba(99, 102, 241, 0.3);
      color: #c7d2fe;
      font-size: 0.8rem;
      font-weight: 700;
      padding: 8px 14px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-copy:hover {
      background: rgba(99, 102, 241, 0.3);
      color: #ffffff;
    }
    .actions {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    .btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      font-weight: 700;
      font-size: 1rem;
      padding: 14px 20px;
      border-radius: 14px;
      text-decoration: none;
      box-shadow: 0 4px 14px rgba(99, 102, 241, 0.4);
      transition: transform 0.15s, box-shadow 0.15s;
    }
    .btn-primary:active { transform: scale(0.98); }
    .btn-secondary {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #ffffff;
      font-weight: 600;
      font-size: 0.92rem;
      padding: 12px 20px;
      border-radius: 14px;
      text-decoration: none;
      transition: background 0.2s;
    }
    .btn-secondary:hover { background: rgba(255, 255, 255, 0.1); }
    .steps {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 20px;
      text-align: left;
    }
    .steps-title {
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--text-muted);
      font-weight: 700;
      margin-bottom: 10px;
    }
    .step-item {
      display: flex;
      gap: 10px;
      font-size: 0.85rem;
      color: #cbd5e1;
      margin-bottom: 6px;
    }
    .step-num {
      color: #818cf8;
      font-weight: 800;
    }
    .footer {
      margin-top: 24px;
      font-size: 0.78rem;
      color: var(--text-muted);
    }
    .footer a {
      color: #818cf8;
      text-decoration: none;
    }
  </style>

  <script>
    var inviteCode = ${JSON.stringify(code)};
    var schemeUrl = ${JSON.stringify(appSchemeUrl)};
    var intentUrl = ${JSON.stringify(intentUrl)};

    // Auto-attempt launching the app on Android devices
    function autoLaunchApp() {
      if (/android/i.test(navigator.userAgent)) {
        // First try custom scheme
        window.location.href = schemeUrl;
      }
    }

    function copyCode() {
      if (!inviteCode) return;
      navigator.clipboard.writeText(inviteCode).then(function() {
        var btn = document.getElementById('copyBtn');
        if (btn) {
          btn.innerText = 'Copied!';
          btn.style.background = 'rgba(16, 185, 129, 0.25)';
          btn.style.color = '#34d399';
          setTimeout(function() {
            btn.innerText = 'Copy';
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        }
      });
    }

    window.addEventListener('DOMContentLoaded', function() {
      // Small delay to ensure browser DOM is fully rendered
      setTimeout(autoLaunchApp, 350);
    });
  </script>
</head>
<body>
  <div class="container">
    <img src="/logo-round.png" alt="Pocket Advisor" class="logo" />
    <div class="badge">👥 Group Expense Invitation</div>
    <h1>You're Invited to Join!</h1>
    <p class="sub">Collaborate on group expenses, split restaurant bills, and track settlements seamlessly.</p>

    ${code ? `
    <div class="code-box">
      <div>
        <div class="code-label">Invite Code</div>
        <div class="code-value">${escapeHtml(code)}</div>
      </div>
      <button class="btn-copy" id="copyBtn" onclick="copyCode()">Copy</button>
    </div>
    ` : ''}

    <div class="actions">
      <a href="${escapeHtml(appSchemeUrl)}" class="btn-primary" onclick="window.location.href=schemeUrl; return false;">
        <span>Open in Pocket Advisor</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      </a>

      <a href="${escapeHtml(playStoreUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a2.383 2.383 0 0 1-.61-.715V2.53c.175-.285.385-.53.61-.716zm11.235 11.238l2.58 2.58-12.756 7.365 10.176-9.945zm0-2.104L4.668.997l12.756 7.365-2.58 2.586zm1.484 1.484l3.633 2.1a1.866 1.866 0 0 0 0-3.232l-3.633 2.132z"/></svg>
        <span>Get on Google Play</span>
      </a>
    </div>

    <div class="steps">
      <div class="steps-title">How to join manually:</div>
      <div class="step-item"><span class="step-num">1.</span><span>Open Pocket Advisor on your phone</span></div>
      <div class="step-item"><span class="step-num">2.</span><span>Go to <strong>Splits</strong> tab and tap <strong>"+"</strong></span></div>
      <div class="step-item"><span class="step-num">3.</span><span>Tap <strong>Join with Invite Code</strong> & enter: <strong>${escapeHtml(code || 'YOUR CODE')}</strong></span></div>
    </div>

    <div class="footer">
      Powered by <a href="/">Pocket Advisor</a> • Automated SMS & Split Expense Tracker
    </div>
  </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  return res.status(200).send(html);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
