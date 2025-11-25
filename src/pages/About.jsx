import React from "react";

export default function About() {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-20 pb-20">
      <h2 className="text-center text-2xl font-semibold">About Us</h2>

      <div className="mt-10 grid md:grid-cols-2 gap-10">
        <div className="bg-gray-300 h-56 rounded-xl"></div>

        <div className="text-gray-700 space-y-4">
          <p>
            Lorem ipsum dolor sit amet consectetur. Aliquam sit mattis vitae
            porttitor lorem in odio vestibulum accumsan.
          </p>

          <p>
            Hendrerit euismod nec sollicitudin bibendum. Sed amet.
          </p>

          <p>
            Scelerisque ullamcorper ac mus faucibus.
          </p>
        </div>
      </div>
    </section>
  );
}
