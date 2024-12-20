'use client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

import successAnimation from './success-animation.json';

function OrderSuccess() {
  const router = useRouter();
  const handleContinueShopping = () => {
    router.push('/'); // Navigates to the homepage
  };
  
  return (
    <motion.div 
      className="order-success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="success-animation">
        <Lottie 
          animationData={successAnimation}
          loop={false}
          style={{ width: 200, height: 200 }}
        />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        Order Placed Successfully!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <p className="success-message">Thank you for shopping with us.</p>
        <p className="order-message">
          Your order will be delivered soon.
          <br />
          You will receive an email confirmation shortly.
        </p>
        <motion.button 
          className="continue-shopping"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

export default OrderSuccess;
