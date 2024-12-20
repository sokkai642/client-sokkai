'use client';

import React, { useEffect, useState } from 'react';
import { useReviews } from './UseReview';
import ReviewStats from './ReviewStats';
import ReviewFilters from './ReviewFilters';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';

const ProductReviews = ({ productName, productid, reviews1 }) => {
  const {
    reviews,
    filter,
    setFilter,
    addReview,
    getFilteredReviews,
    getAverageRating
  } = useReviews(productid);

  const [combinedReviews, setCombinedReviews] = useState([]);

  useEffect(() => {
    console.log("😎😎😎😎😎",reviews1)
    if (reviews1 && Array.isArray(reviews1)) {
      setCombinedReviews(reviews1);
    }
  }, [reviews1]); 

  useEffect(() => {
    setCombinedReviews((prevReviews) => [...prevReviews, ...reviews]);
  }, [reviews]);

  const getAverageRating1 = () => {
    return combinedReviews.length
      ? combinedReviews.reduce((acc, rev) => acc + rev.ratings, 0) / combinedReviews.length
      : 0;
  };

  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-300 p-4 md:p-8 mt-12">
      <ReviewStats
        productName={productName}
        averageRating={getAverageRating1()} 
        totalReviews={combinedReviews.length}    
      />
      
      <ReviewFilters
        currentFilter={filter}
        onFilterChange={setFilter}
      />
      
      <ReviewList reviews={combinedReviews} />
      
      <ReviewForm onSubmit={addReview} />
    </section>
  );
};

export default ProductReviews;
