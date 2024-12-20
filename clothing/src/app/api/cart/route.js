import { CartData } from "../Model/customerdata";
import Product from "../Model/Product";
import connectMongoDB from "../Connection";
import { ConsoleMessage } from "puppeteer";

export async function POST(request) {
  await connectMongoDB();

  try {
    const { userId, productId } = await request.json();
    console.log("consoling the productid ",productId)
    console.log("Received UserId:", userId);

    
    let user = await CartData.findOne({ userid: userId });

    if (!user) {
      console.log("User not found, creating a new user...");

      
      user = new CartData({ userid: userId, products: [] });
    }

    
    const productInCart = user.products.find(
      (item) => item.toString() === productId
    );

    if (!productInCart) {
      
      user.products.push( productId );
    }

    
    await user.save();

    return Response.json(
      { message: "Product added to cart", cart: user.products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding product to cart:", error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}



export async function GET(request) {
  await connectMongoDB();

  try {
    
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    console.log("User ID:", userId);

    if (!userId) {
      return new Response(
        JSON.stringify({ message: 'User ID is required' }),
        { status: 400 }
      );
    }

    
    const cart = await CartData.findOne({ userid: userId });

    if (!cart || cart.products.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No cart found or cart is empty for this user' }),
        { status: 404 }
      );
    }

    
    const products = await Product.find({ _id: { $in: cart.products } });

    if (products.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No products found for the given IDs' }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify({ cart: products }), { status: 200 });
  } catch (error) {
    console.error('Error fetching cart data:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}


export async function PATCH(request) {
  await connectMongoDB();

  try {
    const { userId, productId, quantity } = await request.json();
    const user = await User.findOne({ userId });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const productInCart = user.cart.find(
      (item) => item.productId.toString() === productId
    );
    if (productInCart) {
      productInCart.quantity = quantity;
      await user.save();
      return Response.json(
        { message: "Cart updated", cart: user.cart },
        { status: 200 }
      );
    }

    return Response.json(
      { error: "Product not found in cart" },
      { status: 404 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
export async function DELETE(request) {
  await connectMongoDB();

  try {
    const { userId, productId } = await request.json();  
    console.log("Received userId:", userId, "and productId:", productId);

    
    const user = await CartData.findOne({ userid: userId });
    console.log("User data:", user);

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    
    user.products = user.products.filter(item => item !== productId); 

    console.log("Deleted product, new cart:", user.products);

    
    await user.save();

    return Response.json({ message: "Product removed from cart", cart: user.products }, { status: 200 });
  } catch (error) {
    console.error("Error removing product from cart:", error.message);
    return Response.json({ error: error.message }, { status: 400 });
  }
}





