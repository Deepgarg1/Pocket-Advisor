/**
 * Rich Pre-rendered Content Provider for Pocket Advisor Web
 * Injects substantive, accessible, and indexable static HTML into pre-rendered pages.
 * Ensures Googlebot indexes full articles, calculators, FAQs, and policies
 * without flagging "Thin Content" or "Soft 404".
 */

export function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function getPrerenderFaqHtml(faqSchema) {
  if (!faqSchema || !faqSchema.mainEntity || faqSchema.mainEntity.length === 0) {
    return '';
  }

  const itemsHtml = faqSchema.mainEntity
    .map(
      (q) => `
      <div style="background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 14px; padding: 20px 22px; margin-bottom: 14px;">
        <h3 style="font-size: 1.05rem; font-weight: 700; color: #f8fafc; margin: 0 0 10px 0;">${escapeHtml(q.name)}</h3>
        <p style="margin: 0; color: #cbd5e1; line-height: 1.65; font-size: 0.94rem;">${escapeHtml(q.acceptedAnswer.text)}</p>
      </div>`
    )
    .join('');

  return `
    <section style="max-width: 860px; margin: 40px auto 60px; padding: 0 24px; width: 100%;">
      <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 24px; text-align: center; color: #f8fafc;">
        Frequently Asked Questions
      </h2>
      <div>
        ${itemsHtml}
      </div>
    </section>`;
}

export function getPrerenderFooterHtml() {
  return `
    <footer style="border-top: 1px solid rgba(255, 255, 255, 0.08); background: #0c121e; padding: 50px 24px 36px; margin-top: auto; font-size: 0.9rem; color: #94a3b8;">
      <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 36px;">
        <div>
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
            <img src="/logo.webp" alt="Pocket Advisor" width="32" height="32" style="border-radius: 8px; display: block;" />
            <span style="font-size: 1.15rem; font-weight: 800; color: #f8fafc;">Pocket Advisor</span>
          </div>
          <p style="font-size: 0.85rem; line-height: 1.6; color: #94a3b8; margin: 0 0 16px 0;">
            Minimalist, intelligent spending &amp; budget tracking for Android. Automatic bank &amp; UPI detection with 100% offline-first SQLCipher encryption.
          </p>
          <div style="font-size: 0.8rem; color: #10b981; font-weight: 600;">SQLCipher AES-256 On-Device Encryption</div>
        </div>

        <div>
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #f8fafc; margin: 0 0 14px 0;">Calculators &amp; Tools</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
            <li><a href="/split" style="color: #cbd5e1; text-decoration: none;">Free Quick Bill Splitter</a></li>
            <li><a href="/flatmates-rent-splitter" style="color: #cbd5e1; text-decoration: none;">Flatmates Rent Splitter</a></li>
            <li><a href="/home-loan-prepayment-vs-sip" style="color: #cbd5e1; text-decoration: none;">Home Loan Prepayment vs SIP</a></li>
            <li><a href="/sip-calculator" style="color: #cbd5e1; text-decoration: none;">Step-Up SIP Calculator</a></li>
            <li><a href="/emi-calculator" style="color: #cbd5e1; text-decoration: none;">Loan EMI Amortization</a></li>
            <li><a href="/calculators" style="color: #cbd5e1; text-decoration: none;">All Financial Tools</a></li>
          </ul>
        </div>

        <div>
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #f8fafc; margin: 0 0 14px 0;">Guides &amp; Engineering</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
            <li><a href="/guides" style="color: #cbd5e1; text-decoration: none;">Financial Guides Hub</a></li>
            <li><a href="/how-to-split-rent-unequal-rooms" style="color: #cbd5e1; text-decoration: none;">Unequal Room Rent Split</a></li>
            <li><a href="/home-loan-prepayment-vs-mutual-funds" style="color: #cbd5e1; text-decoration: none;">Prepayment vs Mutual Funds</a></li>
            <li><a href="/how-to-track-upi-payments-automatically" style="color: #cbd5e1; text-decoration: none;">Private UPI Auto-Tracking</a></li>
            <li><a href="/news" style="color: #cbd5e1; text-decoration: none;">Engineering Blog</a></li>
          </ul>
        </div>

        <div>
          <h4 style="font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #f8fafc; margin: 0 0 14px 0;">App &amp; Legal</h4>
          <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px;">
            <li><a href="/features" style="color: #cbd5e1; text-decoration: none;">Features &amp; Security</a></li>
            <li><a href="/upi-expense-tracker" style="color: #cbd5e1; text-decoration: none;">UPI Expense Tracker (India)</a></li>
            <li><a href="/download" style="color: #cbd5e1; text-decoration: none;">Download Android App</a></li>
            <li><a href="/faq" style="color: #cbd5e1; text-decoration: none;">Frequently Asked Questions</a></li>
            <li><a href="/privacy" style="color: #cbd5e1; text-decoration: none;">Privacy Policy</a></li>
            <li><a href="/terms" style="color: #cbd5e1; text-decoration: none;">Terms of Service</a></li>
            <li><a href="/refund" style="color: #cbd5e1; text-decoration: none;">Cancellation &amp; Refund Policy</a></li>
            <li><a href="/contact" style="color: #cbd5e1; text-decoration: none;">Contact &amp; Support</a></li>
            <li><a href="/delete-account" style="color: #cbd5e1; text-decoration: none;">Delete Account</a></li>
          </ul>
        </div>
      </div>

      <div style="max-width: 1200px; margin: 36px auto 0; padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center; font-size: 0.8rem; color: #64748b;">
        &copy; 2026 Pocket Advisor. Built with privacy-first engineering. All rights reserved.
      </div>
    </footer>`;
}

