import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { siteConfig } from './config/site.config';
import { applyPageMetadata } from './config/seo';
import { applyTheme } from './config/theme';
import './App.css';

// Aplica el tema (colores, fuente) definido en la configuración central.
applyTheme(siteConfig.theme);
applyPageMetadata(siteConfig.seo);

// Carga la fuente de Google Fonts si se definió en la config.
if (siteConfig.theme?.fontUrl) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = siteConfig.theme.fontUrl;
  document.head.appendChild(link);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App headerFooter={siteConfig.theme?.headerFooter} />
  </React.StrictMode>
);