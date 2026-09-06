/**
 * Utilidades para generar enlaces de WhatsApp a partir de la config.
 */

/** Construye la URL de wa.me con el número y mensaje codificados. */
export function buildWhatsappUrl(number, message = '') {
  const clean = String(number || '').replace(/[^0-9]/g, '');
  const base = `https://wa.me/${clean}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
