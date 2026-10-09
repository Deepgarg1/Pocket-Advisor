import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  escapeHtml,
  getRouteBodyContent,
  getPrerenderFaqHtml,
  getPrerenderFooterHtml
} from './prerender-content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.pocketadvisor.in';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;
const DIST_DIR = path.resolve(__dirname, '../dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error('[Prerender] Error: dist/index.html not found. Please run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(TEMPLATE_PATH, 'utf8');

const routes = [
  {
    slug: 'split',
    title: 'Bill Splitter App | Split Group Expenses Fairly | Pocket Advisor',
    description: 'Split restaurant bills, group trips, and rent with 2-stage greedy debt minimization. Eliminate tangled debts, calculate tax/tips, and export receipts to WhatsApp for free.',
    canonical: `${BASE_URL}/split`,
    badgeCategory: 'Free Web Tool',
    pillText: '2-Stage Greedy Debt Minimization • No Login Required',
    h1: 'Free Bill Splitter &amp; Group Debt Simplifier',
    h1Gradient: 'Zero Tangled Debts • 1-Tap WhatsApp Receipts',
    heroDesc: 'Split restaurant checks, road trips, and flatmate expenses with mathematical precision. Resolves group debts into the absolute minimum bilateral payments.',
    ctaText: 'Open Bill Splitter',
    ctaHref: '/split',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Pocket Advisor Free Bill Splitter & Debt Simplifier',
        url: `${BASE_URL}/split`,
        image: DEFAULT_IMAGE,
        description: 'Free interactive web bill splitter featuring 2-stage greedy debt minimization, tax & tip calculator, and 1-tap WhatsApp summary export.',
        applicationCategory: 'ProductivityApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        featureList: [
          '2-Stage Greedy Debt Minimization',
          'Itemized Tax and Tip Splitting',
          '1-Tap WhatsApp Settlement Receipt',
          'UPI Payment Deep Links'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` },
          { '@type': 'ListItem', position: 3, name: 'Bill Splitter', item: `${BASE_URL}/split` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does the 2-stage greedy debt minimization bill splitter work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Instead of tangled peer-to-peer transfers where everyone owes each other, Pocket Advisor models all group balances as a bipartite graph and greedily resolves net dues, cutting up to 30 entangled transactions down to the absolute minimum payments.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I use the Quick Bill Splitter without downloading the app or creating an account?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Pocket Advisor provides a 100% free interactive Web Bill Splitter with zero login required. You can split dinner, travel, or rent bills, calculate taxes and tips, and export clean itemized receipts directly to WhatsApp.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'home-loan-prepayment-vs-sip',
    title: 'Home Loan Prepayment vs. SIP Calculator | Pocket Advisor',
    description: 'Should you prepay your home loan or invest in equity SIP? Compare compounded interest saved with mutual fund returns, Sec 24b tax deductions, and 50:50 hybrid strategies online.',
    canonical: `${BASE_URL}/home-loan-prepayment-vs-sip`,
    badgeCategory: 'Financial Strategy',
    pillText: 'Guaranteed Savings vs Compounding Wealth • 50:50 Strategy',
    h1: 'Home Loan Prepayment vs. SIP Calculator',
    h1Gradient: 'Prepay Loan or Invest in Mutual Funds?',
    heroDesc: 'Compare guaranteed interest savings from home loan prepayments against wealth creation through compounding equity SIPs. Factors in Section 24b tax deductions and inflation.',
    ctaText: 'Compare Prepayment vs SIP',
    ctaHref: '/home-loan-prepayment-vs-sip',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Home Loan Prepayment vs. SIP Calculator',
        url: `${BASE_URL}/home-loan-prepayment-vs-sip`,
        image: DEFAULT_IMAGE,
        description: 'Interactive comparison engine evaluating loan interest savings versus mutual fund equity compounding with Section 24b tax adjustments.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        featureList: [
          'Prepayment interest savings calculation',
          'SIP equity compounding projection',
          'Section 24b home loan interest tax adjustment',
          '50:50 hybrid strategy comparison'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` },
          { '@type': 'ListItem', position: 3, name: 'Home Loan Prepayment vs. SIP', item: `${BASE_URL}/home-loan-prepayment-vs-sip` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Should I prepay my home loan or invest in an equity SIP?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Prepaying a home loan gives you a guaranteed, risk-free return equal to your loan interest rate (8.5% - 9.5%), whereas investing in equity SIP offers potential historical compounding returns of 12% - 15% with market volatility. A hybrid 50:50 strategy often balances risk mitigation with long-term wealth creation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Section 24b tax deduction affect loan prepayment decisions?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the Old Tax Regime in India, interest on home loans up to ₹2,00,000 per financial year is deductible under Section 24b. If you prepay your loan, your annual interest may drop below this threshold, reducing your tax savings. This calculator factors in your tax bracket to give your true post-tax effective return.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'flatmates-rent-splitter',
    title: 'Flatmates Rent & Utility Bill Splitter | Pocket Advisor',
    description: 'Split apartment rent, maid, WiFi, and electricity bills fairly with roommates. Generate WhatsApp receipts with 1-tap UPI deep links and 2-stage greedy debt minimization.',
    canonical: `${BASE_URL}/flatmates-rent-splitter`,
    badgeCategory: 'Roommate Utility',
    pillText: 'Fair Roommate Splits • 1-Tap UPI Deep Links',
    h1: 'Flatmates Rent &amp; Utility Bill Splitter',
    h1Gradient: 'Fair Roommate Splits &amp; Direct UPI Settlement',
    heroDesc: 'Split flat rent, maid salaries, cook fees, WiFi, and electricity bills fairly with roommates. Export itemized WhatsApp receipts with 1-tap UPI payment deep links.',
    ctaText: 'Split Flatmate Bills',
    ctaHref: '/flatmates-rent-splitter',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Flatmates Rent & Utility Bill Splitter',
        url: `${BASE_URL}/flatmates-rent-splitter`,
        image: DEFAULT_IMAGE,
        description: 'Roommate bill split calculator with 1-tap UPI payment deep links and greedy settlement optimization for shared apartment expenses.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` },
          { '@type': 'ListItem', position: 3, name: 'Flatmates Rent Splitter', item: `${BASE_URL}/flatmates-rent-splitter` }
        ]
      }
    ]
  },
  {
    slug: 'sip-calculator',
    title: 'SIP Calculator India | Step-Up & Wealth Growth | Pocket Advisor',
    description: 'Calculate compounding mutual fund returns in India with annual step-ups and real inflation discounting. Plan long-term financial goals with accurate wealth projections.',
    canonical: `${BASE_URL}/sip-calculator`,
    badgeCategory: 'Wealth Calculator',
    pillText: 'Compounding Projections • Real Purchasing Power',
    h1: 'Step-Up SIP Wealth Calculator',
    h1Gradient: 'Project Returns with Real Purchasing Power',
    heroDesc: 'Calculate mutual fund compounding wealth with annual step-ups and inflation discounting. Plan retirement and milestone goals with real inflation-adjusted purchasing power.',
    ctaText: 'Calculate SIP Wealth',
    ctaHref: '/sip-calculator',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Step-Up SIP Wealth Calculator',
        url: `${BASE_URL}/sip-calculator`,
        image: DEFAULT_IMAGE,
        description: 'Interactive Step-Up SIP calculator with annual salary increment percentage and real inflation discounting for future purchasing power projection.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` },
          { '@type': 'ListItem', position: 3, name: 'SIP Calculator', item: `${BASE_URL}/sip-calculator` }
        ]
      }
    ]
  },
  {
    slug: 'emi-calculator',
    title: 'Loan EMI Calculator India & Amortization | Pocket Advisor',
    description: 'Calculate exact monthly loan EMIs, interest payable, and payment schedules for personal, car, or home loans with reducing balance interest in India.',
    canonical: `${BASE_URL}/emi-calculator`,
    badgeCategory: 'Loan Calculator',
    pillText: 'Accurate Monthly Installments • Principal vs Interest',
    h1: 'Loan EMI &amp; Amortization Calculator',
    h1Gradient: 'Accurate Monthly Installments &amp; Schedules',
    heroDesc: 'Calculate exact monthly loan EMIs, interest payable, and payment schedules for personal, car, or home loans with reducing balance interest.',
    ctaText: 'Calculate Loan EMI',
    ctaHref: '/emi-calculator',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Loan EMI & Amortization Calculator',
        url: `${BASE_URL}/emi-calculator`,
        image: DEFAULT_IMAGE,
        description: 'Calculate exact monthly loan EMI, total interest payable, reducing balance interest, and complete year-by-year amortization schedules.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` },
          { '@type': 'ListItem', position: 3, name: 'EMI Calculator', item: `${BASE_URL}/emi-calculator` }
        ]
      }
    ]
  },
  {
    slug: 'calculators',
    title: 'Free Bill Splitter, EMI & SIP Calculators | Pocket Advisor',
    description: 'Calculate fair group bill splits with 2-stage greedy debt minimization, export itemized receipts to WhatsApp, and project compounding SIP wealth growth online.',
    canonical: `${BASE_URL}/calculators`,
    badgeCategory: 'Financial Tools',
    pillText: 'Free Web Spending Tools • Zero Registration',
    h1: 'Free Financial Calculators &amp; Spending Tools',
    h1Gradient: 'Bill Splitting • Loan EMI • Compounding SIP',
    heroDesc: 'Free interactive financial tools: 2-stage greedy bill splitter, loan EMI amortization schedules, step-up SIP wealth projections, and home loan prepayment comparisons.',
    ctaText: 'Explore All Tools',
    ctaHref: '/calculators',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Pocket Advisor Financial Calculators Suite',
        url: `${BASE_URL}/calculators`,
        image: DEFAULT_IMAGE,
        description: 'Suite of free financial tools: Bill Splitter with greedy debt reduction, Step-Up SIP Calculator, Loan EMI Amortization, and Home Loan Prepayment vs SIP planner.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: `${BASE_URL}/calculators` }
        ]
      }
    ]
  },
  {
    slug: 'features',
    title: 'App Features & Security Architecture | Pocket Advisor',
    description: 'Discover on-device auto UPI detection, mathematical debt simplification algorithms, privacy-first offline storage, and interactive home screen widgets in Pocket Advisor.',
    canonical: `${BASE_URL}/features`,
    badgeCategory: 'Product Architecture',
    pillText: '100% On-Device Privacy • No Cloud Tracking',
    h1: 'Features &amp; Security Architecture',
    h1Gradient: '100% Private On-Device Spending Intelligence',
    heroDesc: 'Discover how Pocket Advisor detects bank & UPI SMS transactions securely on-device, solves group debt with bipartite graph math, and maintains 100% offline encryption.',
    ctaText: 'Explore Features',
    ctaHref: '/features',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Pocket Advisor',
        operatingSystem: 'Android',
        applicationCategory: 'ProductivityApplication',
        image: DEFAULT_IMAGE,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Features', item: `${BASE_URL}/features` }
        ]
      }
    ]
  },
  {
    slug: 'upi-expense-tracker',
    title: 'UPI Expense Tracker for Android (India) | Pocket Advisor',
    description: 'Track eligible UPI and bank SMS transactions on Android. Learn how supported-message parsing works, where coverage can vary, and how local storage and optional cloud backup are handled.',
    canonical: `${BASE_URL}/upi-expense-tracker`,
    badgeCategory: 'UPI Expense Tracking',
    pillText: 'On-device SMS parsing for supported transaction alerts',
    h1: 'UPI Expense Tracker for Android',
    h1Gradient: 'Supported Bank SMS Transaction Tracking',
    heroDesc: 'Pocket Advisor helps you record eligible transactions from bank SMS alerts for supported banks and payment apps. SMS availability and parsing can vary by bank, account, and message format. Review our Privacy Policy to understand local storage and optional cloud backup.',
    ctaText: 'Get the Android App on Google Play',
    ctaHref: PLAY_STORE_URL,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Pocket Advisor UPI Expense Tracker',
        url: `${BASE_URL}/upi-expense-tracker`,
        image: DEFAULT_IMAGE,
        description: 'Android expense tracker that can parse supported bank transaction SMS alerts on-device. Availability and message formats vary, and optional cloud backup may be enabled in app settings.',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'Android',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        featureList: [
          'Parsing of supported bank transaction SMS alerts',
          'Merchant and category extraction where supported by message format',
          'On-device transaction parsing; review current privacy policy for storage and backup details',
          'Refund and reversal classification where recognizable message patterns are present',
          'No bank login credentials required for SMS parsing; optional cloud backup may be available'
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Features', item: `${BASE_URL}/features` },
          { '@type': 'ListItem', position: 3, name: 'UPI Expense Tracker', item: `${BASE_URL}/upi-expense-tracker` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Pocket Advisor track UPI payments automatically without my bank login?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Some banks send transaction SMS alerts for eligible payments, but delivery, timing, and message format vary. When a supported alert reaches your device, Pocket Advisor can parse available details such as amount and merchant for your ledger. Reconcile your records with your bank statement.'
            }
          },
          {
            '@type': 'Question',
            name: 'Are my financial SMS messages uploaded to your cloud servers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SMS parsing and categorization are designed to run on your Android device. If you enable optional cloud backup, selected app data may sync according to your settings and the Privacy Policy. Review the app’s current privacy disclosures for encryption and data-sync details.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does Pocket Advisor handle failed transactions and refunds?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pocket Advisor may identify refunds and transfers from recognizable message patterns. Classification can vary by bank and message format, so review these entries and correct them if they are categorized incorrectly.'
            }
          },
          {
            '@type': 'Question',
            name: 'Which Indian banks and UPI apps are supported?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Coverage depends on supported bank and payment-message formats. Check the current in-app supported-message information and review imported transactions, because not every bank or payment will generate a parseable alert.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'download',
    title: 'Download Pocket Advisor for Android | Free Expense Tracker',
    description: 'Install Pocket Advisor directly from Google Play. Track UPI expenses automatically, manage group splits, and plan your wealth privately.',
    canonical: `${BASE_URL}/download`,
    badgeCategory: 'Android App',
    pillText: 'Google Play & Direct APK Download',
    h1: 'Download Pocket Advisor for Android',
    h1Gradient: 'Smart Spending Tracker &amp; Bill Splitter',
    heroDesc: 'Install Pocket Advisor directly on your Android phone. Automatically track UPI expenses, split group expenses without debt, and plan wealth privately.',
    ctaText: 'Get on Google Play',
    ctaHref: 'https://play.google.com/store/apps/details?id=com.pocketadvisor.app',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Pocket Advisor',
        operatingSystem: 'Android',
        applicationCategory: 'ProductivityApplication',
        image: DEFAULT_IMAGE,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Download', item: `${BASE_URL}/download` }
        ]
      }
    ]
  },
  {
    slug: 'faq',
    title: 'Frequently Asked Questions (FAQ) | Pocket Advisor',
    description: 'Learn how Pocket Advisor detects bank and UPI SMS transactions securely on-device, how debt minimization cuts group transfers, and why zero server tracking protects your privacy.',
    canonical: `${BASE_URL}/faq`,
    badgeCategory: 'Support & Knowledge Base',
    pillText: 'Everything You Need to Know',
    h1: 'Frequently Asked Questions',
    h1Gradient: 'Transparency, Security &amp; Features',
    heroDesc: 'Learn how Pocket Advisor detects bank and UPI SMS transactions securely on-device, how greedy debt minimization works, and how our zero-cloud policy ensures privacy.',
    ctaText: 'Read FAQs',
    ctaHref: '/faq',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Pocket Advisor track bank and UPI expenses automatically?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pocket Advisor securely detects incoming banking and payment SMS alerts (HDFC, SBI, ICICI, Axis, Bandhan, and major Indian banks) directly on your Android device using deterministic regex parsing under Google Play\'s financial SMS policy. All data stays 100% encrypted and local on your phone with zero server tracking.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does the 2-stage greedy debt minimization bill splitter work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Instead of tangled peer-to-peer transfers where everyone owes each other, Pocket Advisor models all group debts as a bipartite graph and greedily resolves net balances, cutting up to 30 entangled transactions down to the absolute minimum payments.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Pocket Advisor free and safe to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, Pocket Advisor is completely free, does not ask for netbanking passwords or OTPs, operates 100% offline, and never sells your spending data.'
            }
          }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${BASE_URL}/faq` }
        ]
      }
    ]
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy & Offline Data Security | Pocket Advisor',
    description: "Pocket Advisor's privacy policy. Learn how all spending records, UPI alerts, and accounts remain strictly encrypted on your local Android device.",
    canonical: `${BASE_URL}/privacy`,
    badgeCategory: 'Legal & Privacy',
    pillText: '100% Offline-First • Zero Cloud Tracking',
    h1: 'Privacy Policy &amp; Security Architecture',
    h1Gradient: 'Your Financial Data Stays 100% on Your Phone',
    heroDesc: 'Pocket Advisor operates entirely offline. We never upload your transactions, bank SMS alerts, or spending records to external servers.',
    ctaText: 'Read Privacy Policy',
    ctaHref: '/privacy',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy | Pocket Advisor',
        url: `${BASE_URL}/privacy`,
        description: 'Privacy policy explaining local on-device encryption and zero tracking in Pocket Advisor.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: `${BASE_URL}/privacy` }
        ]
      }
    ]
  },
  {
    slug: 'terms',
    title: 'Terms & Conditions — Pocket Advisor',
    description: 'Terms and conditions of using the Pocket Advisor mobile application and web spending tools.',
    canonical: `${BASE_URL}/terms`,
    badgeCategory: 'Legal Guidelines',
    pillText: 'Terms of Service',
    h1: 'Terms &amp; Conditions',
    h1Gradient: 'Guidelines for Using Pocket Advisor',
    heroDesc: 'Review the terms of service governing the Pocket Advisor Android mobile application and online financial utilities.',
    ctaText: 'Read Terms & Conditions',
    ctaHref: '/terms',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Terms & Conditions | Pocket Advisor',
        url: `${BASE_URL}/terms`,
        description: 'Terms and conditions for Pocket Advisor.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Terms', item: `${BASE_URL}/terms` }
        ]
      }
    ]
  },
  {
    slug: 'refund',
    title: 'Cancellation & Refund Policy | Pocket Advisor',
    description: 'Learn about cancellation terms, refund eligibility, Google Play subscription management, and customer support for Pocket Advisor.',
    canonical: `${BASE_URL}/refund`,
    badgeCategory: 'Customer Guarantee',
    pillText: 'Fair Trading & Transparency',
    h1: 'Cancellation &amp; Refund Policy',
    h1Gradient: 'Subscription Terms &amp; Google Play Billing',
    heroDesc: 'Review the cancellation and refund policy for Pocket Advisor Android application and web utilities. Clear terms, 1-tap Google Play cancellations, and prompt support.',
    ctaText: 'View Refund Policy',
    ctaHref: '/refund',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Cancellation & Refund Policy | Pocket Advisor',
        url: `${BASE_URL}/refund`,
        description: 'Cancellation and refund policy for Pocket Advisor Android application and in-app subscriptions via Google Play Billing.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Refund Policy', item: `${BASE_URL}/refund` }
        ]
      }
    ]
  },
  {
    slug: 'delete-account',
    title: 'Account & Cloud Data Deletion Request — Pocket Advisor',
    description: 'Self-service data removal portal to purge cloud backup records and delete your Pocket Advisor account.',
    canonical: `${BASE_URL}/delete-account`,
    badgeCategory: 'Data Privacy Portal',
    pillText: 'Self-Service Account Removal',
    h1: 'Account &amp; Data Deletion Request',
    h1Gradient: 'Complete Data Removal Control',
    heroDesc: 'Submit a request to permanently purge all associated authentication credentials and backup records from Pocket Advisor.',
    ctaText: 'Proceed to Data Deletion',
    ctaHref: '/delete-account',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Account & Cloud Data Deletion Request | Pocket Advisor',
        url: `${BASE_URL}/delete-account`,
        description: 'Self-service data removal portal to purge cloud backup records and delete your Pocket Advisor account.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Delete Account', item: `${BASE_URL}/delete-account` }
        ]
      }
    ]
  },
  {
    slug: 'contact',
    title: 'Contact Us & Customer Support | Pocket Advisor',
    description: 'Get in touch with the Pocket Advisor engineering and customer support team. Inquiries for app support, bug reports, feature suggestions, and data privacy.',
    canonical: `${BASE_URL}/contact`,
    badgeCategory: 'Support & Help Desk',
    pillText: 'Official Customer Support & Developer Inquiries',
    h1: 'Contact Us &amp; Customer Support',
    h1Gradient: 'We Are Here to Help with Pocket Advisor',
    heroDesc: 'Have a question about on-device expense tracking, bill splitting algorithms, or data privacy? Our support and engineering team responds within 24 hours.',
    ctaText: 'Open Contact Form',
    ctaHref: '/contact',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Us & Customer Support | Pocket Advisor',
        url: `${BASE_URL}/contact`,
        description: 'Customer support, developer contact, bug reports, and data privacy inquiries for Pocket Advisor.',
        mainEntity: {
          '@type': 'Organization',
          name: 'Pocket Advisor',
          url: BASE_URL,
          contactPoint: [
            {
              '@type': 'ContactPoint',
              contactType: 'customer support',
              email: 'support@pocketadvisor.in',
              availableLanguage: ['English', 'Hindi']
            },
            {
              '@type': 'ContactPoint',
              contactType: 'privacy officer',
              email: 'privacy@pocketadvisor.in',
              availableLanguage: ['English', 'Hindi']
            }
          ]
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Contact Us', item: `${BASE_URL}/contact` }
        ]
      }
    ]
  },
  {
    slug: 'news',
    title: 'Engineering & Spending Updates Blog — Pocket Advisor',
    description: 'Deep dives on offline-first database syncing, mathematical debt minimization algorithms, and spending security in the UPI era.',
    canonical: `${BASE_URL}/news`,
    badgeCategory: 'Engineering Blog',
    pillText: 'Technical Articles & Architecture Deep Dives',
    h1: 'Engineering &amp; Spending Updates',
    h1Gradient: 'Algorithms, Offline Architecture &amp; UPI Security',
    heroDesc: 'Explore engineering deep dives on SQLite caching, greedy bipartite debt graph resolution, and privacy-first Android systems.',
    ctaText: 'Read Latest Articles',
    ctaHref: '/news',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Pocket Advisor Engineering & Spending Updates',
        url: `${BASE_URL}/news`,
        description: 'Technical articles on offline-first database design, math algorithms, and personal finance.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles & Guides', item: `${BASE_URL}/news` }
        ]
      }
    ]
  },
  {
    slug: 'news/diwali-2026-how-to-track-upi-spending',
    title: 'Diwali 2026 Budget: How to Track UPI Spending & Avoid Overspending | Pocket Advisor',
    description: 'Stop letting festive UPI transactions drain your savings. Discover how to track Google Pay, PhonePe, and Paytm expenses from bank SMS, avoid credit leaks, and manage your Diwali budget with real NPCI data and interactive templates.',
    canonical: `${BASE_URL}/news/diwali-2026-how-to-track-upi-spending`,
    badgeCategory: 'Festive Budgeting Guide',
    pillText: 'Diwali 2026 • NPCI Data & UPI Budgeting Hub',
    h1: 'Diwali 2026 Budget: Track UPI Spending',
    h1Gradient: '&amp; Avoid Overspending',
    heroDesc: 'A data-backed, zero-stress guide to controlling festive UPI micro-transactions, setting category limits, and splitting celebration costs automatically.',
    ctaText: 'Open Bill Splitter',
    ctaHref: '/split',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Diwali 2026 Budget: How to Track UPI Spending & Avoid Overspending',
        description: 'Stop letting festive UPI transactions drain your savings. Discover how to track Google Pay, PhonePe, and Paytm expenses from bank SMS, avoid credit leaks, and manage your Diwali budget with real NPCI data and interactive templates.',
        image: `${BASE_URL}/assets/news/diwali-budget-guide.webp`,
        datePublished: '2026-10-05T00:00:00+05:30',
        dateModified: '2026-10-08T00:00:00+05:30',
        author: { '@type': 'Person', name: 'Deepesh Garg', jobTitle: 'Product & Personal Finance Desk', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/news/diwali-2026-how-to-track-upi-spending`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles & Guides', item: `${BASE_URL}/news` },
          { '@type': 'ListItem', position: 3, name: 'Diwali 2026 UPI Spending Guide', item: `${BASE_URL}/news/diwali-2026-how-to-track-upi-spending` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How can I track my Diwali expenses across Google Pay, PhonePe, and Paytm in one place?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every time you scan a QR code with Google Pay, PhonePe, or Paytm, your bank sends you a transaction SMS alert. Pocket Advisor monitors these SMS alerts locally on your Android device, extracting the merchant name, amount, and account into a unified festive dashboard in real time.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Pocket Advisor require netbanking passwords, bank logins, or OTPs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Pocket Advisor never asks for bank account numbers, passwords, OTPs, or UPI PINs. All spending analysis happens strictly from local transaction SMS records stored natively on your phone without uploading any data to external servers.'
            }
          },
          {
            '@type': 'Question',
            name: 'How much of my monthly income should I budget for Diwali?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Financial planners recommend capping total festive spending between 15% and 20% of your net monthly take-home income (or your earmarked festive bonus). Never compromise your emergency fund or ongoing mutual fund SIP investments for temporary festival shopping.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is there any extra fee or MDR charge on UPI transactions this Diwali?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The National Payments Corporation of India (NPCI) and the Ministry of Finance have confirmed that UPI payments remain 100% free for consumers.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'news/welcome-to-pocket-advisor',
    title: 'Welcome to Pocket Advisor: Intelligent, Private Wealth Tracking | Pocket Advisor',
    description: 'Stop manually typing every expense. Discover how Pocket Advisor pairs on-device bank SMS intelligence with 2-stage greedy bill splitting and advanced compounding wealth projections.',
    canonical: `${BASE_URL}/news/welcome-to-pocket-advisor`,
    badgeCategory: 'Product Launch',
    pillText: 'Android Native • Privacy-First Architecture',
    h1: 'Welcome to Pocket Advisor',
    h1Gradient: 'Intelligent, Private Wealth Tracking',
    heroDesc: 'Stop manually typing every expense. Meet the Android app that automatically tracks your UPI spending with zero cloud tracking.',
    ctaText: 'Download Android App',
    ctaHref: '/download',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Welcome to Pocket Advisor: Intelligent, Private Wealth Tracking',
        description: 'Why we built an Android-native financial companion designed around privacy, zero manual entry, and debt simplification.',
        image: `${BASE_URL}/assets/news/welcome-pocket-advisor.webp`,
        datePublished: '2026-09-12T00:00:00+05:30',
        dateModified: '2026-10-08T00:00:00+05:30',
        author: { '@type': 'Organization', name: 'Pocket Advisor Core Team', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/news/welcome-to-pocket-advisor`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles & Guides', item: `${BASE_URL}/news` },
          { '@type': 'ListItem', position: 3, name: 'Welcome to Pocket Advisor', item: `${BASE_URL}/news/welcome-to-pocket-advisor` }
        ]
      }
    ]
  },
  {
    slug: 'news/track-upi-expenses-automatically',
    title: 'How to Track UPI Expenses Automatically in India (2026) | Pocket Advisor',
    description: 'A complete step-by-step guide to tracking Google Pay, PhonePe, Paytm, and CRED transactions automatically in India from bank SMS. Covers on-device regex detection, OEM battery setup, missed SMS handling, custom category rules, and SQLCipher AES-256 privacy.',
    canonical: `${BASE_URL}/news/track-upi-expenses-automatically`,
    badgeCategory: 'Step-by-Step Android Guide',
    pillText: 'Automated UPI Tracking • On-Device Privacy Architecture',
    h1: 'How to Track UPI Expenses Automatically in India',
    h1Gradient: 'On-Device SMS Detection &amp; Zero Manual Entry (2026)',
    heroDesc: 'Stop typing every chai and grocery purchase manually. Learn how to track UPI spending across Google Pay, PhonePe, and Paytm with on-device regex parsing, Android battery setup, and SQLCipher encryption.',
    ctaText: 'Get Pocket Advisor on Google Play',
    ctaHref: PLAY_STORE_URL,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Track UPI Expenses Automatically in India (2026 Step-by-Step Guide)',
        description: 'A complete step-by-step guide to tracking Google Pay, PhonePe, Paytm, and CRED transactions automatically in India from bank SMS. Covers on-device regex detection, OEM battery setup, missed SMS handling, custom category rules, and SQLCipher AES-256 privacy.',
        image: `${BASE_URL}/assets/news/track-upi-expenses-automatically.svg`,
        datePublished: '2026-10-09T00:00:00+05:30',
        dateModified: '2026-10-09T00:00:00+05:30',
        author: { '@type': 'Person', name: 'Deepesh Garg', jobTitle: 'Product & Systems Architecture Desk', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/news/track-upi-expenses-automatically`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Articles & Guides', item: `${BASE_URL}/news` },
          { '@type': 'ListItem', position: 3, name: 'Track UPI Expenses Automatically', item: `${BASE_URL}/news/track-upi-expenses-automatically` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does Pocket Advisor detect my UPI transactions automatically?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Every time you scan a QR code with Google Pay, PhonePe, Paytm, or CRED, your bank sends an instant confirmation SMS alert. Pocket Advisor processes this SMS in under 15ms directly on your Android phone using a deterministic regex grammar engine, without sending any data over the internet.'
            }
          },
          {
            '@type': 'Question',
            name: 'What permissions are required to track UPI payments automatically?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pocket Advisor requires local SMS read/receive permissions under Google Play\'s official \'Financial Money Management Exception\' policy. It never requests bank passwords, netbanking credentials, OTPs, or UPI PINs.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why does automatic tracking stop working after a few hours on my phone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Aggressive Android manufacturer battery managers (such as Xiaomi\'s HyperOS/MIUI, Samsung\'s One UI, or OnePlus\'s OxygenOS) put background apps to sleep to save battery. Setting Pocket Advisor\'s battery optimization to \'Unrestricted / No Restrictions\' and enabling \'Autostart\' keeps the SMS listener active continuously.'
            }
          },
          {
            '@type': 'Question',
            name: 'What happens if my bank doesn\'t send an SMS for small UPI payments below ₹100?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In 2024–2026, several Indian banks waived SMS alerts for micro-transactions under ₹100. Pocket Advisor solves this through its 1-tap Home Screen Quick-Add Widget and bank balance delta reconciliation: when the next SMS arrives with your updated balance, Pocket Advisor alerts you to reconcile the difference.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I back up my spending data to the cloud?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. By default, Pocket Advisor stores everything 100% offline in a local SQLCipher AES-256 encrypted database. If you switch phones or want multi-device sync, you can enable optional Cloud Backup (powered by Supabase) with complete user control.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is Pocket Advisor free, and are there advertisements?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pocket Advisor provides an ad-supported free tier with clean, non-intrusive display ads. Users can also upgrade to an optional ad-free Pro tier. Crucially, we never sell your financial records or broker predatory personal loans.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'how-to-split-rent-unequal-rooms',
    title: 'Split Rent Fairly for Unequal Rooms | Pocket Advisor',
    description: 'Learn how to split apartment rent fairly when room sizes are different. Master vs small bedroom 50/50 square footage math and 1-tap WhatsApp UPI settlements.',
    canonical: `${BASE_URL}/how-to-split-rent-unequal-rooms`,
    badgeCategory: 'Roommate Rent Guide',
    pillText: 'Mathematical 50/50 Square Footage Framework',
    h1: 'How to Split Apartment Rent Fairly When Room Sizes Are Different',
    h1Gradient: 'Master Bedroom vs. Small Bedroom Rent Formula',
    heroDesc: 'Master bedroom vs. small bedroom: the mathematical 50/50 square-footage framework, attached bathroom weighting, and 1-tap WhatsApp settlements.',
    ctaText: 'Launch Flatmates Rent Splitter',
    ctaHref: '/flatmates-rent-splitter',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Split Apartment Rent Fairly When Room Sizes Are Different',
        description: 'Master bedroom vs. small bedroom: the mathematical 50/50 square-footage framework, attached bathroom weighting, and 1-tap WhatsApp settlements.',
        image: DEFAULT_IMAGE,
        datePublished: '2026-09-27T00:00:00+05:30',
        dateModified: '2026-10-08T00:00:00+05:30',
        author: { '@type': 'Organization', name: 'Pocket Advisor Financial Engineering Team', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/how-to-split-rent-unequal-rooms`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Split Rent Fairly for Unequal Rooms', item: `${BASE_URL}/how-to-split-rent-unequal-rooms` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How should rent be split when one room is much bigger with an ensuite bath?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Divide rent into two 50% pools: 50% Common Space Pool split equally by headcount, and 50% Private Bedroom Pool split proportionally based on square footage and attached bathroom amenities.'
            }
          },
          {
            '@type': 'Question',
            name: 'Do roommates need to install Pocket Advisor to settle rent?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The web rent splitter generates instant WhatsApp receipts with pre-configured 1-tap UPI payment deep links. Roommates tap once to pay directly via Google Pay or PhonePe.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'home-loan-prepayment-vs-mutual-funds',
    title: 'Home Loan Prepayment vs Mutual Funds | Pocket Advisor',
    description: 'Should you prepay your home loan or invest in mutual funds? Discover the 50:50 hybrid strategy, Section 24b tax reality, and historical compounding math.',
    canonical: `${BASE_URL}/home-loan-prepayment-vs-mutual-funds`,
    badgeCategory: 'Wealth Engineering Guide',
    pillText: 'Debt Freedom vs Equity Compounding',
    h1: 'Should You Prepay Your Home Loan or Invest in Mutual Funds?',
    h1Gradient: 'The 50:50 Hybrid Wealth Strategy Explained',
    heroDesc: 'Compare guaranteed interest savings from home loan prepayments against wealth creation through compounding equity SIPs. Factors in Section 24b tax deductions and inflation.',
    ctaText: 'Run Prepayment vs. SIP Simulator',
    ctaHref: '/home-loan-prepayment-vs-sip',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Should You Prepay Your Home Loan or Invest in Mutual Funds?',
        description: 'The 50:50 hybrid strategy explained: balancing guaranteed debt reduction with mutual fund compounding, Section 24b tax reality, and rising interest cycles.',
        image: DEFAULT_IMAGE,
        datePublished: '2026-09-27T00:00:00+05:30',
        dateModified: '2026-10-08T00:00:00+05:30',
        author: { '@type': 'Organization', name: 'Pocket Advisor Financial Engineering Team', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/home-loan-prepayment-vs-mutual-funds`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Home Loan Prepayment vs Mutual Funds', item: `${BASE_URL}/home-loan-prepayment-vs-mutual-funds` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the 50:50 Hybrid Strategy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The 50:50 strategy splits monthly surplus cash equally: 50% prepays home loan principal to save interest and shorten tenure, while 50% compounds in an equity mutual fund SIP to build multi-crore liquid wealth.'
            }
          },
          {
            '@type': 'Question',
            name: 'Should I prepay if I am under the New Tax Regime?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the New Tax Regime, Section 24b interest deductions are not available for self-occupied homes, making your effective borrowing cost equal to the full loan interest rate (~8.5%), which increases the financial benefit of prepaying.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'how-to-track-upi-payments-automatically',
    title: 'Track UPI Payments Automatically on Android | Pocket Advisor',
    description: 'How to track UPI and bank expenses automatically on Android without netbanking passwords or cloud data leaks. Discover on-device SMS parsing privacy.',
    canonical: `${BASE_URL}/how-to-track-upi-payments-automatically`,
    badgeCategory: 'Security & Privacy Guide',
    pillText: '100% On-Device • Zero Cloud Tracking',
    h1: 'How to Track UPI Payments Automatically Without Giving Netbanking Credentials',
    h1Gradient: 'Zero-Trust Android Security &amp; On-Device Privacy',
    heroDesc: 'Why cloud-based expense trackers and netbanking credential logins compromise your privacy, and how Pocket Advisor uses 100% on-device SMS parsing under Google Play\'s financial exception.',
    ctaText: 'Download Pocket Advisor Free',
    ctaHref: '/download',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'How to Track UPI Payments Automatically Without Giving Netbanking Credentials',
        description: 'Why cloud-based expense trackers and netbanking credential logins compromise your privacy, and how Pocket Advisor uses 100% on-device SMS parsing under Google Play\'s financial exception.',
        image: DEFAULT_IMAGE,
        datePublished: '2026-09-27T00:00:00+05:30',
        dateModified: '2026-10-08T00:00:00+05:30',
        author: { '@type': 'Organization', name: 'Pocket Advisor Security Engineering Team', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/how-to-track-upi-payments-automatically`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Track UPI Payments Automatically', item: `${BASE_URL}/how-to-track-upi-payments-automatically` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can Pocket Advisor read my banking OTPs or private text messages?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Pocket Advisor processes bank SMS strictly on-device under Google Play\'s financial money management exception. It only parses verified debit/credit confirmation messages, instantly discards OTPs and personal chats in memory, and never uploads SMS text to any server.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Pocket Advisor work offline without internet?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, 100%. All transaction parsing, database insertion, and analytics run entirely on your phone local CPU with zero cloud transmission.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'best-expense-tracker-apps-india',
    title: 'Best Expense Tracker Apps in India (2026): Architectural Comparison | Pocket Advisor',
    description: 'An architectural comparison of India’s personal finance apps across 4 models: on-device SMS parsers, Account Aggregators, cloud credit hubs, and manual web ledgers.',
    canonical: `${BASE_URL}/best-expense-tracker-apps-india`,
    badgeCategory: 'Architectural Comparison Guide',
    pillText: 'Objective Technical Analysis • Category Framework',
    h1: 'Best Expense Tracker Apps in India (2026): An Architectural Comparison',
    h1Gradient: 'Offline-First SMS vs Account Aggregators vs Cloud Credit Hubs vs Web Ledgers',
    heroDesc: 'An objective, technical evaluation of India’s 4 dominant personal finance architectures: on-device SMS parsers, Account Aggregators (AA), cloud credit marketplaces, and manual web tools. Compare privacy, cloud sync options, and business models.',
    ctaText: 'Get Pocket Advisor on Google Play',
    ctaHref: PLAY_STORE_URL,
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Best Expense Tracker Apps in India (2026): An Architectural Comparison',
        description: 'An objective, technical evaluation of India’s 4 dominant personal finance architectures: on-device SMS parsers, Account Aggregators (AA), cloud credit marketplaces, and manual web tools. Compare privacy, cloud sync options, and business models.',
        image: DEFAULT_IMAGE,
        datePublished: '2026-10-09T00:00:00+05:30',
        dateModified: '2026-10-09T00:00:00+05:30',
        author: { '@type': 'Organization', name: 'Pocket Advisor Financial Engineering Team', url: BASE_URL },
        publisher: { '@type': 'Organization', name: 'Pocket Advisor', logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE } },
        mainEntityOfPage: `${BASE_URL}/best-expense-tracker-apps-india`
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` },
          { '@type': 'ListItem', position: 3, name: 'Best Expense Tracker Apps India', item: `${BASE_URL}/best-expense-tracker-apps-india` }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can Pocket Advisor back up my expenses to the cloud?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Pocket Advisor gives you full control over your data. By default, it operates 100% offline using on-device SQLCipher AES-256 encryption. If you wish to sync across devices or prevent data loss when changing phones, you can enable optional Cloud Backup (powered by Supabase) at any time.'
            }
          },
          {
            '@type': 'Question',
            name: 'How is Pocket Advisor monetized if you don\'t push personal loans?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Pocket Advisor provides a free ad-supported tier with standard, clean mobile display ads. Users who prefer a completely ad-free experience can upgrade to Pocket Advisor Pro. Crucially, we never sell user financial data, broker NBFC loans, or make telemarketing calls.'
            }
          },
          {
            '@type': 'Question',
            name: 'Is it safe to give SMS permissions to an expense tracker in India?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'It depends on whether parsing is done on-device or on a remote server. Pocket Advisor processes bank messages 100% locally on your Android device using deterministic regex and immediately purges OTPs and non-financial messages in memory. Apps that upload your raw SMS inbox to remote servers expose your financial history to data breaches and loan marketing.'
            }
          },
          {
            '@type': 'Question',
            name: 'Why isn\'t automated SMS tracking available on iPhone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Apple\'s iOS operating system does not allow third-party apps to read SMS messages in the background. Android permits this under Google Play\'s Financial Exception policy. On iPhone, automated options rely on the RBI Account Aggregator framework, which requires subscription fees to maintain server infrastructure.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between Account Aggregator and SMS tracking?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'SMS tracking parses instant debit alerts sent by your bank to your device locally with zero external dependencies. Account Aggregators (AA) query your bank\'s servers directly via RBI-regulated intermediaries. AA works on iPhone and doesn\'t require SMS access, but depends on bank server uptime and requires paid subscriptions or loan cross-selling to cover API query fees.'
            }
          }
        ]
      }
    ]
  },
  {
    slug: 'guides',
    title: 'Financial Problem-Solving Guides | Pocket Advisor',
    description: 'In-depth financial engineering guides for roommate rent splits, home loan prepayment vs mutual fund investing, and automatic private on-device UPI tracking.',
    canonical: `${BASE_URL}/guides`,
    badgeCategory: 'Knowledge Base',
    pillText: 'People-First Problem Solving',
    h1: 'Problem-Solving Financial Guides',
    h1Gradient: 'Mathematical Precision &amp; On-Device Privacy',
    heroDesc: 'In-depth, mathematically verified guides solving real personal finance challenges: unequal roommate rent splits, home loan prepayment vs mutual fund investing, and private on-device UPI tracking.',
    ctaText: 'Explore All Guides',
    ctaHref: '/guides',
    schemas: [
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Pocket Advisor Financial Problem-Solving Guides',
        url: `${BASE_URL}/guides`,
        description: 'In-depth financial engineering guides for roommate rent splits, home loan prepayment vs mutual fund investing, and automatic private on-device UPI tracking.'
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: `${BASE_URL}/guides` }
        ]
      }
    ]
  }
];

