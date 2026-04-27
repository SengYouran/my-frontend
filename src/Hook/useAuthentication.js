import { useEffect, useState } from "react";

function useAuthentication({ setLoading }) {
  const [loginFalse, setLoginFalse] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [auth, setAuth] = useState(null);
  const [token, setToken] = useState(null);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // =========================
  // GET CURRENT USER
  // =========================
  const getMe = async (currentToken) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://my-backend-sandy-zeta.vercel.app/login/me",
        {
          headers: {
            Authorization: `Bearer ${currentToken || token}`,
          },
        }
      );

      if (!res.ok) {
        setAuth(null);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setAuth(data);
      setLoading(false);
    } catch (err) {
      setAuth(null);
      setLoading(false);
    }
  };

  // =========================
  // AUTO RUN WHEN TOKEN CHANGES
  // =========================
  useEffect(() => {
    if (token) {
      getMe(token); // FIX: wait for token
    }
  }, [token]);

  // =========================
  // INPUT HANDLER
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginFalse(false);

    if (!user.email || !user.password) {
      setLoginFalse(true);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://my-backend-sandy-zeta.vercel.app/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setLoginFalse(true);
        setLoading(false);
        return;
      }

      // =========================
      // FIX ORDER (IMPORTANT)
      // =========================
      setToken(data.accessToken); // FIRST
      setRedirect(true);          // THEN
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setLoginFalse(true);
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    await fetch(
      "https://my-backend-sandy-zeta.vercel.app/login/logout",
      {
        method: "POST",
        credentials: "include",
      }
    );

    setAuth(null);
    setToken(null);
    setRedirect(false);
  };

  // =========================
  // REFRESH TOKEN (OPTIONAL BUT PRO)
  // =========================
  const refreshToken = async () => {
    try {
      const res = await fetch(
        "https://my-backend-sandy-zeta.vercel.app/login/refresh",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setToken(data.accessToken);
      }
    } catch (err) {
      console.log("refresh error", err);
    }
  };

  // =========================
  // AUTO REFRESH ON LOAD
  // =========================
  useEffect(() => {
    if (!token) {
      refreshToken();
    }
  }, []);

  // =========================
  // RETURN
  // =========================
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