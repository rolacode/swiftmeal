// src/pages/Signup.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SlideIn } from "../components/RedirectAnimation";

export default function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("buyer");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    const firstName = form.get("firstName") || "";
    const lastName = form.get("lastName") || "";

    try {
      await signup({
        email: form.get("email"),
        password: form.get("password"),
        displayName: `${firstName} ${lastName}`.trim(),
        role
      });

      // After signup user must verify email; we send them to verification notice
      navigate("/verify-email");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle(role); // pass role from form
      navigate(`/${role}/dashboard`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <SlideIn>
        <form onSubmit={handleSignup} className="bg-white max-w-md w-full p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-center mb-4">Create account</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input name="firstName" placeholder="First name" className="border rounded px-3 py-2"/>
            <input name="lastName" placeholder="Last name" className="border rounded px-3 py-2"/>
          </div>

          <input name="email" placeholder="Email" className="w-full border rounded px-3 py-2 mt-3"/>
          <input name="password" placeholder="Password" type="password" className="w-full border rounded px-3 py-2 mt-3"/>

          <div className="flex items-center justify-between mt-3">
            <label className="flex items-center gap-3">
              <span className="text-sm font-medium">Role</span>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="border rounded px-2 py-1">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </label>

            <button type="button" onClick={handleGoogle} className="bg-white border px-3 py-2 rounded">Continue with Google</button>
          </div>

          <button disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded mt-4">
            {loading ? "Creating..." : "Create account"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-3">Already have an account? <a href="/login" className="text-orange-600">Sign in</a></p>
        </form>
      </SlideIn>
    </div>
  );
}
