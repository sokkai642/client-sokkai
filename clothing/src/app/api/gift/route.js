import mongoose from 'mongoose';

const GiftSchema = new mongoose.Schema({}, { collection: 'gifts' });
const Gift = mongoose.models.Gift || mongoose.model('Gift', GiftSchema);

export async function GET(request) {
  try {
    await connectMongoDB();

    // Use Mongoose model to fetch data
    const gifts = await Gift.find({});
    console.log(gifts);

    return new Response(JSON.stringify(gifts), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching gifts:', error);

    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
