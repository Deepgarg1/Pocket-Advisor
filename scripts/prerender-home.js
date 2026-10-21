import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import React from 'react';

export async function renderHomeComponents() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  try {
    const { SettingsProvider } = await server.ssrLoadModule('./src/context/SettingsContext.tsx');
    const { Navbar } = await server.ssrLoadModule('./src/components/layout/Navbar.tsx');
    const { Hero } = await server.ssrLoadModule('./src/components/landing/Hero.tsx');
    const { HomeFeaturesShowcase } = await server.ssrLoadModule('./src/components/landing/HomeFeaturesShowcase.tsx');
    const { FaqSection } = await server.ssrLoadModule('./src/components/landing/FaqSection.tsx');
    const { MobileBottomNav } = await server.ssrLoadModule('./src/components/layout/MobileBottomNav.tsx');
    const { Footer } = await server.ssrLoadModule('./src/components/layout/Footer.tsx');

    // Build the exact component tree that <App /> renders on route '/'
    const homeTree = React.createElement(
      SettingsProvider,
      null,
      React.createElement(
        'div',
        {
          style: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'var(--bg-canvas)',
            color: 'var(--text-primary)',
          },
        },
        React.createElement(Navbar, { currentView: 'home' }),
        React.createElement(
          'main',
          {
            className: 'content-with-bottom-nav',
            style: { flex: 1 },
          },
          React.createElement(
            'div',
            null,
            React.createElement(Hero, null),
            React.createElement(HomeFeaturesShowcase, null),
            React.createElement(FaqSection, { useHomeFaqs: true, headingLevel: 'h2' })
          )
        ),
        React.createElement(MobileBottomNav, { currentView: 'home' }),
        React.createElement(Footer, null)
      )
    );

    return renderToString(homeTree);
  } finally {
    await server.close();
  }
}
