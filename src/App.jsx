import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import VerifyEmail from "./pages/VerifyEmail";
import BuyerHome from "./pages/BuyerHome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword"
import NotFound from "./pages/NotFound";
import { CategoryBar } from "./components/CategoryBar";
import BuyerDashboard from "./pages/BuyerDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedRoleRoute from "./components/ProtectedRoleRoute";
import SellerOrders from "./pages/SellerOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";


export default function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* ALWAYS ON TOP */}
      <Navbar />
      <CategoryBar />

      {/* MAIN ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="buyer-home" element={<Navigate to="/buyer/home" replace />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/buyer/home" element={<BuyerHome />} />

        <Route path="/seller/orders" element={
          <ProtectedRoleRoute role="seller">
            <SellerOrders />
          </ProtectedRoleRoute>
        } />


        <Route path="/buyer/dashboard" element={
          <ProtectedRoleRoute role="buyer">
            <BuyerDashboard />
          </ProtectedRoleRoute>
        } />

        <Route path="/seller/dashboard" element={
          <ProtectedRoleRoute role="seller">
            <SellerDashboard />
          </ProtectedRoleRoute>
        } />
      </Routes>

      {/* ALWAYS AT BOTTOM */}
      <Footer />
    </div>
  );
}
