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
    const { Footer } = await server.ssrLoadModule('./src/components/layout/Footer.tsx');

    const navbarHtml = renderToString(React.createElement(SettingsProvider, null, React.createElement(Navbar, { currentView: 'home' })));
    const heroHtml = renderToString(React.createElement(Hero, null));
    const showcaseHtml = renderToString(React.createElement(HomeFeaturesShowcase, null));
    const faqHtml = renderToString(React.createElement(FaqSection, { useHomeFaqs: true, headingLevel: 'h2' }));
    const footerHtml = renderToString(React.createElement(SettingsProvider, null, React.createElement(Footer, null)));

    const homeHtml = `<div class="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans transition-colors duration-200">${navbarHtml}<main class="flex-1"><div>${heroHtml}${showcaseHtml}${faqHtml}</div></main>${footerHtml}</div>`;
    return homeHtml;
  } finally {
    await server.close();
  }
}
