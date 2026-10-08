import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Hero } from './components/landing/Hero';

const FeaturesGrid = lazy(() => import('./components/landing/FeaturesGrid').then(module => ({ default: module.FeaturesGrid })));
const InteractiveDemo = lazy(() => import('./components/landing/InteractiveDemo').then(module => ({ default: module.InteractiveDemo })));
const DownloadSection = lazy(() => import('./components/landing/DownloadSection').then(module => ({ default: module.DownloadSection })));
const SplitterPage = lazy(() => import('./components/landing/SplitterPage').then(module => ({ default: module.SplitterPage })));
const FaqSection = lazy(() => import('./components/landing/FaqSection').then(module => ({ default: module.FaqSection })));
const PrivacyPolicyView = lazy(() => import('./components/legal/PrivacyPolicyView').then(module => ({ default: module.PrivacyPolicyView })));
const TermsConditionsView = lazy(() => import('./components/legal/TermsConditionsView').then(module => ({ default: module.TermsConditionsView })));
const DeleteAccountView = lazy(() => import('./components/legal/DeleteAccountView').then(module => ({ default: module.DeleteAccountView })));
const RefundPolicyView = lazy(() => import('./components/legal/RefundPolicyView').then(module => ({ default: module.RefundPolicyView })));
const NewsFeedView = lazy(() => import('./components/news/NewsFeedView').then(module => ({ default: module.NewsFeedView })));
const ProblemSolvingGuides = lazy(() => import('./components/guides/ProblemSolvingGuides').then(module => ({ default: module.ProblemSolvingGuides })));
const ContactView = lazy(() => import('./components/support/ContactView').then(module => ({ default: module.ContactView })));
const NotFoundView = lazy(() => import('./components/common/NotFoundView').then(module => ({ default: module.NotFoundView })));

// Localhost-only dynamic studio import (falls back to NotFoundView if admin folder is excluded from Git)
const adminModules = import.meta.glob('./components/admin/ArticleStudio.tsx');
const adminLoader = adminModules['./components/admin/ArticleStudio.tsx'] as (() => Promise<{ ArticleStudio: React.ComponentType<any> }>) | undefined;
const ArticleStudio = adminLoader
  ? lazy(() => adminLoader().then(m => ({ default: m.ArticleStudio })))
  : NotFoundView;

import { updatePageSeo } from './utils/seo';

