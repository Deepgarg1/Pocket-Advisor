import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Hero } from './components/landing/Hero';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { trackPageView } from './utils/analytics';

const FaqSection = lazy(() => import('./components/landing/FaqSection').then((m) => ({ default: m.FaqSection })));
const FeaturesGrid = lazy(() => import('./components/landing/FeaturesGrid').then((m) => ({ default: m.FeaturesGrid })));
const InteractiveDemo = lazy(() => import('./components/landing/InteractiveDemo').then((m) => ({ default: m.InteractiveDemo })));
const DownloadSection = lazy(() => import('./components/landing/DownloadSection').then((m) => ({ default: m.DownloadSection })));
const SplitterPage = lazy(() => import('./components/landing/SplitterPage').then((m) => ({ default: m.SplitterPage })));
const MonthlyBudgetPlanner = lazy(() => import('./components/tools/MonthlyBudgetPlanner').then((m) => ({ default: m.MonthlyBudgetPlanner })));
const PrivacyPolicyView = lazy(() => import('./components/legal/PrivacyPolicyView').then((m) => ({ default: m.PrivacyPolicyView })));
const TermsConditionsView = lazy(() => import('./components/legal/TermsConditionsView').then((m) => ({ default: m.TermsConditionsView })));
const DeleteAccountView = lazy(() => import('./components/legal/DeleteAccountView').then((m) => ({ default: m.DeleteAccountView })));
const RefundPolicyView = lazy(() => import('./components/legal/RefundPolicyView').then((m) => ({ default: m.RefundPolicyView })));
const NewsFeedView = lazy(() => import('./components/news/NewsFeedView').then((m) => ({ default: m.NewsFeedView })));
const ProblemSolvingGuides = lazy(() => import('./components/guides/ProblemSolvingGuides').then((m) => ({ default: m.ProblemSolvingGuides })));
const UpiTrackerLanding = lazy(() => import('./components/landing/UpiTrackerLanding').then((m) => ({ default: m.UpiTrackerLanding })));
const ContactView = lazy(() => import('./components/support/ContactView').then((m) => ({ default: m.ContactView })));
const NotFoundView = lazy(() => import('./components/common/NotFoundView').then((m) => ({ default: m.NotFoundView })));

// Localhost-only dynamic studio import
const adminModules = import.meta.glob('./components/admin/ArticleStudio.tsx');
const adminLoader = adminModules['./components/admin/ArticleStudio.tsx'] as (() => Promise<{ ArticleStudio: React.ComponentType<any> }>) | undefined;
const ArticleStudio = adminLoader
  ? lazy(() => adminLoader().then((m) => ({ default: m.ArticleStudio })))
  : NotFoundView;

const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.endsWith('.local')
);

const VIEW_MAP: Record<string, string> = {
  '': 'home',
  features: 'features',
  'upi-expense-tracker': 'upi-expense-tracker',
  split: 'split',
  'flatmates-rent-splitter': 'flatmates-rent-splitter',
  'rent-splitter': 'flatmates-rent-splitter',
  'monthly-budget-planner': 'monthly-budget-planner',
  'budget-planner': 'monthly-budget-planner',
  calculators: 'calculators',
  'emi-calculator': 'emi-calculator',
  'sip-calculator': 'sip-calculator',
  'home-loan-prepayment-vs-sip': 'home-loan-prepayment-vs-sip',
  'prepayment-vs-sip': 'home-loan-prepayment-vs-sip',
  faq: 'faq',
  download: 'download',
  contact: 'contact',
  'contact-us': 'contact',
  support: 'contact',
  privacy: 'privacy',
  'privacy-policy': 'privacy',
  terms: 'terms',
  'terms-and-conditions': 'terms',
  refund: 'refund',
  'refund-policy': 'refund',
  'delete-account': 'delete-account',
  news: 'news',
  guides: 'guides',
  'how-to-split-rent-unequal-rooms': 'how-to-split-rent-unequal-rooms',
  'home-loan-prepayment-vs-mutual-funds': 'home-loan-prepayment-vs-mutual-funds',
  'how-to-track-upi-payments-automatically': 'how-to-track-upi-payments-automatically',
  'best-expense-tracker-apps-india': 'best-expense-tracker-apps-india',
  admin: 'admin',
};

