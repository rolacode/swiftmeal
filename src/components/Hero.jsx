import React from "react";

export function Hero() {
  const imageUrl = "/assets/products/hero.jpg";

  return (
    <section className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-xl mx-4 sm:mx-auto container max-w-7xl my-8">
      <div
        className="absolute inset-0 bg-cover bg-center"
        // Adjust background position to simulate the image's framing
        style={{ backgroundImage: `url(${imageUrl})`, backgroundPosition: 'top' }}
      >
        {/* Dark overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-gray-400 bg-opacity-40"></div>
      </div>
      <div className="relative h-full flex flex-col justify-center p-8 sm:p-12">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight">
          Fast, <br />
          <span className="text-orange-600">Reliable</span> <br />
          & Effortless
        </h1>
      </div>
    </section>
  );
};
