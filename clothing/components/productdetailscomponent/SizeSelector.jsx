import React from 'react';
import { toast } from 'react-toastify';

const SizeSelector = ({ availableSizes, selectedSize, onSizeSelect }) => {
  const allSizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleSizeSelect = (size) => {
    if (availableSizes.includes(size)) {
      onSizeSelect(size);
      toast.info(`Size ${size} selected`);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Size</h3>
      <div className="grid grid-cols-5 gap-4">
        {allSizes.map((size) => {
          const isAvailable = availableSizes.includes(size);
          const isSelected = selectedSize === size;

          return (
            <button
              key={size}
              onClick={() => handleSizeSelect(size)}
              className={`
                relative py-3 rounded-lg font-medium text-sm flex items-center justify-center
                transition-all duration-200
                ${isSelected
                  ? 'bg-black text-white ring-2 ring-black'
                  : isAvailable
                  ? 'bg-white text-gray-900 border border-gray-300 hover:border-black hover:shadow-lg'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }
              `}
              disabled={!isAvailable}
            >
              {size}
              {!isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 rounded-lg">
                  <i className="fas fa-times text-gray-400 text-lg"></i>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
