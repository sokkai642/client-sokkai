"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import './header.css'
export default function ClientHeader() {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for the sidebar
  const [categories, setCategories] = useState([]); // State to hold fetched categories

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/sidebar");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }


        const data = await response.json();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
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
        } overflow-y-auto`}
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

  {/* Render categories dynamically */}
  {categories.map((category) => (
    <li key={category._id} className="group">
      <div className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all">
        <i className="fas fa-cogs mr-4 text-gray-500 group-hover:text-blue-500"></i>
        {category.name}
      </div>
      {/* Render subcategories with increased margin and styling */}
      {category.subcategories && category.subcategories.length > 0 && (
        <ul className="ml-8 mt-1 border-l-2 border-gray-200 pl-4"> {/* Adjusted for hierarchy */}
          {category.subcategories.map((subcat, index) => (
            <li key={index} className="group relative">
              <a
                href={`/frontend/Products/${subcat.name.toLowerCase().replace(/\s+/g, "")}`}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-50 rounded transition-all"
              >
                <span className="absolute -left-2 w-4 h-[2px] bg-gray-200"></span>
                <i className="fas fa-angle-right mr-3 text-sm text-gray-400 group-hover:text-blue-500"></i>
                {subcat.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </li>
  ))}

  {/* Other Links */}
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
          className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold flex-1 cursor-pointer`}
          onClick={() => (window.location.href = "/")}

        >
          <span className="text-black">SO</span>
          <span className="text-blue-500">K</span>
          <span className="text-black">KA</span>
          <span className="text-yellow-500">I</span>
        </h1>

        



      </header>
    </>
  );
}
