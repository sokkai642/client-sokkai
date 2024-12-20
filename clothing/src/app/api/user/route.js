import connectMongoDB from "../Connection";
import {User} from "../Model/Authentication";
await connectMongoDB()
export async function GET(request) {
    await connectMongoDB();
  console.log("csling")
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
  console.log("cnsoling the userid",userId)
      
      const user = await User.findById(userId);
  
      if (!user) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }
  
      
    
  
      
      return new Response(
        JSON.stringify({ message: "User has address.",userdata:user}),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error processing request:", error);
  
      return new Response(
        JSON.stringify({ error: "Internal Server Error: " + error.message }),
        { status: 500 }
      );
    }
  }