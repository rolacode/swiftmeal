import React from "react";

export default function Orders() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20">
      <h2 className="text-center text-2xl font-semibold">Make Orders</h2>
      <p className="text-center text-gray-600 mt-2 mb-6 max-w-xl mx-auto">
        Lorem ipsum dolor sit amet consectetur. Netus consectetur aliquam
        tempus at proin semper.
      </p>

      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-gray-200 w-full h-24 rounded-lg"></div>
        ))}
      </div>
    </section>
  );
}