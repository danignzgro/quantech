import { buildWhatsappUrl } from '../config/whatsapp';
import { useScrollReveal } from '../hooks/useScrollReveal';

const WhatsappFloat = ({ config, whatsapp }) => {
  const floatRef = useScrollReveal({ className: 'revealed', threshold: 0.1, once: true });

  if (!whatsapp) return null;
  const url = buildWhatsappUrl(whatsapp, config?.message);

  return (
    <a
      ref={floatRef}
      className="whatsapp-float"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      title={config?.message || 'WhatsApp'}
    >
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 4C9.93 4 5 8.93 5 15.04c0 2.13.62 4.11 1.7 5.79L5 28l7.4-1.66a11 11 0 0 0 3.64.63h.01C22.15 27 27 22.07 27 15.96 27 9.85 22.15 4 16.04 4zm0 20.13h-.01a9.2 9.2 0 0 1-4.68-1.28l-.34-.2-4.39.99.93-4.28-.22-.35a9.18 9.18 0 0 1-1.4-4.91c0-5.09 4.14-9.23 9.23-9.23 2.47 0 4.79.96 6.54 2.71a9.18 9.18 0 0 1 2.7 6.54c0 5.09-4.14 9.21-9.23 9.21zm5.05-6.9c-.28-.14-1.64-.81-1.89-.9-.25-.09-.43-.14-.61.14-.18.28-.69.9-.85 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.22-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.5.14-.18.18-.3.28-.5.09-.2.05-.38-.02-.52-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47l-.53-.01c-.2 0-.52.07-.79.38-.27.31-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z"
        />
      </svg>
    </a>
  );
};

export default WhatsappFloat;
