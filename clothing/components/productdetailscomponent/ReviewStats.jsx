'use client';

import React from 'react';
import StarRating from './starRating';

const ReviewStats = ({ averageRating, totalReviews, productName }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{productName}</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <StarRating rating={averageRating} size="lg" />
          <span className="text-xl md:text-2xl font-semibold text-gray-900">
            {averageRating.toFixed(1)}
          </span>
        </div>
        <span className="text-gray-600">
          {totalReviews} {totalReviews === 1 ? 'Review' : 'Reviews'}
        </span>
      </div>
    </div>
  );
};

export default ReviewStats;