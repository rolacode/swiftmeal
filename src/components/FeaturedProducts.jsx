import React from "react";
import ProductCard from "./ProductCard";
import { useApp } from "../context/AppContext";

export default function FeaturedProducts() {
  const { products } = useApp();

  return (
    <section className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Featured Products
        </h2>
        <p className="text-gray-600 max-w-lg mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
         ))} 
      </div>
    </section>
  );
}
