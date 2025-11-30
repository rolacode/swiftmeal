import React from "react";
import { ArrowRight } from "lucide-react";

export function AboutUs() {
  // Placeholder image URL
  const placeholderImageUrl = "https://placehold.co/500x300/F0F0F0/333333?text=About+Image";

  return (
    <section id="about" className="bg-gray-800 text-white px-4 py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">About Us</h2>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Image Placeholder (Left) */}
          <div className="lg:w-1/2 w-full min-h-[300px] bg-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <img
              src={placeholderImageUrl}
              alt="Our Team"
              className="w-full h-full object-cover"
              onError={(e) => {e.target.onerror = null; e.target.src="https://placehold.co/500x300/333333/FFFFFF?text=Our+Mission"}}
            />
          </div>
          
          {/* Text Content (Right) */}
          <div className="lg:w-1/2 w-full space-y-4">
            <p className="text-gray-300 leading-relaxed text-base">
                SwiftMeal is built to make food and grocery delivery faster and simpler.
                We connect customers with local vendors and provide a seamless delivery
                experience.
            </p>
            <p className="text-gray-300 leading-relaxed text-base">
              Morbi mattis vitae ultrices elementum. Massa in nunc, aenean tristique. Vitae ultrices risus morbi adipiscing
              quisque nisl, ullamcorper. Id feugiat vitae purus, amet vitae. Morbi viverra lacus.
            </p>
            <button className="flex items-center space-x-2 text-red-400 font-semibold hover:text-red-300 transition mt-4">
              <span>Read More</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

