'use client';

import React, { useState,useEffect } from 'react';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews }) => {
  const [isExpanded, setIsExpanded] = useState(false);
useEffect(()=>{
  console.log("😍😍",reviews)
},[])
  const visibleReviews = isExpanded ? reviews : reviews.slice(0, 4);

  return (
    <div className="relative mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-full">
        {/* Display reviews based on the expansion state */}
        {visibleReviews.map((review, index) => (
          <div key={index} className="min-w-0">
            <ReviewCard review={review} index={index} />
          </div>
        ))}
      </div>

      {/* Show More / Show Less Button */}
      {reviews.length > 4 && (
        <div className="text-center mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 transition-colors"
          >
            {isExpanded ? (
              <>Show Less</>
            ) : (
              <>Show More</>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewList;
