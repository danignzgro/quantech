import { useScrollReveal } from '../hooks/useScrollReveal';

const CustomSection = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const contentRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id={config.id} className="custom-section">
      <div className="container">
        {config.title && (
          <div className="section-header reveal">
            <span className="section-label">Personalizado</span>
            <h2 className="section-title">{config.title}</h2>
          </div>
        )}
        <div ref={contentRef} className="custom-content reveal">
          <div dangerouslySetInnerHTML={{ __html: config.html || '' }} />
        </div>
      </div>
    </section>
  );
};

export default CustomSection;
