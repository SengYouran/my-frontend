import { useEffect } from "react";
import { useState } from "react";

const useClass = ({ url, setLoading }) => {
  const [formClass, setFormClass] = useState(false);
  const [className, setClassName] = useState([]);

  async function getClassName() {
    setLoading(true);
    try {
      const response = await fetch(`${url}/class`);
      if (!response.ok) {
        throw new Error("Failed to fecth class name");
      }
      const data = await response.json();
      setClassName(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getClassName();
  }, [url]);
  
  return {
    formClass,
    setFormClass,
    className,
  };
};
export { useClass };
