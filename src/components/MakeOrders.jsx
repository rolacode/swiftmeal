import React from "react";
// import OrderCard from "./OrderCard";
import { ORDER_PRODUCTS } from "../context/AppContext";
import { SectionHeader } from "../utiliy/SectionHeader";
import { getPlaceholderUrl } from "../utiliy/getPlaceholderUrl";

export default function MakeOrders() {
  const sackProducts = ORDER_PRODUCTS.slice(0, 4);
  const mealProducts = ORDER_PRODUCTS.slice(4);

  return (
    <section id="make-orders" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Make Orders"
          description="Lorem ipsum dolor sit amet consectetur. Netus consectetur aliquam tempus at proin semper."
        />

        {/* Top Row: Sack Products (4 items) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
          {sackProducts.map((product) => (
            <div
              key={product.title}
              className="col-span-1 flex flex-col items-center transition duration-300 hover:scale-[1.05]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain rounded-lg"
                onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl('Image+Error', 200, 200, 'fff', '9d0208') }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Row: Meal Products (3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mealProducts.map((product) => (
            <div
              key={product.title}
              className="relative rounded-xl overflow-hidden shadow-xl group cursor-pointer transition duration-300 hover:scale-[1.02]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src = getPlaceholderUrl('Image+Error', 300, 250, 'fff', '9d0208') }}
              />
              {/* This specific design uses distinct colored squares below the images */}
              <div
                className={`h-4 w-full ${product.title.includes('Salmon') ? 'bg-white' : product.title.includes('Salad') ? 'bg-[#FF8C00]' : 'bg-white'}`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
