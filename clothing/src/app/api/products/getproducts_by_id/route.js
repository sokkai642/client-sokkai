import Product from "../../Model/Product";
import { NextResponse } from "next/server"; // Import NextResponse
import connectMongoDB from "../../Connection";
await connectMongoDB();
export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
console.log(id)
  try {
    const product = await Product.findById(id);
console.log(product)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

 

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
