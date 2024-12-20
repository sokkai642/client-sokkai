'use client';

import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';

const ReviewFilters = ({ currentFilter, onFilterChange }) => {
  return (
    <div className="flex gap-4 mb-6 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
      <button
        onClick={() => onFilterChange('all')}
        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out ${
          currentFilter === 'all'
            ? 'text-blue-600 border border-blue-600'
            : 'text-gray-600 border border-gray-300 hover:text-blue-600 hover:border-blue-600'
        }`}
      >
        All Reviews
      </button>
      {/* <button
        onClick={() => onFilterChange('verified')}
        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 ${
          currentFilter === 'verified'
            ? 'text-blue-600 border border-blue-600'
            : 'text-gray-600 border border-gray-300 hover:text-blue-600 hover:border-blue-600'
        }`}
      >
        <CheckCircle2 className="w-4 h-4" />
        Verified
      </button> */}
      {/* <button
        onClick={() => onFilterChange('with-images')}
        className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ease-in-out flex items-center gap-2 ${
          currentFilter === 'with-images'
            ? 'text-blue-600 border border-blue-600'
            : 'text-gray-600 border border-gray-300 hover:text-blue-600 hover:border-blue-600'
        }`}
      >
        <Camera className="w-4 h-4" />
        With Photos
      </button> */}
    </div>
  );
};

export default ReviewFilters;
