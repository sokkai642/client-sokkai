'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import LoaderComponent from '../../../../../components/loader1/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserIdFromToken } from '../../../utils/token/token'; 
import styles from '../product.module.css'
const ProductCard = ({ images, name, price, productId, onRemove, customer, setProducts, userId,gift }) => {
  const handleAddWishlist = async (id) => {
    const userId = getUserIdFromToken();
    if (!userId) {
      toast.error("Please login to add items to wishlist");
      window.location.href = "/frontend/login"; // Redirect to login
      return;
    }
  
    try {
      const wishlistResponse = await axios.post("/api/wishlist", { userId, productId: id });
      if (wishlistResponse.status === 200) {
        toast.success("Added to wishlist");
      }
      console.log("Product added to wishlist:", id);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist");
    }
  };
  

  const remove = async (id) => {
    try {
      const userId = getUserIdFromToken();
      if (userId) {
        const response = await axios.delete("/api/wishlist", {
          data: { userId, productId: id },
        });
        if (response.status === 200) {
          toast.success("Deleted successfully");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product._id !== id)
          );
        } else {
          toast.error("Failed to delete product from wishlist");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error deleting from wishlist:", error);
      toast.error("Failed to delete product from wishlist");
    }
  };

  return (
    <div className="flex flex-col items-center relative bg-white shadow-lg overflow-hidden transition-all duration-300">
      {customer === 'wishlist' && (
        <button
          onClick={() => remove(productId)}
          className="absolute bottom-3 right-3 p-2 text-black hover:text-gray-700"
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      )}
      <div className="relative w-full h-[400px] mb-4">
        <Link href={`/frontend/productdetails/${productId}`} passHref>
        {gift && (
          <div className={styles.giftTag}>
            <span className={styles.giftText}>Gift Available</span>
          </div>
        )}
          <img
            src={images[0]?.url}
            alt={name}
            className="object-cover w-full h-full"
          />
        </Link>
      </div>
      <div className="text-center p-4 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
        <div className="flex items-center justify-center space-x-3">
          <span className="text-lg font-semibold text-gray-800">{price} RS</span>
          {price && (
            <span className="text-sm text-gray-500 line-through">{price} RS</span>
          )}
          {customer !== 'wishlist' && (
            <button
              className="text-gray-600 hover:text-red-500 transition duration-200 ml-3 text-2xl"
              onClick={() => handleAddWishlist(productId)} 
            >
              <i className="fas fa-heart"></i>
            </button>
          )}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

const ProductsPage = ({ params }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const unwrappedParams = React.use(params);
  const { customer } = unwrappedParams || {};

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let response;
  
        if (customer === "wishlist") {
          const userId = getUserIdFromToken(); 
          if (!userId) {
            toast.error("Please login to view your wishlist");
            window.location.href = "/frontend/login"; // Redirect to login
            return;
          }
  
          console.log("Fetching wishlist");
          response = await axios.get("/api/wishlist", { params: { userId } });
          console.log("Wishlist products:", response.data);
          setProducts(response.data);
        } else {
          response = await axios.get("/api/products");
          console.log("All products:", response.data);
  
          const fetchedProducts = response.data;
          if (customer && customer !== 'all') {
            setProducts(fetchedProducts.filter(product => product.category === customer));
          } else {
            setProducts(fetchedProducts);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    };
  
    fetchProducts();
  }, [customer]);
  

  const handleRemoveFromWishlist = (productId) => {
    const updatedProducts = products.filter(product => product._id !== productId);
    toast.success("Item removed from wishlist")
    setProducts(updatedProducts);
  };

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-center text-3xl font-bold text-gray-900 mb-8">
        {customer && customer.toLowerCase() === "all" 
          ? "Products" 
          : customer 
          ? customer.toUpperCase() 
          : "Our Products"}
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              images={product.images}
              name={product.name}
              price={product.price}
              onRemove={handleRemoveFromWishlist}
              customer={customer}
              setProducts={setProducts}  
              gift={product.selectedGift}
            />
          ))
        ) : (
          <p className="text-center text-gray-600">No products found in this category.</p>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProductsPage;
