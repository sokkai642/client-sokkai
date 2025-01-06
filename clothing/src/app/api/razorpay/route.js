import Razorpay from "razorpay";
require("dotenv").config(); 
export async function POST(request) {
  try {
    const { amount } = await request.json(); // Parse the request body
console.log(amount)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,  
      key_secret: process.env.RAZORPAY_KEY_SECRET,  
    });


  console.log("fjvfvfv ")
    const order = await razorpay.orders.create({
      amount: amount * 100, // Convert amount to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
console.log(order)

    return new Response(JSON.stringify(order), {

      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create Razorpay order" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
