
import { useScrollReveal } from '../hooks/useScrollReveal';

const About = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const textRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const imageRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div ref={textRef} className="about-text-col reveal-left">
            <div className="section-header">
              <span className="section-label">Nosotros</span>
              <h2 className="section-title">{config.title}</h2>
            </div>
            {(config.paragraphs || []).map((p, i) => (
              <p key={i} className="about-text">{p}</p>
            ))}
            {config.stats && (
              <div className="about-stats stagger-children">
                {config.stats.map((stat, i) => (
                  <div key={i} className="reveal">
                    <div className="about-stat-number">{stat.number}</div>
                    <div className="about-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {config.image && (
            <div ref={imageRef} className="about-image-col reveal-right">
              <div className="about-image-wrapper">
                <img src={config.image} alt={config.title} loading="lazy" />
                <div className="about-image-decoration" aria-hidden="true"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;