import { useEffect, useState } from "react";

export default function useCountUp(endValue = 0, duration = 1000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!endValue) {
      setValue(0);
      return;
    }

    let startTime = null;

    const easeOut = (t) => 1 - Math.pow(1 - t, 3); // smooth effect

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easedProgress = easeOut(progress);

      const currentValue = Math.floor(easedProgress * endValue);
      setValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return value;
}