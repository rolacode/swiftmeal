import React from "react";
import { Hero } from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import MakeOrders from "../components/MakeOrders";
import { AboutUs } from "../components/AboutUs";

export default function Home() {
  return (
    <div className="w-full bg-white font-sans">
      <Hero />
      <FeaturedProducts />
      <MakeOrders />
      <AboutUs />
    </div>
  );
}
