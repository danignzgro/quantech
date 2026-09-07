import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';

const Navbar = ({ config, brand }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!config) return null;

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-inner">
        <a className="navbar-brand" href="#hero">
          {Logo ? (
            <img src={Logo} alt={brand.name} className="navbar-logo" />
          ) : (
            <span>{brand?.name || 'Inicio'}</span>
          )}
        </a>

        <nav className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <button
            type="button"
            className="navbar-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            Cerrar <span aria-hidden="true">×</span>
          </button>
          {(config.links || []).map((link, i) => (
            <a key={i} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</a>
          ))}
        </nav>

        {config.cta?.label && (
          <a className="navbar-cta" href={config.cta.href || '#contact'}>{config.cta.label}</a>
        )}

        <button
          className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
