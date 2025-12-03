import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetSchema } from "../lib/Schemas";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const { resetPassword } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(resetSchema) });

  const onSubmit = async (data) => {
    try { await resetPassword(data.email); alert("Reset sent"); }
    catch (err) { alert(err.message); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="w-full max-w-md p-8 bg-white rounded-2xl shadow-card">
        <h2 className="text-lg font-semibold">Reset Password</h2>
        <p className="text-sm text-gray-500 mt-2">Enter your email, we will send a reset link.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <input {...register("email")} placeholder="Email address" className="w-full border rounded-lg px-4 py-2" />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
          <button className="w-full bg-sw-orange text-white mt-4 py-3 rounded-lg">Send reset link</button>
        </form>
      </motion.div>
    </div>
  );
}
