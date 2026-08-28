import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, LogIn } from "lucide-react";
import toast from "react-hot-toast";
import LoginLeftSide from "./LoginLeftSide";

const LoginForm = ({ role, title, subtitle }) => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      // ------------------------------------
      // API LOGIN WILL COME HERE
      // ------------------------------------
      console.log("Login Data:", {
        role,
        ...formData,
      });

      // Temporary login
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        `${role === "admin" ? "Admin" : "Employee"} login successful`
      );

      // Redirect after login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">

      {/* Left Side */}
      <LoginLeftSide />

      {/* Right Side */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 lg:p-16">

        <div className="w-full max-w-md">

          {/* Back Button */}
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors mb-8"
          >
            <ArrowLeft size={18} />
            Back to portal selection
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-900 text-white mb-5">
              <LogIn size={24} /> 
            </div>

            <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-2">
              {title}
            </h2>

            <p className="text-slate-500">
              {subtitle}
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={
                    role === "admin"
                      ? "Enter admin email"
                      : "Enter employee email"
                  }
                  autoComplete="email"
                  className="w-full h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-slate-300 accent-slate-900"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-500 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white font-medium transition-all hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn size={19} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Bottom */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center">
            <p className="text-sm text-slate-500">
              Don't have access to this portal?
            </p>

            <Link
              to="/login"
              className="inline-block mt-1 text-sm font-medium text-slate-900 hover:underline"
            >
              Choose another portal
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;