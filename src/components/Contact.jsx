
import { buildWhatsappUrl } from '../config/whatsapp';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FIELD_LABELS = {
  name: { label: 'Nombre', type: 'text', required: true },
  email: { label: 'Correo Electrónico', type: 'email', required: true },
  phone: { label: 'Teléfono', type: 'tel', required: false },
  message: { label: 'Mensaje', type: 'textarea', required: true },
};

const Contact = ({ config, formData, handleInputChange, handleSubmit }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const formRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const infoRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  if (!config) return null;

  const fields = config.formFields || ['name', 'email', 'message'];
  const waUrl = buildWhatsappUrl(config.whatsapp, config.whatsappMessage);

  return (
    <section ref={sectionRef} id="contact" className="contact-section">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Contacto</span>
          <h2 className="section-title">{config.title}</h2>
        </div>
        <div className="contact-container">
          <div ref={formRef} className="contact-form-wrapper reveal-left">
            <form className="contact-form" onSubmit={handleSubmit}>
              {fields.map((key) => {
                const f = FIELD_LABELS[key];
                if (!f) return null;
                return (
                  <div className="form-group" key={key}>
                    <label htmlFor={key}>{f.label}:</label>
                    {f.type === 'textarea' ? (
                      <textarea
                        id={key}
                        name={key}
                        rows="4"
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        required={f.required}
                      ></textarea>
                    ) : (
                      <input
                        type={f.type}
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        required={f.required}
                      />
                    )}
                  </div>
                );
              })}
              <button type="submit" className="submit-button">{config.submitLabel || 'Enviar'}</button>
            </form>
          </div>

          <div ref={infoRef} className="contact-info reveal-right">
            <h3 className="contact-title">Información de Contacto</h3>
            {config.address && <p className="contact-item"><span className="contact-item-icon">📍</span>{config.address}</p>}
            {config.phone && <p className="contact-item"><span className="contact-item-icon">📞</span>{config.phone}</p>}
            {config.email && <p className="contact-item"><span className="contact-item-icon">✉️</span>{config.email}</p>}
            {config.whatsapp && (
              <a className="contact-whatsapp" href={waUrl} target="_blank" rel="noopener noreferrer">
                💬 Escríbenos por WhatsApp
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;