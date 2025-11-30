import React from "react";

export function SectionHeader({ title, description }) {
    return (
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">{title}</h2>
            <p className="max-w-xl mx-auto text-gray-500 text-md leading-relaxed">
                {description}
            </p>
        </div>
    );
}