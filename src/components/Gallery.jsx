
import { useScrollReveal } from '../hooks/useScrollReveal';

const Gallery = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const gridRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id="gallery" className="gallery-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Galería</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div ref={gridRef} className="gallery-grid stagger-children">
          {(config.images || []).map((image, index) => (
            <div key={index} className="gallery-item reveal">
              <img src={image.url} alt={image.alt} loading="lazy" />
              {image.caption && (
                <div className="gallery-item-caption">
                  <h4>{image.caption}</h4>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;