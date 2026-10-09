import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.resolve(__dirname, '../public');
const newsAssetsDir = path.resolve(publicDir, 'assets/news');

// Read logo-round.png as base64
const logoPngBuffer = fs.readFileSync(path.resolve(publicDir, 'logo-round.png'));
const logoBase64 = `data:image/png;base64,${logoPngBuffer.toString('base64')}`;

// Ensure output dir exists
if (!fs.existsSync(newsAssetsDir)) {
  fs.mkdirSync(newsAssetsDir, { recursive: true });
}

console.log('Logo read successfully, base64 length:', logoBase64.length);

// -------------------------------------------------------------
// ASSET 1: Cover Image (1200 x 630)
// -------------------------------------------------------------
const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#080c14"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e1b4b"/>
    </linearGradient>
    <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#818cf8"/>
    </linearGradient>
    <linearGradient id="phoneBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#131d31"/>
      <stop offset="100%" stop-color="#0b1120"/>
    </linearGradient>
    <filter id="glowOrb" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="70" result="blur" />
    </filter>
    <filter id="cardDrop" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="rgba(0,0,0,0.6)"/>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGrad)"/>

  <!-- Glowing Radial Orbs -->
  <circle cx="160" cy="180" r="260" fill="#10b981" opacity="0.14" filter="url(#glowOrb)"/>
  <circle cx="1060" cy="450" r="280" fill="#6366f1" opacity="0.16" filter="url(#glowOrb)"/>

  <!-- Subtle Blueprint Grid -->
  <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
    <line x1="0" y1="126" x2="1200" y2="126"/>
    <line x1="0" y1="252" x2="1200" y2="252"/>
    <line x1="0" y1="378" x2="1200" y2="378"/>
    <line x1="0" y1="504" x2="1200" y2="504"/>
    <line x1="240" y1="0" x2="240" y2="630"/>
    <line x1="480" y1="0" x2="480" y2="630"/>
    <line x1="720" y1="0" x2="720" y2="630"/>
    <line x1="960" y1="0" x2="960" y2="630"/>
  </g>

  <!-- LEFT COLUMN (Content) -->
  <g transform="translate(80, 60)">
    <!-- Brand Header with Official Icon -->
    <g transform="translate(0, 0)">
      <image href="${logoBase64}" x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid meet"/>
      <text x="60" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="800" fill="#f8fafc">Pocket Advisor</text>
      <text x="60" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981" letter-spacing="0.5">ANDROID NATIVE • 100% ON-DEVICE</text>
    </g>

    <!-- Guide Pill Badge -->
    <g transform="translate(0, 76)">
      <rect x="0" y="0" width="280" height="34" rx="17" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" stroke-width="1.5"/>
      <circle cx="18" cy="17" r="4.5" fill="#10b981"/>
      <text x="32" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#34d399" letter-spacing="1">AUTOMATED UPI GUIDE 2026</text>
    </g>

    <!-- Main Title -->
    <text x="0" y="156" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="900" fill="#ffffff" letter-spacing="-0.8">
      How to Track UPI Expenses
    </text>
    <text x="0" y="208" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="42" font-weight="900" fill="url(#primaryGrad)" letter-spacing="-0.8">
      Automatically in India
    </text>

    <!-- Subtitle -->
    <text x="0" y="260" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8">
      Stop typing every transaction. Detect Google Pay, PhonePe &amp; Paytm
    </text>
    <text x="0" y="286" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="400" fill="#94a3b8">
      from bank SMS. Setup, battery optimization &amp; SQLCipher privacy.
    </text>

    <!-- Feature Pillars -->
    <g transform="translate(0, 326)">
      <rect x="0" y="0" width="136" height="34" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
      <text x="14" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1">⚡ &lt;15ms Detection</text>

      <rect x="148" y="0" width="154" height="34" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
      <text x="162" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1">🔒 Local SQLCipher</text>

      <rect x="314" y="0" width="150" height="34" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)"/>
      <text x="328" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#cbd5e1">🛡️ Zero Loan Ads</text>
    </g>

    <!-- Author & Trust Signature -->
    <g transform="translate(0, 440)">
      <rect x="0" y="0" width="48" height="48" rx="24" fill="rgba(16, 185, 129, 0.15)" stroke="rgba(16, 185, 129, 0.4)"/>
      <image href="${logoBase64}" x="8" y="8" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
      <text x="60" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Pocket Advisor Engineering</text>
      <text x="60" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="400" fill="#64748b">Verified for Android 15 &amp; Google Play • October 2026</text>
    </g>
  </g>

  <!-- RIGHT COLUMN (Realistic Phone Showcase) -->
  <g transform="translate(710, 55)" filter="url(#cardDrop)">
    <!-- Phone Outer Bezel -->
    <rect x="0" y="0" width="410" height="520" rx="36" fill="url(#phoneBg)" stroke="rgba(255, 255, 255, 0.16)" stroke-width="2"/>

    <!-- Dynamic Island / Speaker -->
    <rect x="145" y="14" width="120" height="18" rx="9" fill="#020617"/>
    <circle cx="240" cy="23" r="3.5" fill="#10b981"/>

    <!-- Phone App Header with Official Icon -->
    <g transform="translate(24, 48)">
      <image href="${logoBase64}" x="0" y="0" width="34" height="34" preserveAspectRatio="xMidYMid meet"/>
      <text x="44" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="800" fill="#ffffff">Pocket Advisor</text>
      <text x="44" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#10b981">Auto-Tracking Active</text>

      <rect x="254" y="2" width="108" height="26" rx="13" fill="rgba(16, 185, 129, 0.18)"/>
      <text x="308" y="19" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#10b981">62% of Budget</text>
    </g>

    <!-- Monthly Total Card -->
    <g transform="translate(20, 96)">
      <rect x="0" y="0" width="370" height="66" rx="14" fill="rgba(15, 23, 42, 0.7)" stroke="rgba(255, 255, 255, 0.08)"/>
      <text x="18" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94a3b8">OCTOBER TOTAL EXPENSES</text>
      <text x="18" y="52" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="900" fill="#ffffff">₹24,850.00</text>
      <text x="352" y="50" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#94a3b8">Cap: ₹40,000</text>
    </g>

    <!-- Active SMS Detection Toast (Highlighted Feature) -->
    <g transform="translate(20, 174)">
      <rect x="0" y="0" width="370" height="116" rx="16" fill="#0f172a" stroke="#10b981" stroke-width="2"/>
      
      <!-- Toast Header with Official Pocket Advisor Icon -->
      <image href="${logoBase64}" x="16" y="14" width="22" height="22" preserveAspectRatio="xMidYMid meet"/>
      <text x="46" y="29" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#10b981">INSTANT BANK SMS PARSED</text>
      <text x="354" y="29" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b">Just now</text>

      <!-- Payee and Amount -->
      <text x="16" y="60" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#f8fafc">Swiggy (swiggy@icici)</text>
      <text x="354" y="60" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="900" fill="#f43f5e">-₹340.00</text>

      <!-- Metadata Badges -->
      <g transform="translate(16, 78)">
        <rect x="0" y="0" width="94" height="24" rx="6" fill="rgba(99, 102, 241, 0.25)"/>
        <text x="47" y="16" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#818cf8">🍔 Food &amp; Dining</text>

        <rect x="102" y="0" width="112" height="24" rx="6" fill="rgba(255, 255, 255, 0.08)"/>
        <text x="158" y="16" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#cbd5e1">HDFC A/c **4102</text>

        <rect x="222" y="0" width="116" height="24" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
        <text x="280" y="16" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#10b981">✓ Saved in 11ms</text>
      </g>
    </g>

    <!-- Second Transaction Item -->
    <g transform="translate(20, 302)">
      <rect x="0" y="0" width="370" height="66" rx="14" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.07)"/>
      <rect x="14" y="13" width="40" height="40" rx="10" fill="rgba(56, 189, 248, 0.15)"/>
      <text x="34" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">🚕</text>
      <text x="64" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Uber India (UPI)</text>
      <text x="64" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b">Travel • SBI A/c **8912</text>
      <text x="354" y="38" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#f43f5e">-₹185.00</text>
    </g>

    <!-- Third Transaction Item -->
    <g transform="translate(20, 380)">
      <rect x="0" y="0" width="370" height="66" rx="14" fill="rgba(255, 255, 255, 0.03)" stroke="rgba(255, 255, 255, 0.07)"/>
      <rect x="14" y="13" width="40" height="40" rx="10" fill="rgba(245, 158, 11, 0.15)"/>
      <text x="34" y="38" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">🥦</text>
      <text x="64" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Zepto Grocery</text>
      <text x="64" y="47" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b">Groceries • ICICI A/c **5501</text>
      <text x="354" y="38" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#f43f5e">-₹420.00</text>
    </g>

    <!-- Bottom Shield Badge with Official Pocket Advisor Icon -->
    <g transform="translate(20, 460)">
      <rect x="0" y="0" width="370" height="42" rx="10" fill="rgba(16, 185, 129, 0.1)" stroke="rgba(16, 185, 129, 0.25)"/>
      <image href="${logoBase64}" x="14" y="11" width="20" height="20" preserveAspectRatio="xMidYMid meet"/>
      <text x="42" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">Encrypted on device via SQLCipher AES-256</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(newsAssetsDir, 'track-upi-expenses-automatically.svg'), coverSvg);
