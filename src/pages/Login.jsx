// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { SlideIn } from "../components/RedirectAnimation";

export default function Login() {
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleRole, setGoogleRole] = useState("buyer");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.target);
    try {
      await login(form.get("email"), form.get("password"));
      // onAuthStateChanged will update user; navigation handled in effect below
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle(googleRole);
      navigate(`/${googleRole}/dashboard`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // If already logged in, route to correct dashboard
  useEffect(() => {
    if (user) {
      if (!user.emailVerified) {
        navigate("/verify-email");
        return;
      }
      navigate(user.role === "seller" ? "/seller/dashboard" : "/buyer/dashboard");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <SlideIn>
        <form onSubmit={handleLogin} className="bg-white max-w-md w-full p-6 rounded-2xl shadow">
          <h2 className="text-2xl font-semibold text-center mb-4">Sign in</h2>

          <input name="email" placeholder="Email" className="w-full border rounded px-3 py-2 mt-2"/>
          <input name="password" placeholder="Password" type="password" className="w-full border rounded px-3 py-2 mt-2"/>

          <button disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded mt-4">{loading ? "Signing in..." : "Sign in"}</button>

          <div className="flex items-center justify-between mt-4">
            <label className="text-sm flex items-center gap-2">
              <span>Google role:</span>
              <select value={googleRole} onChange={(e)=>setGoogleRole(e.target.value)} className="border rounded px-2 py-1">
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            </label>

            <button type="button" onClick={handleGoogle} className="bg-white border px-3 py-2 rounded">Continue with Google</button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-3">Don't have an account? <a href="/signup" className="text-orange-600">Create account</a></p>
        </form>
      </SlideIn>
    </div>
  );
}
