import React from "react";

export function Footer() {
    return (
        <footer className="w-full bg-green-700 text-white py-12 px-6 mt-10">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                <div>
                    <h4 className="text-xl font-bold mb-2">Grocery</h4>
                    <p className="text-sm text-gray-200">
                        It is a long established fact that a reader will be distracted by readable content.
                    </p>
                </div>


                <div>
                    <p className="text-sm">Call Us: +2348022214013</p>
                    <p className="text-sm mt-2">Address: lagos</p>
                    <p className="text-sm mt-2">Email: support@swiftmeal.com</p>
                </div>


                <div>
                    <p>100% Money-Back Guarantee</p>
                    <p className="mt-2">Always Here for You</p>
                </div>
            </div>
        </footer>
    );
}


