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

// If #root contains build-time pre-rendered HTML, hydrate to preserve DOM nodes without replacement delay
if (rootElement && rootElement.hasChildNodes()) {
  ReactDOM.hydrateRoot(rootElement, appTree);
} else if (rootElement) {
  ReactDOM.createRoot(rootElement).render(appTree);
}
