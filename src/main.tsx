import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import { App } from './App';
import './index.css';

const appTree = (
  <React.StrictMode>
    <SettingsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SettingsProvider>
  </React.StrictMode>
);

function mountApp(): void {
  const rootElement = document.getElementById('root');
  if (!rootElement) return;

  const isHydratable = rootElement.getAttribute('data-hydratable') === 'true';

  if (isHydratable && rootElement.hasChildNodes()) {
    ReactDOM.hydrateRoot(rootElement, appTree);
  } else {
    ReactDOM.createRoot(rootElement).render(appTree);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
