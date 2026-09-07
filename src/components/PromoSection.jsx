import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { FiTag, FiClock, FiCheck, FiAlertTriangle } from 'react-icons/fi';
import './PromoSection.css';

const PromoSection = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const contentRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config?.enabled) return null;

  const {
    discountPercent = 60,
    originalPrice = 4500,
    discountPrice = 2700,
    currency = 'MXN',
    exclusions = 'No incluye hosting ni dominio web. Estos se contratan por separado.',
    title = 'Promoción Noviembre',
    subtitle = 'Aprovecha el 60% de descuento en Landing Pages profesionales',
    ctaText = 'Quiero mi Landing Page',
    backgroundImage = ''
  } = config;

  // Calcular tiempo restante hasta fin de noviembre
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfNovember = new Date(now.getFullYear(), 10, 30, 23, 59, 59);
      const diff = endOfNovember - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCTAClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="promo"
      className="promo-section"
      style={{ background: backgroundImage ? `url(${backgroundImage}) center/cover` : 'var(--gradient-brand)' }}
    >
      {backgroundImage && <div className="promo-bg" aria-hidden="true"></div>}
      <div className="container">
        <div ref={contentRef} className="promo-content reveal">
          <div className="promo-header">
            <span className="promo-badge">
              <FiTag /> {title}
            </span>
            <h2 className="promo-title">{subtitle}</h2>
          </div>

          <div className="promo-grid">
            {/* Card principal con precios */}
            <div className="promo-main-card">
              <div className="promo-pricing">
                <div className="price-box original">
                  <span className="price-label">Precio Original</span>
                  <span className="price-amount">
                    <span className="currency">$</span>
                    {originalPrice.toLocaleString('es-MX')}
                    <span className="period">{currency}</span>
                  </span>
                </div>
                <div className="price-box discounted">
                  <span className="price-label">Precio Noviembre</span>
                  <span className="price-amount">
                    <span className="currency">$</span>
                    {discountPrice.toLocaleString('es-MX')}
                    <span className="period">{currency}</span>
                  </span>
                  <span className="discount-tag">-{discountPercent}%</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="promo-countdown">
                <FiClock className="countdown-icon" />
                <span className="countdown-label">Termina en:</span>
                <div className="countdown-timer">
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.days}</span>
                    <span className="countdown-unit">Días</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="countdown-unit">Horas</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="countdown-unit">Min</span>
                  </div>
                  <div className="countdown-separator">:</div>
                  <div className="countdown-item">
                    <span className="countdown-value">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="countdown-unit">Seg</span>
                  </div>
                </div>
              </div>

              {/* Exclusiones */}
              <div className="promo-exclusions">
                <FiAlertTriangle className="exclusion-icon" />
                <div className="exclusion-content">
                  <strong>Importante:</strong> {exclusions}
                </div>
              </div>

              {/* CTA */}
              <button className="promo-cta" onClick={handleCTAClick}>
                <FiTag /> {ctaText}
              </button>
            </div>

            {/* Card de beneficios */}
            <div className="promo-benefits-card">
              <h3 className="benefits-title">¿Qué incluye tu Landing Page?</h3>
              <ul className="benefits-list">
                <li><FiCheck /> Landing page profesional y responsive</li>
                <li><FiCheck /> Diseño personalizado para tu marca</li>
                <li><FiCheck /> Optimización SEO básica</li>
                <li><FiCheck /> Formulario de contacto funcional</li>
                <li><FiCheck /> Integración WhatsApp flotante</li>
                <li><FiCheck /> Animaciones y efectos modernos</li>
                <li><FiCheck /> Entrega en 5-7 días hábiles</li>
                <li><FiCheck /> Soporte técnico post-entrega</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;