import { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Carousel = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const [index, setIndex] = useState(0);
  const images = config?.images || [];

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setIndex((currentIndex) => (
          currentIndex === images.length - 1 ? 0 : currentIndex + 1
        ));
      }, config.autoPlayInterval || 5000);
      return () => clearInterval(interval);
    }
  }, [images.length, config?.autoPlayInterval]);

  if (!config || images.length === 0) return null;

  return (
    <section ref={sectionRef} id="carousel" className="carousel-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Galería</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div className="carousel-wrapper reveal">
          <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((img, i) => (
              <div key={i} className="carousel-slide">
                <img src={img.url} alt={img.alt || config.title} className="carousel-img" loading="lazy" />
                {img.caption && <div className="carousel-slide-caption">{img.caption}</div>}
              </div>
            ))}
          </div>
          <button className="carousel-btn carousel-btn-prev" onClick={prev} aria-label="Anterior" disabled={images.length <= 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button className="carousel-btn carousel-btn-next" onClick={next} aria-label="Siguiente" disabled={images.length <= 1}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
        </div>
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button key={i} className={`carousel-dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={`Ir a slide ${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