const getRouteFromUrl = (): { view: string; tab?: 'PREPAYMENT' | 'EMI' | 'SIP' } => {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const rawHash = window.location.hash.toLowerCase();
  const hash = rawHash.split('?')[0].replace(/\/+$/, '') || '';

  const isRoute = (slug: string) => {
    return path === `/${slug}` ||
      path.startsWith(`/${slug}/`) ||
      hash === `#/${slug}` ||
      hash === `#${slug}` ||
      hash.startsWith(`#/${slug}/`) ||
      hash.startsWith(`#${slug}/`);
  };

  if (isRoute('privacy') || path.includes('privacy-policy')) return { view: 'privacy' };
  if (isRoute('terms') || path.includes('terms-and-conditions')) return { view: 'terms' };
  if (isRoute('refund') || isRoute('refund-policy') || isRoute('cancellation') || isRoute('cancellation-and-refund') || path.includes('refund')) return { view: 'refund' };
  if (isRoute('delete-account') || isRoute('delete') || path.includes('delete-account')) return { view: 'delete-account' };
  if (isRoute('contact') || isRoute('contact-us') || isRoute('support')) return { view: 'contact' };
  if (isRoute('features') || isRoute('feature')) return { view: 'features' };

  if (
    isRoute('how-to-split-rent-unequal-rooms') ||
    isRoute('split-rent-unequal-rooms') ||
    path.includes('unequal-room') ||
    hash.includes('unequal-room')
  ) {
    return { view: 'how-to-split-rent-unequal-rooms' };
  }

  if (
    isRoute('home-loan-prepayment-vs-mutual-funds') ||
    isRoute('prepay-home-loan-or-invest-mutual-funds') ||
    path.includes('vs-mutual-funds') ||
    hash.includes('vs-mutual-funds')
  ) {
    return { view: 'home-loan-prepayment-vs-mutual-funds' };
  }

  if (
    isRoute('how-to-track-upi-payments-automatically') ||
    isRoute('track-upi-payments-android-privacy') ||
    path.includes('track-upi-payments') ||
    hash.includes('track-upi-payments')
  ) {
    return { view: 'how-to-track-upi-payments-automatically' };
  }

  if (isRoute('guides') || isRoute('guide')) {
    return { view: 'guides' };
  }

  if (
    isRoute('home-loan-prepayment-vs-sip') ||
    isRoute('prepayment-vs-sip') ||
    isRoute('prepayment') ||
    path.includes('prepayment') ||
    path.includes('vs-sip') ||
    hash.includes('prepayment') ||
    hash.includes('vs-sip')
  ) {
    return { view: 'home-loan-prepayment-vs-sip', tab: 'PREPAYMENT' };
  }

  if (
    isRoute('flatmates-rent-splitter') ||
    isRoute('rent-splitter') ||
    path.includes('flatmates') ||
    path.includes('rent-splitter') ||
    hash.includes('flatmates') ||
    hash.includes('rent-splitter')
  ) {
    return { view: 'flatmates-rent-splitter' };
  }

  if (
    isRoute('sip-step-up-calculator') ||
    isRoute('sip-calculator') ||
    (isRoute('calculator') && (path.includes('sip') || hash.includes('sip')))
  ) {
    return { view: 'sip-calculator', tab: 'SIP' };
  }
  if (isRoute('emi-calculator') || isRoute('loan') || (isRoute('calculator') && (path.includes('emi') || hash.includes('emi')))) {
    return { view: 'emi-calculator', tab: 'EMI' };
  }
  if (isRoute('split') || isRoute('bill-splitter')) {
    return { view: 'split' };
  }
  if (isRoute('calculators') || isRoute('calculator') || isRoute('tools') || isRoute('tool')) {
    return { view: 'calculators', tab: 'EMI' };
  }
  if (isRoute('faq')) return { view: 'faq' };
  if (isRoute('download')) return { view: 'download' };
  if (isRoute('news')) return { view: 'news' };
  if (isRoute('admin') || isRoute('studio') || path.includes('/admin') || hash.includes('/admin')) {
    // Only accessible on localhost / local development for 100% security
    const isLocalhost = typeof window !== 'undefined' && (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.endsWith('.local')
    );
    if (import.meta.env.DEV || isLocalhost) {
      return { view: 'admin' };
    }
    return { view: '404' };
  }
  if (isRoute('404')) return { view: '404' };

  // Exact root or empty hash is homepage
  if (path === '/' && (!hash || !hash.startsWith('#/') || hash === '#/' || hash === '#/home')) {
    return { view: 'home' };
  }

  // Any unmatched route falls back to 404
  return { view: '404' };
};

