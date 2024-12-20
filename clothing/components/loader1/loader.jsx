'use client'

import React from 'react';
import { motion } from 'framer-motion';

const LoaderComponent = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
      <div className="relative">
        {/* Animated Shirt Icon */}
        <motion.div
          initial={{ rotate: -15 }}
          animate={{ rotate: 15 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
            ease: "easeInOut"
          }}
          className="w-20 h-20 mb-8"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-full h-full text-gray-800"
          >
            {/* Shirt Icon */}
            <path
              d="M16 2C16 2 14 2 12 4C10 6 8 4 8 4C6 2 4 2 4 2V8H16V2Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3 8L5 21H19L21 8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 14C10 14 10 18 14 18C18 18 18 14 14 14C10 14 10 14 10 14Z"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1,
            ease: "easeInOut"
          }}
          className="text-center"
        >
          <span className="text-lg font-semibold text-gray-800">Loading Clothes</span>
          <div className="flex justify-center mt-2 space-x-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 0.5,
                  delay: dot * 0.2
                }}
                className="w-3 h-3 bg-gray-800 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoaderComponent;
