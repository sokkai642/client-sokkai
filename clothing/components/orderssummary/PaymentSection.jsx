import { useEffect } from "react";  // For loading the script
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
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    // Dynamically load Razorpay script on client-side
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script after component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!paymentMethod) return;

    setIsLoading(true); // Start loader
    try {
      const products = orderData.map((product) => ({
        productId: product._id,
        quantity: product.quantity,
        totalPrice: product.price * product.quantity,
        size:product.selectedSize,
        color:product.selectedcolor
      }));

     
      if (paymentMethod === "cod") {
        // Cash on Delivery flow
       const fetchimageurl=await handlePostPaymentFlow();
        const purchaseHistory = {
          userId,
          products,
          totalAmount,
          timestamp: new Date(),
          addressId,
          couponDiscount,
          imageUrl:fetchimageurl
        };
  console.log("😍😍😍😍😍😍😍😍imageurl",imageUrl)
        const response = await axios.post("/api/purchasehistory", purchaseHistory);
        if (response.status === 200) {
          toast.success("Order placed successfully!");
          onPaymentComplete();
          // handlePostPaymentFlow();
        } else if (response.status === 400) {
          toast.warning("Not enough stock");
        }
      } else {
        // Online Payment via Razorpay
        const orderResponse = await axios.post("/api/razorpay", { amount: totalAmount });
        if (orderResponse.status === 200) {
          const { id: order_id, amount, currency } = orderResponse.data;
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
            amount,
            currency,
            name: "Your Company Name",
            description: "Transaction for your purchase",
            order_id,
            handler: async (response) => {
              const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

              // Verify payment on the server
              try {
                const verifyResponse = await axios.post("/api/razorpay/paymentverification", {
                  razorpay_payment_id,
                  razorpay_order_id,
                  razorpay_signature,
                });
             console.log(verifyResponse)
                if (verifyResponse.data?.success) {
                  // Save purchase history
                  console.log("fvvv fv fv fv")
                  const fetchimageurl=await handlePostPaymentFlow();
                  console.log("😒😒😒😒",fetchimageurl)
                  const purchaseHistory = {
                    userId,
                    products,
                    totalAmount,
                    timestamp: new Date(),
                    addressId,
                    couponDiscount,
                    imageUrl:fetchimageurl
                  };
            
                  const saveResponse = await axios.post("/api/purchasehistory", purchaseHistory,imageUrl);
                  if (saveResponse.status === 200) {
                    toast.success("Payment successful and order placed!");
                    onPaymentComplete();
                    handlePostPaymentFlow();
                  } else {
                    toast.error("Failed to save purchase history. Please contact support.");
                  }
                } else {
                  toast.error(
                    verifyResponse.data?.error ||
                      "Payment verification failed. Please try again."
                  );
                }
              } catch (error) {
                console.error("Error verifying payment:", error);
                toast.error("An error occurred during payment verification.");
              }
            },
            prefill: {
              name: "Customer Name",
              email: "customer@example.com",
              contact: "9999999999",
            },
            theme: {
              color: "#3399cc",
            },
          };

          // Ensure Razorpay is defined before opening the checkout
          if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            toast.error("Razorpay is not loaded properly. Please try again.");
          }
        } else {
          toast.error("Failed to create Razorpay order. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("An error occurred during payment. Please try again.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const handlePostPaymentFlow = async () => {
    // Handle additional post-payment actions like validating coupons, sending WhatsApp messages, etc.
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
      if (WhatsappResponse.data && WhatsappResponse.data.invoiceimage) {
        setImageUrl(WhatsappResponse.data.invoiceimage);
        return WhatsappResponse.data.invoiceimage;
        console.log("Image URL set successfully:", WhatsappResponse.data.invoiceimage);
      } else {
        console.error("Image URL not found in the response");
      }
      console.log("WhatsApp response:", WhatsappResponse.data);
      localStorage.removeItem("orderData");
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
    }

    toast.success("Purchase successful!");
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
            disabled={isLoading}
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
