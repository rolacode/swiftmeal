// src/pages/VerifyEmail.jsx (improved)
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [sending, setSending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Poll every 3s to check if emailVerified
    const id = setInterval(async () => {
      if (auth.currentUser) {
        await auth.currentUser.reload();
        if (auth.currentUser.emailVerified) {
          clearInterval(id);
          // you may refresh your user context here if needed
          navigate(auth.currentUser?.role === "seller" ? "/seller/dashboard" : "/buyer/dashboard");
        }
      }
    }, 3000);

    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  const resend = async () => {
    try {
      setSending(true);
      await sendEmailVerification(auth.currentUser);
      alert("Verification sent. Check your email.");
    } catch (err) {
      alert(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded shadow text-center max-w-lg">
        <h2 className="text-xl font-semibold">Verify your email</h2>
        <p className="mt-2 text-gray-600">A verification link was sent to <strong>{auth.currentUser?.email}</strong>. Click it and this page will automatically continue.</p>

        <div className="mt-4 flex justify-center gap-3">
          <button onClick={resend} disabled={sending} className="px-4 py-2 bg-orange-600 text-white rounded">{sending ? "Sending..." : "Resend"}</button>
          <button onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">Back</button>
        </div>
      </div>
    </div>
  );
}
