
import { useScrollReveal } from '../hooks/useScrollReveal';

const Testimonials = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const gridRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  return (
    <section ref={sectionRef} id="testimonials" className="testimonials-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Testimonios</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div ref={gridRef} className="testimonials-grid stagger-children">
          {(config.items || []).map((testimonial, index) => (
            <div key={index} className="testimonial-card reveal">
              <div className="testimonial-header">
                <div className="testimonial-author">
                  <div className="testimonial-avatar">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    {testimonial.role && <p className="testimonial-role">{testimonial.role}</p>}
                  </div>
                </div>
                <div className="stars" aria-label={`${testimonial.rating} de 5 estrellas`}>
                  {'★'.repeat(testimonial.rating || 5)}
                </div>
              </div>
              <p className="testimonial-comment">"{testimonial.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;