console.log('Cover SVG generated.');

// -------------------------------------------------------------
// ASSET 2: Figure 1 - Detection & Parsing (840 x 560)
// -------------------------------------------------------------
const figure1Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" width="840" height="560">
  <defs>
    <linearGradient id="f1Bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0b1120"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <linearGradient id="f1Card" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="f1Shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <rect width="840" height="560" rx="20" fill="url(#f1Bg)"/>
  <rect width="840" height="560" rx="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Phone Top Status Bar -->
  <g transform="translate(32, 16)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">14:32</text>
    <text x="776" y="16" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#10b981">5G • 92%</text>
  </g>

  <!-- App Header with Official Icon -->
  <g transform="translate(32, 48)">
    <image href="${logoBase64}" x="0" y="0" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>
    <text x="54" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#ffffff">Pocket Advisor</text>
    <text x="54" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">REAL-TIME DETERMINISTIC SMS REGEX ENGINE (15MS)</text>
  </g>

  <!-- Box 1: Raw Incoming SMS -->
  <g transform="translate(32, 106)" filter="url(#f1Shadow)">
    <rect x="0" y="0" width="776" height="136" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
    
    <g transform="translate(20, 16)">
      <rect x="0" y="0" width="36" height="36" rx="10" fill="rgba(56, 189, 248, 0.2)"/>
      <text x="18" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16">💬</text>
      <text x="48" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Incoming Bank SMS Alert: JD-HDFCBK</text>
      <text x="48" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="500" fill="#64748b">Arrives in Android Telephony Provider • Never leaves sandbox</text>
    </g>

    <!-- Raw text box -->
    <rect x="20" y="66" width="736" height="54" rx="8" fill="#020617"/>
    <text x="36" y="90" font-family="'Courier New', Courier, monospace" font-size="13" fill="#cbd5e1">
      "HDFC Bank: Rs 340.00 debited from a/c **4102 to VPA swiggy@icici on 09-10-26"
    </text>
    <text x="36" y="108" font-family="'Courier New', Courier, monospace" font-size="13" fill="#cbd5e1">
      "via UPI Ref 628391024810. Avl Bal: Rs 42,150.00. Report fraud to 18002586161"
    </text>
  </g>

  <!-- Flow Connector Badge (Centered horizontally at x=420) -->
  <g transform="translate(275, 254)">
    <rect x="0" y="0" width="290" height="32" rx="16" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="1.5"/>
    <circle cx="16" cy="16" r="11" fill="#10b981"/>
    <path d="M12 14 L16 19 L20 14" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"/>
    <text x="156" y="21" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#10b981">
      ⚡ Parsed in 11.4ms (SmsParser.kt)
    </text>
  </g>

  <!-- Box 2: Pocket Advisor Structured Commit -->
  <g transform="translate(32, 298)" filter="url(#f1Shadow)">
    <rect x="0" y="0" width="776" height="232" rx="18" fill="url(#f1Card)" stroke="#10b981" stroke-width="2"/>

    <!-- Header inside parsed card -->
    <g transform="translate(24, 20)">
      <image href="${logoBase64}" x="0" y="0" width="48" height="48" preserveAspectRatio="xMidYMid meet"/>
      <g transform="translate(60, 0)">
        <text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="19" font-weight="800" fill="#ffffff">Swiggy (swiggy@icici)</text>
        <text x="0" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="500" fill="#94a3b8">
          HDFC Bank • Account ending **4102 • UPI Ref: 628391024810
        </text>
      </g>
    </g>

    <!-- Amount Block on Right -->
    <g transform="translate(560, 20)">
      <text x="192" y="22" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="900" fill="#f43f5e">-₹340.00</text>
      <text x="192" y="42" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#64748b">Updated Bal: ₹42,150.00</text>
    </g>

    <!-- Separation Line -->
    <line x1="24" y1="84" x2="752" y2="84" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

    <!-- Metadata Badges -->
    <g transform="translate(24, 102)">
      <rect x="0" y="0" width="136" height="32" rx="8" fill="rgba(99, 102, 241, 0.25)"/>
      <text x="68" y="21" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#818cf8">🍔 Food &amp; Dining</text>

      <rect x="148" y="0" width="156" height="32" rx="8" fill="rgba(16, 185, 129, 0.2)"/>
      <text x="226" y="21" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">✓ SQLCipher Committed</text>

      <rect x="316" y="0" width="144" height="32" rx="8" fill="rgba(255, 255, 255, 0.08)"/>
      <text x="388" y="21" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#cbd5e1">OTP Filtered: Yes (&lt;1ms)</text>
    </g>

    <!-- Action Buttons with Perfect Text Centering -->
    <g transform="translate(480, 102)">
      <rect x="0" y="0" width="124" height="32" rx="8" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)"/>
      <text x="62" y="20" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#ffffff">Edit Category</text>

      <rect x="134" y="0" width="138" height="32" rx="8" fill="#10b981"/>
      <text x="203" y="20" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#020617">Split with Friends</text>
    </g>

    <!-- Bottom Footnote with Official Icon -->
    <g transform="translate(24, 160)">
      <rect x="0" y="0" width="728" height="44" rx="10" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.2)"/>
      <image href="${logoBase64}" x="12" y="10" width="24" height="24" preserveAspectRatio="xMidYMid meet"/>
      <text x="46" y="27" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#10b981">
        Pocket Advisor automatically updates category envelopes and monthly spending widgets in real time.
      </text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(newsAssetsDir, 'screenshot-upi-sms-detection.svg'), figure1Svg);
