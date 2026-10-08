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

    case 'news/diwali-2026-how-to-track-upi-spending':
      return `
        <article style="${contentStyle}">
          <div style="margin-bottom: 24px;">
            <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; padding: 4px 14px; border-radius: 9999px; background-color: rgba(99, 102, 241, 0.15); color: #818cf8; border: 1px solid rgba(99, 102, 241, 0.3);">Budgeting Guide</span>
            <span style="margin-left: 12px; font-size: 0.85rem; color: #94a3b8;">6 min read • Published October 5, 2026</span>
          </div>

          <h1 style="font-size: 2.2rem; font-weight: 900; color: #f8fafc; line-height: 1.25; margin-bottom: 12px;">
            Diwali 2026: How to Track UPI Spending and Stay Within Your Budget
          </h1>
          <p style="font-size: 1.15rem; color: #94a3b8; line-height: 1.6; margin-bottom: 28px;">
            A practical, zero-stress guide to managing festive spending, micro-payment leaks, and group celebration expenses.
          </p>

          <div style="border-radius: 16px; overflow: hidden; margin-bottom: 36px; border: 1px solid rgba(255, 255, 255, 0.1);">
            <img src="/assets/news/diwali-budget-guide.png" alt="Diwali 2026 UPI Spending and Budgeting Guide" style="width: 100%; height: auto; display: block;" />
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 32px 0;">
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Festive Micro-Leak</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #f87171; margin: 6px 0;">₹1,965 / wk</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Untracked small UPI payments</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Predefined Cap</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #34d399; margin: 6px 0;">₹20,000</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Recommended budget ceiling</div>
            </div>
            <div style="${cardStyle} text-align: center;">
              <div style="font-size: 0.8rem; font-weight: 700; color: #94a3b8; text-transform: uppercase;">On-Device Security</div>
              <div style="font-size: 1.8rem; font-weight: 800; color: #818cf8; margin: 6px 0;">100%</div>
              <div style="font-size: 0.8rem; color: #94a3b8;">Zero banking passwords required</div>
            </div>
          </div>

          <h2 style="${headingStyle}">Why UPI Spending Escapes Notice During Festivals</h2>
          <p>
            UPI has transformed commerce across India. Instead of withdrawing physical cash from an ATM and visually watching notes leave your wallet, digital payments happen in seconds with a phone scan. This frictionless payment experience removes natural psychological barriers to spending.
          </p>

          <h2 style="${headingStyle}">Table 1: The Cumulative Reality of Festive Micro-Payments</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Festive Occasion</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Single Transaction</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Weekly Frequency</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Category Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Quick Chai &amp; Evening Snacks</td><td style="padding: 12px 16px;">₹180</td><td style="padding: 12px 16px;">4 times</td><td style="padding: 12px 16px; color: #fbbf24; font-weight: 700;">₹720 (Food)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Instant Delivery / Grocery Top-Up</td><td style="padding: 12px 16px;">₹240</td><td style="padding: 12px 16px;">3 times</td><td style="padding: 12px 16px; color: #60a5fa; font-weight: 700;">₹720 (Groceries)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Extra Sweets for Visiting Guests</td><td style="padding: 12px 16px;">₹350</td><td style="padding: 12px 16px;">3 times</td><td style="padding: 12px 16px; color: #fbbf24; font-weight: 700;">₹1,050 (Festive Food)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Courier &amp; Delivery Tips</td><td style="padding: 12px 16px;">₹190</td><td style="padding: 12px 16px;">4 times</td><td style="padding: 12px 16px; color: #c084fc; font-weight: 700;">₹760 (Tips)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Extra Diyas &amp; Decorative Lights</td><td style="padding: 12px 16px;">₹420</td><td style="padding: 12px 16px;">2 times</td><td style="padding: 12px 16px; color: #c084fc; font-weight: 700;">₹840 (Decor)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Pooja Supplies &amp; Fresh Flowers</td><td style="padding: 12px 16px;">₹275</td><td style="padding: 12px 16px;">3 times</td><td style="padding: 12px 16px; color: #c084fc; font-weight: 700;">₹825 (Pooja)</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px;">Festival Auto &amp; Cab Surge Fare</td><td style="padding: 12px 16px;">₹310</td><td style="padding: 12px 16px;">3 times</td><td style="padding: 12px 16px; color: #60a5fa; font-weight: 700;">₹930 (Travel)</td></tr>
                <tr style="font-weight: 700; background: rgba(239, 68, 68, 0.1);"><td style="padding: 12px 16px; color: #f87171;">Total Micro-Payments Leak</td><td style="padding: 12px 16px;">—</td><td style="padding: 12px 16px;">—</td><td style="padding: 12px 16px; color: #f87171;">₹5,845 Cumulative</td></tr>
              </tbody>
            </table>
          </div>

          <h2 style="${headingStyle}">Table 2: Pragmatic Category Allocation for a ₹20,000 Festive Fund</h2>
          <div style="overflow-x: auto; margin: 24px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.92rem; background: rgba(17, 24, 39, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px;">
              <thead>
                <tr style="background: rgba(255, 255, 255, 0.04); border-bottom: 2px solid rgba(255, 255, 255, 0.08);">
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Category</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Recommended Cap</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Share (%)</th>
                  <th style="padding: 12px 16px; text-align: left; color: #f8fafc;">Common Pitfall &amp; Preventive Rule</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Clothing &amp; Apparel</td><td style="padding: 12px 16px;">₹6,500</td><td style="padding: 12px 16px;">32.5%</td><td style="padding: 12px 16px;">Impulse online sale flash deals. Stick to a predetermined shopping list.</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Family &amp; Colleague Gifts</td><td style="padding: 12px 16px;">₹4,500</td><td style="padding: 12px 16px;">22.5%</td><td style="padding: 12px 16px;">Last-minute premium packaging surcharges. Buy curated hampers early.</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Sweets, Dry Fruits &amp; Food</td><td style="padding: 12px 16px;">₹3,500</td><td style="padding: 12px 16px;">17.5%</td><td style="padding: 12px 16px;">Perishable food overbuying. Calculate actual visiting headcounts.</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Home Decor, Diyas &amp; Lights</td><td style="padding: 12px 16px;">₹2,500</td><td style="padding: 12px 16px;">12.5%</td><td style="padding: 12px 16px;">Duplicate LED strings. Test last year's lights before buying.</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Festive Travel &amp; Local Transit</td><td style="padding: 12px 16px;">₹1,500</td><td style="padding: 12px 16px;">7.5%</td><td style="padding: 12px 16px;">Peak-hour ride surges. Schedule airport/station transit early.</td></tr>
                <tr style="border-bottom: 1px solid rgba(255, 255, 255, 0.05);"><td style="padding: 12px 16px; font-weight: 700;">Emergency Buffer Reserve</td><td style="padding: 12px 16px;">₹1,500</td><td style="padding: 12px 16px;">7.5%</td><td style="padding: 12px 16px;">Unexpected neighborhood sweets or delivery tips. Keep untouched until Diwali.</td></tr>
              </tbody>
            </table>
          </div>

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
            <img src="/assets/news/welcome-pocket-advisor.png" alt="Welcome to Pocket Advisor Launch Announcement" style="width: 100%; height: auto; display: block;" />
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
