import connectMongoDB from "../Connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../Model/Authentication";

export async function POST(request) {
  await connectMongoDB();

  try {
    const body = await request.json();
    console.log(body);

    const trimmedBody = Object.keys(body).reduce((acc, key) => {
      acc[key.trim()] = body[key];
      return acc;
    }, {});

    let { email, firstName, lastName, name, picture, password } = trimmedBody;

    if (!name && firstName && lastName) {
      name = `${firstName} ${lastName}`;
    }

    console.log("email:", email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email" }),
        { status: 400 }
      );
      
    }

    let user = await User.findOne({ email });
    if (user) {
      
      return new Response(
        JSON.stringify({ error: "Email already exists" }),
        { status: 400 }
      );
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        email,
        name,
        picture,
        password: hashedPassword, 
      });
    } else {
      user = await User.create({
        email,
        name,
        picture,
      });
    }

    console.log("User created: ", user);

    const id = user._id;
    const token = jwt.sign(
      { email, picture, name, id },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );
    console.log("token: ", token);

    return new Response(
      JSON.stringify({ token, user }),
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

    
    if (!user.address || user.address.length === 0) {
      
      return new Response(
        JSON.stringify({ message: "Please add your address." }),
        { status: 200 }
      );
    }

    
    return new Response(
      JSON.stringify({ message: "User has address." }),
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

export async function PUT(request) {
  await connectMongoDB();

  try {
    const body = await request.json();
    console.log("Parsed request body:", body);

    const { userId, ...updateData } = body;

    if (!userId) {
      return new Response(
        JSON.stringify({ error: "User ID is required for updating user data." }),
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found." }),
        { status: 404 }
      );
    }

    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined && updateData[key] !== null) {
        user[key] = updateData[key];
      }
    });

    await user.save();

    console.log("Updated user:", user);

    return new Response(
      JSON.stringify({ message: "User updated successfully.", user }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error: " + error.message }),
      { status: 500 }
    );
  }
}

