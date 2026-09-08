import { useState, useEffect } from 'react';
import { FiX, FiTag, FiAlertTriangle, FiClock } from 'react-icons/fi';
import './NovemberPromo.css';

const NovemberPromo = ({ config }) => {
  const [showModal, setShowModal] = useState(false);
  const [showFloatingBadge, setShowFloatingBadge] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  if (!config?.enabled) return null;

  const {
    discountPercent = 60,
    originalPrice = 4500,
    discountPrice = 2700,
    currency = 'MXN',
    exclusions = 'No incluye hosting ni dominio web. Estos se contratan por separado.'
  } = config;

  // La promoción estará activa desde el 15 de septiembre hasta el 30 de noviembre.
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const promoStart = new Date(now.getFullYear(), 8, 15, 0, 0, 0); // 15 de septiembre
      const promoEnd = new Date(now.getFullYear(), 10, 30, 23, 59, 59); // 30 de noviembre

      let diff = 0;
      let label = 'Termina en:';

      if (now < promoStart) {
        diff = promoStart - now;
        label = 'Comienza en:';
      } else if (now <= promoEnd) {
        diff = promoEnd - now;
        label = 'Termina en:';
      } else {
        diff = 0;
        label = 'Oferta finalizada';
      }

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds, label });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, label });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mostrar modal después de 5 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowModal(false);
    // NO ocultar el badge flotante al cerrar el modal
    // El badge sigue visible para que puedan volver a abrir el modal
  };

  const handleCTAClick = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    handleClose();
  };

  const handleBadgeClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Badge flotante en la esquina - SIEMPRE visible mientras la promo esté activa */}
      {showFloatingBadge && (
        <div className="promo-floating-badge" onClick={handleBadgeClick}>
          <FiTag className="badge-icon" />
          <span className="badge-text">{discountPercent}% OFF</span>
          <FiAlertTriangle className="badge-pulse" />
        </div>
      )}

      {/* Modal promocional */}
      {showModal && (
        <div className="promo-modal-overlay" onClick={handleClose}>
          <div className="promo-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header con cierre */}
            <div className="promo-header">
              <div className="promo-badge">
                <FiTag /> PROMOCIÓN NOVIEMBRE
              </div>
              <button className="promo-close" onClick={handleClose} aria-label="Cerrar">
                <FiX size={20} />
              </button>
            </div>

            {/* Contenido principal */}
            <div className="promo-content">
              <div className="promo-main">
                <h2 className="promo-title">¡Landing Pages al <span>{discountPercent}% OFF</span>!</h2>
                <p className="promo-subtitle">Válido del 15 de septiembre al 30 de noviembre. Transforma tu presencia digital.</p>

                {/* Precios */}
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

                {/* Countdown timer */}
                <div className="promo-countdown">
                  <FiClock className="countdown-icon" />
                  <span className="countdown-label">{timeLeft.label}</span>
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

                {/* Detalles importantes */}
                <div className="promo-details">
                  <h3>¿Qué incluye?</h3>
                  <ul>
                    <li>✅ Landing page profesional y responsive</li>
                    <li>✅ Diseño personalizado para tu marca</li>
                    <li>✅ Optimización SEO básica</li>
                    <li>✅ Formulario de contacto funcional</li>
                    <li>✅ Integración WhatsApp</li>
                    <li>✅ Animaciones y efectos modernos</li>
                    <li>✅ Entrega en 5-7 días hábiles</li>
                  </ul>
                </div>

                {/* Exclusiones */}
                <div className="promo-exclusions">
                  <FiAlertTriangle className="exclusion-icon" />
                  <div className="exclusion-content">
                    <strong>No incluye:</strong> {exclusions}
                  </div>
                </div>

                {/* CTA */}
                <button className="promo-cta" onClick={handleCTAClick}>
                  <FiTag /> Quiero mi Landing Page
                </button>
              </div>

              {/* Imagen decorativa lateral */}
              <div className="promo-visual">
                <div className="visual-card">
                  <div className="visual-tag">Landing Page</div>
                  <div className="visual-preview">
                    <div className="preview-header">
                      <div className="preview-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="preview-content">
                      <div className="preview-section hero"></div>
                      <div className="preview-section services"></div>
                      <div className="preview-section about"></div>
                      <div className="preview-section contact"></div>
                    </div>
                  </div>
                  <div className="visual-price">
                    <span className="visual-original">${originalPrice.toLocaleString('es-MX')} {currency}</span>
                    <span className="visual-discounted">${discountPrice.toLocaleString('es-MX')} {currency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NovemberPromo;