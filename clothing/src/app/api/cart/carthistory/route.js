import connectMongoDB from "../../Connection";
import { User } from "../../Model/Authentication"; 

export async function GET(request) {
  try {
    await connectMongoDB();
    console.log("hello bhai");

    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
    }

    const user = await User.findById(userId)
      .populate({
        path: 'purchaseHistory.products.productId',
        model: 'Product',
      });

    console.log(user);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    
    const userAddress = user.address[0]; 

    
    const purchaseHistoryWithAddress = user.purchaseHistory.map(purchase => {
      const address = userAddress ? userAddress : null; 

      
      const products = purchase.products.map(product => ({
        ...product.toObject(),  
        address,  
      }));

      
      return {
        ...purchase.toObject(),  
        address,  
        products,
      };
    });

    console.log("🔍🔍🔍🔍", purchaseHistoryWithAddress);

    return new Response(
      JSON.stringify({ purchaseHistory: purchaseHistoryWithAddress }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


