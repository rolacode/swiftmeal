import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CategoryBar } from "./components/CategoryBar";

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ALWAYS ON TOP */}
      <Navbar />
      <CategoryBar />

      {/* MAIN ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* ALWAYS AT BOTTOM */}
      <Footer />
    </div>
  );
}
