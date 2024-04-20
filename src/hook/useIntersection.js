import { useEffect, useState } from 'react';

const useIntersection = (element, rootMargin) => {
  const [isVisible, setState] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState(entry.isIntersecting);
          observer.unobserve(element.current);
        }
      },
      { rootMargin }
    );
    const el = element.current;
    el && observer.observe(el);

    return () => el && observer.unobserve(el);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isVisible;
};
export default useIntersection;
