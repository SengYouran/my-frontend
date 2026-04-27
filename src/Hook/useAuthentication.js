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
  // GET USER
  // =========================
  const getMe = async (currentToken) => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://my-backend-sandy-zeta.vercel.app/login/me",
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        },
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
  // RUN WHEN TOKEN CHANGES
  // =========================
  useEffect(() => {
    if (token) {
      getMe(token);
    }
  }, [token]);

  // =========================
  // INPUT
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
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setLoginFalse(true);
        setLoading(false);
        return;
      }

      setToken(data.accessToken);
      setRedirect(true);
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
    await fetch("https://my-backend-sandy-zeta.vercel.app/login/logout", {
      method: "POST",
      credentials: "include",
    });

    setAuth(null);
    setToken(null);
    setRedirect(false);
  };

  // =========================
  // REFRESH TOKEN (FIXED LOOP SAFE)
  // =========================
  const refreshToken = async () => {
    try {
      const res = await fetch(
        "https://my-backend-sandy-zeta.vercel.app/login/refresh",
        {
          method: "POST",
          credentials: "include",
        },
      );

      if (!res.ok) {
        setAuth(null);
        return;
      }

      const data = await res.json();

      setToken(data.accessToken);

      // 🔥 IMPORTANT: immediately fetch user after refresh
      getMe(data.accessToken);
    } catch (err) {
      console.log("refresh error:", err);
    }
  };

  // =========================
  // AUTO RESTORE SESSION (FIXED)
  // =========================
  useEffect(() => {
    refreshToken(); // run once on load
  }, []);

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
