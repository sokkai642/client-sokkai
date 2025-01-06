import connectMongoDB from "../Connection";
import mongoose from 'mongoose'
export async function GET(request) {
  try {
    await connectMongoDB();

    const categories = await mongoose.connection.db
      .collection('categories')
      .find({})
      .toArray();
console.log(categories)
    return new Response(JSON.stringify(categories), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
