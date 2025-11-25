import React from "react";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  return (
    <main className="pt-20 pb-20 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <section className="mt-12">
          <h2 className="text-center text-2xl font-semibold text-gray-900 dark:text-white py-5">
            Featured Products
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2 max-w-xl mx-auto px-4">
            Lorem ipsum dolor sit amet consectetur. Netus consectetur aliquam tempus at proin semper.
          </p>
          <ProductGrid />
        </section>
      </div>
    </main>
  );
}
