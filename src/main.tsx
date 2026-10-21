import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { App } from './App';
import './index.css';

const rootElement = document.getElementById('root') as HTMLElement;

const appTree = (
  <React.StrictMode>
    <SettingsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SettingsProvider>
  </React.StrictMode>
);

// Hydrate when pre-rendered matching React tree exists (e.g. homepage); otherwise mount cleanly via createRoot
const isHydratable = rootElement?.getAttribute('data-hydratable') === 'true';

if (rootElement && isHydratable && rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, appTree);
} else if (rootElement) {
  ReactDOM.createRoot(rootElement).render(appTree);
}
