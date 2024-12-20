import React, { useState } from 'react';
import './sample.css'
function PriceDetails({ priceDetails, totalAmount }) {
  const [isCouponVisible, setCouponVisible] = useState(false); // To toggle the coupon visibility

  return (
    <div className="price-details">
      <h2>PRICE DETAILS</h2>
      
      <div className="price-row">
        <span>Price ({priceDetails.count} item)</span>
        <span>₹{priceDetails.price-30}</span>
      </div>

      <div className="price-row">
        <span>Delivery Charges</span>
        <span>
          <span className="original-price">₹100</span>
          <span className="free">₹30</span>
        </span>
      </div>

      <div className="price-row">
        <span className="platform-fee">
          Platform Fee
          <span className="info-icon">ⓘ</span>
        </span>
        <span>₹{priceDetails.platformFee}</span>
      </div>

      {/* Show coupon discount if available */}
      {priceDetails.couponDiscount > 0 && (
        <div className="coupon-discount" onClick={() => setCouponVisible(!isCouponVisible)}>
          <span className="coupon-title">🎁 Coupon Discount</span>
          <span>₹{priceDetails.couponDiscount}</span>
        </div>
      )}

      <div className="total-row">
        <span>Total Payable</span>
        <span>₹{totalAmount}</span>
      </div>

      <div className="savings-row">
        Your Total Savings on this order ₹{priceDetails.totalSavings}
      </div>

      {/* Modal-like Gift Coupon Section */}
      {isCouponVisible && priceDetails.couponDiscount > 0 && (
        <div className="coupon-modal">
          <div className="coupon-modal-content">
            <h3>🎁 You have a Coupon!</h3>
            <p>Discount Applied: ₹{priceDetails.couponDiscount}</p>
            <p>Thank you for using the coupon. Enjoy your savings!</p>
            <button onClick={() => setCouponVisible(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="security-note">
        <span className="shield-icon">🛡️</span>
        <p>
          Safe and Secure Payments. Easy returns.
          <br />
          100% Authentic products.
        </p>
      </div>
    </div>
  );
}

export default PriceDetails;