console.log('Figure 1 generated.');

// -------------------------------------------------------------
// ASSET 3: Figure 2 - Battery Optimization (840 x 560)
// -------------------------------------------------------------
const figure2Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" width="840" height="560">
  <defs>
    <linearGradient id="f2Bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="f2Shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <rect width="840" height="560" rx="20" fill="url(#f2Bg)"/>
  <rect width="840" height="560" rx="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Phone Header Bar -->
  <g transform="translate(32, 16)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">14:35</text>
    <text x="776" y="16" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#10b981">🔋 94%</text>
  </g>

  <!-- App Header with Official Icon -->
  <g transform="translate(32, 48)">
    <image href="${logoBase64}" x="0" y="0" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>
    <text x="54" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#ffffff">Pocket Advisor</text>
    <text x="54" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">ANDROID BACKGROUND COMPLIANCE • OEM BATTERY SETUP</text>
  </g>

  <!-- Title & Subtitle inside screenshot -->
  <g transform="translate(32, 104)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Preventing Background App Termination by Phone Manufacturers</text>
    <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="400" fill="#94a3b8">Follow these 3 OEM configurations to ensure the Android telephony listener never goes to sleep.</text>
  </g>

  <!-- 3 Equal Sized Columns (width: 244 each, gap: 22, left margin: 32) -->
  <g transform="translate(32, 154)">
    <!-- Column 1: Xiaomi HyperOS / MIUI -->
    <g transform="translate(0, 0)" filter="url(#f2Shadow)">
      <rect x="0" y="0" width="244" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
      
      <g transform="translate(16, 16)">
        <image href="${logoBase64}" x="0" y="0" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
        <text x="46" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">Xiaomi / Poco</text>
        <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">HyperOS &amp; MIUI</text>
      </g>

      <line x1="16" y1="64" x2="228" y2="64" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Checklist items -->
      <g transform="translate(16, 80)">
        <circle cx="12" cy="12" r="10" fill="#10b981"/>
        <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
        <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Autostart: ON</text>
        <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Allows SMS wake on boot</text>

        <g transform="translate(0, 60)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Battery Saver</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#10b981">Set to "No Restrictions"</text>
        </g>

        <g transform="translate(0, 120)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Lock Recent App</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Pin app card in overview</text>
        </g>
      </g>

      <!-- Bottom Status Centered -->
      <rect x="16" y="316" width="212" height="38" rx="8" fill="rgba(16, 185, 129, 0.15)"/>
      <text x="122" y="340" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">✓ 100% SMS Delivery</text>
    </g>

    <!-- Column 2: Samsung One UI -->
    <g transform="translate(266, 0)" filter="url(#f2Shadow)">
      <rect x="0" y="0" width="244" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
      
      <g transform="translate(16, 16)">
        <image href="${logoBase64}" x="0" y="0" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
        <text x="46" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">Samsung One UI</text>
        <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">Galaxy S, A, M Series</text>
      </g>

      <line x1="16" y1="64" x2="228" y2="64" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Checklist items -->
      <g transform="translate(16, 80)">
        <circle cx="12" cy="12" r="10" fill="#10b981"/>
        <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
        <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Never Sleeping</text>
        <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Add Pocket Advisor</text>

        <g transform="translate(0, 60)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">App Battery</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#10b981">Set to "Unrestricted"</text>
        </g>

        <g transform="translate(0, 120)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Allow Background</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Keep toggled active</text>
        </g>
      </g>

      <!-- Bottom Status Centered -->
      <rect x="16" y="316" width="212" height="38" rx="8" fill="rgba(16, 185, 129, 0.15)"/>
      <text x="122" y="340" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">✓ Zero Sleep Lag</text>
    </g>

    <!-- Column 3: OnePlus / Realme / Oppo -->
    <g transform="translate(532, 0)" filter="url(#f2Shadow)">
      <rect x="0" y="0" width="244" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
      
      <g transform="translate(16, 16)">
        <image href="${logoBase64}" x="0" y="0" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
        <text x="46" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">OnePlus / Oppo</text>
        <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94a3b8">OxygenOS &amp; ColorOS</text>
      </g>

      <line x1="16" y1="64" x2="228" y2="64" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Checklist items -->
      <g transform="translate(16, 80)">
        <circle cx="12" cy="12" r="10" fill="#10b981"/>
        <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
        <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Background Act.</text>
        <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Enable toggle switch</text>

        <g transform="translate(0, 60)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Auto-Launch: ON</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#10b981">Prevents system kill</text>
        </g>

        <g transform="translate(0, 120)">
          <circle cx="12" cy="12" r="10" fill="#10b981"/>
          <path d="M8 12l3 3 5-5" stroke="#ffffff" stroke-width="2" fill="none"/>
          <text x="30" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Quick Freeze: OFF</text>
          <text x="30" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Keep process exempt</text>
        </g>
      </g>

      <!-- Bottom Status Centered -->
      <rect x="16" y="316" width="212" height="38" rx="8" fill="rgba(16, 185, 129, 0.15)"/>
      <text x="122" y="340" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">✓ Continuous Sync</text>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(newsAssetsDir, 'screenshot-battery-optimization.svg'), figure2Svg);
