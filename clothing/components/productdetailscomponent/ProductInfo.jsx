import React from 'react';
import { motion } from 'framer-motion';
import SizeSelector from './SizeSelector';

const ProductInfo = ({ product, selectedSize, setSelectedSize, handleAction }) => {
  const discount = Math.round(
    ((product.originalprice - product.price) / product.originalprice) * 100
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h2>
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-xl text-gray-500 line-through">₹{product.originalprice}</span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {discount}% OFF
          </span>
        </div>

        <SizeSelector
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
        />

        <div className="space-y-4">
          <button
            onClick={() => handleAction('ORDER')}
            className="w-full bg-black text-white py-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-200"
          >
          </button>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAction('WISHLIST')}
              className="flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
             
              <span className="text-black">Wishlist</span>
            </button>
            <button
              onClick={() => handleAction('CART')}
              className="flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <i className="fas fa-shopping-cart text-gray-600"></i>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;