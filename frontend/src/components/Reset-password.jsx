import {useState, React, use} from "react";
import axios from "axios";
import {useNavigate} from "react-router";
import {useLoading} from "../context/LoadingContext";
import Loader from "./Loader";

export default function ResetPassword() {

    const[email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const[newPassword, setNewPassword] = useState("");
    const[confirmPassword, setNPasswordConfirm] = useState("");
    const {loading, setLoading} = useLoading();
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        if (!otp.trim()) newErrors.otp = "OTP is required";

        if (!newPassword.trim()) newErrors.newPassword = "New Password is required";
        if ( newPassword.length < 6) newErrors.newPassword = "Password must be at least 6 characters long";
        if (!confirmPassword.trim()) newErrors.confirmPassword = "Confirm Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }
    async function handleSubmit(event) {
        event.preventDefault();

        setSubmitted(true);

        if (!validate()) return;

        try {
            setLoading(true);
            if( newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await axios.post("http://localhost:4000/reset-password", {email, otp, newPassword, confirmPassword});

            console.log(response.data);
            navigate("/login");

        }
        catch(error) {
            setErrors({ otp: error.response.data.message || "Password reset failed" });
            console.error("Password reset failed:", error);
        }
        finally {
            setLoading(false); 
        }
    }

    return (
        <>
        {loading && <Loader />}
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={e => { setEmail(e.target.value); setErrors({ ...errors, email: "" }); }}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter your email"
                        />
                        { errors.email && submitted && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        ) }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="otp">OTP</label>
                        <input
                            type="text"
                            id="otp"
                            onChange={e => { setOtp(e.target.value); setErrors({ ...errors, otp: "" }); }}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter OTP"
                        />
                        { errors.otp && submitted && (
                            <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                        ) }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            onChange={e => { setNewPassword(e.target.value); setErrors({ ...errors, newPassword: "" }); }}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Enter new password"
                        />
                        { errors.newPassword && submitted && (
                            <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                        ) }
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="nPasswordConfirm">Confirm New Password</label>
                        <input
                            type="password"
                            id="nPasswordConfirm"
                            onChange={e => { setNPasswordConfirm(e.target.value); setErrors({ ...errors, nPasswordConfirm: "" }); }}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && submitted && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                        ) }
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
        </>
    )
}