console.log(`[Prerender] Starting build-time static HTML generation for ${routes.length} routes...`);

for (const route of routes) {
  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(route.title)}</title>`);

  // 2. Replace Meta Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(route.description)}" />`
  );

  // 3. Replace Canonical Link
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // 4. Replace OpenGraph Tags
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  );
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );

  // 5. Replace Twitter Card Tags
  html = html.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  );

  // 6. Replace Structured Data JSON-LD
  const schemasHtml = route.schemas
    .map((s) => `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
    .join('\n\n');

  html = html.replace(
    /<!-- STRUCTURED_DATA_START -->[\s\S]*?<!-- STRUCTURED_DATA_END -->/i,
    `<!-- STRUCTURED_DATA_START -->\n${schemasHtml}\n    <!-- STRUCTURED_DATA_END -->`
  );

  // 7. Extract FAQ Schema if present to render visible FAQs matching structured data
  const faqSchema = route.schemas.find((s) => s['@type'] === 'FAQPage');
  const visibleFaqHtml = faqSchema ? getPrerenderFaqHtml(faqSchema) : '';

  // 8. Extract Rich Substantive Body Content for this route
  const bodyContentHtml = getRouteBodyContent(route.slug);

  // 9. Semantic Footer Shell with crawlable internal links
  const footerShellHtml = getPrerenderFooterHtml();

  // 10. Replace App Shell within #root
  const shellReplacement = `<!-- SHELL_ROOT_START -->
      <!-- Pre-rendered Static Shell: Visible in <250ms for users & search crawlers -->
      <header class="shell-header">
        <a href="/" style="display: flex; align-items: center; gap: 12px; text-decoration: none;">
          <img src="/logo.webp" alt="Pocket Advisor Logo" width="40" height="40" style="border-radius: 10px; display: block;" />
          <span style="font-weight: 800; font-size: 1.15rem; letter-spacing: -0.01em; color: #f8fafc;">Pocket Advisor</span>
        </a>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 0.8rem; font-weight: 700; padding: 6px 12px; border-radius: 9999px; background: rgba(99, 102, 241, 0.15); color: #818cf8;">${escapeHtml(route.badgeCategory)}</span>
        </div>
      </header>

      <main style="flex: 1;">
        <section class="shell-hero">
          <div style="width: 84px; height: 84px; margin-bottom: 20px; position: relative; display: flex; align-items: center; justify-content: center;">
            <img src="/logo.webp" alt="Pocket Advisor" width="84" height="84" fetchpriority="high" style="border-radius: 22px; width: 84px; height: 84px; object-fit: contain; box-shadow: 0 12px 36px rgba(0,0,0,0.4);" />
          </div>

          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 9999px; background: rgba(99, 102, 241, 0.14); border: 1px solid rgba(99, 102, 241, 0.3); color: #818cf8; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px;">
            <span>${escapeHtml(route.pillText)}</span>
          </div>

          <h1 class="shell-title">
            ${route.h1}<br />
            <span class="shell-gradient-text">${route.h1Gradient}</span>
          </h1>

          <p class="shell-desc">
            ${escapeHtml(route.heroDesc)}
          </p>

          <div style="display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-bottom: 36px;">
            <a href="${route.ctaHref}" class="shell-btn">
              <span>${escapeHtml(route.ctaText)}</span>
            </a>
          </div>
        </section>

        ${bodyContentHtml}

        ${visibleFaqHtml}
      </main>

      ${footerShellHtml}
      <!-- SHELL_ROOT_END -->`;

  html = html.replace(
    /<!-- SHELL_ROOT_START -->[\s\S]*?<!-- SHELL_ROOT_END -->/i,
    shellReplacement
  );

  // Write to dist/<route>/index.html
  const routeDir = path.join(DIST_DIR, route.slug);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  const routeIndexPath = path.join(routeDir, 'index.html');
  fs.writeFileSync(routeIndexPath, html, 'utf8');

  // Also write to dist/<route>.html for clean URL direct serving
  const routeDirectHtmlPath = path.join(DIST_DIR, `${route.slug}.html`);
  fs.writeFileSync(routeDirectHtmlPath, html, 'utf8');

  console.log(`[Prerender]  Generated /${route.slug} -> dist/${route.slug}/index.html & dist/${route.slug}.html`);
}

// Copy public/404.html to dist/404.html if it exists
const public404Path = path.resolve(__dirname, '../public/404.html');
const dist404Path = path.join(DIST_DIR, '404.html');
if (fs.existsSync(public404Path)) {
  fs.copyFileSync(public404Path, dist404Path);
  console.log('[Prerender]  Copied 404.html -> dist/404.html');
}

console.log('[Prerender] All routes successfully prerendered with rich content!');
