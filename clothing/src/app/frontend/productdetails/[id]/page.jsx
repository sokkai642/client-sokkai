'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from 'framer-motion';
import { setpath } from '@/app/utils/currentpathnavigate/path';
import ProductGallery from '../../../../../components/productdetailscomponent/ProductGallery';
import SizeSelector from '../../../../../components/productdetailscomponent/SizeSelector';
import ProductReviews from '../../../../../components/productdetailscomponent/ProductReviews';
import SimilarProducts from '../../../../../components/productdetailscomponent/SimilarProducts';
import { getUserIdFromToken,getToken,isAuthenticated} from '../../../utils/token/token';
const ProductsPage = ({ params }) => {
  const userId =getUserIdFromToken()
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ username: '', rating: 0, comment: '' });
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [similarProducts, setSimilarProducts] = useState([]);
  const reviewsRef = useRef(null);
  const { id } = React.use(params) || {};
  const router = useRouter();


  useEffect(() => {
    if (id) {
      fetchProductDetails(id);
      fetchSimilarProducts();
    }
  }, [id]);

  const fetchProductDetails = async (productId) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products/getproducts_by_id?id=${productId}`);
      setProduct(response.data);
      setReviews(response.data.reviews || []);
    } catch (error) {
      toast.error('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setSimilarProducts(response.data);
    } catch (error) {
      console.error('Error fetching similar products:', error);
    }
  };

  const handleReviewSubmit = async () => {
    if (!newReview.username || newReview.rating === 0 || !newReview.comment) {
      toast.warning('Please fill in all review fields');
      return;
    }
  
    try {
      const response = await axios.put("/api/products", {
        id,
        review: {
          username: newReview.username,
          ratings: newReview.rating, // Ensure key matches backend
          feedback: newReview.comment, // Ensure key matches backend
        },
      });
  
      if (response.status === 200) {
        setReviews([...reviews, {
          username: newReview.username,
          ratings: newReview.rating,
          feedback: newReview.comment,
        }]);
        setNewReview({ username: '', rating: 0, comment: '' });
        toast.success('Review submitted successfully!');
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.warning('You have already submitted a review for this product');
      } else {
        toast.error('Failed to submit review');
      }
    }
  };
  
  
  

  const handleAction = async (action) => {
    if (!isAuthenticated()) {
      toast.info("Please sign in to continue", {
        position: "top-center",
        autoClose: 3000,
      });
      const currentPath = window.location.pathname;
      setpath(currentPath)
      setTimeout(() => router.push('/frontend/signup'), 3000);
      return;
    }

    if (!selectedSize && (action === 'ORDER')) {
      toast.warning('Please select a size first');
      return;
    }

    if (!userId) {
      toast.error("Authentication error");
      return;
    }

    try {
      switch (action) {
        case 'ORDER':
          const cartResponse = await axios.post("/api/cart", { userId, productId: id});
          if (cartResponse.status === 200) {
            toast.success("Processing your order...");
            setTimeout(() => router.push("/frontend/cart"), 2000);
          }
          break;

        case 'WISHLIST':
          const wishlistResponse = await axios.post("/api/wishlist", { userId, productId: id });
          if (wishlistResponse.status === 200) {
            toast.success("Added to wishlist");
          }
          break;

        case 'CART':
          const addToCartResponse = await axios.post("/api/cart", { userId, productId: id });
          if (addToCartResponse.status === 200) {
            toast.success("Added to cart");
          }
          console.log(setSelectedSize,"size sleected")

          break;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-4 lg:p-6 mt-10"
    >
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-12">
        <div className="lg:col-span-2">
          <ProductGallery images={product.images} onSlide={setActiveImage} />
        </div>

        <div className="space-y-6 lg:sticky lg:top-6 self-start">
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
                {Math.round(((product.originalprice - product.price) / product.originalprice) * 100)}% OFF
              </span>
            </div>

            <SizeSelector
              availableSizes={JSON.parse(product.sizes[0])} 
              selectedSize={selectedSize}
              onSizeSelect={setSelectedSize}
            />

<div className="space-y-4">
  <button
    onClick={() => handleAction('ORDER')}
    className="w-full bg-black text-white py-4 rounded-lg text-lg font-medium hover:bg-gray-900 transition-colors duration-200"
  >
    Buy Now
  </button>
  <div className="grid grid-cols-2 gap-4">
    <button
      onClick={() => handleAction('WISHLIST')}
      className="flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    >
      <i className="fas fa-heart text-black"></i> {/* Updated icon color to black */}
      <span className="text-black">Wishlist</span>
    </button>
    <button
      onClick={() => handleAction('CART')}
      className="flex items-center justify-center space-x-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    >
      <i className="fas fa-shopping-cart text-black"></i> {/* Updated icon color to black */}
      <span className='text-black'>Add to Cart</span>
    </button>
  </div>
</div>


            <div className="mt-8">
              <button
                onClick={() => reviewsRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-gray-100 text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                View Reviews
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <SimilarProducts products={similarProducts} />

      <div ref={reviewsRef}>
        <ProductReviews
          reviews1={reviews}
          onSubmitReview={handleReviewSubmit}
          newReview={newReview}
          setNewReview={setNewReview}
          productid={id}
        />
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
};

export default ProductsPage;