console.log('Figure 2 generated.');

// -------------------------------------------------------------
// ASSET 4: Figure 3 - Categorization & Custom Rules (840 x 560)
// -------------------------------------------------------------
const figure3Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" width="840" height="560">
  <defs>
    <linearGradient id="f3Bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="f3Shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <rect width="840" height="560" rx="20" fill="url(#f3Bg)"/>
  <rect width="840" height="560" rx="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Phone Header Bar -->
  <g transform="translate(32, 16)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">14:38</text>
    <text x="776" y="16" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#c084fc">Settings &gt; Rules</text>
  </g>

  <!-- App Header with Official Icon -->
  <g transform="translate(32, 48)">
    <image href="${logoBase64}" x="0" y="0" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>
    <text x="54" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#ffffff">Pocket Advisor</text>
    <text x="54" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#c084fc">SMART CATEGORIZATION &amp; USER-LEARNED MERCHANT RULES</text>
  </g>

  <!-- Title & Subtitle -->
  <g transform="translate(32, 104)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Automated Tagging Engine &amp; Learned Custom Categories</text>
    <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="400" fill="#94a3b8">Pre-mapped Indian merchants combine with automatic machine-learned rules for neighborhood vendors.</text>
  </g>

  <!-- Two Columns (width: 375 each, gap: 26, left: 32) -->
  <g transform="translate(32, 154)">
    <!-- Left Column: Pre-mapped 350+ Dictionary -->
    <g transform="translate(0, 0)" filter="url(#f3Shadow)">
      <rect x="0" y="0" width="375" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>
      
      <g transform="translate(18, 16)">
        <image href="${logoBase64}" x="0" y="0" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
        <text x="42" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#f8fafc">Pre-Mapped Dictionary</text>
        <text x="42" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#64748b">350+ keywords auto-detected from VPAs</text>
      </g>

      <line x1="18" y1="58" x2="357" y2="58" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Item 1: Groceries -->
      <g transform="translate(16, 68)">
        <rect x="0" y="0" width="343" height="60" rx="10" fill="#020617" stroke="rgba(255,255,255,0.06)"/>
        <text x="24" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">🥦</text>
        <text x="46" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Zepto / Blinkit / Instamart</text>
        <text x="46" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Pattern: zepto|blinkit|instamart</text>
        <rect x="245" y="16" width="84" height="28" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
        <text x="287" y="34" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#10b981">Groceries</text>
      </g>

      <!-- Item 2: Travel -->
      <g transform="translate(16, 138)">
        <rect x="0" y="0" width="343" height="60" rx="10" fill="#020617" stroke="rgba(255,255,255,0.06)"/>
        <text x="24" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">🚕</text>
        <text x="46" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Uber / Ola / Rapido</text>
        <text x="46" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Pattern: uber|ola|rapido|namma</text>
        <rect x="255" y="16" width="74" height="28" rx="6" fill="rgba(56, 189, 248, 0.2)"/>
        <text x="292" y="34" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#38bdf8">Travel</text>
      </g>

      <!-- Item 3: Food -->
      <g transform="translate(16, 208)">
        <rect x="0" y="0" width="343" height="60" rx="10" fill="#020617" stroke="rgba(255,255,255,0.06)"/>
        <text x="24" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">🍔</text>
        <text x="46" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Swiggy / Zomato / EatSure</text>
        <text x="46" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Pattern: swiggy|zomato|eatsure</text>
        <rect x="255" y="16" width="74" height="28" rx="6" fill="rgba(99, 102, 241, 0.2)"/>
        <text x="292" y="34" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#818cf8">Dining</text>
      </g>

      <!-- Item 4: Investment -->
      <g transform="translate(16, 278)">
        <rect x="0" y="0" width="343" height="60" rx="10" fill="#020617" stroke="rgba(255,255,255,0.06)"/>
        <text x="24" y="35" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">📈</text>
        <text x="46" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">Zerodha / Groww / SIP</text>
        <text x="46" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Pattern: zerodha|groww|kite|sip</text>
        <rect x="237" y="16" width="92" height="28" rx="6" fill="rgba(168, 85, 247, 0.2)"/>
        <text x="283" y="34" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#c084fc">Investment</text>
      </g>
    </g>

    <!-- Right Column: User-Learned Custom Rules -->
    <g transform="translate(401, 0)" filter="url(#f3Shadow)">
      <rect x="0" y="0" width="375" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="#c084fc" stroke-width="1.8"/>
      
      <g transform="translate(18, 16)">
        <image href="${logoBase64}" x="0" y="0" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
        <text x="42" y="15" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="800" fill="#ffffff">Learned Custom Rules</text>
        <text x="42" y="30" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="500" fill="#c084fc">Adaptive AI for local neighborhood vendors</text>
      </g>

      <line x1="18" y1="58" x2="357" y2="58" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Rule 1 -->
      <g transform="translate(16, 68)">
        <rect x="0" y="0" width="343" height="72" rx="12" fill="#020617" stroke="rgba(255,255,255,0.1)"/>
        <text x="16" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">"Chai Point CyberHub"</text>
        <text x="16" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Reclassified from Dining &gt; Work Expenses</text>
        <rect x="228" y="21" width="100" height="30" rx="8" fill="rgba(245, 158, 11, 0.2)"/>
        <text x="278" y="41" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#f59e0b">💼 Work Misc</text>
      </g>

      <!-- Rule 2 -->
      <g transform="translate(16, 150)">
        <rect x="0" y="0" width="343" height="72" rx="12" fill="#020617" stroke="rgba(255,255,255,0.1)"/>
        <text x="16" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#f8fafc">"Cult.fit Indiranagar"</text>
        <text x="16" y="46" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Reclassified from Shopping &gt; Fitness</text>
        <rect x="228" y="21" width="100" height="30" rx="8" fill="rgba(16, 185, 129, 0.2)"/>
        <text x="278" y="41" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#10b981">🏋️ Fitness</text>
      </g>

      <!-- Rule Callout Box with Pocket Advisor Icon -->
      <g transform="translate(16, 232)">
        <rect x="0" y="0" width="343" height="116" rx="12" fill="rgba(168, 85, 247, 0.12)" stroke="rgba(168, 85, 247, 0.3)"/>
        <image href="${logoBase64}" x="16" y="14" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
        <text x="52" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="800" fill="#c084fc">Permanent Memory Algorithm</text>
        <text x="16" y="62" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">Whenever you reclassify a vendor once,</text>
        <text x="16" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">Pocket Advisor auto-applies it to all future debits</text>
        <text x="16" y="98" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#10b981">✓ Zero cloud calls • Processed 100% locally</text>
      </g>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(newsAssetsDir, 'screenshot-category-rules.svg'), figure3Svg);
