import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const inputStyle =
  "mt-1 w-full rounded-full border border-slate-400 bg-white px-5 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-0 focus:border-slate-600";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const errors = useMemo(() => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    if (!form.confirmPassword) e.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    return e;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    });

    if (!isValid) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      navigate("/verify", { state: { email: form.email } });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-9">
        <div className="text-center mb-7">
          <h1 className="text-2xl font-bold text-slate-900">
            Create Your Hire Helper Account
          </h1>
          <p className="text-slate-600 mt-2 font-medium">
            Join Hire Helper and start building your career.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            ["firstName", "First Name", "Your first name"],
            ["lastName", "Last Name", "Your last name"],
            ["email", "Email Address", "you@example.com"],
            ["phone", "Phone Number", "Your phone number"],
          ].map(([name, label, placeholder]) => (
            <div key={name}>
              <label className="text-sm font-semibold text-slate-700">{label}</label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={placeholder}
                className={inputStyle}
              />
              {touched[name] && errors[name] && (
                <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
              )}
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-slate-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Create a password"
                className={`${inputStyle} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                className={`${inputStyle} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="w-full py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold tracking-wide hover:brightness-110 transition disabled:opacity-40 shadow-lg mt-3"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm font-medium text-slate-600 mt-6">
          Already have an account?{" "}
          <button onClick={() => navigate("/")} className="text-cyan-600 font-bold hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
