// Prefetch map for instantaneous 0ms perceived latency on user intent (hover, touchstart, or focus)
const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (route: string): void => {
  if (typeof window === 'undefined' || prefetchedRoutes.has(route)) return;
  prefetchedRoutes.add(route);

  switch (route) {
    case 'split':
    case 'flatmates-rent-splitter':
    case 'rent-splitter':
      import('../components/landing/SplitterPage');
      break;
    case 'calculators':
    case 'emi-calculator':
    case 'sip-calculator':
    case 'home-loan-prepayment-vs-sip':
    case 'prepayment-vs-sip':
      import('../components/landing/InteractiveDemo');
      break;
    case 'features':
      import('../components/landing/FeaturesGrid');
      break;
    case 'news':
      import('../components/news/NewsFeedView');
      break;
    case 'faq':
      import('../components/landing/FaqSection');
      break;
    case 'download':
      import('../components/landing/DownloadSection');
      break;
    default:
      break;
  }
};