console.log('Figure 3 generated.');

// -------------------------------------------------------------
// ASSET 5: Figure 4 - Privacy Vault & Cloud Backup (840 x 560)
// -------------------------------------------------------------
const figure4Svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 560" width="840" height="560">
  <defs>
    <linearGradient id="f4Bg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="f4Shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <rect width="840" height="560" rx="20" fill="url(#f4Bg)"/>
  <rect width="840" height="560" rx="20" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>

  <!-- Phone Header Bar -->
  <g transform="translate(32, 16)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">14:40</text>
    <text x="776" y="16" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#10b981">Settings &gt; Data Vault</text>
  </g>

  <!-- App Header with Official Icon -->
  <g transform="translate(32, 48)">
    <image href="${logoBase64}" x="0" y="0" width="42" height="42" preserveAspectRatio="xMidYMid meet"/>
    <text x="54" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="800" fill="#ffffff">Pocket Advisor</text>
    <text x="54" y="38" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">DATA SECURITY ARCHITECTURE • 100% HARDWARE ISOLATION</text>
  </g>

  <!-- Title & Subtitle -->
  <g transform="translate(32, 104)">
    <text x="0" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="800" fill="#ffffff">Local SQLCipher AES-256 Vault &amp; Optional Cloud Backup</text>
    <text x="0" y="34" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="400" fill="#94a3b8">Your transactions stay strictly on your phone by default, with voluntary encrypted sync.</text>
  </g>

  <!-- Two Columns (width: 375 each, gap: 26, left: 32) -->
  <g transform="translate(32, 154)">
    <!-- Left Column: Local SQLCipher Encryption -->
    <g transform="translate(0, 0)" filter="url(#f4Shadow)">
      <rect x="0" y="0" width="375" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="#10b981" stroke-width="1.8"/>

      <g transform="translate(20, 20)">
        <image href="${logoBase64}" x="0" y="0" width="36" height="36" preserveAspectRatio="xMidYMid meet"/>
        <text x="46" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff">On-Device Local Vault</text>
        <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">DEFAULT • ALWAYS ACTIVE</text>
      </g>

      <line x1="20" y1="68" x2="355" y2="68" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Specs Rows -->
      <g transform="translate(20, 80)">
        <!-- Row 1 -->
        <rect x="0" y="0" width="335" height="48" rx="10" fill="#020617"/>
        <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">Encryption Cipher</text>
        <text x="14" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">SQLCipher AES-256 (CBC mode)</text>
        <rect x="234" y="11" width="88" height="26" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
        <text x="278" y="28" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#10b981">HARDENED</text>

        <!-- Row 2 -->
        <g transform="translate(0, 56)">
          <rect x="0" y="0" width="335" height="48" rx="10" fill="#020617"/>
          <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">Network Telemetry</text>
          <text x="14" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">SMS data sent to servers</text>
          <rect x="246" y="11" width="76" height="26" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
          <text x="284" y="28" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#10b981">0 BYTES</text>
        </g>

        <!-- Row 3 -->
        <g transform="translate(0, 112)">
          <rect x="0" y="0" width="335" height="48" rx="10" fill="#020617"/>
          <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">Loan Telemarketing</text>
          <text x="14" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">NBFC underwriting / calls</text>
          <rect x="256" y="11" width="66" height="26" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
          <text x="289" y="28" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#10b981">ZERO</text>
        </g>

        <!-- Row 4 -->
        <g transform="translate(0, 168)">
          <rect x="0" y="0" width="335" height="48" rx="10" fill="#020617"/>
          <text x="14" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#f8fafc">OTP Security</text>
          <text x="14" y="36" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#64748b">Verification codes in memory</text>
          <rect x="218" y="11" width="104" height="26" rx="6" fill="rgba(16, 185, 129, 0.2)"/>
          <text x="270" y="28" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#10b981">PURGED &lt;1ms</text>
        </g>
      </g>

      <!-- Hardware Security Footer with Official Icon (Balances height with right column) -->
      <g transform="translate(20, 302)">
        <rect x="0" y="0" width="335" height="52" rx="10" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.2)"/>
        <image href="${logoBase64}" x="12" y="12" width="28" height="28" preserveAspectRatio="xMidYMid meet"/>
        <text x="48" y="23" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#10b981">Hardware Keystore Bound</text>
        <text x="48" y="39" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94a3b8">Master key secured inside Android StrongBox / TEE</text>
      </g>
    </g>

    <!-- Right Column: Optional Cloud Backup -->
    <g transform="translate(401, 0)" filter="url(#f4Shadow)">
      <rect x="0" y="0" width="375" height="370" rx="16" fill="rgba(30, 41, 59, 0.75)" stroke="rgba(255, 255, 255, 0.12)" stroke-width="1.5"/>

      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="36" height="36" rx="10" fill="rgba(56, 189, 248, 0.15)"/>
        <text x="18" y="24" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18">☁️</text>
        <text x="46" y="16" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="800" fill="#ffffff">Optional Cloud Backup</text>
        <text x="46" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="600" fill="#38bdf8">POWERED BY SUPABASE</text>
      </g>

      <line x1="20" y1="68" x2="355" y2="68" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>

      <!-- Toggle Mockup -->
      <g transform="translate(20, 80)">
        <rect x="0" y="0" width="335" height="66" rx="12" fill="#020617" stroke="rgba(255,255,255,0.08)"/>
        <text x="16" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#f8fafc">Cloud Sync &amp; Backup</text>
        <text x="16" y="48" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94a3b8">Sync across multiple Android phones</text>

        <!-- Toggle Switch -->
        <rect x="264" y="18" width="56" height="28" rx="14" fill="#10b981"/>
        <circle cx="306" cy="32" r="11" fill="#ffffff"/>
      </g>

      <!-- Key Benefits List -->
      <g transform="translate(20, 162)">
        <text x="0" y="14" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" fill="#38bdf8">Cryptographic User Control:</text>

        <g transform="translate(0, 24)">
          <circle cx="6" cy="6" r="3.5" fill="#10b981"/>
          <text x="16" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">100% voluntary: Keep data only on-device if preferred</text>
        </g>

        <g transform="translate(0, 46)">
          <circle cx="6" cy="6" r="3.5" fill="#10b981"/>
          <text x="16" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">Row-Level Security (RLS) ensures isolated access</text>
        </g>

        <g transform="translate(0, 68)">
          <circle cx="6" cy="6" r="3.5" fill="#10b981"/>
          <text x="16" y="10" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#cbd5e1">Instant seamless restoration when buying a new phone</text>
        </g>
      </g>

      <!-- Monetization Model Note with Official Pocket Advisor Icon -->
      <g transform="translate(20, 294)">
        <rect x="0" y="0" width="335" height="60" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)"/>
        <image href="${logoBase64}" x="12" y="14" width="32" height="32" preserveAspectRatio="xMidYMid meet"/>
        <text x="52" y="26" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#f8fafc">Monetization Model Transparency:</text>
        <text x="52" y="42" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" fill="#94a3b8">Ad-supported free tier with optional ad-free Pro upgrade.</text>
      </g>
    </g>
  </g>
</svg>`;

fs.writeFileSync(path.resolve(newsAssetsDir, 'screenshot-privacy-vault.svg'), figure4Svg);
console.log('Figure 4 generated.');
console.log('All 5 SVG assets generated successfully with embedded Pocket Advisor official icon!');
