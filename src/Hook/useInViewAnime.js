import { useEffect, useRef } from "react";

export default function useInViewAnime(className = "active", delay = 50, watch = []) {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add(className);
            }, index * delay);
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsRef.current.forEach((el) => el && observer.observe(el));

    return () => {
      elementsRef.current.forEach((el) => el && observer.unobserve(el));
    };
  }, [className, delay, ...watch]); // <-- re-run when `watch` changes

  return elementsRef;
}