export const App: React.FC = () => {
  const [routeState, setRouteState] = useState(getRouteFromUrl);
  const currentView = routeState.view;

  // Dynamically update document.title, OpenGraph, and Meta tags on view change
  useEffect(() => {
    updatePageSeo(currentView);
  }, [currentView]);

  // Listen to popstate (browser back/forward) and hashchange
  useEffect(() => {
    const handleNavigation = () => {
      setRouteState(getRouteFromUrl());
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);
    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  const navigateView = (view: string, shouldScroll: boolean = true) => {
    let tab: 'PREPAYMENT' | 'EMI' | 'SIP' | undefined;
    let urlPath = '';

    if (view === 'split') {
      urlPath = '/split';
    } else if (view === 'flatmates-rent-splitter' || view === 'rent-splitter') {
      urlPath = '/flatmates-rent-splitter';
    } else if (view === 'home-loan-prepayment-vs-sip' || view === 'prepayment-vs-sip') {
      tab = 'PREPAYMENT';
      urlPath = '/home-loan-prepayment-vs-sip';
    } else if (view === 'emi-calculator') {
      tab = 'EMI';
      urlPath = '/emi-calculator';
    } else if (view === 'sip-calculator' || view === 'sip-step-up-calculator') {
      tab = 'SIP';
      urlPath = '/sip-calculator';
    } else if (view === 'calculators') {
      tab = 'EMI';
      urlPath = '/calculators';
    } else if (view === 'home') {
      urlPath = '/';
    } else if (
      view === 'how-to-split-rent-unequal-rooms' ||
      view === 'home-loan-prepayment-vs-mutual-funds' ||
      view === 'how-to-track-upi-payments-automatically' ||
      view === 'guides'
    ) {
      urlPath = `/${view}`;
    } else {
      urlPath = `/${view}`;
    }

    setRouteState({ view, tab });

    try {
      window.history.pushState(null, '', urlPath);
    } catch {
      if (view === 'home') {
        window.location.hash = '';
      } else {
        window.location.hash = `#/${view}`;
      }
    }
    if (shouldScroll) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  };

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
      {/* Top Navigation Bar (Hidden in Admin Studio) */}
      {currentView !== 'admin' && <Navbar currentView={currentView} onNavigate={navigateView} />}

      {/* Main Content Area - padded at bottom on mobile to accommodate bottom nav */}
      <main className={currentView === 'admin' ? '' : 'content-with-bottom-nav'} style={{ flex: 1 }}>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', color: 'var(--text-secondary)' }}>Loading...</div>}>
          {currentView === 'privacy' && (
            <PrivacyPolicyView onBack={() => navigateView('home')} />
          )}

          {currentView === 'terms' && (
            <TermsConditionsView onBack={() => navigateView('home')} />
          )}

          {currentView === 'refund' && (
            <RefundPolicyView onBack={() => navigateView('home')} />
          )}

          {currentView === 'delete-account' && (
            <DeleteAccountView onBack={() => navigateView('home')} />
          )}

          {currentView === 'features' && (
            <div className="animate-fade-in">
              <FeaturesGrid onNavigate={navigateView} />
            </div>
          )}

          {(currentView === 'split' ||
            currentView === 'flatmates-rent-splitter') && (
            <div className="animate-fade-in" style={{ padding: '40px 0' }}>
              <SplitterPage onNavigate={navigateView} />
            </div>
          )}

          {(currentView === 'calculators' ||
            currentView === 'home-loan-prepayment-vs-sip' ||
            currentView === 'emi-calculator' ||
            currentView === 'sip-calculator') && (
            <div className="animate-fade-in" style={{ padding: '40px 0' }}>
              <InteractiveDemo initialTab={routeState.tab} onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'faq' && (
            <div className="animate-fade-in">
              <FaqSection onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'news' && (
            <div className="animate-fade-in">
              <NewsFeedView onNavigate={navigateView} />
            </div>
          )}

          {(currentView === 'how-to-split-rent-unequal-rooms' ||
            currentView === 'home-loan-prepayment-vs-mutual-funds' ||
            currentView === 'how-to-track-upi-payments-automatically' ||
            currentView === 'guides') && (
            <div className="animate-fade-in">
              <ProblemSolvingGuides slug={currentView} onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'download' && (
            <div className="animate-fade-in">
              <DownloadSection onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'contact' && (
            <div className="animate-fade-in">
              <ContactView onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'home' && (
            <div className="animate-fade-in">
              {/* 1. Hero & Interactive Android Phone Showcase */}
              <Hero onNavigate={navigateView} />
            </div>
          )}

          {currentView === 'admin' && (
            <div className="animate-fade-in">
              <ArticleStudio onNavigate={navigateView} />
            </div>
          )}

          {currentView === '404' && (
            <div className="animate-fade-in">
              <NotFoundView onNavigate={navigateView} />
            </div>
          )}
        </Suspense>
      </main>

      {/* Persistent Mobile Bottom Navigation Bar (Hidden on Desktop & Admin) */}
      {currentView !== 'admin' && <MobileBottomNav currentView={currentView} onNavigate={navigateView} />}

      {/* Footer with Legal Compliance Links (Hidden in Admin) */}
      {currentView !== 'admin' && <Footer onNavigate={navigateView} />}
    </div>
  );
};

