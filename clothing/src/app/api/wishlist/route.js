import {Wishlist} from "../Model/customerdata"
import Product from '../Model/Product'; 

import connectMongoDB from "../Connection";
export async function POST(request) {
  await connectMongoDB();

  try {
    const { userId, productId } = await request.json();
    console.log("consoling the productid ",productId)
    console.log("Received UserId:", userId);

    
    let user = await Wishlist.findOne({ userid: userId });

    if (!user) {
      console.log("User not found, creating a new user...");

      
      user = new Wishlist({ userid: userId, products: [] });
    }

    
    const productInCart = user.products.find(
      (item) => item.toString() === productId
    );

    if (!productInCart) {
      
      user.products.push( productId );
    }

    
    await user.save();

    return Response.json(
      { message: "Product added to wishlist", cart: user.products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}
export async function DELETE(request) {
  await connectMongoDB();

  try {
    const { userId, productId } = await request.json();
    console.log("Deleting from wishlist", userId, productId); 

    let user = await Wishlist.findOne({ userid: userId });
    console.log("User found:", user);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    if (!user.products.includes(productId)) {
      console.log("Product not found in wishlist"); 
    } else {
      user.products = user.products.filter((id) => id.toString() !== productId);
      await user.save();
      console.log("Wishlist after removal:", user.products); 
    }

    return new Response(
      JSON.stringify({
        message: "Product removed from wishlist",
        wishlist: user.products,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during delete:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400 }
    );
  }
}

export async function GET(request) {
  await connectMongoDB();
  console.log("iv fv fvbfvbfvbfvb😤😤😤😤😤😤fvbfvb"); 

  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return Response.json({ error: "UserId is required" }, { status: 400 });
    }

    console.log("Fetching wishlist for UserId:", userId);

    
    let user = await Wishlist.findOne({ userid: userId });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    
    const productDetails = await Product.find({
      '_id': { $in: user.products }
    });

    if (productDetails.length === 0) {
      return Response.json({ error: "No products found for this wishlist" }, { status: 404 });
    }

    
    return Response.json(productDetails, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}