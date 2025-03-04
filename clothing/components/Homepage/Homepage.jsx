"use client";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaWhatsapp, FaTwitter } from "react-icons/fa";

import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import styles from "./Homepage.module.css";
import a1 from "../../public/images/login/a3.jpg";
import a2 from "../../public/images/login/a5.jpg";
import a3 from "../../public/images/homepage/a2.jpg";
import a4 from "../../public/images/homepage/a5.jpg";
import a5 from "../../public/images/homepage/a4.png";
import a6 from "../../public/images/cart/a1.jpg";
import a7 from "../../public/images/cart/a2.jpg";
import a8 from "../../public/images/cart/a3.jpg";
import a9 from "../../public/images/cart/a4.jpg";
import a10 from "../../public/images/cart/a5.jpg";
import a11 from "../../public/images/cart/a6.jpg";
import watch from "../../public/images/homepage/watch.jpg";
import Image from "next/image";
import Loadercomponent from "../loader1/loader"
import { useRouter } from 'next/navigation';
const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gifts, setGifts] = useState([]);
  const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null); 
    const pageRef = useRef(null); 
  const [currentPair, setCurrentPair] = useState(0);
  const searchRef = useRef(null);
  const categories = [
    {
      name: "Shirts",
      image: "https://assets.digitalcontent.marksandspencer.app/image/upload/w_600,h_780,q_auto,f_auto,e_sharpen/SD_03_T11_2081_E0_X_EC_0",
      navigate:"all"
    },
    {
      name: "T Shirts",
      image: "https://assets.ajio.com/medias/sys_master/root/20230427/JPVF/64497d9b42f9e729d751f23a/-473Wx593H-466098941-multi-MODEL.jpg",
      navigate:"tshirts"
    },
    {
      name: "pants",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDP2xRD3HM82UrjRFKmF8B13cL4fanJR2a1s2BOGqs_g4iFPq55gl27Lwcq1UZoHqlu5Q&usqp=CAU",
      navigate:"pants"
    },
    {
      name: "Shorts",
      image: "https://www.mumkins.in/cdn/shop/files/boys-shorts-bl08666-navyblue-1.jpg?v=1713421821&width=1080",
    navigate:"shorts"
    },
    {
      name: "Innerwears",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop",
     navigate:"innerwears"
    },
    {
      name: "Shoes",
      image: "https://5.imimg.com/data5/SELLER/Default/2022/11/KE/VX/MV/116453489/white-casual-shoes-for-men.jpg",
    navigate:"shoes"
    },
    {
      name: "Accessories",
      image: "https://static.fibre2fashion.com//articleresources/images/71/7074/SAdobeStock_247321133_Small.jpg",
    navigate:"accessories"
    }
  ];
  const [categoriessidebar, setCategories] = useState([]); // State to hold fetched categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/sidebar"); // Your backend API route
        // if (!response.ok) {
        //   throw new Error("Failed to fetch categories");
        // }

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
    // Ensure the current index is valid when gifts change
    if (currentImageIndex >= gifts.length) {
      setCurrentImageIndex(0);
    }
  }, [gifts]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchGifts = async () => {
      try {
        const response = await fetch("/api/gift");
        const data = await response.json();
        console.log("😍😍😍",data)
        setGifts(data); // Set the fetched data in the state
      } catch (error) {
        console.error("Error fetching gifts:", error);
      }
    };

    fetchGifts();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedProducts = localStorage.getItem("products");
        if (cachedProducts) {
          setProducts(JSON.parse(cachedProducts)); // Load from localStorage first
          setLoading(false); 
        }
  
        const response = await axios.get("/api/products");
        const fetchedProducts = response.data;
        console.log(fetchedProducts);
  
        setProducts(fetchedProducts);
        localStorage.setItem("products", JSON.stringify(fetchedProducts)); // Update cache
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  
  const handlefullproductnavigate=(productId)=>{
    console.log(productId)
    router.push(`/frontend/productdetails/${productId}`)
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => {
    setIsFilterOpen((prev) => !prev);
  };
  const imagePairs1 = [watch, a1, watch];
  const imagePairs = [
    "https://st4.depositphotos.com/1007995/20729/i/450/depositphotos_207295690-stock-photo-handsome-leader-young-men-black.jpg",
  ];
const handleshopnow=()=>{
  router.push("/frontend/Products/all")
}
  const nextImage = () => {
    setCurrentPair((prev) => (prev + 1) % imagePairs.length);
  };
 

  const nextImage1 = () => {
    setCurrentImageIndex((prevIndex) =>
      gifts.length > 0 ? (prevIndex + 1) % gifts.length : 0
    );
  };

  const prevImage1 = () => {
    setCurrentImageIndex((prevIndex) =>
      gifts.length > 0 ? (prevIndex - 1 + gifts.length) % gifts.length : 0
    );
  };

  useEffect(() => {
    if (gifts.length === 0) return; // Prevent running if no gifts

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gifts.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, [gifts.length]);



  const [currentMobileImageIndex, setCurrentMobileImageIndex] = useState(0);

  const nextMobileImage = () => {
    setCurrentMobileImageIndex((prevIndex) =>
      gifts.length > 0 ? (prevIndex + 1) % gifts.length : 0
    );
  };
  
  const prevMobileImage = () => {
    setCurrentMobileImageIndex((prevIndex) =>
      gifts.length > 0 ? (prevIndex - 1 + gifts.length) % gifts.length : 0
    );
  };
  
  useEffect(() => {
    if (gifts.length === 0) return;
  
    const interval = setInterval(() => {
      setCurrentMobileImageIndex((prevIndex) => (prevIndex + 1) % gifts.length);
    }, 3000); // Auto change every 3 seconds
  
    return () => clearInterval(interval);
  }, [gifts.length]);
  
  







  const prevImage = () => {
    setCurrentPair(
      (prev) => (prev - 1 + imagePairs.length) % imagePairs.length
    );
  };
  const [showSearch, setShowSearch] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
 useEffect(() => {
    const handleClickOutside = (event) => {
      setIsFilterOpen(false);

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
  useEffect(() => {
    const interval = setInterval(nextImage, 2000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval1 = setInterval(nextImage1, 2000);
    return () => clearInterval(interval1);
  }, []);
  
  if (loading) {
    return <Loadercomponent />; // Render loader while fetching data
  }
  
  return (
    <div className={styles.container}>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Head>

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

          {categoriessidebar.map((category) => (
            <li key={category._id} className="group">
              <div className="flex items-center px-6 py-3 text-gray-700 hover:text-blue-500 hover:bg-gray-100 rounded transition-all">
                <i className="fas fa-cogs mr-4 text-gray-500 group-hover:text-blue-500"></i>
                {category.name}
              </div>
              {category.subcategories && category.subcategories.length > 0 && (
                <ul className="ml-8 mt-1 border-l-2 border-gray-200 pl-4">
                  {" "}
                  {/* Adjusted for hierarchy */}
                  {category.subcategories.map((subcat, index) => (
                    <li key={subcat._id} className="group relative">
                      <a
                        href={`/frontend/Products/${subcat.name
                          .toLowerCase()
                          .replace(/\s+/g, "")}`}
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

      <header className="flex items-center justify-between px-4 py-4 shadow-md bg-white">
        <div className="flex items-center space-x-2">
          {" "}
          {/* Reduced space-x */}
          <button
            onClick={toggleSidebar}
            className="text-gray-700 text-lg sm:text-xl focus:outline-none mr-2"
            aria-label="Open Sidebar"
          >
            <i className="fas fa-bars"></i>
          </button>
          <h1
  className="text-2xl font-bold tracking-wide cursor-pointer"
  onClick={() => (window.location.href = "/")}
>            <span className="text-black">S</span>
            <span className="text-black">O</span>
            <span className="text-blue-600">K</span>
            <span className="text-black">K</span>
            <span className="text-black">A</span>
            <span className="text-black">I</span>
          </h1>
        </div>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Search for products, brands, and more"
          />
        </div>
        <div>
          <h1 className="hidden lg:block">hello</h1>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* <button
              className="text-gray-700 hover:text-blue-500 p-2"
              aria-label="Filter"
              onClick={toggleFilter}
            >
              <i className="fas fa-filter text-lg lg:text-2xl"></i>
            </button> */}
            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                <ul className="text-gray-700 text-base">
                  <li className="hover:bg-gray-100">
                    <Link
                      href="/frontend/Products/shirts"
                      className="block px-4 py-2"
                    >
                      Shirts
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      href="/frontend/Products/trousers"
                      className="block px-4 py-2"
                    >
                      Trousers
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100">
                    <Link
                      href="/frontend/Products/pants"
                      className="block px-4 py-2"
                    >
                      Pants
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <button
            className="lg:hidden text-gray-700 text-lg"
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Open search bar"
          >
            <i className="fas fa-search"></i>
          </button>

          {/* Wishlist Icon */}
          <Link href="/frontend/Products/wishlist">
            <button
              className="text-gray-700 hover:text-blue-500 p-2"
              aria-label="Wishlist"
            >
              <i className="fas fa-heart text-lg lg:text-2xl"></i>
            </button>
          </Link>

          <Link href="/frontend/cart">
            <button
              className="text-gray-700 hover:text-blue-500 p-2"
              aria-label="Cart"
            >
              <i className="fas fa-shopping-cart text-lg lg:text-2xl"></i>
            </button>
          </Link>
          <Link href="/frontend/orderhistory">
            <button
              className="text-gray-700 hover:text-blue-500 p-2"
              aria-label="History"
            >
              <i className="fas fa-history text-lg lg:text-2xl"></i>{" "}
              {/* History Icon */}
            </button>
          </Link>
        </div>

        {showSearch && (
          <div
            ref={searchRef}
            className="fixed top-0 left-0 z-40 flex items-center bg-white w-full px-4 py-2 shadow-lg transition-all duration-300 ease-in-out"
          >
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-100 text-sm px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search input"
            />
            <button
              className="text-gray-700 p-2"
              onClick={() => setShowSearch(false)}
              aria-label="Close search bar"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </header>

      <main className={styles.main}>
        <section className="relative bg-gradient-to-b from-[#f8f9fa] to-white py-12 overflow-hidden lg:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10" />

              <div className="overflow-x-auto hide-scrollbar">
                <div className="flex gap-4 sm:gap-6 lg:gap-8 px-4 py-4 min-w-max">
                  {categories.map((category, index) => (
                    <div
                      key={category._id}
                      className="group flex flex-col items-center space-y-4 cursor-pointer"
                    >
                      <Link
                        href={`/frontend/Products/${category.navigate}`}
                        passHref
                      >
                        <div
                          className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full 
                  bg-gradient-to-br from-white to-gray-100 
                  overflow-hidden shadow-lg
                  transition-all duration-300 ease-in-out
                  group-hover:shadow-xl group-hover:scale-105"
                        >
                          <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
                          {/* Circular image inside the container */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gray-200 overflow-hidden shadow-md">
                            <img
                              src={category.image}
                              alt={category.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </Link>
                      <span
                        className="text-sm sm:text-base lg:text-lg font-medium text-gray-800
                group-hover:text-gray-900 transition-colors"
                      >
                        {category.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col lg:flex-row justify-between items-center my-8 max-w-screen-lg mx-auto h-[100px] lg:h-[120px] text-center bg-[#f8f9fa] overflow-hidden">
          <div className="flex w-full items-center justify-between relative">
            <div className="text-xl lg:text-2xl font-bold text-[#333] z-10 px-4 text-left max-w-full lg:max-w-[50%] relative lg:left-0 lg:top-0 lg:transform-none lg:translate-y-0 sm:hidden">
              FLAT 40% OFF ON SHIRTS
            </div>

            {/* Image Section */}
            <div className="relative w-full sm:w-full lg:w-[50%] h-[100vh] lg:h-[120px] bg-[#ececec] flex items-center justify-end">
              {/* Left Arrow */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 text-xl cursor-pointer z-10 rounded-full transition-all ease-in-out duration-300 hover:bg-opacity-70"
              >
                &#10094;
              </button>

              {/* Image */}
              <div className="relative overflow-hidden w-full h-full">
                {imagePairs.map((image, index) => (
                  <img
                    key={image}
                    src={image}
                    alt={`Image ${currentPair}-${index}`}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentPair
                        ? "opacity-100"
                        : "opacity-0 absolute"
                    }`}
                  />
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 text-xl cursor-pointer z-10 rounded-full transition-all ease-in-out duration-300 hover:bg-opacity-70"
              >
                &#10095;
              </button>
            </div>
          </div>
        </section>

        <section className={styles.trendingSection}>
          <div className={styles.trendingHeader}>
            <h3 className={styles.trendingTitle}>Trending shirts</h3>
            <Link href="/frontend/Products/all">
              <button className={styles.exploreButton}>Explore</button>
            </Link>
          </div>
          <div className={styles.trendingItemsWrapper}>
            {products.map((product) => (
              <div className={styles.itemWrapper} key={product.id}>
                {product.selectedGift && (
                  <div className={styles.giftTag}>
                    <span className={styles.giftText}>Gift Available</span>
                  </div>
                )}
                <img
                  src={product.images[0]?.url}
                  alt="Short 2"
                  className={styles.itemImage}
                  onClick={() => handlefullproductnavigate(product._id)}
                />
                <div className={styles.offerBadge}>Up to 30% Off</div>
              </div>
            ))}
          </div>

          <div className={styles.offerSection}>
            <p className={styles.offerText}>Exclusive offers for you!</p>
            <Link href="/frontend/Products/all">
              <button className={styles.shopNowButton}>Shop Now</button>
            </Link>
          </div>
        </section>
        <section
          className={`${styles.accessoriesSection} flex flex-wrap items-center p-4 border shadow-md relative h-auto lg:h-[500px]`}
        >
          <button
            onClick={prevImage1}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 text-4xl bg-gray-200 p-2 rounded-full transition-all duration-300"
            aria-label="Previous Image"
          >
            &#10094;
          </button>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative h-full">
            {gifts.length > 0 && gifts[currentImageIndex]?.photos?.[0]?.url ? (
              <Image
                src={gifts[currentImageIndex].photos[0].url}
                alt={gifts[currentImageIndex].name || "Gift Image"}
                className="rounded-lg object-contain"
                style={{
                  width: "700px",
                  height: "500px",
                }}
                width={700}
                height={500}
              />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>

          <button
            onClick={nextImage1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 text-4xl bg-gray-200 p-2 rounded-full transition-all duration-300"
            aria-label="Next Image"
          >
            &#10095; {/* Right arrow symbol */}
          </button>

          {/* Content Section */}
          <div className="w-full lg:w-1/2 text-center sm:hidden md:block lg:text-left mt-4 lg:mt-0 p-6 bg-indigo-100 rounded-lg border-l-4 border-indigo-500">
            {/* Gift Name */}
            <h4 className="xl:text-3xl text-xl font-semibold uppercase mb-2 text-indigo-700">
              {gifts[currentImageIndex]?.name || "Gift Name"}
            </h4>

            {/* Price */}
            <h5 className="text-2xl font-bold text-indigo-600 mb-4">
              {gifts[currentImageIndex]?.price} RS
            </h5>

            {/* Description */}
            <p className="text-md text-gray-600 mb-4">
              Shop our latest collection of clothing and accessories to qualify
              for exclusive offers.
            </p>

            {/* Limited Time Offer Icon */}
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2m0 0l4-2-4-2m0 0V6"
                />
              </svg>
              <span className="ml-2 text-indigo-600 font-semibold">
                Limited Time Offer
              </span>
            </div>
          </div>
        </section>
        <section className="flex flex-wrap flex-col items-center p-4 border shadow-md relative h-auto lg:hidden">
          {/* Previous Button */}
          <button
            onClick={prevMobileImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 text-4xl bg-gray-200 p-2 rounded-full transition-all duration-300"
            aria-label="Previous Image"
          >
            &#10094;
          </button>

          {/* Image Section */}
          <div className="w-full flex justify-center relative h-full mb-4">
            {gifts.length > 0 &&
            gifts[currentMobileImageIndex]?.photos?.[0]?.url ? (
              <Image
                src={gifts[currentMobileImageIndex].photos[0].url}
                alt={gifts[currentMobileImageIndex].name || "Gift Image"}
                className="rounded-lg object-contain"
                style={{ width: "700px", height: "300px" }}
                width={700}
                height={500}
              />
            ) : (
              <p className="text-gray-500">No image available</p>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={nextMobileImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 text-4xl bg-gray-200 p-2 rounded-full transition-all duration-300"
            aria-label="Next Image"
          >
            &#10095;
          </button>

          {/* Details Section */}
          <div className="w-full text-center mt-4 p-4 bg-indigo-100 rounded-lg border-l-4 border-indigo-500">
            <h4 className="text font-semibold uppercase mb-2 text-indigo-700">
              {gifts[currentMobileImageIndex]?.name || "Gift Name"}
            </h4>
            <h5 className="text-xl font-bold text-indigo-600 mb-4">
              {gifts[currentMobileImageIndex]?.price} RS
            </h5>
            <div className="flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6l4 2m0 0l4-2-4-2m0 0V6"
                />
              </svg>
              <span className="ml-2 text-indigo-600 font-semibold">
                Limited Time Offer
              </span>
            </div>
          </div>
        </section>

        <section className={styles.newArrivals}>
          <div className={styles.newArrivalsHeader}>
            <h3>New Arrivals</h3>
            <Link href="/frontend/Products/all">
              <button className={styles.exploreButton}>Explore</button>
            </Link>
          </div>
          <div className={styles.arrivalsItems}>
            {products.map((product) => (
              <div className={styles.itemWrapper} key={product.id}>
                {product.selectedGift && (
                  <div className={styles.giftTag}>
                    <span className={styles.giftText}>Gift Available</span>
                  </div>
                )}
                <img
                  src={product.images[0]?.url}
                  alt="Shirt"
                  className={styles.itemImage}
                  onClick={() => handlefullproductnavigate(product._id)}
                />
                <div className={styles.offerBadge}>Up to 30% Off</div>
              </div>
            ))}
          </div>
          <div className={styles.offerText}>
            <p>Exclusive offers for you!</p>
            <button className={styles.offerButton} onClick={handleshopnow}>
              Shop Now
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white py-8 mt-8 w-full">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2">SOKKAI</h2>
          <p className="text-gray-400 text-sm mb-6 text-center">
            Men Made Better
          </p>

          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white text-2xl"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
