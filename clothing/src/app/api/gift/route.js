import connectMongoDB from "../Connection";
import mongoose from 'mongoose'
export async function GET(request) {
  try {
    await connectMongoDB();

    const gift = await mongoose.connection.db
      .collection('gifts')
      .find({})
      .toArray();
console.log(gift)
    return new Response(JSON.stringify(gift), {
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
