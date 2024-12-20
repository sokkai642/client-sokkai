'use client';

import React, { useState } from 'react';
import StarRating from './starRating';
import ImageUpload from './Imageupload';
import axios from 'axios';

const ReviewForm = ({ onSubmit }) => {
  const [review, setReview] = useState({
    username: '',
    rating: 0,
    feedback: '',
    images: []
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("reviews", review);
    onSubmit(review);
    setReview({
      username: '',
      rating: 0,
      feedback: '',
      images: []
    });
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Your Name
          </label>
          <input
            type="text"
            id="username"
            value={review.username}
            onChange={(e) => setReview({ ...review, username: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-black"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <StarRating
            rating={hoveredRating || review.rating}
            onRatingChange={(rating) => setReview({ ...review, rating })}
            onHover={setHoveredRating}
            onLeave={() => setHoveredRating(0)}
            interactive={true}
            size="lg"
          />
        </div>

        <div>
          <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
            Your Review
          </label>
          <textarea
            id="feedback"
            rows="4"
            value={review.feedback}
            onChange={(e) => setReview({ ...review, feedback: e.target.value })}
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-3 text-black"
            placeholder="Share your experience with this product..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Photos
          </label>
          <ImageUpload
            images={review.images}
            onImageUpload={(imageUrl) => 
              setReview({ ...review, images: [...review.images, imageUrl] })
            }
            onImageRemove={(index) =>
              setReview({
                ...review,
                images: review.images.filter((_, i) => i !== index)
              })
            }
          />
        </div>

        <button
  type="submit"
  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-all duration-200 transform hover:scale-105"
>
  Submit Review
</button>

      </form>
    </div>
  );
};

export default ReviewForm;
