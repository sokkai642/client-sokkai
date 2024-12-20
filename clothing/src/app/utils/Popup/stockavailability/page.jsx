"use client";

import React, { useEffect } from "react";
const Stockavailability = ({ value, onClose }) => {
  useEffect(() => {
    if (value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [value]);
  const product = [
    {
      name: "Stylish Sneakers",
      photo:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=200&q=80",
      availability: true,
      totalSales: 1250,
    },
    {
      name: "Stylish Sneakers",
      photo:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=200&q=80",
      availability: true,
      totalSales: 1250,
    },
    {
      name: "Stylish Sneakers",
      photo:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=200&q=80",
      availability: true,
      totalSales: 1250,
    },
    {
      name: "Stylish Sneakers",
      photo:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?fit=crop&w=200&q=80",
      availability: true,
      totalSales: 1250,
    },
  ];

  return (
    value && (
      <div className="bg-gray-600 bg-opacity-50 fixed inset-0 flex justify-center items-center z-50">
        <div className="bg-white h-auto max-h-[80vh] rounded-lg shadow-lg w-[90%] sm:w-11/12 md:w-9/12 lg:w-1/2 xl:w-[30%]">
          {/* Header */}
          <div className="flex justify-between items-center px-4 sm:px-6 py-4 border-b">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Product Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 focus:outline-none"
            >
              ✖
            </button>
          </div>
          <div className="overflow-y-auto max-h-[60vh]">
            {product.map((elem) => (
              <div className="p-4 sm:p-6" key={elem.id || elem.name}>
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <img
                    src={elem.photo}
                    alt={elem.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                  <div className="text-center sm:text-left">
                    <h3 className="text-base sm:text-lg font-medium text-gray-700">
                      {elem.name}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        elem.availability ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {elem.availability ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-4">
                  <p className="text-sm sm:text-base text-gray-600">
                    <span className="font-semibold text-gray-800">
                      Total Sales:
                    </span>{" "}
                    {elem.totalSales}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 sm:px-6 py-4 border-t flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};
export default Stockavailability;