export const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Derive current view slug from location pathname
  const rawSlug = location.pathname.replace(/^\/+/, '').replace(/\/+$/, '').toLowerCase();
  const currentView = VIEW_MAP[rawSlug] || (rawSlug.startsWith('news/') ? 'news' : rawSlug || 'home');

  // Handle legacy hash navigation migration (e.g. /#/split -> /split)
  useEffect(() => {
    const rawHash = window.location.hash.toLowerCase();
    if (rawHash.startsWith('#/') || rawHash.startsWith('#')) {
      const hashPath = rawHash.replace(/^#\/?/, '').split('?')[0];
      const targetPath = VIEW_MAP[hashPath] ? `/${VIEW_MAP[hashPath]}` : `/${hashPath}`;
      const search = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
      navigate(search ? `${targetPath}?${search}` : targetPath, { replace: true });
    }
  }, [navigate]);

  // Sync SEO & Analytics asynchronously on route change (off-critical-path)
  useEffect(() => {
    const isSpecificArticle = location.pathname.startsWith('/news/') && location.pathname !== '/news';
    if (!isSpecificArticle) {
      import('./utils/seo').then(({ updatePageSeo }) => {
        updatePageSeo(currentView);
      });
    }
    if (currentView !== 'admin' && currentView !== 'news') {
      trackPageView();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname, currentView]);

  const navigateView = (view: string, shouldScroll: boolean = true) => {
    const targetPath = view === 'home' ? '/' : `/${view}`;
    navigate(targetPath);
    if (shouldScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

  const isAdminAccessAllowed = import.meta.env.DEV || isLocalhost;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--bg-canvas)',
        color: 'var(--text-primary)',
      }}
    >
      {/* Top Navigation Bar */}
      {currentView !== 'admin' && <Navbar currentView={currentView} onNavigate={navigateView} />}

      {/* Main Content Area */}
      <main className={currentView === 'admin' ? '' : 'content-with-bottom-nav'} style={{ flex: 1 }}>
        <Suspense
          fallback={
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--text-secondary)' }}>
              Loading...
            </div>
          }
        >
          <Routes>
            {/* Home */}
            <Route
              path="/"
              element={
                <div>
                  <Hero onNavigate={navigateView} />
                  <FaqSection useHomeFaqs headingLevel="h2" onNavigate={navigateView} />
                </div>
              }
            />

            {/* Features */}
            <Route
              path="/features"
              element={
                <div className="animate-fade-in">
                  <FeaturesGrid onNavigate={navigateView} />
                </div>
              }
            />

            {/* UPI Tracker */}
            <Route
              path="/upi-expense-tracker"
              element={
                <div className="animate-fade-in">
                  <UpiTrackerLanding onNavigate={navigateView} />
                </div>
              }
            />

            {/* Bill Splitter Routes */}
            <Route
              path="/split"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <SplitterPage onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/flatmates-rent-splitter"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <SplitterPage onNavigate={navigateView} />
                </div>
              }
            />
            <Route path="/rent-splitter" element={<Navigate to="/flatmates-rent-splitter" replace />} />
            <Route path="/bill-splitter" element={<Navigate to="/split" replace />} />

            {/* Financial Tools & Calculators */}
            <Route
              path="/monthly-budget-planner"
              element={
                <div className="animate-fade-in">
                  <MonthlyBudgetPlanner onNavigate={navigateView} />
                </div>
              }
            />
            <Route path="/budget-planner" element={<Navigate to="/monthly-budget-planner" replace />} />

            <Route
              path="/calculators"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <InteractiveDemo initialTab="EMI" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/emi-calculator"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <InteractiveDemo initialTab="EMI" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/sip-calculator"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <InteractiveDemo initialTab="SIP" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/home-loan-prepayment-vs-sip"
              element={
                <div className="animate-fade-in" style={{ padding: '40px 0' }}>
                  <InteractiveDemo initialTab="PREPAYMENT" onNavigate={navigateView} />
                </div>
              }
            />
            <Route path="/prepayment-vs-sip" element={<Navigate to="/home-loan-prepayment-vs-sip" replace />} />

            {/* Guides */}
            <Route
              path="/guides"
              element={
                <div className="animate-fade-in">
                  <ProblemSolvingGuides slug="guides" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/how-to-split-rent-unequal-rooms"
              element={
                <div className="animate-fade-in">
                  <ProblemSolvingGuides slug="how-to-split-rent-unequal-rooms" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/home-loan-prepayment-vs-mutual-funds"
              element={
                <div className="animate-fade-in">
                  <ProblemSolvingGuides slug="home-loan-prepayment-vs-mutual-funds" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/how-to-track-upi-payments-automatically"
              element={
                <div className="animate-fade-in">
                  <ProblemSolvingGuides slug="how-to-track-upi-payments-automatically" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/best-expense-tracker-apps-india"
              element={
                <div className="animate-fade-in">
                  <ProblemSolvingGuides slug="best-expense-tracker-apps-india" onNavigate={navigateView} />
                </div>
              }
            />

            {/* News */}
            <Route
              path="/news"
              element={
                <div className="animate-fade-in">
                  <NewsFeedView onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/news/:id"
              element={
                <div className="animate-fade-in">
                  <NewsFeedView onNavigate={navigateView} />
                </div>
              }
            />

            {/* FAQ & Download */}
            <Route
              path="/faq"
              element={
                <div className="animate-fade-in">
                  <FaqSection headingLevel="h1" onNavigate={navigateView} />
                </div>
              }
            />
            <Route
              path="/download"
              element={
                <div className="animate-fade-in">
                  <DownloadSection onNavigate={navigateView} />
                </div>
              }
            />

            {/* Support / Contact */}
            <Route
              path="/contact"
              element={
                <div className="animate-fade-in">
                  <ContactView onNavigate={navigateView} />
                </div>
              }
            />
            <Route path="/contact-us" element={<Navigate to="/contact" replace />} />
            <Route path="/support" element={<Navigate to="/contact" replace />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicyView onBack={() => navigateView('home')} />} />
            <Route path="/privacy-policy" element={<Navigate to="/privacy" replace />} />
            <Route path="/terms" element={<TermsConditionsView onBack={() => navigateView('home')} />} />
            <Route path="/terms-and-conditions" element={<Navigate to="/terms" replace />} />
            <Route path="/refund" element={<RefundPolicyView onBack={() => navigateView('home')} />} />
            <Route path="/refund-policy" element={<Navigate to="/refund" replace />} />
            <Route path="/delete-account" element={<DeleteAccountView onBack={() => navigateView('home')} />} />

            {/* Admin Studio */}
            <Route
              path="/admin"
              element={
                isAdminAccessAllowed ? (
                  <div className="animate-fade-in">
                    <ArticleStudio onNavigate={navigateView} />
                  </div>
                ) : (
                  <NotFoundView onNavigate={navigateView} />
                )
              }
            />

            {/* 404 Fallback */}
            <Route
              path="*"
              element={
                <div className="animate-fade-in">
                  <NotFoundView onNavigate={navigateView} />
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>

      {/* Persistent Mobile Bottom Navigation Bar */}
      {currentView !== 'admin' && <MobileBottomNav currentView={currentView} onNavigate={navigateView} />}

      {/* Footer */}
      {currentView !== 'admin' && <Footer onNavigate={navigateView} />}
    </div>
  );
};
