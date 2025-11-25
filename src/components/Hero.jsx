import React from "react";

export default function Hero() {
  return (
    <div
      className="relative rounded-xl overflow-hidden mt-8 h-56 sm:h-72 md:h-96"
      style={{ backgroundImage: `url("/assets/products/hero.jpg")`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center px-6 md:px-12">
        <h1 className="text-white text-3xl md:text-5xl font-bold leading-snug">
          Fast, <br />
          <span className="text-red-500">Reliable</span> & <br />
          Effortless
        </h1>
      </div>
    </div>
  );
}
