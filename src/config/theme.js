/**
 * Convierte el objeto `theme` de site.config.js en variables CSS
 * (custom properties) que se aplican al elemento raíz del documento.
 * De esta forma, cambiar un color en la config cambia TODA la página.
 */

export function buildThemeVars(theme = {}) {
  const headerFooter = theme.headerFooter || '#0f172a';
  return {
    '--color-primary': theme.primary || '#667eea',
    '--color-primary-dark': theme.primaryDark || '#5a67d8',
    '--color-secondary': theme.secondary || '#ff6b6b',
    '--color-accent': theme.accent || '#6c5ce6',
    '--color-text': theme.text || '#333333',
    '--color-text-light': theme.textLight || '#6b7280',
    '--color-bg': theme.bg || '#ffffff',
    '--color-bg-alt': theme.bgAlt || '#f8f9fa',
    '--color-header-footer': headerFooter,
    '--color-on-header-footer': getReadableTextColor(headerFooter),
    '--font-family': theme.fontFamily || 'system-ui, sans-serif',
    '--radius': theme.radius || '12px',
    '--gradient-brand':
      `linear-gradient(135deg, ${theme.primary || '#667eea'} 0%, ${theme.accent || '#6c5ce6'} 100%)`,
  };
}

function getReadableTextColor(color) {
  const hex = color.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(hex)) return '#ffffff';

  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminance > 160 ? '#111827' : '#ffffff';
}

/** Aplica las variables de tema al <html> para que sean globales. */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const vars = buildThemeVars(theme);
  const root = document.documentElement;
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
