/**
 * Dynamic SEO and Metadata Manager for Pocket Advisor Web
 * Automatically syncs document.title, meta descriptions, Open Graph, and Twitter tags
 * across SPA route changes and dynamic Notion article views.
 */

export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
}

const DEFAULT_IMAGE = 'https://www.pocketadvisor.in/logo.png';
const BASE_URL = 'https://www.pocketadvisor.in';

export const ROUTE_SEO: Record<string, PageMetadata> = {
  home: {
    title: 'Expense Tracker App for Android in India | Pocket Advisor',
    description: 'Track eligible bank and UPI SMS alerts on Android, review spending, plan budgets, set bill reminders, and split group expenses with Pocket Advisor.',
    canonical: `${BASE_URL}/`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'monthly-budget-planner': {
    title: 'Monthly Budget Planner India (50/30/20) | Pocket Advisor',
    description: 'Plan your monthly budget in India with the 50/30/20 rule. Edit expenses, compare needs, wants and savings, see your remaining balance, and export to CSV for free.',
    canonical: `${BASE_URL}/monthly-budget-planner`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  calculators: {
    title: 'Free Financial Calculators India | EMI, SIP & Budget',
    description: 'Use free financial calculators in India for loan EMI, SIP returns, monthly budgeting, bill splitting and home-loan prepayment comparisons. No account required.',
    canonical: `${BASE_URL}/calculators`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  split: {
    title: 'Free Bill Splitter India (No Login) — Export to WhatsApp | Pocket Advisor',
    description: 'Split restaurant bills, group trips, and flatmate rent with 2-stage greedy debt minimization. Eliminate tangled debts and export receipts to WhatsApp for free without creating an account.',
    canonical: `${BASE_URL}/split`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'bill-splitter': {
    title: 'Free Bill Splitter India (No Login) — Export to WhatsApp | Pocket Advisor',
    description: 'Split restaurant bills, group trips, and flatmate rent with 2-stage greedy debt minimization. Eliminate tangled debts and export receipts to WhatsApp for free without creating an account.',
    canonical: `${BASE_URL}/split`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'home-loan-prepayment-vs-sip': {
    title: 'Home Loan Prepayment vs SIP Calculator (2026) — Compare Tax & Returns | Pocket Advisor',
    description: 'Should you prepay your home loan or invest in equity SIP? Compare compounded interest saved with mutual fund returns, Sec 24b tax deductions, and 50:50 hybrid strategies online.',
    canonical: `${BASE_URL}/home-loan-prepayment-vs-sip`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'prepayment-vs-sip': {
    title: 'Home Loan Prepayment vs SIP Calculator (2026) — Compare Tax & Returns | Pocket Advisor',
    description: 'Should you prepay your home loan or invest in equity SIP? Compare compounded interest saved with mutual fund returns, Sec 24b tax deductions, and 50:50 hybrid strategies online.',
    canonical: `${BASE_URL}/home-loan-prepayment-vs-sip`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'flatmates-rent-splitter': {
    title: 'Flatmates Rent Splitter (No Login) — Unequal Rooms & WhatsApp Receipts | Pocket Advisor',
    description: 'Split apartment rent, maid, WiFi, and electricity bills fairly with roommates. Factors in unequal bedroom sizes. Generate instant WhatsApp receipts with 1-tap UPI deep links.',
    canonical: `${BASE_URL}/flatmates-rent-splitter`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'rent-splitter': {
    title: 'Flatmates Rent Splitter (No Login) — Unequal Rooms & WhatsApp Receipts | Pocket Advisor',
    description: 'Split apartment rent, maid, WiFi, and electricity bills fairly with roommates. Factors in unequal bedroom sizes. Generate instant WhatsApp receipts with 1-tap UPI deep links.',
    canonical: `${BASE_URL}/flatmates-rent-splitter`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'sip-step-up-calculator': {
    title: 'SIP Calculator India (2026) — Step-Up SIP & Inflation Adjusted Wealth | Pocket Advisor',
    description: 'Calculate compounding returns for monthly mutual fund SIPs with annual step-ups and real inflation discounting online. 100% free with no login required.',
    canonical: `${BASE_URL}/sip-calculator`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'sip-calculator': {
    title: 'SIP Calculator India (2026) — Step-Up SIP & Inflation Adjusted Wealth | Pocket Advisor',
    description: 'Calculate compounding returns for monthly mutual fund SIPs with annual step-ups and real inflation discounting online. 100% free with no login required.',
    canonical: `${BASE_URL}/sip-calculator`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'emi-calculator': {
    title: 'Loan EMI Calculator India (2026) — Home, Car & Personal Loan Amortization | Pocket Advisor',
    description: 'Calculate exact monthly loan EMI, total interest payable, and amortization schedules. Accurate reducing balance calculations for home, car, and personal loans. 100% free with zero signup.',
    canonical: `${BASE_URL}/emi-calculator`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'upi-expense-tracker': {
    title: 'UPI Expense Tracker for Android (India) | Pocket Advisor',
    description: 'Track eligible UPI and bank SMS transactions on Android. Learn how supported-message parsing works, where coverage can vary, and how local storage and optional cloud backup are handled.',
    canonical: `${BASE_URL}/upi-expense-tracker`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'upi-tracker': {
    title: 'UPI Expense Tracker for Android (India) | Pocket Advisor',
    description: 'Track eligible UPI and bank SMS transactions on Android. Learn how supported-message parsing works, where coverage can vary, and how local storage and optional cloud backup are handled.',
    canonical: `${BASE_URL}/upi-expense-tracker`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  features: {
    title: 'App Features & Security Architecture | Pocket Advisor',
    description: "Explore supported bank-SMS transaction tracking, group bill splitting, expense tools, and Pocket Advisor's data-storage and backup options.",
    canonical: `${BASE_URL}/features`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  news: {
    title: 'Personal Finance Insights & Guides | Pocket Advisor',
    description: 'Practical personal finance articles on UPI expense tracking, budgeting, bill splitting, debt minimization, and smarter money decisions.',
    canonical: `${BASE_URL}/news`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  download: {
    title: 'Download Pocket Advisor for Android | Free Expense Tracker',
    description: 'Install Pocket Advisor directly from Google Play. Track UPI expenses automatically, manage group splits, and plan your wealth privately.',
    canonical: `${BASE_URL}/download`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  admin: {
    title: 'Pocket Advisor Studio | Visual Article Editor',
    description: 'Internal article publishing interface.',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  faq: {
    title: 'Frequently Asked Questions (FAQ) | Pocket Advisor',
    description: 'Learn about bank-SMS transaction parsing, group bill splitting, local data handling, and optional cloud backup in Pocket Advisor.',
    canonical: `${BASE_URL}/faq`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  privacy: {
    title: 'Privacy Policy & Offline Data Security | Pocket Advisor',
    description: "Read Pocket Advisor's privacy policy to understand local data storage, bank-SMS parsing, optional cloud backup, and account-data handling.",
    canonical: `${BASE_URL}/privacy`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  terms: {
    title: 'Terms & Conditions — Pocket Advisor',
    description: 'Terms and conditions of using the Pocket Advisor mobile application and web spending tools.',
    canonical: `${BASE_URL}/terms`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  refund: {
    title: 'Cancellation & Refund Policy | Pocket Advisor',
    description: 'Cancellation and refund policy for Pocket Advisor Android application and in-app subscriptions via Google Play Billing.',
    canonical: `${BASE_URL}/refund`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'delete-account': {
    title: 'Account & Cloud Data Deletion Request — Pocket Advisor',
    description: 'Self-service data removal portal to purge cloud backup records and delete your Pocket Advisor account.',
    canonical: `${BASE_URL}/delete-account`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  contact: {
    title: 'Contact Us & Customer Support | Pocket Advisor',
    description: 'Get in touch with the Pocket Advisor engineering and support team. Inquiries for app support, bug reports, feature requests, and data privacy.',
    canonical: `${BASE_URL}/contact`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  'how-to-split-rent-unequal-rooms': {
    title: 'How to Split Rent Fairly for Unequal Rooms (2026 Formula & Calculator) | Pocket Advisor',
    description: 'Master bedroom with ensuite bath vs compact room: the exact mathematical 50/50 formula to split flat rent fairly without conflict. Includes free interactive calculator.',
    canonical: `${BASE_URL}/how-to-split-rent-unequal-rooms`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'home-loan-prepayment-vs-mutual-funds': {
    title: 'Home Loan Prepayment vs Mutual Funds (2026): The 50:50 Strategy | Pocket Advisor',
    description: 'Should you prepay your home loan or invest in mutual funds? Discover the 50:50 hybrid strategy, Section 24b tax reality, and compounding wealth comparison.',
    canonical: `${BASE_URL}/home-loan-prepayment-vs-mutual-funds`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'how-to-track-upi-payments-automatically': {
    title: 'How to Track UPI Payments Automatically (100% On-Device, No Netbanking) | Pocket Advisor',
    description: 'Step-by-step guide to tracking Google Pay, PhonePe, Paytm, and bank SMS transactions automatically on Android without netbanking passwords or cloud data leaks.',
    canonical: `${BASE_URL}/how-to-track-upi-payments-automatically`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'best-expense-tracker-apps-india': {
    title: 'Best Expense Tracker Apps in India (2026): Architectural Comparison | Pocket Advisor',
    description: 'An architectural comparison of India’s personal finance apps across 4 models: on-device SMS parsers, Account Aggregators, cloud credit hubs, and manual web ledgers.',
    canonical: `${BASE_URL}/best-expense-tracker-apps-india`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'best-expense-tracker-apps': {
    title: 'Best Expense Tracker Apps in India (2026): Architectural Comparison | Pocket Advisor',
    description: 'An architectural comparison of India’s personal finance apps across 4 models: on-device SMS parsers, Account Aggregators, cloud credit hubs, and manual web ledgers.',
    canonical: `${BASE_URL}/best-expense-tracker-apps-india`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'expense-tracker-apps-india': {
    title: 'Best Expense Tracker Apps in India (2026): Architectural Comparison | Pocket Advisor',
    description: 'An architectural comparison of India’s personal finance apps across 4 models: on-device SMS parsers, Account Aggregators, cloud credit hubs, and manual web ledgers.',
    canonical: `${BASE_URL}/best-expense-tracker-apps-india`,
    ogType: 'article',
    ogImage: DEFAULT_IMAGE,
  },
  'news/track-upi-expenses-automatically': {
    title: 'How to Track UPI Expenses Automatically in India (2026) | Pocket Advisor',
    description: 'Step-by-step guide to tracking Google Pay, PhonePe, Paytm, and CRED transactions automatically in India. Covers on-device regex detection, OEM battery setup, and SQLCipher privacy.',
    canonical: `${BASE_URL}/news/track-upi-expenses-automatically`,
    ogType: 'article',
    ogImage: `${BASE_URL}/assets/news/track-upi-expenses-automatically.svg`,
  },
  'track-upi-expenses-automatically': {
    title: 'How to Track UPI Expenses Automatically in India (2026) | Pocket Advisor',
    description: 'Step-by-step guide to tracking Google Pay, PhonePe, Paytm, and CRED transactions automatically in India. Covers on-device regex detection, OEM battery setup, and SQLCipher privacy.',
    canonical: `${BASE_URL}/news/track-upi-expenses-automatically`,
    ogType: 'article',
    ogImage: `${BASE_URL}/assets/news/track-upi-expenses-automatically.svg`,
  },
  guides: {
    title: 'Financial Problem-Solving Guides | Pocket Advisor',
    description: 'In-depth financial engineering guides for roommate rent splits, home loan prepayment vs mutual fund investing, and automatic private on-device SMS expense tracking.',
    canonical: `${BASE_URL}/guides`,
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
  '404': {
    title: 'Page Not Found (404) | Pocket Advisor',
    description: 'The page you are looking for does not exist or may have been moved.',
    ogType: 'website',
    ogImage: DEFAULT_IMAGE,
  },
};

function setOrCreateMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setOrCreateCanonical(href: string): void {
  if (typeof document === 'undefined') return;

  let element = document.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

function setOrCreateJsonLd(id: string, data: object): void {
  if (typeof document === 'undefined') return;
  let element = document.getElementById(id) as HTMLScriptElement | null;
  if (!element) {
    element = document.createElement('script');
    element.id = id;
    element.type = 'application/ld+json';
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data, null, 2);
}

function getBreadcrumbsForView(view: string, canonical: string, title: string) {
  if (view === 'home' || view === '404' || view === 'admin' || !view) {
    return null;
  }

  const isCalculator = [
    'split',
    'bill-splitter',
    'home-loan-prepayment-vs-sip',
    'prepayment-vs-sip',
    'flatmates-rent-splitter',
    'rent-splitter',
    'sip-calculator',
    'sip-step-up-calculator',
    'emi-calculator',
    'calculators',
  ].includes(view);

  const isGuide = [
    'how-to-split-rent-unequal-rooms',
    'home-loan-prepayment-vs-mutual-funds',
    'how-to-track-upi-payments-automatically',
    'best-expense-tracker-apps-india',
    'best-expense-tracker-apps',
    'expense-tracker-apps-india',
    'guides',
  ].includes(view);

  const cleanName = title.split('|')[0].split('—')[0].trim();

  const itemListElement: Array<{ '@type': string; position: number; name: string; item: string }> = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${BASE_URL}/`,
    },
  ];

  if (isCalculator && view !== 'calculators') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Calculators',
      item: `${BASE_URL}/calculators`,
    });
    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: cleanName,
      item: canonical,
    });
  } else if (isGuide && view !== 'guides') {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Guides',
      item: `${BASE_URL}/guides`,
    });
    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: cleanName,
      item: canonical,
    });
  } else if (view === 'news' && canonical.includes('/news/')) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: 'Financial Insights & Articles',
      item: `${BASE_URL}/news`,
    });
    itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: cleanName,
      item: canonical,
    });
  } else {
    itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      name: cleanName,
      item: canonical,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement,
  };
}

function getHowToForView(view: string): object | null {
  if (view === 'how-to-split-rent-unequal-rooms') {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Split Rent Fairly for Unequal Rooms',
      description: 'A step-by-step mathematical guide to split apartment rent fairly based on square footage, master bedrooms, and attached bathrooms.',
      totalTime: 'PT10M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Divide Total Rent into Two 50% Pools',
          text: 'Split total apartment rent into a 50% Common Area Pool (living room, kitchen, balcony) and a 50% Private Bedroom Pool.',
          url: `${BASE_URL}/how-to-split-rent-unequal-rooms#step-1`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Split Common Area Rent Equally by Headcount',
          text: 'Divide the 50% Common Area Pool equally among all roommates by headcount.',
          url: `${BASE_URL}/how-to-split-rent-unequal-rooms#step-2`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Measure Private Bedroom Square Footages',
          text: 'Measure individual bedroom square footages and allocate bedroom pool rent proportionally to private room size.',
          url: `${BASE_URL}/how-to-split-rent-unequal-rooms#step-3`,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Add Amenity Premiums for Attached Bathrooms',
          text: 'Add a 10-15% premium to private bedroom share for ensuite bathrooms or private balconies.',
          url: `${BASE_URL}/how-to-split-rent-unequal-rooms#step-4`,
        },
        {
          '@type': 'HowToStep',
          position: 5,
          name: 'Generate 1-Tap WhatsApp UPI Settlements',
          text: 'Combine common and bedroom pool shares, then use Pocket Advisor to generate 1-tap WhatsApp settlement receipts with UPI deep links.',
          url: `${BASE_URL}/how-to-split-rent-unequal-rooms#step-5`,
        },
      ],
    };
  }

  if (view === 'how-to-track-upi-payments-automatically') {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: 'How to Track UPI Payments Automatically on Android',
      description: 'Step-by-step method to track Google Pay, PhonePe, and Paytm transactions automatically on Android without sharing banking passwords.',
      totalTime: 'PT5M',
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: '0',
      },
      step: [
        {
          '@type': 'HowToStep',
          position: 1,
          name: 'Enable Financial SMS Permission',
          text: 'Grant SMS reading permissions under Google Play Financial Exception to detect bank and payment alerts locally.',
          url: `${BASE_URL}/how-to-track-upi-payments-automatically#step-1`,
        },
        {
          '@type': 'HowToStep',
          position: 2,
          name: 'Configure On-Device Regex Parsing',
          text: 'Allow Pocket Advisor to parse debits, merchants, and balances on-device in under 1ms with immediate OTP memory purge.',
          url: `${BASE_URL}/how-to-track-upi-payments-automatically#step-2`,
        },
        {
          '@type': 'HowToStep',
          position: 3,
          name: 'Configure OEM Battery Optimization',
          text: 'Exclude Pocket Advisor from aggressive battery killers (Xiaomi MIUI, Samsung One UI) so background alerts are captured in real-time.',
          url: `${BASE_URL}/how-to-track-upi-payments-automatically#step-3`,
        },
        {
          '@type': 'HowToStep',
          position: 4,
          name: 'Store Encrypted in Local SQLCipher',
          text: 'Keep transaction history encrypted in local SQLite AES-256 with optional user-controlled cloud backup.',
          url: `${BASE_URL}/how-to-track-upi-payments-automatically#step-4`,
        },
      ],
    };
  }

  return null;
}

/**
 * Updates dynamic browser page title and search / social crawler meta tags.
 * 
 * @param view Key matching ROUTE_SEO or fallback view name
 * @param custom Optional overrides for dynamic subviews (e.g. specific article post)
 */
export function updatePageSeo(view: string, custom?: Partial<PageMetadata>): void {
  if (typeof document === 'undefined') return;

  const base = ROUTE_SEO[view] || ROUTE_SEO.home;
  const title = custom?.title || base.title;
  const description = custom?.description || base.description;
  const canonical = custom?.canonical || base.canonical || `${BASE_URL}/`;
  const ogType = custom?.ogType || base.ogType || 'website';
  const ogImage = custom?.ogImage || base.ogImage || DEFAULT_IMAGE;

  // Title
  document.title = title;

  // Robots indexing tag
  if (view === 'admin') {
    setOrCreateMetaTag('name', 'robots', 'noindex, nofollow');
  } else if (view === '404') {
    setOrCreateMetaTag('name', 'robots', 'noindex, follow');
  } else {
    setOrCreateMetaTag('name', 'robots', 'index, follow');
  }

  // Standard Meta Tags
  setOrCreateMetaTag('name', 'description', description);

  // Open Graph
  setOrCreateMetaTag('property', 'og:title', title);
  setOrCreateMetaTag('property', 'og:description', description);
  if (view !== '404' && view !== 'admin') {
    setOrCreateMetaTag('property', 'og:url', canonical);
  } else {
    const existingOgUrl = document.querySelector('meta[property="og:url"]');
    if (existingOgUrl) existingOgUrl.remove();
  }
  setOrCreateMetaTag('property', 'og:type', ogType);
  setOrCreateMetaTag('property', 'og:image', ogImage);

  // Twitter Card
  setOrCreateMetaTag('name', 'twitter:title', title);
  setOrCreateMetaTag('name', 'twitter:description', description);
  setOrCreateMetaTag('name', 'twitter:image', ogImage);

  // Canonical
  if (view === '404' || view === 'admin' || custom?.canonical === '') {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) existingCanonical.remove();
  } else {
    setOrCreateCanonical(canonical);
  }

  // Breadcrumb Structured Data
  const breadcrumbSchema = getBreadcrumbsForView(view, canonical, title);
  if (breadcrumbSchema) {
    setOrCreateJsonLd('dynamic-breadcrumbs-jsonld', breadcrumbSchema);
  } else {
    const existing = document.getElementById('dynamic-breadcrumbs-jsonld');
    if (existing) existing.remove();
  }

  // HowTo Structured Data for Guide Views
  const howToSchema = getHowToForView(view);
  if (howToSchema) {
    setOrCreateJsonLd('dynamic-howto-jsonld', howToSchema);
  } else {
    const existingHowTo = document.getElementById('dynamic-howto-jsonld');
    if (existingHowTo) existingHowTo.remove();
  }
}

