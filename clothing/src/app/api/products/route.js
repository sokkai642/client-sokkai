import cloudinary from "cloudinary";
import formidable from "formidable";
import Product from "../Model/Product";
import dotenv from "dotenv";
import connectMongoDB from "../Connection";
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (file) => {
  const result = await cloudinary.v2.uploader.upload(file, {
    folder: "ecommerce/products",
  });
  return { url: result.secure_url, public_id: result.public_id };
};

const deleteFromCloudinary = async (public_id) => {
  await cloudinary.v2.uploader.destroy(public_id);
};

// Create Product
export async function POST(request) {
  await connectMongoDB();

  console.log("data passed");
  try {
    const form = await request.formData();
    const name = form.get("name");
    const description = form.get("description");
    const price = form.get("price");
    const category = form.get("category");
    const stock = form.get("stock");
    const brand = form.get("brand");
    const files = form.getAll("images");
    for (let [key, value] of form.entries()) {
      console.log(`${key}:`, value);
    }

    if (!files || files.length === 0) {
      return Response.json(
        { error: "No files were uploaded" },
        { status: 400 }
      );
    }

    const images = await Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return await uploadToCloudinary(`data:${file.type};base64,${base64}`);
      })
    );

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      brand,
      images,
    });

    const savedProduct = await newProduct.save();
    return Response.json(savedProduct, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
export async function GET() {

  await connectMongoDB();
  console.log("iv fv fvbfvbfvbfvb😤😤😤😤😤😤fvbfvb")
  try {
    const products = await Product.find();
    return Response.json(products, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}





export async function PUT(req) {
  await connectMongoDB();

  try {
    const { id, review } = await req.json(); 
    console.log("Received review:", review, id);

    const product = await Product.findById(id);
    if (!product) {
      return new Response(
        JSON.stringify({ error: "Product not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // const existingReview = product.reviews.find(
    //   (r) => r.username === review.username
    // );

    // if (existingReview) {
    //   return new Response(
    //     JSON.stringify({ error: "Review from this user already exists" }),
    //     { status: 409, headers: { "Content-Type": "application/json" } }
    //   );
    // }

    const uploadedImages = [];

    for (const imageFilePath of review.images || []) {
      const uploadImageResponse = await cloudinary.v2.uploader.upload(
        imageFilePath,
        {
          resource_type: "image",
          folder: "sokkai/reviews",
          public_id: `invoice_thumbnail_${Date.now()}`,
          access_mode: "public",
        }
      );
    
      const imageUrl = uploadImageResponse.secure_url;
      const publicId = uploadImageResponse.public_id;
      uploadedImages.push({ url: imageUrl, public_id: publicId });
      console.log("Image uploaded to Cloudinary:", imageUrl);
    }
    console.log("🤣🤣🤣🤣",uploadedImages)
    product.reviews.push({
      username: review.username,
      ratings: review.rating,
      feedback: review.feedback,
      images: uploadedImages, // Now an array of objects with url and public_id
    });
    
    product.numReviews = product.reviews.length;
    
    const updatedProduct = await product.save();
    console.log("Updated product:", updatedProduct);
    
    return new Response(
      JSON.stringify({
        message: "Review added successfully",
        product: updatedProduct,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error during product save:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}



export async function DELETE(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    console.log("id destructureing form the db : ", url, id);

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }
    await Promise.all(
      product.images.map(async (image) => {
        await deleteFromCloudinary(image.public_id);
      })
    );

    return Response.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
