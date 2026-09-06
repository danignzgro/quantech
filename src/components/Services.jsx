
import { useScrollReveal } from '../hooks/useScrollReveal';

const Services = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const gridRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id="services" className="services-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Servicios</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div ref={gridRef} className="services-grid stagger-children">
          {(config.items || []).map((service, index) => (
            <div key={index} className="service-card reveal">
              {service.icon && <span className="service-icon">{service.icon}</span>}
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;