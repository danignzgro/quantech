import { useScrollReveal } from '../hooks/useScrollReveal';
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const brandRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const linksRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const servicesRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const socialRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const bottomRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;
  const footerColor = config.__headerFooter || 'var(--color-header-footer)';

  return (
    <footer ref={sectionRef} className="footer" style={{ background: footerColor }}>
      <div className="container footer-grid">
        <div ref={brandRef} className="reveal">
          <h3 className="footer-brand">{config.brandName || 'Marca'}</h3>
          <p className="footer-brand-desc">{config.description || config.text}</p>
        </div>
        {(config.links || []).length > 0 && (
        <div ref={linksRef} className="reveal">
          <h4 className="footer-heading">Enlaces Rápidos</h4>
          <ul className="footer-links">
            {config.links?.map((link, i) => (
              <li key={i}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>
        </div>
        )}
        {(config.services || []).length > 0 && (
        <div ref={servicesRef} className="reveal">
          <h4 className="footer-heading">Servicios</h4>
          <ul className="footer-links">
            {config.services?.map((s, i) => (
              <li key={i}><a href={`#${s.id || 'services'}`}>{s.title}</a></li>
            ))}
          </ul>
        </div>
        )}
        {(config.social || []).length > 0 && (
        <div ref={socialRef} className="reveal">
          <h4 className="footer-heading">Síguenos</h4>
          <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
                <span className="footer-icon"><BsFacebook /></span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <span className="footer-icon"><BsInstagram /></span>
              </a>
          </div>
        </div>
        )}
      </div>
      <div ref={bottomRef} className="footer-bottom reveal">
        <p className="footer-text">{config.copyright || config.text || `© ${new Date().getFullYear()} ${config.brandName || 'Todos los derechos reservados'}`}</p>
      </div>
    </footer>
  );
};

export default Footer;
