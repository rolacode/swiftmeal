import React from "react"

export default function OrderCard({ index }) {(
  <div className="h-32 bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center border-b-4 border-red-500 hover:shadow-xl transition">
    <Package size={30} className="text-red-500 mb-2" />
    <span className="text-sm sm:text-base font-semibold text-gray-800">Step {index + 1}</span>
    <p className="text-xs text-gray-500 mt-1">Quick summary of the process.</p>
  </div>
)};