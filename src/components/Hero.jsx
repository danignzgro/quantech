
import { useScrollReveal } from '../hooks/useScrollReveal';
import heroImage from '../assets/hero.png';

const Hero = ({ config }) => {
  const heroRef = useScrollReveal({ className: 'revealed', threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
  const contentRef = useScrollReveal({ className: 'revealed', threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  if (!config) return null;
  const align = config.align === 'left' ? 'left' : 'center';
  const bgImage = config.image || heroImage;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="hero-section"
      data-align={align}
      style={{ background: `url(${bgImage}) center/cover` }}
    >
      <div className="hero-bg" aria-hidden="true"></div>
      <div ref={contentRef} className="hero-content">
        {config.badge && <span className="hero-badge">{config.badge}</span>}
        <h1 className="hero-title">{config.title}</h1>
        {config.subtitle && <p className="hero-subtitle">{config.subtitle}</p>}
      </div>
      <div className="hero-scroll" aria-hidden="true">
        <div className="hero-scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;