import { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentSection({
  AddressString,
  onPaymentComplete,
  totalAmount,
  productIds,
  count,
  userId,
  orderData,
  addressId,
  pricedetails,
}) {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const couponDiscount = pricedetails?.couponDiscount || 0;

  const handlePayment = async () => {
    if (paymentMethod) {
      setIsLoading(true); // Start loader
      try {
        const products = orderData.map((product) => ({
          productId: product._id,
          quantity: product.quantity,
          totalPrice: product.price * product.quantity,
        }));

        const purchaseHistory = {
          userId,
          products,
          totalAmount: totalAmount,
          timestamp: new Date(),
          addressId: addressId,
          couponDiscount,
        };

        const response = await axios.post("/api/purchasehistory", purchaseHistory);
        onPaymentComplete();
        if (response.status === 200) {
          if (couponDiscount > 0) {
            await axios.put("/api/coupun/validate", {
              userId,
              couponId: pricedetails.couponid,
            });
          }

          try {
            const WhatsappResponse = await axios.post("/api/communication/invoice", {
              products: orderData,
              address: AddressString,
            });
            console.log("WhatsApp response:", WhatsappResponse.data);
            localStorage.removeItem("orderData");
          } catch (error) {
            console.error("Error sending WhatsApp message:", error);
          }

        
          console.log("Purchase history saved successfully!");
        } else if (response.status == 400) {
          toast.warning("Not enough stock");
        } else {
          console.error("Failed to save purchase history");
        }
      } catch (error) {
        console.error("Error saving purchase history:", error);
      } finally {
        setIsLoading(false); // Stop loader
      }
    }
  };

  const paymentMethods = [
    { value: "upi", label: "UPI" },
    { value: "card", label: "Credit/Debit Card" },
    { value: "netbanking", label: "Net Banking" },
    { value: "cod", label: "Cash on Delivery" },
  ];

  return (
    <div className="payment-section">
      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <PaymentMethod
            key={method.value}
            {...method}
            selected={paymentMethod === method.value}
            onChange={setPaymentMethod}
            disabled={method.value !== "cod"}
          />
        ))}
      </div>

      <div className="relative">
        <button
          className={`payment-btn ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={!paymentMethod || isLoading}
          onClick={handlePayment}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <span className="loader mr-2"></span> Processing...
            </div>
          ) : (
            `Pay ₹${totalAmount}`
          )}
        </button>

        {/* Loader styling */}
        <style jsx>{`
          .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 16px;
            height: 16px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <ToastContainer />
    </div>
  );
}

export default PaymentSection;
