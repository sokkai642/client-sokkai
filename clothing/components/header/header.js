"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function ClientHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close sidebar if clicked outside
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Open Sidebar"]')
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-800 text-2xl focus:outline-none hover:text-red-500 transition-colors"
            aria-label="Close Sidebar"
          >
            &times;
          </button>
        </div>

        {/* Sidebar Content */}
        <ul className="mt-4">
          <li className="group">
            <Link
              href="/"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-home mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Home
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/Products/shirts"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-tshirt mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Shirts
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/Products/trousers"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-user-tie mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Trousers
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/Products/pants"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-briefcase mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Pants
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/cart"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-shopping-cart mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Cart
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/orderhistory"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-receipt mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
                Order Summary
            </Link>
          </li>
          <li className="group">
            <Link
              href="/frontend/profile"
              className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all"
            >
              <i className="fas fa-user-circle mr-4 text-gray-500 group-hover:text-blue-500 mr-2"></i>
              Profile
            </Link>
          </li>
        </ul>

        {/* Footer Section */}
        <div className="absolute bottom-0 w-full px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2024 <span className="font-semibold text-gray-800">SOKKAI</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Header */}
      <header className="flex items-center px-4 sm:px-6 py-4 bg-white text-black top-0 left-0 w-full z-10 shadow-lg relative">
        {/* Sidebar Toggle Icon */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 text-lg sm:text-xl mr-4 focus:outline-none"
          aria-label="Open Sidebar"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* Logo */}
        <h1
          style={{ marginLeft: "1rem" }}
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1`}
        >
          <span className="text-black">SO</span>
          <span className="text-blue-500">K</span>
          <span className="text-black">KA</span>
          <span className="text-yellow-500">I</span>
        </h1>

        <div className="flex-grow flex justify-end items-center space-x-4 relative">
  <div className="relative w-2/3">
    {/* Search Icon inside input on Left */}
  

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search for products..."
      className="bg-gray-100 text-sm sm:text-base lg:text-lg px-4 py-2 pl-16 pr-4 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label="Search input"
    />
  </div>
</div>



      </header>
    </>
  );
}
