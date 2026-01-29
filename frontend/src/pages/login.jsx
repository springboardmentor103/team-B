import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = () => {
    if (!isFormValid || loading) return;
    setLoading(true);

    setTimeout(() => {
      console.log("Login success");
      setLoading(false);
    }, 1500);
  };
  const handlesignup = () => {
    navigate("/register");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#eefdff] rounded-[28px] shadow-xl p-8 relative">

        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="HireHelper Logo"
              className="w-12 h-12 rounded-full object-cover bg-white shadow"
            />
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                HireHelper
              </h1>
              <p className="text-sm text-gray-600">
                Hire smarter. Build better teams.
              </p>
            </div>
          </div>
        </div>

        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Welcome back
          </h2>
          <p className="text-gray-700">
            Sign in to continue to your HireHelper dashboard
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Email or username
            </label>
            <input
              type="text"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-gray-800 bg-white px-5 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-gray-800 bg-white px-5 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!isFormValid || loading}
            className={`w-full mt-2 rounded-full py-3 text-white font-semibold transition-all flex items-center justify-center gap-2
    ${!isFormValid || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              }`}
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

        </div>

        <p className="text-center text-sm text-gray-700 mt-8">
          Don&apos;t have an account?
          <button onClick={handlesignup} className="text-cyan-600 font-medium hover:underline cursor-pointer">
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}
