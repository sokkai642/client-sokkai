import crypto from "crypto";
import Razorpay from "razorpay";
export async function POST(request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing required fields for payment verification" }),
        { status: 400 }
      );
    }

    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Compare the generated signature with the received signature
    if (generated_signature === razorpay_signature) {
      return new Response(
        JSON.stringify({ success: true, message: "Payment verified successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid signature" }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500 }
    );
  }
}
