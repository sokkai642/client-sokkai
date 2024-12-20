import { User } from "../Model/Authentication";
import Product  from "../Model/Product";
import connectMongoDB from "../Connection";
import mongoose from "mongoose";

export async function POST(request) {
  await connectMongoDB();
  try {
    const { productId, userId, orderid } = await request.json();
    console.log("consoled", userId, productId, orderid);

    if (!productId || !userId || !orderid) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Fetch user
    const user = await User.findById(userId);
    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // Fetch purchase history
    const purchaseHistory = user.purchaseHistory.id(orderid);
    if (!purchaseHistory) {
      return new Response(
        JSON.stringify({ error: "Purchase history entry not found" }),
        { status: 404 }
      );
    }

    const product = purchaseHistory.products.find(
      (prod) => prod.productId.toString() === new mongoose.Types.ObjectId(productId).toString()
    );

    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found in the specified order" }),
        { status: 404 }
      );
    }

    product.status = "cancelled";

    purchaseHistory.totalAmount -= product.totalPrice;

    if (purchaseHistory.products.every((prod) => prod.status === "cancelled")) {
      purchaseHistory.status = "cancelled";
    }

    const productDoc = await Product.findById(productId);
    if (productDoc) {
      productDoc.stock += product.quantity; 
      await productDoc.save();
    } else {
      return new Response(
        JSON.stringify({ error: "Product not found in Product schema" }),
        { status: 404 }
      );
    }

    // Save the updated user data
    await user.save();

    return new Response(
      JSON.stringify({ message: "Product successfully cancelled" }),
      { status: 200 }
    );
  } catch (err) {
    console.error("Error in canceling product:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
