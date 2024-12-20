'use client'

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const SimilarProducts = ({ products }) => {
  const slideRefs = useRef([]);

  useEffect(() => {
    const equalizeHeights = () => {
      slideRefs.current.forEach(slide => {
        if (slide) {
          slide.style.height = 'auto';
        }
      });

      // Get the maximum height
      let maxHeight = 0;
      slideRefs.current.forEach(slide => {
        if (slide) {
          const height = slide.offsetHeight;
          maxHeight = Math.max(maxHeight, height);
        }
      });

      // Set all slides to the maximum height
      slideRefs.current.forEach(slide => {
        if (slide) {
          slide.style.height = `${maxHeight}px`;
        }
      });
    };

    // Initialize refs array
    slideRefs.current = slideRefs.current.slice(0, products.length);

    // Run the equalize function after images load
    const timer = setTimeout(equalizeHeights, 100);

    // Add resize listener
    window.addEventListener('resize', equalizeHeights);

    // Cleanup
    return () => {
      window.removeEventListener('resize', equalizeHeights);
      clearTimeout(timer);
    };
  }, [products]);

  return (
    <section className="mt-16 px-4 sm:px-8 md:px-12 lg:px-16">
      <h3 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
        You May Also Like
      </h3>
      <Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={30}
  slidesPerView={1}
  navigation
  pagination={{
    clickable: true,
    el: '.swiper-pagination',
  }}
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
  className="pb-12"
>
  {products.map((product, index) => (
    <SwiperSlide key={product._id}>
      <Link href={`/frontend/productdetails/${product._id}`}>
        <motion.div
          ref={(el) => (slideRefs.current[index] = el)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
        >
          <div className="w-full h-full aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.images[0].url}
              alt={product.name}
              width={288}
              height={288}
              className="w-full h-full object-cover object-center group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
          <div className="flex-1 flex flex-col justify-end mt-4 px-2 pb-2 text-center">
            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
            <div className="mt-2">
              <p className="text-xl font-semibold text-gray-900">₹{product.price}</p>
              {product.discountedPrice && (
                <p className="text-sm text-red-600 line-through mt-1">
                  ₹{product.discountedPrice}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </Link>
    </SwiperSlide>
  ))}
  {/* Pagination element */}
  <div className="swiper-pagination hidden sm:block"></div>
</Swiper>

    </section>
  );
};

export default SimilarProducts;