export function getRouteBodyContent(slug) {
  const contentStyle = `max-width: 860px; margin: 0 auto; padding: 0 24px 40px; color: #cbd5e1; line-height: 1.75; font-size: 1rem;`;
  const headingStyle = `color: #f8fafc; font-weight: 800; margin: 36px 0 16px 0; font-size: 1.45rem; letter-spacing: -0.01em;`;
  const cardStyle = `background: rgba(17, 24, 39, 0.75); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin: 24px 0;`;

  switch (slug) {
    case 'how-to-split-rent-unequal-rooms':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">The Problem: Why Equal 50/50 Splits Cause Roommate Conflict</h2>
            <p>
              Splitting flat rent 50/50 when one roommate gets a 220 sq ft master bedroom with a private attached bathroom and balcony, while the other gets a 130 sq ft room with a shared hallway bath, is mathematically unfair. Over a 12-month lease, this imbalance builds resentment and damages friendships.
            </p>
          </div>

          <h2 style="${headingStyle}">The 2-Pool Mathematical Solution: 50% Common Space + 50% Private Space</h2>
          <p>
            Professional property managers and financial engineers use the <strong>Two-Pool Framework</strong>:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 20px;">
            <li><strong>Pool 1: Shared Common Space (50% of Rent)</strong> — The living room, kitchen, dining area, utility balcony, and shared hallways are used equally by everyone. Split this 50% pool strictly by headcount.</li>
            <li><strong>Pool 2: Private Bedroom Space (50% of Rent)</strong> — The private quarters. Split this pool proportionally based on measured bedroom square footage, plus an attached bathroom premium.</li>
          </ul>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.2rem; font-weight: 700; color: #f8fafc; margin-top: 0;">Step-by-Step 2BHK Walkthrough: Total Rent ₹30,000</h3>
            <p><strong>Apartment Specifications:</strong></p>
            <ul style="padding-left: 20px;">
              <li><strong>Room A (Master Bedroom):</strong> 200 sq ft + Attached Ensuite Bath (weighted as +30 sq ft) = 230 weighted sq ft</li>
              <li><strong>Room B (Smaller Bedroom):</strong> 130 sq ft + Shared Hallway Bath = 130 sq ft</li>
              <li><strong>Total Weighted Private Space:</strong> 360 sq ft</li>
            </ul>
            <p style="margin-top: 14px;"><strong>Calculation:</strong></p>
            <ol style="padding-left: 20px;">
              <li><strong>Common Space Pool (₹15,000):</strong> Split equally = ₹7,500 each.</li>
              <li><strong>Private Space Pool (₹15,000):</strong>
                <ul style="padding-left: 20px; margin-top: 6px;">
                  <li>Room A Share: (230 / 360) &times; ₹15,000 = <strong>₹9,583</strong></li>
                  <li>Room B Share: (130 / 360) &times; ₹15,000 = <strong>₹5,417</strong></li>
                </ul>
              </li>
              <li><strong>Final Fair Rent:</strong>
                <ul style="padding-left: 20px; margin-top: 6px;">
                  <li><strong>Roommate A (Master):</strong> ₹7,500 + ₹9,583 = <strong style="color: #818cf8;">₹17,083 (56.9%)</strong></li>
                  <li><strong>Roommate B (Small):</strong> ₹7,500 + ₹5,417 = <strong style="color: #34d399;">₹12,917 (43.1%)</strong></li>
                </ul>
              </li>
            </ol>
          </div>

          <h2 style="${headingStyle}">4 Golden Rules for Flatmate Harmony</h2>
          <ol style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Shared Utility Bills:</strong> Electricity, WiFi, maid salaries, water, and cooking gas should always be split 100% equally per capita, regardless of bedroom size.</li>
            <li><strong>Guest Policies:</strong> If a roommate hosts a partner or family member for more than 10 days in a month, prorate their utility share.</li>
            <li><strong>1-Tap UPI Settlements:</strong> Avoid delays by using Pocket Advisor's Flatmates Rent Splitter to generate WhatsApp receipts with direct UPI links.</li>
            <li><strong>Re-Evaluate Semi-Annually:</strong> Review utility spikes (AC during summer) to adjust budgets transparently.</li>
          </ol>

          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 14px; padding: 20px; margin: 30px 0;">
            <div style="font-weight: 700; color: #818cf8; margin-bottom: 6px;">Author Attribution</div>
            <div style="font-size: 0.92rem; color: #cbd5e1;">Authored by the Pocket Advisor Financial Engineering Team. Published September 2026. Verified for rental regulations in India.</div>
          </div>
        </article>`;

    case 'home-loan-prepayment-vs-mutual-funds':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">The Dilemma: Prepay Home Loan Principal vs Invest in Mutual Fund SIPs</h2>
            <p>
              When you have surplus savings each month, should you prepay your home loan principal or invest in an equity mutual fund SIP? Prepaying your home loan gives you a <strong>guaranteed, risk-free return</strong> equal to your loan interest rate (8.5% - 9.5%), while equity SIPs historically compound at <strong>12% - 15% CAGR</strong> over 10+ year horizons.
            </p>
          </div>

          <h2 style="${headingStyle}">Comparing Guaranteed Debt Savings vs Market Compounding</h2>
          <div style="overflow-x: auto; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.92rem;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); color: #f8fafc;">
                  <th style="padding: 12px 10px;">Factor</th>
                  <th style="padding: 12px 10px;">Home Loan Prepayment</th>
                  <th style="padding: 12px 10px;">Equity Mutual Fund SIP</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Expected Return</td>
                  <td style="padding: 10px;">Guaranteed ~8.50% (loan rate)</td>
                  <td style="padding: 10px;">Market-linked ~12.0% - 14.0%</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Risk Level</td>
                  <td style="padding: 10px; color: #34d399;">Zero Risk (Guaranteed)</td>
                  <td style="padding: 10px; color: #fbbf24;">Moderate / Market Volatile</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Liquidity</td>
                  <td style="padding: 10px;">Low (Tied in real estate)</td>
                  <td style="padding: 10px; color: #34d399;">High (Redeemable in T+2 days)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Tax Impact (Old Regime)</td>
                  <td style="padding: 10px;">May reduce Sec 24b deduction</td>
                  <td style="padding: 10px;">12.5% LTCG above ₹1.25 Lakh</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Psychological Benefit</td>
                  <td style="padding: 10px; color: #818cf8;">Peace of mind (debt free)</td>
                  <td style="padding: 10px;">Wealth creation &amp; milestone growth</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">The 50:50 Hybrid Strategy: The Optimal Balanced Choice</h2>
          <p>
            Rather than making an all-or-nothing choice, financial engineers recommend the <strong>50:50 Hybrid Strategy</strong>:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 20px;">
            <li><strong>50% Surplus towards Loan Principal:</strong> Reduces the outstanding loan tenure, saves lacs of rupees in compounding interest, and insulates you against rising RBI repo interest rate cycles.</li>
            <li><strong>50% Surplus into Equity Mutual Fund SIP:</strong> Builds an untouchable, liquid multi-crore investment portfolio that outpaces inflation and preserves cash liquidity for medical emergencies or job transitions.</li>
          </ul>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin-top: 0;">Tax Reality: Section 24b Under Old vs New Tax Regime</h3>
            <p>
              Under the <strong>Old Tax Regime</strong>, up to ₹2,00,000 per financial year in home loan interest is deductible under Section 24b. If you prepay aggressively, your annual interest may drop below this cap, reducing your tax savings. However, under the <strong>New Tax Regime</strong> (default in India), Section 24b deductions for self-occupied homes are eliminated entirely, meaning your effective borrowing rate is the full nominal loan rate (~8.50% - 9.00%), dramatically increasing the benefit of prepaying.
            </p>
          </div>

          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 14px; padding: 20px; margin: 30px 0;">
            <div style="font-weight: 700; color: #818cf8; margin-bottom: 6px;">Author Attribution</div>
            <div style="font-size: 0.92rem; color: #cbd5e1;">Authored by the Pocket Advisor Financial Engineering Team. Updated October 2026.</div>
          </div>
        </article>`;

    case 'how-to-track-upi-payments-automatically':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Why 80% of People Abandon Manual Expense Tracking Within 14 Days</h2>
            <p>
              Typing every single ₹20 tea, ₹150 auto rickshaw ride, and ₹400 grocery UPI payment into an expense app requires superhuman discipline. Within two weeks, transaction logs fall behind, balances drift, and users give up completely.
            </p>
          </div>

          <h2 style="${headingStyle}">The Problem with Cloud-Based Trackers: Privacy and Security Risks</h2>
          <p>
            Many expense tracking apps claim to solve this by requesting your <strong>Netbanking credentials</strong> or by uploading all your incoming text messages to remote cloud servers. This exposes users to serious risks:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 20px;">
            <li>Third-party cloud servers can be breached, exposing your account balances and transaction habits.</li>
            <li>Screen scraping and credential sharing violate bank terms of service.</li>
            <li>Uploading financial SMS alerts creates centralized surveillance targets.</li>
          </ul>

          <h2 style="${headingStyle}">The Pocket Advisor Solution: 100% On-Device Deterministic Parsing</h2>
          <p>
            Pocket Advisor was built from the ground up on a <strong>Zero-Trust Architecture</strong>:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 20px;">
            <li><strong>Deterministic On-Device Regex:</strong> Ingests incoming SMS alerts from verified banking senders (HDFC, SBI, ICICI, Axis, Kotak, Bandhan, PhonePe, Google Pay, Paytm) directly inside Android process memory.</li>
            <li><strong>Strict In-Memory OTP Scrubbing:</strong> One-Time Passwords (OTPs), personal conversations, and non-financial text messages are discarded in volatile memory within milliseconds.</li>
            <li><strong>SQLCipher AES-256 Encryption:</strong> Your transactions and budgets are saved to an offline SQLite database encrypted with 256-bit keys that never leave your device.</li>
            <li><strong>Zero Cloud Telemetry:</strong> All categorization, charts, and budget limits execute locally on your phone CPU with zero internet connection required.</li>
          </ul>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin-top: 0;">Google Play Compliance &amp; Security Verification</h3>
            <p>
              Pocket Advisor complies strictly with Google Play's <strong>Financial Money Management Exception</strong> policy. SMS permissions are strictly restricted to on-device parsing of banking transaction alerts, with no external server transmission.
            </p>
          </div>

          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 14px; padding: 20px; margin: 30px 0;">
            <div style="font-weight: 700; color: #818cf8; margin-bottom: 6px;">Author Attribution</div>
            <div style="font-size: 0.92rem; color: #cbd5e1;">Authored by the Pocket Advisor Security Engineering Team. Updated October 2026.</div>
          </div>
        </article>`;

    case 'best-expense-tracker-apps-india':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">The 30-Second Summary: Which Category Fits Your Needs?</h2>
            <p>
              Tracking everyday personal expenses in India requires a completely different approach than in the US or Europe. With over 15 billion monthly UPI transactions, entering expenses manually becomes unsustainable within two weeks. Picking an expense tracker in India comes down to which underlying technical architecture and business model matches your daily habits:
            </p>
            <ul style="padding-left: 20px; margin-top: 10px;">
              <li><strong>Category 1: Offline-First SMS Trackers with Optional Cloud Sync (e.g. Pocket Advisor):</strong> Parses bank &amp; UPI SMS locally on-device with SQLCipher AES-256 encryption. Operates 100% offline-first, offers optional encrypted cloud backup for multi-device sync, and includes bill splitting. Ad-supported free tier with optional ad-free Pro upgrade; zero loan telemarketing. (Android only).</li>
              <li><strong>Category 2: Account Aggregator Apps (e.g. Fold Money):</strong> Connects to banks via the RBI-regulated Account Aggregator framework with OTP consent. Cross-platform (iOS &amp; Android) with zero SMS access. Requires an annual subscription fee (~₹1,500+/yr).</li>
              <li><strong>Category 3: Cloud FinTech &amp; Credit Marketplaces (e.g. Moneyview, Axio):</strong> Syncs SMS and bank transactions to corporate cloud databases to offer instant personal loans, credit lines, and free credit score updates. Expect frequent in-app loan marketing.</li>
              <li><strong>Category 4: Manual Web &amp; Desktop Ledgers (e.g. Mera Kharcha):</strong> Manual budgeting accessible on laptop/desktop web browsers and mobile apps. Requires ongoing entry discipline; free tier includes ads.</li>
            </ul>
          </div>

          <h2 style="${headingStyle}">Why Personal Finance in India is Architecturally Unique: The 4 Core Models</h2>
          <p>
            Because Open Banking APIs like Plaid do not exist in India for consumer apps, expense trackers have evolved into four distinct architectural approaches:
          </p>
          <ol style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>On-Device Deterministic Regex Parsing (e.g. Pocket Advisor):</strong> Intercepts bank transactional SMS on your Android phone, parses the amount and merchant using local regex patterns, and commits records to an encrypted on-device database (SQLCipher AES-256). Works 100% offline, with optional encrypted cloud backup for multi-device sync.</li>
            <li><strong>The RBI Account Aggregator (AA) Framework (e.g. Fold):</strong> Connects directly to bank servers using RBI-regulated NBFC-AA intermediaries with explicit user OTP consent. Works on iOS, but relies on bank server uptime and involves recurring API query costs funded via subscriptions.</li>
            <li><strong>Cloud FinTech &amp; Credit Underwriting Marketplaces (e.g. Moneyview, Axio):</strong> Reads SMS messages and uploads transaction logs to corporate cloud databases to underwrite personal loans, credit cards, and Buy Now Pay Later lines.</li>
            <li><strong>Manual Web &amp; Desktop Ledgers (e.g. Mera Kharcha):</strong> Focuses on deliberate manual logging across desktop web browsers and mobile apps, avoiding permission sensitivities at the cost of manual effort.</li>
          </ol>

          <h2 style="${headingStyle}">Architectural Category Comparison Matrix (October 2026)</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; min-width: 760px; border-collapse: collapse; text-align: left; font-size: 0.88rem;">
              <thead>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.15); color: #f8fafc;">
                  <th style="padding: 12px 10px;">Metric</th>
                  <th style="padding: 12px 10px; color: #818cf8;">Offline-First SMS (e.g. Pocket Advisor)</th>
                  <th style="padding: 12px 10px;">Account Aggregator (e.g. Fold)</th>
                  <th style="padding: 12px 10px;">Cloud Credit Hubs (e.g. Moneyview, Axio)</th>
                  <th style="padding: 12px 10px;">Manual Web Tools (e.g. Mera Kharcha)</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Tracking Engine</td>
                  <td style="padding: 10px; color: #34d399;">On-Device SMS Regex (Android)</td>
                  <td style="padding: 10px;">RBI Account Aggregator APIs</td>
                  <td style="padding: 10px;">Cloud-Parsed SMS &amp; Statements</td>
                  <td style="padding: 10px;">Manual Entry (+ basic SMS)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Data Storage &amp; Sync</td>
                  <td style="padding: 10px; color: #34d399;">Local SQLCipher + Optional Cloud Backup</td>
                  <td style="padding: 10px;">Cloud Database</td>
                  <td style="padding: 10px; color: #f87171;">Cloud Underwriting DB</td>
                  <td style="padding: 10px;">Cloud Database</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Bank Login / OTP</td>
                  <td style="padding: 10px; color: #34d399;">Zero Logins (Local SMS Filter)</td>
                  <td style="padding: 10px;">Phone OTP + RBI AA Consent</td>
                  <td style="padding: 10px; color: #fbbf24;">Phone OTP + Cloud SMS Permissions</td>
                  <td style="padding: 10px;">User Email / Password</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Monetization &amp; Ads</td>
                  <td style="padding: 10px; color: #818cf8;">Ad-Supported Free / Optional Ad-Free Pro</td>
                  <td style="padding: 10px;">Paid Subscription (~₹1,500–₹2,500/yr)</td>
                  <td style="padding: 10px; color: #fbbf24;">Free (Monetized via Personal Loans/Cards)</td>
                  <td style="padding: 10px;">Free with Ads / Pro Upgrade</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Loan Telemarketing?</td>
                  <td style="padding: 10px; color: #34d399;">Zero Loan Sales / No NBFC Sharing</td>
                  <td style="padding: 10px; color: #34d399;">Zero Loan Sales (Subscription model)</td>
                  <td style="padding: 10px; color: #f87171;">Frequent In-App Loan &amp; Card Prompts</td>
                  <td style="padding: 10px; color: #34d399;">No Loan Sales</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Group Bill Splitting</td>
                  <td style="padding: 10px; color: #818cf8;">Built-in 2-Stage Greedy Debt Minimization</td>
                  <td style="padding: 10px; color: #94a3b8;">Not Available</td>
                  <td style="padding: 10px; color: #94a3b8;">Basic or Bill Reminders</td>
                  <td style="padding: 10px;">Basic Group Ledger</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.06);">
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Works Offline?</td>
                  <td style="padding: 10px; color: #34d399;">100% Functional Without Internet</td>
                  <td style="padding: 10px; color: #f87171;">No (Requires Active AA Server)</td>
                  <td style="padding: 10px;">Partial (Requires Cloud Sync)</td>
                  <td style="padding: 10px;">Partial (Requires Web Connection)</td>
                </tr>
                <tr>
                  <td style="padding: 10px; font-weight: 600; color: #f8fafc;">Supported Platforms</td>
                  <td style="padding: 10px; color: #818cf8;">Android Native + Free Web Tools</td>
                  <td style="padding: 10px;">Android + iOS</td>
                  <td style="padding: 10px;">Android + iOS</td>
                  <td style="padding: 10px;">Desktop Web + Android + iOS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">In-Depth Analysis of Each Architecture</h2>
          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;">Category 1: Offline-First SMS Trackers with Optional Cloud Sync (e.g. Pocket Advisor)</h3>
            <p>
              Focuses on data ownership and speed. Pocket Advisor parses transaction SMS alerts from 15+ Indian banks and UPI applications (Google Pay, PhonePe, Paytm, BHIM) locally on-device. Data is stored in a local SQLCipher AES-256 encrypted database. Users who want seamless synchronization across devices or backup protection can enable optional encrypted Cloud Backup (powered by Supabase).
            </p>
            <p><strong>Key Strengths:</strong> 100% offline-first functionality, local SQLCipher AES-256 database encryption, optional encrypted cloud backup for multi-device sync, integrated 2-stage greedy debt minimization for group expenses, and zero loan telemarketing calls or NBFC data sharing.</p>
            <p><strong>Realistic Trade-offs:</strong> Free tier includes standard display ads (removable via optional Pro upgrade); automated SMS parsing is Android-only due to Apple iOS sandbox restrictions.</p>
          </div>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #38bdf8; margin-top: 0;">Category 2: RBI Account Aggregator Apps (e.g. Fold Money)</h3>
            <p>
              Connects directly to bank accounts via the RBI Account Aggregator framework. Users give OTP consent to fetch account balances and statements directly from participating banks, eliminating the need to read SMS text messages.
            </p>
            <p><strong>Key Strengths:</strong> Works on both iOS and Android with identical feature sets; direct bank server connection with zero SMS permissions required; modern, clutter-free user interface with zero advertising.</p>
            <p><strong>Realistic Trade-offs:</strong> Requires a recurring annual paid subscription (~₹1,500 – ₹2,500/year); dependent on bank API uptimes; does not support group debt minimization.</p>
          </div>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #fbbf24; margin-top: 0;">Category 3: Cloud FinTech &amp; Credit Marketplaces (e.g. Moneyview, Axio)</h3>
            <p>
              Pairs SMS and statement expense tracking with credit line services. Provides real-time balance overviews, credit card due date alerts, and free monthly credit bureau score checks, funded primarily through digital lending products.
            </p>
            <p><strong>Key Strengths:</strong> Free monthly CIBIL/Experian credit score tracking; fast pre-approved personal loans; mature credit card statement cycle tracking.</p>
            <p><strong>Realistic Trade-offs:</strong> Financial records hosted on corporate cloud databases for credit underwriting; frequent in-app loan banners and telemarketing notifications.</p>
          </div>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #a78bfa; margin-top: 0;">Category 4: Manual Web &amp; Desktop Ledgers (e.g. Mera Kharcha)</h3>
            <p>
              Focuses on deliberate manual logging across desktop web browsers and mobile apps. Ideal for users who prefer doing their budgeting at an office desk or laptop browser without installing mobile applications.
            </p>
            <p><strong>Key Strengths:</strong> Accessible on any desktop browser without mobile device dependency; zero mobile SMS permissions required; intuitive interface for manual household accounting.</p>
            <p><strong>Realistic Trade-offs:</strong> Requires ongoing manual entry discipline; financial records hosted on remote cloud databases; free tier displays banner ads.</p>
          </div>

          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Decision Framework: Which Architecture Matches You?</h2>
            <ul style="padding-left: 20px; line-height: 1.8;">
              <li><strong>Offline-First SMS Tracker (e.g. Pocket Advisor):</strong> Best if you want automated UPI tracking, zero loan telemarketing calls, on-device encryption, optional cloud backup, and group bill splitting.</li>
              <li><strong>Account Aggregator App (e.g. Fold Money):</strong> Best if you use an iPhone and are comfortable paying an annual subscription for direct bank API connectivity.</li>
              <li><strong>Cloud Credit Marketplace (e.g. Moneyview, Axio):</strong> Best if you actively need credit score tracking and access to pre-approved personal loans.</li>
              <li><strong>Manual Web Tool (e.g. Mera Kharcha):</strong> Best if you prefer entering income and expense numbers manually on a desktop computer.</li>
            </ul>
          </div>

          <div style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 16px; margin: 24px 0; font-size: 0.82rem; color: #94a3b8; line-height: 1.6;">
            <strong>Trademark &amp; Fair Use Notice:</strong> All product names, logos, trademarks, and registered trademarks mentioned (including Pocket Advisor, Fold, Moneyview, Axio, Walnut, Mera Kharcha, and Splitwise) are property of their respective owners. Their use in this guide is strictly for nominative fair use to provide factual, comparative education on personal finance technologies in India. Information verified as of October 2026.
          </div>

          <div style="background: rgba(99, 102, 241, 0.12); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 14px; padding: 20px; margin: 30px 0;">
            <div style="font-weight: 700; color: #818cf8; margin-bottom: 6px;">Editorial Standards &amp; Attribution</div>
            <div style="font-size: 0.92rem; color: #cbd5e1;">Authored by the Pocket Advisor Financial Engineering Team. Updated October 2026. Researched independently across active Android and iOS personal finance architectures in India.</div>
          </div>
        </article>`;

    case 'split':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Interactive Web Bill Splitter &amp; Group Debt Simplifier</h2>
            <p>
              Split group dinners, weekend road trips, vacation Airbnb stays, and flatmate groceries with mathematical precision. Our <strong>2-stage greedy debt minimization algorithm</strong> resolves tangled group debts into the absolute minimum bilateral payments, eliminating messy transfers where everyone owes each other.
            </p>
          </div>

          <h2 style="${headingStyle}">How to Use the Free Bill Splitter</h2>
          <ol style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Add Group Members:</strong> Enter the names of everyone involved in the outing or trip.</li>
            <li><strong>Log Expenses:</strong> Enter each bill, specify who paid, and select who participated in that expense.</li>
            <li><strong>Calculate Tax &amp; Tip:</strong> Add itemized GST, service charges, or delivery tips to distribute them proportionally.</li>
            <li><strong>1-Tap Debt Simplification:</strong> Pocket Advisor resolves net balances into the fewest possible payments.</li>
            <li><strong>Export WhatsApp Receipts:</strong> Generate an itemized text summary with 1-tap UPI deep links for instant settlement.</li>
          </ol>

          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin-top: 0;">Why Greedy Graph Debt Reduction Beats Traditional Splits</h3>
            <p>
              In a group of 6 friends with 15 shared receipts, standard expense tracking requires up to 15 separate transfers. Pocket Advisor calculates each person's net balance (total paid minus total consumed) and greedily matches the largest creditor with the largest debtor. This reduces 15 transfers to just 3 to 4 direct payments with zero remaining debt.
            </p>
          </div>
        </div>`;

    case 'flatmates-rent-splitter':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Roommate Rent, Utility &amp; Maid Bill Splitter</h2>
            <p>
              Fairly divide apartment rent, electricity bills, maid salaries, cook fees, grocery kitties, and high-speed WiFi among flatmates. Factors in bedroom size differences, ensuite bathrooms, and equal per-capita utility sharing.
            </p>
          </div>

          <h2 style="${headingStyle}">Key Features for Shared Living</h2>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Unequal Room Size Math:</strong> Splits rent into 50% shared living pool and 50% private bedroom pool based on square footage.</li>
            <li><strong>Attached Bathroom Weighting:</strong> Automatically applies an equitable premium for ensuite master bathrooms.</li>
            <li><strong>Recurring Utility Ledger:</strong> Track monthly recurring expenses (WiFi, maid, cook, water cans) separately from variable grocery splits.</li>
            <li><strong>1-Tap UPI Deep Links:</strong> WhatsApp settlement receipts include pre-filled UPI links so flatmates settle in seconds via PhonePe, GPay, or Paytm.</li>
          </ul>
        </div>`;

    case 'home-loan-prepayment-vs-sip':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Home Loan Prepayment vs. Equity SIP Decision Simulator</h2>
            <p>
              Evaluate whether your monthly surplus money is better spent prepaying your home loan principal or compounding in an equity mutual fund SIP. Analyzes interest saved, tenure reduction, compounding SIP corpus, Section 24b tax bracket adjustments, and 50:50 hybrid wealth strategies.
            </p>
          </div>

          <h2 style="${headingStyle}">What This Simulator Calculates</h2>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Total Interest Saved:</strong> How much interest you eliminate by making regular principal prepayments.</li>
            <li><strong>Tenure Reduction:</strong> How many years and months your home loan tenure is shortened.</li>
            <li><strong>Projected SIP Wealth:</strong> The compounding future value of directing that same surplus cash into equity mutual funds at 12% - 14% CAGR.</li>
            <li><strong>Post-Tax Comparison:</strong> Adjusts for Section 24b home loan interest deductions under the Old Tax Regime vs New Tax Regime.</li>
            <li><strong>50:50 Hybrid Projection:</strong> Compares the balanced approach of prepaying 50% and investing 50% simultaneously.</li>
          </ul>
        </div>`;

    case 'sip-calculator':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Step-Up SIP Wealth Planner with Real Inflation Discounting</h2>
            <p>
              Plan your long-term wealth creation with mutual fund Systematic Investment Plans (SIP). Unlike basic calculators, Pocket Advisor models <strong>annual salary step-ups (5% - 15%)</strong> and <strong>inflation discounting</strong> to project your true future purchasing power.
            </p>
          </div>

          <h2 style="${headingStyle}">The Compounding Advantage of Step-Up Contributions</h2>
          <p>
            As your career advances and income rises, increasing your SIP contribution by just 10% each year can more than double your 20-year wealth corpus compared to a flat monthly investment. Pocket Advisor models your compounding journey year by year.
          </p>
          <div style="${cardStyle}">
            <h3 style="font-size: 1.15rem; font-weight: 700; color: #f8fafc; margin-top: 0;">Inflation Adjustment Formula</h3>
            <p>
              At an average annual inflation rate of 6%, a ₹1 Crore corpus in 20 years will have the purchasing power of approximately ₹31.18 Lakhs today. Pocket Advisor calculates both nominal maturity corpus and inflation-discounted real value so your financial goals remain realistic.
            </p>
          </div>
        </div>`;

    case 'emi-calculator':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Loan EMI &amp; Amortization Schedule Calculator</h2>
            <p>
              Calculate your exact monthly Equated Monthly Installment (EMI), total interest payable, and year-by-year principal vs. interest amortization breakdown for home loans, auto loans, and personal loans in India.
            </p>
          </div>

          <h2 style="${headingStyle}">Reducing Balance Amortization Methodology</h2>
          <p>
            Indian banks compute interest using the reducing balance method. Early installments consist predominantly of interest payments, with principal reduction accelerating during the latter half of the loan tenure. Pocket Advisor reveals your exact repayment schedule so you can identify the optimal time for prepayments.
          </p>
        </div>`;

    case 'calculators':
      return `
        <div style="${contentStyle}">
          <h2 style="${headingStyle} text-align: center; margin-top: 0;">Free Financial Calculators &amp; Group Expense Tools</h2>
          <p style="text-align: center; margin-bottom: 32px;">
            Interactive, mathematically verified financial decision tools. 100% free with zero login or personal data collection.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
            <div style="${cardStyle}">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;"><a href="/split" style="color: inherit; text-decoration: none;">Quick Bill Splitter &rarr;</a></h3>
              <p style="font-size: 0.92rem; margin: 0 0 14px 0;">2-stage greedy debt minimization for group dinners, road trips, and outings. 1-tap WhatsApp summary export.</p>
              <a href="/split" style="font-weight: 600; color: #818cf8; font-size: 0.88rem;">Open Bill Splitter</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;"><a href="/flatmates-rent-splitter" style="color: inherit; text-decoration: none;">Flatmates Rent Splitter &rarr;</a></h3>
              <p style="font-size: 0.92rem; margin: 0 0 14px 0;">Split rent, maid, WiFi, and electricity with square footage weighting and direct UPI settlement links.</p>
              <a href="/flatmates-rent-splitter" style="font-weight: 600; color: #818cf8; font-size: 0.88rem;">Split Roommate Bills</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;"><a href="/home-loan-prepayment-vs-sip" style="color: inherit; text-decoration: none;">Prepayment vs. SIP &rarr;</a></h3>
              <p style="font-size: 0.92rem; margin: 0 0 14px 0;">Compare guaranteed home loan interest savings against compounding mutual fund equity SIP wealth.</p>
              <a href="/home-loan-prepayment-vs-sip" style="font-weight: 600; color: #818cf8; font-size: 0.88rem;">Simulate Decisions</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;"><a href="/sip-calculator" style="color: inherit; text-decoration: none;">Step-Up SIP Planner &rarr;</a></h3>
              <p style="font-size: 0.92rem; margin: 0 0 14px 0;">Calculate compounding mutual fund wealth with annual salary step-ups and real inflation discounting.</p>
              <a href="/sip-calculator" style="font-weight: 600; color: #818cf8; font-size: 0.88rem;">Calculate Wealth</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.15rem; font-weight: 700; color: #818cf8; margin-top: 0;"><a href="/emi-calculator" style="color: inherit; text-decoration: none;">Loan EMI Amortization &rarr;</a></h3>
              <p style="font-size: 0.92rem; margin: 0 0 14px 0;">Calculate exact monthly EMIs, total interest payable, and year-by-year amortization schedules.</p>
              <a href="/emi-calculator" style="font-weight: 600; color: #818cf8; font-size: 0.88rem;">Calculate Loan EMI</a>
            </div>
          </div>
        </div>`;

    case 'features':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Pocket Advisor: Core Architecture &amp; Features</h2>
            <p>
              Pocket Advisor is natively designed for Android with an offline-first architecture. It delivers automated tracking and financial intelligence without sacrificing your personal privacy.
            </p>
          </div>

          <h2 style="${headingStyle}">1. Automatic On-Device Bank &amp; UPI Tracking</h2>
          <p>
            Deterministic regex engines detect incoming debit and credit transaction SMS alerts from HDFC, SBI, ICICI, Axis, Kotak, Bandhan, PhonePe, and Google Pay in real time. Runs 100% on-device under Google Play financial exceptions with zero server telemetry.
          </p>

          <h2 style="${headingStyle}">2. SQLCipher AES-256 Encrypted Local Ledger</h2>
          <p>
            Your transactions, account balances, and budget caps are encrypted with military-grade 256-bit AES database encryption. Data is stored on your device's internal storage and cannot be read by other applications.
          </p>

          <h2 style="${headingStyle}">3. Mathematical 2-Stage Group Debt Minimization</h2>
          <p>
            Split expenses with roommates and travel groups using bipartite graph greedy matching. Collapses entangled multilateral debts down to the fewest bilateral payments.
          </p>

          <h2 style="${headingStyle}">4. Interactive Home Screen Widgets</h2>
          <p>
            Monitor real-time monthly budget velocity, daily spending caps, and remaining category allocations directly from your Android home screen without launching the app.
          </p>
        </div>`;

    case 'upi-expense-tracker':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Automatic UPI Expense Tracking: Stop Logging Chai, Cabs, and Groceries by Hand</h2>
            <p>
              If you live in India, you probably make 15 to 25 UPI transactions every single day: ₹20 for morning tea, ₹120 for an auto ride, ₹350 on Blinkit or Zepto, ₹600 for lunch on Swiggy, and a couple of bill splits with friends in the evening.
            </p>
            <p style="margin-top: 12px;">
              Manually logging each one into a spreadsheet or budgeting app sounds great on paper, but almost everyone abandons it after three days. Pocket Advisor solves this by automatically reading your transactional bank SMS alerts directly on your Android phone — with <strong>zero cloud uploads</strong>, <strong>zero bank logins</strong>, and <strong>100% offline encryption</strong>.
            </p>
          </div>

          <h2 style="${headingStyle}">How On-Device SMS Tracking Works (Without Giving Away Your Passwords)</h2>
          <p>
            Whenever you scan a QR code or pay someone via Google Pay, PhonePe, Paytm, or CRED, your bank sends you a standard SMS alert (for example: <em>"Sent Rs. 385.00 from HDFC Bank A/C **4819 to SWIGGY UPI ref 418293817291..."</em>).
          </p>
          <p style="margin-top: 12px;">
            Here is what happens the instant that text message arrives:
          </p>
          <ol style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Local Broadcast Receiver:</strong> Pocket Advisor's Android service intercepts the incoming SMS right on your device processor.</li>
            <li><strong>Strict Regex Extraction:</strong> It parses only the amount (₹385), the merchant (Swiggy), the account last 4 digits (4819), and transaction type (Debit).</li>
            <li><strong>OTP and Sensitive Data Drop:</strong> Any message containing OTPs, login verification codes, or personal chats is instantly discarded. We never touch or store verification codes.</li>
            <li><strong>Automatic Categorization:</strong> The merchant name is matched locally to categories like Food &amp; Dining, Groceries, Transport, or Shopping.</li>
            <li><strong>Encrypted SQLite Ledger:</strong> The entry is saved directly to your local phone database, encrypted using 256-bit AES SQLCipher. It never leaves your phone.</li>
          </ol>

          <h2 style="${headingStyle}">Comparison: Pocket Advisor vs Traditional Tracking Methods</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 14px; text-align: left; color: #f8fafc;">Feature</th>
                  <th style="padding: 12px 14px; text-align: left; color: #f8fafc;">Manual Spreadsheets</th>
                  <th style="padding: 12px 14px; text-align: left; color: #f8fafc;">Cloud Finance Apps</th>
                  <th style="padding: 12px 14px; text-align: left; color: #f8fafc;">Pocket Advisor</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <td style="padding: 12px 14px; font-weight: 700;">Data Entry</td>
                  <td style="padding: 12px 14px;">Manual (typing 15+ times/day)</td>
                  <td style="padding: 12px 14px;">Cloud scraping / PDF uploads</td>
                  <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Automatic (100% on-device SMS)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <td style="padding: 12px 14px; font-weight: 700;">Financial Privacy</td>
                  <td style="padding: 12px 14px;">High (stored locally)</td>
                  <td style="padding: 12px 14px; color: #f87171;">Low (uploaded to servers for ad targeting)</td>
                  <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">100% Offline (Zero server telemetry)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <td style="padding: 12px 14px; font-weight: 700;">Bank Passwords Needed</td>
                  <td style="padding: 12px 14px;">None</td>
                  <td style="padding: 12px 14px; color: #f87171;">Often requested for scraping</td>
                  <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Never (Zero credentials requested)</td>
                </tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                  <td style="padding: 12px 14px; font-weight: 700;">Group Bill Splitting</td>
                  <td style="padding: 12px 14px;">Requires manual math</td>
                  <td style="padding: 12px 14px;">Separate tool required</td>
                  <td style="padding: 12px 14px; color: #c084fc; font-weight: 700;">Built-in 2-stage greedy debt solver</td>
                </tr>
                <tr>
                  <td style="padding: 12px 14px; font-weight: 700;">Ads &amp; Upsells</td>
                  <td style="padding: 12px 14px;">None</td>
                  <td style="padding: 12px 14px; color: #f87171;">Constant loan and credit card spam</td>
                  <td style="padding: 12px 14px; color: #34d399; font-weight: 700;">Zero advertisements</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">Handled Edge Cases: Refunds, Failed Payments, and RuPay Credit Cards</h2>
          <p>
            Real-world Indian banking has plenty of weird edge cases. Here is how Pocket Advisor handles them smoothly:
          </p>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>UPI Refunds &amp; Reversals:</strong> If a payment fails on Swiggy or Zomato and your bank credits it back 48 hours later, the app detects the reversal and offsets your original spending instead of treating the refund as new monthly salary.</li>
            <li><strong>Self-Transfers:</strong> Moving money between your SBI savings account and your HDFC salary account? The app identifies transfers between your own linked accounts so your total spend is not double-counted.</li>
            <li><strong>RuPay Credit Cards on UPI:</strong> Scanned a merchant QR code using a RuPay credit card? Pocket Advisor identifies the card account and categorizes it under credit spending while updating your payment cycle.</li>
          </ul>

          <h2 style="${headingStyle}">Supported Indian Banks &amp; UPI Apps</h2>
          <div style="${cardStyle}">
            <p style="margin: 0 0 12px 0;">
              Pocket Advisor parses standard transactional SMS alerts from all major Indian scheduled commercial banks:
            </p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;">
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">State Bank of India (SBI)</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">HDFC Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">ICICI Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Axis Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Kotak Mahindra Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Punjab National Bank (PNB)</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Bank of Baroda</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Canara Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">IndusInd Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">IDFC FIRST Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Bandhan Bank</span>
              <span style="background: rgba(99, 102, 241, 0.15); color: #818cf8; padding: 4px 10px; border-radius: 6px; font-size: 0.85rem; font-weight: 600;">Union Bank of India</span>
            </div>
            <p style="margin: 0; font-size: 0.9rem; color: #94a3b8;">
              Works seamlessly with all UPI client apps including <strong>Google Pay</strong>, <strong>PhonePe</strong>, <strong>Paytm</strong>, <strong>CRED</strong>, <strong>BHIM UPI</strong>, and <strong>Amazon Pay</strong>.
            </p>
          </div>

          <div style="${cardStyle} text-align: center; margin: 40px 0;">
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #f8fafc; margin-top: 0;">Try Pocket Advisor for Android</h3>
            <p style="font-size: 0.95rem; color: #94a3b8; margin: 8px 0 20px 0;">
              Get automatic expense tracking with complete peace of mind. Zero ads, zero cloud sync, and 100% on-device encryption.
            </p>
            <a href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #6366f1; color: #ffffff; padding: 13px 28px; border-radius: 12px; font-weight: 700; text-decoration: none; font-size: 0.95rem;">
              Download on Google Play &rarr;
            </a>
          </div>
        </article>`;

    case 'faq':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Pocket Advisor Knowledge Base</h2>
            <p>
              Find answers to commonly asked questions about Pocket Advisor's offline-first architecture, bank auto-detection security, mathematical bill splitting, and data ownership.
            </p>
          </div>
        </div>`;

    case 'guides':
      return `
        <div style="${contentStyle}">
          <h2 style="${headingStyle} text-align: center; margin-top: 0;">Financial Problem-Solving Guides</h2>
          <p style="text-align: center; margin-bottom: 36px;">
            In-depth financial engineering breakdowns solving real personal finance dilemmas.
          </p>

          <div style="display: flex; flex-direction: column; gap: 24px;">
            <div style="${cardStyle}">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #818cf8; margin-top: 0;">
                <a href="/how-to-split-rent-unequal-rooms" style="color: inherit; text-decoration: none;">How to Split Apartment Rent Fairly When Room Sizes Are Different &rarr;</a>
              </h3>
              <p style="font-size: 0.95rem; margin: 8px 0 16px 0;">
                Master bedroom vs. small bedroom: the mathematical 50/50 square-footage framework, attached bathroom weighting, and 1-tap WhatsApp settlements.
              </p>
              <a href="/how-to-split-rent-unequal-rooms" style="font-weight: 700; color: #818cf8; font-size: 0.9rem;">Read Full Guide &rarr;</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #818cf8; margin-top: 0;">
                <a href="/home-loan-prepayment-vs-mutual-funds" style="color: inherit; text-decoration: none;">Should You Prepay Your Home Loan or Invest in Mutual Funds? &rarr;</a>
              </h3>
              <p style="font-size: 0.95rem; margin: 8px 0 16px 0;">
                The 50:50 hybrid strategy explained: balancing guaranteed debt reduction with mutual fund compounding, Section 24b tax reality, and rising interest cycles.
              </p>
              <a href="/home-loan-prepayment-vs-mutual-funds" style="font-weight: 700; color: #818cf8; font-size: 0.9rem;">Read Full Guide &rarr;</a>
            </div>

            <div style="${cardStyle}">
              <h3 style="font-size: 1.25rem; font-weight: 700; color: #818cf8; margin-top: 0;">
                <a href="/how-to-track-upi-payments-automatically" style="color: inherit; text-decoration: none;">How to Track UPI Payments Automatically Without Giving Netbanking Credentials &rarr;</a>
              </h3>
              <p style="font-size: 0.95rem; margin: 8px 0 16px 0;">
                Why cloud-based expense trackers compromise privacy, and how Pocket Advisor uses 100% on-device SMS parsing under Google Play financial rules.
              </p>
              <a href="/how-to-track-upi-payments-automatically" style="font-weight: 700; color: #818cf8; font-size: 0.9rem;">Read Full Guide &rarr;</a>
            </div>
          </div>
        </div>`;

    case 'download':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Install Pocket Advisor for Android</h2>
            <p>
              Experience effortless, private personal finance management on Android. Automatically track UPI expenses, organize monthly budgets, and simplify group bills.
            </p>
          </div>

          <h2 style="${headingStyle}">System Requirements &amp; Compatibility</h2>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Operating System:</strong> Android 8.0 (Oreo) or higher</li>
            <li><strong>Storage Required:</strong> Less than 25 MB</li>
            <li><strong>Permissions:</strong> Optional SMS read permission for automatic bank &amp; UPI detection</li>
            <li><strong>Google Play Billing:</strong> Supported for optional ad-free Pro upgrades</li>
            <li><strong>Network Requirements:</strong> Fully functional offline</li>
          </ul>
        </div>`;

    case 'privacy':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Privacy Policy &amp; Security Architecture</h2>
            <p>Last updated: October 2026. Pocket Advisor is committed to complete transparency and absolute data privacy.</p>
          </div>

          <h2 style="${headingStyle}">1. 100% Offline-First Data Guarantee</h2>
          <p>
            Pocket Advisor operates with an offline-first architecture. All transaction logs, account balances, category totals, and budget limits are stored locally on your Android device in an encrypted SQLite database using SQLCipher AES-256 encryption. We do not transmit or store your spending data on external servers.
          </p>

          <h2 style="${headingStyle}">2. Financial SMS Processing Policy</h2>
          <p>
            When transaction auto-detection is enabled, Pocket Advisor inspects incoming SMS messages strictly on your local device under Google Play's Financial Money Management exception. Deterministic regex parses banking alert messages (HDFC, SBI, ICICI, Axis, Bandhan, etc.). OTPs and personal chats are instantly discarded in memory and never logged.
          </p>

          <h2 style="${headingStyle}">3. Cloud Sync &amp; Backups</h2>
          <p>
            If you optionally choose to sign in to backup your data, your records are transmitted over TLS 1.3 encryption to your private account and can be permanently deleted at any time via our self-service deletion portal.
          </p>

          <h2 style="${headingStyle}">4. Contact Privacy Officer</h2>
          <p>For questions regarding our privacy practices, contact us at <a href="mailto:privacy@pocketadvisor.in" style="color: #818cf8;">privacy@pocketadvisor.in</a>.</p>
        </article>`;

    case 'terms':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Terms and Conditions</h2>
            <p>Last updated: October 2026. Guidelines governing the use of the Pocket Advisor mobile application and web spending utilities.</p>
          </div>

          <h2 style="${headingStyle}">1. License and Permitted Use</h2>
          <p>
            Pocket Advisor grants you a personal, non-exclusive, non-transferable license to use the Android mobile application and web calculators for personal financial planning and expense tracking.
          </p>

          <h2 style="${headingStyle}">2. Disclaimer of Financial Advice</h2>
          <p>
            Pocket Advisor provides mathematical calculation tools and budget management utilities for informational purposes. Pocket Advisor is not a SEBI-registered investment advisor or financial institution. Calculation outputs from loan prepayment, SIP growth, and bill splitting tools do not constitute formal financial advice.
          </p>

          <h2 style="${headingStyle}">3. In-App Subscriptions &amp; Google Play Billing</h2>
          <p>
            In-app subscription upgrades (Pocket Advisor Pro) are processed strictly through Google Play Billing. Billing terms, renewal schedules, and cancellation rights are governed by Google Play's policies.
          </p>
        </article>`;

    case 'refund':
      return `
        <article style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Cancellation &amp; Refund Policy</h2>
            <p>Last updated: October 2026. Clear, transparent refund and cancellation policies for Pocket Advisor users.</p>
          </div>

          <h2 style="${headingStyle}">1. Free Forever Core Functionality</h2>
          <p>
            Pocket Advisor's core expense tracking, bank &amp; UPI auto-detection, and web calculators are 100% free forever. No payment or credit card is required to use the service.
          </p>

          <h2 style="${headingStyle}">2. Pocket Advisor Pro Subscriptions</h2>
          <p>
            Users who choose to upgrade to Pocket Advisor Pro enjoy an ad-free experience and advanced export options. Subscriptions are billed through Google Play Billing.
          </p>

          <h2 style="${headingStyle}">3. How to Cancel Your Subscription</h2>
          <p>
            You can cancel your subscription at any time directly through Google Play:
          </p>
          <ol style="padding-left: 20px; margin-bottom: 20px;">
            <li>Open the Google Play Store on your Android device.</li>
            <li>Tap your profile icon &gt; <strong>Payments &amp; subscriptions</strong> &gt; <strong>Subscriptions</strong>.</li>
            <li>Select <strong>Pocket Advisor</strong> and tap <strong>Cancel subscription</strong>.</li>
          </ol>

          <h2 style="${headingStyle}">4. Refund Eligibility &amp; Support</h2>
          <p>
            Refund requests submitted within 48 hours of purchase can be processed directly via Google Play's refund portal. For technical billing issues or assistance, contact <a href="mailto:support@pocketadvisor.in" style="color: #818cf8;">support@pocketadvisor.in</a>.
          </p>
        </article>`;

    case 'delete-account':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Account &amp; Data Deletion Compliance Portal</h2>
            <p>
              In compliance with Google Play Data Safety standards, Pocket Advisor provides self-service tools to permanently remove your account and all associated cloud backups.
            </p>
          </div>

          <h2 style="${headingStyle}">How Account Deletion Works</h2>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Cloud Backup Removal:</strong> Submitting your verified email permanently wipes your cloud sync records and profile from our databases.</li>
            <li><strong>Local On-Device Zeroization:</strong> Your local device session is revoked. When your device connects to the internet, it wipes the local SQLCipher database and resets the application.</li>
            <li><strong>In-App Deletion:</strong> You can also delete your account instantly from within the Android app: navigate to <strong>Settings &rarr; Danger Zone &rarr; Delete Account</strong>.</li>
          </ul>
        </div>`;

    case 'contact':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Contact Us &amp; Developer Support</h2>
            <p>
              Have a question, feedback, or a bug report? The Pocket Advisor engineering team is here to help.
            </p>
          </div>

          <h2 style="${headingStyle}">Support Channels</h2>
          <ul style="padding-left: 20px; margin-bottom: 24px;">
            <li><strong>Customer &amp; Technical Support:</strong> <a href="mailto:support@pocketadvisor.in" style="color: #818cf8;">support@pocketadvisor.in</a> (Response within 24–48 hours)</li>
            <li><strong>Data Privacy &amp; Compliance Inquiries:</strong> <a href="mailto:privacy@pocketadvisor.in" style="color: #818cf8;">privacy@pocketadvisor.in</a></li>
            <li><strong>Developer:</strong> Deepesh Garg</li>
          </ul>
        </div>`;

    case 'news':
      return `
        <div style="${contentStyle}">
          <div style="${cardStyle}">
            <h2 style="${headingStyle} margin-top: 0;">Pocket Advisor Engineering &amp; Spending Blog</h2>
            <p>
              Deep dives into offline-first SQLite synchronization, deterministic regex algorithms for Indian banking SMS, mathematical debt reduction graphs, and personal finance strategies.
            </p>
          </div>

          <h2 style="${headingStyle}">Recent Articles &amp; Practical Guides</h2>
          <div style="display: flex; flex-direction: column; gap: 20px; margin-top: 20px;">
            <div style="${cardStyle}">
              <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #10b981; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); padding: 3px 10px; border-radius: 9999px;">Step-by-Step Guide</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #f8fafc; margin: 10px 0 6px 0;">
                <a href="/news/track-upi-expenses-automatically" style="color: inherit; text-decoration: none;">How to Track UPI Expenses Automatically in India (2026 Step-by-Step Guide) &rarr;</a>
              </h3>
              <p style="font-size: 0.94rem; margin: 0 0 14px 0; color: #94a3b8;">
                Stop typing every transaction. Learn how on-device bank SMS regex parsing, Android battery setup, missed SMS recovery, and SQLCipher AES-256 deliver automated UPI tracking without privacy leaks.
              </p>
              <a href="/news/track-upi-expenses-automatically" style="color: #10b981; font-weight: 700; font-size: 0.9rem;">Read Complete Guide &rarr;</a>
            </div>

            <div style="${cardStyle}">
              <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #fbbf24; background: rgba(245, 158, 11, 0.15); border: 1px solid rgba(245, 158, 11, 0.3); padding: 3px 10px; border-radius: 9999px;">Budgeting Guide</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #f8fafc; margin: 10px 0 6px 0;">
                <a href="/news/diwali-2026-how-to-track-upi-spending" style="color: inherit; text-decoration: none;">Diwali 2026: How to Track UPI Spending and Stay Within Your Budget &rarr;</a>
              </h3>
              <p style="font-size: 0.94rem; margin: 0 0 14px 0; color: #94a3b8;">
                Stop letting festive UPI transactions slip through the cracks. Learn how to allocate category limits, detect untracked micro-spends, and manage group expenses without sacrificing celebration.
              </p>
              <a href="/news/diwali-2026-how-to-track-upi-spending" style="color: #818cf8; font-weight: 700; font-size: 0.9rem;">Read Complete Guide &rarr;</a>
            </div>

            <div style="${cardStyle}">
              <span style="font-size: 0.75rem; font-weight: 800; text-transform: uppercase; color: #818cf8; background: rgba(99, 102, 241, 0.15); border: 1px solid rgba(99, 102, 241, 0.3); padding: 3px 10px; border-radius: 9999px;">Product Launch</span>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #f8fafc; margin: 10px 0 6px 0;">
                <a href="/news/welcome-to-pocket-advisor" style="color: inherit; text-decoration: none;">Welcome to Pocket Advisor: Intelligent, Private Wealth Tracking &rarr;</a>
              </h3>
              <p style="font-size: 0.94rem; margin: 0 0 14px 0; color: #94a3b8;">
                Stop manually typing every expense. Discover how Pocket Advisor pairs on-device bank SMS intelligence with 2-stage greedy bill splitting and advanced compounding wealth projections.
              </p>
              <a href="/news/welcome-to-pocket-advisor" style="color: #818cf8; font-weight: 700; font-size: 0.9rem;">Read Product Announcement &rarr;</a>
            </div>
          </div>
        </div>`;

    case 'news/track-upi-expenses-automatically':
      return `
        <article style="${contentStyle}">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 14px; border-radius: 9999px; background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3);">Step-by-Step Android Guide</span>
            <span style="margin-left: 12px; font-size: 0.85rem; color: #94a3b8;">10 min read • Written by Deepesh Garg • Updated October 9, 2026</span>
          </div>

          <h1 style="font-size: 2.2rem; font-weight: 900; color: #f8fafc; line-height: 1.25; margin-bottom: 12px;">
            How to Track UPI Expenses Automatically in India (2026 Step-by-Step Guide)
          </h1>
          <p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.6; margin-bottom: 16px;">
            Stop typing every transaction. Master automatic on-device SMS parsing, OEM battery settings, missed alert recovery, smart categorization, and zero-telemetry privacy.
          </p>
          <p style="font-size: 0.98rem; color: #cbd5e1; line-height: 1.7; margin-bottom: 28px;">
            Want to see how the app handles eligible transaction alerts? Visit the <a href="/upi-expense-tracker" style="color: #a5b4fc; font-weight: 700; text-decoration: underline;">UPI Expense Tracker for Android</a> overview for details on supported-message parsing and privacy controls.
          </p>

          <div style="border-radius: 16px; overflow: hidden; margin-bottom: 36px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/track-upi-expenses-automatically.svg" alt="How to Track UPI Expenses Automatically in India Step-by-Step Guide" width="1200" height="630" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 32px 0;">
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Monthly UPI Volume</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #10b981; margin: 6px 0;">15B+</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Total transactions across India (NPCI)</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Detection Speed</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #38bdf8; margin: 6px 0;">&lt; 15ms</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">On-device regex parse time per SMS</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Vault Encryption</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #818cf8; margin: 6px 0;">AES-256</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">SQLCipher local hardware sandbox</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Telemarketing Calls</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin: 6px 0;">0 Calls</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Zero loan underwriting or NBFC sharing</div>
            </div>
          </div>

          <h2 style="${headingStyle}">1. How Real-Time UPI Transaction Detection Works</h2>
          <p>
            Whenever you scan a QR code with Google Pay, PhonePe, Paytm, or CRED, your bank (HDFC, SBI, ICICI, Axis, etc.) immediately generates an official transaction confirmation SMS alert. This confirmation is legally mandated by the Reserve Bank of India (RBI) for account accountability.
          </p>
          <p>
            Under Google Play's official <strong>Financial Money Management Exception</strong> policy, Pocket Advisor runs a lightweight on-device SMS parser directly in Android memory. It executes a 3-tier grammar engine:
          </p>
          <ol style="padding-left: 20px; line-height: 1.8; margin-bottom: 24px;">
            <li><strong>Rejection Filters:</strong> Instantly purges OTPs, login verification codes, credit score threats, and collection reminders in under 1 millisecond.</li>
            <li><strong>Action Anchors:</strong> Verifies completed past-tense verbs (debited, paid, spent, withdrawn) while discarding future scheduled promises.</li>
            <li><strong>Context Anchors:</strong> Extracts the exact amount, counterparty VPA or merchant name, bank account identifier, and updated ledger balance.</li>
          </ol>

          <div style="border-radius: 16px; overflow: hidden; margin: 32px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/screenshot-upi-sms-detection.svg" alt="Real-Time UPI SMS Detection and Regex Parsing in Pocket Advisor" width="840" height="540" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <h2 style="${headingStyle}">2. Initial App Setup &amp; Battery Optimization Guide</h2>
          <p>
            The <strong>#1 reason automatic expense tracking stops working</strong> on Android devices is aggressive battery management by phone manufacturers (OEMs). To artificially boost battery life, custom Android skins terminate background services when your phone screen turns off.
          </p>
          <p>
            To guarantee 100% continuous tracking reliability, apply the following 3 settings:
          </p>
          <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 24px;">
            <li><strong>Xiaomi / Redmi / POCO (HyperOS / MIUI):</strong> Go to Settings &gt; Apps &gt; Manage Apps &gt; Pocket Advisor &gt; Toggle <em>Autostart ON</em> &gt; Set Battery Saver to <em>No Restrictions</em>.</li>
            <li><strong>Samsung (One UI):</strong> Go to Settings &gt; Battery &gt; Background Usage Limits &gt; Add Pocket Advisor to <em>Never Sleeping Apps</em> &gt; Set App Battery to <em>Unrestricted</em>.</li>
            <li><strong>OnePlus / Realme / Oppo (ColorOS / OxygenOS):</strong> Go to App Info &gt; Battery Usage &gt; Enable <em>Allow background activity</em> and <em>Allow auto-launch</em>.</li>
          </ul>

          <div style="border-radius: 16px; overflow: hidden; margin: 32px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/screenshot-battery-optimization.svg" alt="Android OEM Battery Optimization Settings for Xiaomi, Samsung, and OnePlus" width="840" height="540" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <h2 style="${headingStyle}">3. Supported UPI Apps, Handles &amp; Payment Workflows</h2>
          <p>
            Because Pocket Advisor operates at the bank SMS layer rather than inside individual payment apps, it automatically covers all Indian UPI payment rails:
          </p>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Payment Rail</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Supported Providers</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Detection Engine</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Latency</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Third-Party Apps (TPAP)</td><td style="padding: 12px 16px;">Google Pay, PhonePe, Paytm, CRED, BHIM, Navi</td><td style="padding: 12px 16px; color: #34d399; font-weight: 700;">Bank SMS Regex</td><td style="padding: 12px 16px;">&lt; 15ms</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Direct Bank Handles</td><td style="padding: 12px 16px;">@okhdfcbank, @okaxis, @oksbi, @ybl, @ibl</td><td style="padding: 12px 16px;">VPA / UPI Ref Parsing</td><td style="padding: 12px 16px;">&lt; 15ms</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">RuPay Credit Cards on UPI</td><td style="padding: 12px 16px;">HDFC, ICICI, SBI, Axis RuPay Credit Cards</td><td style="padding: 12px 16px; color: #38bdf8; font-weight: 700;">Card SMS Debit Parsing</td><td style="padding: 12px 16px;">&lt; 15ms</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Offline Merchant QRs</td><td style="padding: 12px 16px;">BharatPe, Paytm Soundbox, Merchant QR</td><td style="padding: 12px 16px;">Merchant Name Extraction</td><td style="padding: 12px 16px;">&lt; 15ms</td></tr>
                <tr><td style="padding: 12px 16px; font-weight: 700;">Peer-to-Peer (P2P)</td><td style="padding: 12px 16px;">Direct Transfers to Friends / Landlords</td><td style="padding: 12px 16px; color: #c084fc; font-weight: 700;">1-Tap Split Eligible</td><td style="padding: 12px 16px;">&lt; 15ms</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">4. How to Handle Missed SMS Alerts (Zero-Data-Loss Safety Net)</h2>
          <p>
            In recent years, several major banks (including HDFC Bank and SBI) adjusted their policies to reduce SMS volume for micro-payments under ₹100, relying instead on app notifications. In addition, telecom dead zones can occasionally delay SMS delivery.
          </p>
          <p>
            Pocket Advisor incorporates a 3-tier safety net to guarantee zero financial blind spots:
          </p>
          <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 24px;">
            <li><strong>Bank Balance Delta Reconciliation:</strong> When your next SMS arrives containing an updated bank balance, Pocket Advisor compares it against your recorded ledger and flags any unrecorded micro-difference.</li>
            <li><strong>1-Tap Home Screen Quick-Add Widget:</strong> Log cash or ₹10 chai debits in under 2 seconds directly from your Android home screen without opening the application.</li>
            <li><strong>Instant Merchant Quick-Log:</strong> Frequently visited merchants are cached locally so you can log recurring expenses with a single tap.</li>
          </ul>

          <h2 style="${headingStyle}">5. Smart Categorization &amp; Learned Merchant Rules</h2>
          <p>
            Pocket Advisor ships with a built-in dictionary mapping over 350 Indian merchants and aggregators to structured categories:
          </p>
          <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 24px;">
            <li><strong>Food &amp; Dining:</strong> Swiggy, Zomato, Starbucks, McDonald's, Chai Point, Cafe Coffee Day.</li>
            <li><strong>Groceries &amp; Quick Commerce:</strong> Zepto, Blinkit, Swiggy Instamart, BigBasket, D-Mart.</li>
            <li><strong>Commute &amp; Travel:</strong> Uber, Ola, Rapido, Namma Metro, Fastag, IRCTC.</li>
            <li><strong>Investments:</strong> Zerodha, Groww, Upstox, Angel One, Kuvera, Coin.</li>
          </ul>

          <div style="border-radius: 16px; overflow: hidden; margin: 32px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/screenshot-category-rules.svg" alt="Smart Categorization and User-Learned Custom Rules Engine" width="840" height="540" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <h2 style="${headingStyle}">6. Data Privacy, Encryption &amp; Monetization Transparency</h2>
          <p>
            Many Indian financial apps upload your full SMS inbox to cloud servers to underwrite instant personal loans and credit cards. Pocket Advisor takes an uncompromising privacy-first approach:
          </p>

          <div style="border-radius: 16px; overflow: hidden; margin: 32px 0; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/screenshot-privacy-vault.svg" alt="SQLCipher AES-256 On-Device Vault and Optional Cloud Backup" width="840" height="540" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <div style="${cardStyle} margin: 36px 0;">
            <h3 style="font-size: 1.2rem; font-weight: 800; color: #f8fafc; margin-top: 0;">Our Privacy &amp; Business Model Guarantees:</h3>
            <ul style="padding-left: 20px; line-height: 1.8; margin-bottom: 0;">
              <li><strong>100% On-Device SQLCipher AES-256 Encryption:</strong> Your ledger never leaves your phone's hardware sandbox unless you explicitly choose to back it up.</li>
              <li><strong>Zero Telemarketing or Loan Brokering:</strong> We will never sell your financial records or call you with personal loan offers.</li>
              <li><strong>Ad-Supported Free Tier with Pro Upgrade:</strong> Standard non-intrusive mobile display ads in the free version, with an optional ad-free Pro tier.</li>
              <li><strong>Optional Encrypted Cloud Backup:</strong> Toggle Supabase cloud backup voluntarily whenever you need multi-device sync or phone restoration.</li>
            </ul>
          </div>

          <div style="${cardStyle} text-align: center; margin: 36px 0;">
            <h3 style="font-size: 1.35rem; font-weight: 800; color: #f8fafc; margin-top: 0;">Ready for Automated, Private Expense Tracking?</h3>
            <p style="font-size: 0.95rem; color: #94a3b8; margin: 8px 0 16px 0;">Download Pocket Advisor on Google Play Store and start tracking UPI spending effortlessly.</p>
            <a href="https://play.google.com/store/apps/details?id=com.pocketadvisor.app" target="_blank" rel="noopener noreferrer" style="display: inline-block; background: #10b981; color: #020617; padding: 12px 24px; border-radius: 12px; font-weight: 800; text-decoration: none;">Get on Google Play (Free) &rarr;</a>
          </div>
        </article>`;

    case 'news/diwali-2026-how-to-track-upi-spending':
      return `
        <article style="${contentStyle}">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 14px; border-radius: 9999px; background-color: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3);">Budgeting Guide</span>
            <span style="margin-left: 12px; font-size: 0.85rem; color: #94a3b8;">8 min read • Written by Deepesh Garg • Updated October 8, 2026</span>
          </div>

          <h1 style="font-size: 2.2rem; font-weight: 900; color: #f8fafc; line-height: 1.25; margin-bottom: 12px;">
            Diwali 2026 Budget: How to Track UPI Spending &amp; Avoid Overspending
          </h1>
          <p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.6; margin-bottom: 28px;">
            A data-backed, zero-stress guide to controlling festive UPI micro-transactions, setting category limits, and splitting celebration costs automatically.
          </p>

          <div style="border-radius: 16px; overflow: hidden; margin-bottom: 36px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/diwali-budget-guide.webp" alt="Diwali 2026 Budget and UPI Expense Tracking Guide" width="1200" height="630" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 32px 0;">
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Festive UPI Surge</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #818cf8; margin: 6px 0;">800M+ / day</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Peak daily volume (NPCI 2026)</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Micro-Payment Share</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #f87171; margin: 6px 0;">85%+</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Transactions under ₹500</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Recommended Cap</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin: 6px 0;">15–20%</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Of net monthly take-home salary</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">On-Device Security</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #c084fc; margin: 6px 0;">100%</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Local SMS regex parsing</div>
            </div>
          </div>

          <h2 style="${headingStyle}">Why UPI Spending Escapes Notice During Festivals</h2>
          <p>
            When paying with physical cash, parting with five crisp ₹500 notes triggers immediate cognitive awareness. You physically feel the weight leaving your wallet. With UPI on Google Pay, PhonePe, or Paytm, scanning a QR code produces the exact same instantaneous screen animation whether you spend ₹40 on chai or ₹4,000 on dry fruits.
          </p>

          <h2 style="${headingStyle}">The 15–20% Income Rule for Diwali Budgeting</h2>
          <p>
            Before visiting festive bazaars or browsing e-commerce sales, establish a non-negotiable financial ceiling. Certified financial planners recommend the 15% to 20% Rule: your total discretionary festive outlays across clothes, gifts, sweets, and celebrations should never exceed 15% to 20% of your take-home monthly salary.
          </p>

          <h2 style="${headingStyle}">Recommended Diwali Budget Allocation (₹20,000 Model)</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Category</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Recommended Cap</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Share (%)</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Coverage</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Shopping &amp; Apparel</td><td style="padding: 12px 16px;">₹6,500</td><td style="padding: 12px 16px;">32.5%</td><td style="padding: 12px 16px;">Festive clothes, footwear, personal accessories</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Gifts &amp; Envelopes</td><td style="padding: 12px 16px;">₹4,500</td><td style="padding: 12px 16px;">22.5%</td><td style="padding: 12px 16px;">Family gifts, dry fruit hampers, corporate tokens, shagun</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Food, Sweets &amp; Feasts</td><td style="padding: 12px 16px;">₹3,500</td><td style="padding: 12px 16px;">17.5%</td><td style="padding: 12px 16px;">Mithai boxes, family dinners, dry fruits, party snacks</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Diyas, Lights &amp; Decor</td><td style="padding: 12px 16px;">₹2,500</td><td style="padding: 12px 16px;">12.5%</td><td style="padding: 12px 16px;">Clay diyas, LED string lights, torans, rangoli, puja essentials</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Festive Travel &amp; Local Transit</td><td style="padding: 12px 16px;">₹1,500</td><td style="padding: 12px 16px;">7.5%</td><td style="padding: 12px 16px;">Cabs to relatives' homes, metro cards, airport transit</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Emergency Buffer Reserve</td><td style="padding: 12px 16px;">₹1,500</td><td style="padding: 12px 16px;">7.5%</td><td style="padding: 12px 16px;">Last-minute visitors, impromptu sweets, delivery tips</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">How Automatic Bank SMS Expense Tracking Works</h2>
          <p>
            Pocket Advisor monitors official bank transaction SMS alerts locally on your Android device. It uses native regular expressions to detect the merchant ('ABC SWEETS'), amount ('₹450'), and account without transmitting any SMS text or banking data to external cloud servers.
          </p>

          <div style="${cardStyle} text-align: center; margin: 36px 0;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: #f8fafc; margin-top: 0;">Split Festive Group Meals Without Tangled Debts</h3>
            <p style="font-size: 0.95rem; color: #94a3b8; margin: 8px 0 16px 0;">Use Pocket Advisor's free web Bill Splitter with 2-stage greedy debt minimization. Resolves multilateral balances in 2 net UPI payments.</p>
            <a href="/split" style="display: inline-block; background: #6366f1; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-weight: 700; text-decoration: none;">Open Free Bill Splitter &rarr;</a>
          </div>
        </article>`;

    case 'news/welcome-to-pocket-advisor':
      return `
        <article style="${contentStyle}">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 14px; border-radius: 9999px; background-color: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3);">Product Launch</span>
            <span style="margin-left: 12px; font-size: 0.85rem; color: #94a3b8;">4 min read • Published September 12, 2026</span>
          </div>

          <h1 style="font-size: 2.2rem; font-weight: 900; color: #f8fafc; line-height: 1.25; margin-bottom: 12px;">
            Welcome to Pocket Advisor: Intelligent, Private Wealth Tracking
          </h1>
          <p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.6; margin-bottom: 28px;">
            Why we built an Android-native financial companion designed around privacy, zero manual entry, and debt simplification.
          </p>

          <div style="border-radius: 16px; overflow: hidden; margin-bottom: 36px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/welcome-pocket-advisor.webp" alt="Welcome to Pocket Advisor Launch Announcement" width="1200" height="630" loading="lazy" decoding="async" style="width: 100%; height: auto; display: block;" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 32px 0;">
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Storage Architecture</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin: 6px 0;">100% Local</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Encrypted SQLite on smartphone</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Bank Credentials</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #818cf8; margin: 6px 0;">0 Required</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Zero netbanking or OTP access</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Debt Solver</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #c084fc; margin: 6px 0;">2-Stage</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Greedy debt minimization</div>
            </div>
          </div>

          <h2 style="${headingStyle}">Table 1: Architectural Comparison of Modern Personal Finance Solutions</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Feature / Dimension</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Manual Spreadsheet Apps</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Cloud Bank Aggregators</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Pocket Advisor</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Data Entry</td><td style="padding: 12px 16px;">Manual typing every day</td><td style="padding: 12px 16px;">Cloud scraping</td><td style="padding: 12px 16px; color: #34d399; font-weight: 700;">Automated on-device SMS</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Privacy</td><td style="padding: 12px 16px;">Cloud database</td><td style="padding: 12px 16px; color: #f87171;">Monetized for credit card ads</td><td style="padding: 12px 16px; color: #34d399; font-weight: 700;">100% on-device, zero ads</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Bank Credentials</td><td style="padding: 12px 16px;">None</td><td style="padding: 12px 16px; color: #f87171;">Required (Passwords)</td><td style="padding: 12px 16px; color: #34d399; font-weight: 700;">None (Zero login risk)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Bill Splitting</td><td style="padding: 12px 16px;">Separate app required</td><td style="padding: 12px 16px;">Absent</td><td style="padding: 12px 16px; color: #c084fc; font-weight: 700;">Built-in 2-stage greedy debt solver</td></tr>
                <tr><td style="padding: 12px 16px; font-weight: 700;">Wealth Calculators</td><td style="padding: 12px 16px;">None</td><td style="padding: 12px 16px;">Generic calculators</td><td style="padding: 12px 16px; color: #60a5fa; font-weight: 700;">EMI vs SIP with tax &amp; step-up</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">The Three Core Pillars of Pocket Advisor</h2>
          <p>
            <strong>1. Automated On-Device SMS Intelligence:</strong> Monitors transaction alerts from Indian banks and UPI applications with zero internet transfer.
          </p>
          <p>
            <strong>2. Mathematical Debt Minimization:</strong> Solves group obligations as a directed graph to collapse 10 tangled debts into 2 simple payments.
          </p>
          <p>
            <strong>3. Long-Term Wealth Engineering:</strong> Helps you decide whether to prepay home loans or invest in compounding mutual funds with inflation factors.
          </p>

          <div style="${cardStyle} text-align: center; margin: 36px 0;">
            <h3 style="font-size: 1.3rem; font-weight: 800; color: #f8fafc; margin-top: 0;">Download Pocket Advisor for Android</h3>
            <p style="font-size: 0.95rem; color: #94a3b8; margin: 8px 0 16px 0;">Start tracking your spending automatically without sacrificing your financial privacy.</p>
            <a href="/download" style="display: inline-block; background: #6366f1; color: #ffffff; padding: 12px 24px; border-radius: 12px; font-weight: 700; text-decoration: none;">Download Android App &rarr;</a>
          </div>
        </article>`;

    default:
      return '';
  }
}
