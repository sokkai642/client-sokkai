import connectMongoDB from "../Connection";
import { User } from "../Model/Authentication"; 

export async function POST(request) {
    await connectMongoDB();
    console.log("Connecting to MongoDB...");
    try {
      const body = await request.json();
  
      const { userId, name, phone, address, location, type } = body;
      console.log("consoling the user id :", userId);
      if (!userId || !name || !phone || !address || !location) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400 }
        );
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }
  
  
  
      const newAddress = { name, phone, address, location, type };
    console.log("Adding new address:", newAddress);

   const newdata= user.address.push(newAddress);
   console.log("consoling the newdata : ",newdata)
    await user.save();

    return new Response(
      JSON.stringify({ message: "Address added successfully", user }),
      { status: 200 }
    );
    } catch (error) {
      console.error("Error adding address:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: " + error.message }),
        { status: 500 }
      );
    }
  }
  
  export async function GET(request) {
    await connectMongoDB();
    try {
      const url = new URL(request.url);
      const userId = url.searchParams.get("userId");
      console.log("Console log of the userId:", userId);
  
      const user = await User.findById(userId);
      if (!user) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }
  
      return new Response(
        JSON.stringify({ address: user.address }),
        { status: 200 }
      );
    } catch (err) {
      console.error("Error fetching addresses:", err);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500 }
      );
    }
  }
  

  export async function PUT(request) {
    await connectMongoDB();
    try {
      const body = await request.json();
      const { userId, addressId, name, phone, address, location, type } = body;
  
      if (!userId || !addressId || !name || !phone || !address || !location) {
        return new Response(
          JSON.stringify({ error: "Missing required fields" }),
          { status: 400 }
        );
      }
  
      const user = await User.findById(userId);
      if (!user) {
        return new Response(
          JSON.stringify({ error: "User not found" }),
          { status: 404 }
        );
      }
  
      const addressToUpdate = user.address.id(addressId);
      if (!addressToUpdate) {
        return new Response(
          JSON.stringify({ error: "Address not found" }),
          { status: 404 }
        );
      }
  
      addressToUpdate.name = name;
      addressToUpdate.phone = phone;
      addressToUpdate.address = address;
      addressToUpdate.location = location;
      addressToUpdate.type = type;
  
      await user.save();
  
      return new Response(
        JSON.stringify({ message: "Address updated successfully", address: user.address }),
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating address:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error: " + error.message }),
        { status: 500 }
      );
    }
  }
  