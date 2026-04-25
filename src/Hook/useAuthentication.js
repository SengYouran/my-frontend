import { useEffect, useState } from "react";

function useAuthentication({ setLoading, url }) {
  const [loginFalse, setLoginFalse] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [auth, setAuth] = useState(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // 🔁 GET CURRENT USER (Fix reload)
  const getMe = async () => {
  try {
    setLoading(true); // ✅ ADD

    const res = await fetch(`${url}/login/me`, {
      credentials: "include",
    });

    if (!res.ok) {
      setAuth(null);
      setLoading(false); // ✅ ADD
      return;
    }

    const data = await res.json();
    setAuth(data);
    setLoading(false); // ✅ ADD
  } catch (err) {
    setAuth(null);
    setLoading(false); // ✅ ADD
  }
};

  // 🔄 On app load
  useEffect(() => {
    getMe();
  }, [url]);
  // Handle input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // 🔑 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginFalse(false);

    if (!user.email || !user.password) {
      setLoginFalse(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // 🔥 IMPORTANT
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        setLoginFalse(true);
        setLoading(false);
        return;
      }
      await getMe();
      // 👉 JWT saved in cookie (no user here)
      setRedirect(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoginFalse(true);
      console.error(error);
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await fetch(`${url}/login/logout`, {
      method: "POST",
      credentials: "include",
    });

    setAuth(null);
    setRedirect(false);
  };

  return {
    loginFalse,
    handleChange,
    handleLogin,
    redirect,
    auth,
    logout,
    user,
  };
}

export { useAuthentication };
