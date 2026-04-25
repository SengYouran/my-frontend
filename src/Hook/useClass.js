import { useEffect } from "react";
import { useState } from "react";
import auth from "../../../back_end/Middlewares/auth";

const useClass = ({ url, setLoading, auth }) => {
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
    if (!auth) return;
    getClassName();
  }, [url]);

  return {
    formClass,
    setFormClass,
    className,
  };
};
export { useClass };
