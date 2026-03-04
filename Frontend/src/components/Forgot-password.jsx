import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useLoading } from "../context/LoadingContext";
import Loader from "./Loader";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { loading, setLoading } = useLoading();

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:4000/forgot-password", { email });

            if (response.data?.success) {
                alert("Password reset OTP sent to your email.");
                navigate("/reset-password", { state: { email } });
            }
        } catch (err) {
            const msg = err.response?.data?.message || "Password reset failed. Please try again.";
            setError(msg);
            console.error("Password reset failed:", err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <Loader />}
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="justify-center items-center h-screen bg-gray-100 w-full max-w-md m-auto">
                <div className="bg-white p-8 rounded shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                placeholder="Enter your email"
                            />
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
        </div>
        </>
    )
}