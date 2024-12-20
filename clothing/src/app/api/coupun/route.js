import Coupun from "../Model/Coupun";
import connectMongoDB from "../Connection";
// import { Response } from "next/server";
export async function GET(request) {
  await connectMongoDB();
  try {
    const coupunList = await Coupun.find();
    return Response.json(coupunList, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  console.log("function called");
  await connectMongoDB();

  try {
    const body = await request.json();
    console.log(body);
    const { coupun, pricing } = body;

    const newCoupun = await Coupun.create({
      coupun,
      createdAt: new Date(),
      pricing,
    });

    return Response.json(newCoupun, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const body = await request.json();
    const { pricing } = body;

    const updatedCoupun = await Coupun.findByIdAndUpdate(
      id,
      { pricing, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedCoupun) {
      return Response.json({ error: "Coupun not found" }, { status: 404 });
    }

    return Response.json(updatedCoupun, { status: 200 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  await connectMongoDB();

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    const deletedCoupun = await Coupun.findByIdAndDelete(id);

    if (!deletedCoupun) {
      return Response.json({ error: "Coupun not found" }, { status: 404 });
    }

    return Response.json(
      { message: "Coupun deleted successfully", deletedCoupun },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
