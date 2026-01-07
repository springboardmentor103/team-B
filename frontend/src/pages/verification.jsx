import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function OtpVerify() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || "your email";

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [verifying, setVerifying] = useState(false);
    const inputsRef = useRef([]);

    const handleChange = (value, index) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const isComplete = otp.every((d) => d !== "");

    const handleVerify = () => {
        if (!isComplete) return;
        setVerifying(true);

        setTimeout(() => {
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-cyan-100 px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-9 text-center">
                <h1 className="text-2xl font-bold text-slate-900">Verify Your Email</h1>
                <p className="text-slate-600 mt-2 font-medium">
                    We’ve sent a 6-digit verification code to
                </p>
                <p className="text-cyan-600 font-bold mt-1">{email}</p>

                <div className="flex justify-center gap-3 mt-6">
                    {otp.map((digit, i) => (
                        <input
                            key={i}
                            ref={(el) => (inputsRef.current[i] = el)}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            maxLength={1}
                            disabled={verifying}
                            className="w-12 h-12 text-center text-xl font-bold rounded-full border border-slate-400 bg-white text-slate-800 focus:outline-none focus:border-slate-600 disabled:opacity-50"
                        />
                    ))}
                </div>

                <button
                    onClick={handleVerify}
                    disabled={!isComplete || verifying}
                    className="w-full mt-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-bold tracking-wide hover:brightness-110 transition disabled:opacity-40 shadow-lg flex items-center justify-center gap-2"
                >
                    {verifying && (
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {verifying ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-sm text-slate-500 mt-5 flex items-center justify-center gap-2">
                    <span>Didn’t receive the code?</span>
                    <button
                        type="button"
                        className="text-cyan-600 font-semibold hover:underline"
                    >
                        Resend
                    </button>
                </div>

            </div>
        </div>
    );
}
