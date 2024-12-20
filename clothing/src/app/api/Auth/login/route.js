import connectMongoDB from "../../Connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../../Model/Authentication";

export async function POST(request) {
  // Connect to MongoDB
  await connectMongoDB();

  try {
    const { email, password } = await request.json(); // Parse the request body
console.log("email",email)
    // Validate input
    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }
if(password){
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password." }),
        { status: 401 }
      );
    }
  }

    const token = jwt.sign(
      { id: user._id, role: user.role }, // Payload
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return new Response(
      JSON.stringify({
        message: "Login successful.",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while logging in." }),
      { status: 500 }
    );
  }
}
