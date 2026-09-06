import { useScrollReveal } from '../hooks/useScrollReveal';

const Columns = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const cols = config?.columns || [];

  if (!config) return null;

  return (
    <section ref={sectionRef} id="columns" className="columns-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Columnas</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div className="columns-grid">
          {cols.map((col, i) => (
            <div key={i} className="column-card reveal stagger-children">
              {col.image && (
                <img src={col.image} alt={col.title} loading="lazy" className="column-card-image" />
              )}
              <div className="column-card-body">
                {col.title && <h3 className="column-card-title">{col.title}</h3>}
                {col.text && <p className="column-card-text">{col.text}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Columns;
