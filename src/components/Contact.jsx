
import { useState } from 'react';
import { buildWhatsappUrl } from '../config/whatsapp';
import { useScrollReveal } from '../hooks/useScrollReveal';
import emailjs from '@emailjs/browser';

const FIELD_LABELS = {
  name: { label: 'Nombre', type: 'text', required: true },
  email: { label: 'Correo Electrónico', type: 'email', required: true },
  phone: { label: 'Teléfono', type: 'tel', required: false },
  message: { label: 'Mensaje', type: 'textarea', required: true },
};

const Contact = ({ config }) => {
  const sectionRef = useScrollReveal({ className: 'revealed', threshold: 0.15 });
  const formRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });
  const infoRef = useScrollReveal({ className: 'revealed', threshold: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle, loading, success, error
  const [submitMessage, setSubmitMessage] = useState('');

  if (!config) return null;

  const fields = config.formFields || ['name', 'email', 'message'];
  const waUrl = buildWhatsappUrl(config.whatsapp, config.whatsappMessage);

  // EmailJS config - se puede configurar via variables de entorno o site.config
  const emailjsConfig = config.emailjs || {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Limpiar mensajes de estado al escribir
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('error');
      setSubmitMessage('Por favor completa todos los campos obligatorios');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setSubmitMessage('Por favor ingresa un correo electrónico válido');
      return;
    }

    // Si no hay configuración de EmailJS, usar fallback a WhatsApp
    if (!emailjsConfig.serviceId || !emailjsConfig.templateId || !emailjsConfig.publicKey) {
      setSubmitStatus('success');
      setSubmitMessage('Formulario enviado. Te contactaremos pronto por WhatsApp.');
      // Abrir WhatsApp con los datos
      const waMessage = `Hola, soy ${formData.name} (${formData.email}). ${formData.message}`;
      const waUrl = buildWhatsappUrl(config.whatsapp, waMessage);
      window.open(waUrl, '_blank');
      setFormData({ name: '', email: '', phone: '', message: '' });
      return;
    }

    setSubmitStatus('loading');
    setSubmitMessage('Enviando...');

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'No proporcionado',
        message: formData.message,
        to_email: config.email || 'danignzgro@gmail.com',
        subject: `Nuevo contacto desde ${config.brand?.name || 'QuanTech'} - ${formData.name}`
      };

      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      setSubmitStatus('success');
      setSubmitMessage('¡Mensaje enviado correctamente! Te responderemos pronto.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      setSubmitMessage('Error al enviar. Intenta de nuevo o escríbenos por WhatsApp.');
    }
  };

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
                        disabled={submitStatus === 'loading'}
                      ></textarea>
                    ) : (
                      <input
                        type={f.type}
                        id={key}
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleInputChange}
                        required={f.required}
                        disabled={submitStatus === 'loading'}
                      />
                    )}
                  </div>
                );
              })}
              
              {/* Status message */}
              {(submitStatus === 'success' || submitStatus === 'error') && (
                <div className={`form-status ${submitStatus}`}>
                  {submitMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="submit-button"
                disabled={submitStatus === 'loading'}
              >
                {submitStatus === 'loading' ? 'Enviando...' : (config.submitLabel || 'Enviar')}
              </button>
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