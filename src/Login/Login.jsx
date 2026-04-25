import { useEffect, useState } from "react";
import { useDataContext } from "../Context";
import { useNavigate } from "react-router-dom";

function Login() {
  const { loginFalse, loading, handleChange, handleLogin, user, redirect } =
    useDataContext();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (redirect) navigate("/dashboard");
  }, [redirect, navigate]);
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-100 overflow-hidden">
      {/* ===== Animated Background Lines ===== */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300 to-transparent opacity-30 animate-slide"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-300 to-transparent opacity-20 animate-slide delay-2000"></div>
      </div>

      {/* ===== Login Card ===== */}
      <div className="relative z-10 w-[90%] md:w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex justify-center items-center gap-2">
            <i className="fa-solid fa-gear text-xl text-blue-600 transition-all transform duration-500 animate-spin"></i>
            <h1 className="text-2xl font-bold text-gray-900">SMART ERP</h1>
            <i className="fa-solid fa-gear text-xl text-purple-600 transition-all transform duration-500 animate-spin"></i>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Login to manage your system
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={(e) => handleLogin(e)}>
          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="text"
              name="email"
              value={user?.email ?? ""}
              onChange={handleChange}
              placeholder="example@email.com"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="text-sm text-gray-600">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user?.password ?? ""}
              onChange={handleChange}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <i
              className={`fa-solid ${
                showPassword ? "fa-eye" : "fa-eye-slash"
              } absolute right-4 top-[55%] cursor-pointer text-gray-400`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          {/* Error */}
          {loginFalse && (
            <p className="text-sm text-red-500">Invalid email or password</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 cursor-pointer rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 py-2 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} SMART ERP. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
