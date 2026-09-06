import { useScrollReveal } from '../hooks/useScrollReveal';

const ImageSection = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const imageRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const captionRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id="image" className="image-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Imagen Destacada</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div ref={imageRef} className="image-wrapper reveal-left">
          {config.image && <img src={config.image} alt={config.caption || config.title} loading="lazy" className="image-section-img" />}
        </div>
        {config.caption && (
          <p ref={captionRef} className="image-caption reveal">{config.caption}</p>
        )}
      </div>
    </section>
  );
};

export default ImageSection;
