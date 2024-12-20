'use client';
import React, { useState, useEffect, useRef } from 'react';

import axios from 'axios';
export const useReviews = (productid) => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all');


  const addReview = async (review) => {
    console.log(review,"😍😍😍😍😍😍")
    try {
      const reviewData = {
        ...review,
        date: new Date().toISOString(),
        purchaseVerified: Math.random() > 0.5,
        ratings: review.rating,  
      };
    
  
      const response = await axios.put("/api/products", {
        id: productid, 
        review: reviewData,
    
      });
  
      if (response.status === 200) {
        setReviews([reviewData, ...reviews]);
      } else {
        console.error('Failed to submit review:', response.data);
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const getFilteredReviews = () => {
    return reviews.filter(review => {
      if (filter === 'verified') return review.purchaseVerified;
      if (filter === 'with-images') return review.images.length > 0;
      return true;
    });
  };

  const getAverageRating = () => {
    return reviews.length
      ? reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length
      : 0;
  };

  return {
    reviews,
    filter,
    setFilter,
    addReview,
    getFilteredReviews,
    getAverageRating
  };
};