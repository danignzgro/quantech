import { useEffect, useRef } from 'react';

/**
 * Custom hook que aplica animaciones de entrada cuando un elemento
 * entra en el viewport usando IntersectionObserver.
 *
 * @param {Object} options
 * @param {string} options.className - Clase CSS a añadir al ser visible (default: 'revealed')
 * @param {number} options.threshold - Umbral de visibilidad 0-1 (default: 0.15)
 * @param {string} options.rootMargin - Margen del observer (default: '0px 0px -60px 0px')
 * @param {boolean} options.once - Si true, solo anima una vez (default: true)
 * @returns {React.RefObject} Ref para el elemento a observar
 */
export function useScrollReveal({
  className = 'revealed',
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(className);
          if (once) observer.unobserve(el);
        } else if (!once) {
          el.classList.remove(className);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [className, threshold, rootMargin, once]);

  return ref;
}