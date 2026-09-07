import { useScrollReveal } from '../hooks/useScrollReveal';
import { FiCheck, FiTarget, FiZap, FiShield, FiSmartphone, FiBarChart, FiUsers, FiClock, FiGlobe, FiLock, FiArrowRight } from 'react-icons/fi';
import './LandingInfoSection.css';

const LandingInfoSection = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const contentRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config?.enabled) return null;

  const {
    title = '¿Por qué necesitas una Landing Page?',
    subtitle = 'Convierte visitantes en clientes con una página diseñada para vender',
    features = [],
    benefits = [],
    keyPoints = [],
    ctaText = 'Quiero mi Landing Page',
    ctaHref = '#contact',
    backgroundImage = ''
  } = config;

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="landing-info"
      className="landing-info-section"
      style={{ background: backgroundImage ? `url(${backgroundImage}) center/cover` : 'var(--bg-alt)' }}
    >
      {backgroundImage && <div className="landing-info-bg" aria-hidden="true"></div>}
      <div className="container">
        <div ref={contentRef} className="landing-info-content reveal">
          {/* Header */}
          <div className="landing-info-header">
            <span className="section-badge">
              <FiTarget /> Información Clave
            </span>
            <h2 className="landing-info-title">{title}</h2>
            <p className="landing-info-subtitle">{subtitle}</p>
          </div>

          {/* Características principales */}
          <div className="landing-info-grid">
            <div className="landing-info-main">
              <h3 className="subsection-title">
                <FiZap /> Características de Nuestras Landing Pages
              </h3>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-card">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h4 className="feature-title">{feature.title}</h4>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="landing-info-sidebar">
              {/* Beneficios para el negocio */}
              <div className="benefits-card">
                <h3 className="subsection-title">
                  <FiArrowRight /> Beneficios para tu Negocio
                </h3>
                <ul className="benefits-list">
                  {benefits.map((benefit, index) => (
                    <li key={index}>
                      <FiCheck className="benefit-icon" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Puntos clave de interés */}
              <div className="key-points-card">
                <h3 className="subsection-title">
                  <FiTarget /> Puntos Clave
                </h3>
                <ul className="key-points-list">
                  {keyPoints.map((point, index) => (
                    <li key={index}>
                      <div className="key-point-number">{index + 1}</div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA destacado */}
              <button className="landing-info-cta" onClick={handleCTAClick}>
                <FiArrowRight /> {ctaText}
              </button>
            </div>
          </div>

          {/* Stats / Social Proof */}
          <div className="landing-stats">
            <div className="stat-item">
              <div className="stat-number">3x</div>
              <div className="stat-label">Más conversiones</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5-7</div>
              <div className="stat-label">Días de entrega</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingInfoSection;