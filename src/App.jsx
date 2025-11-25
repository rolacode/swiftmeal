import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartModal from "./components/CartModal";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import OrderTracking from "./pages/OrderTracking";
import Services from "./pages/Services";
import { AppProvider } from "./context/AppContext";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <CartModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/services" element={<Services />} />
        </Routes>
        <Footer />
      </Router>
    </AppProvider>
  );
}
