import Coupun from "../../Model/Coupun";
import connectMongoDB from "../../Connection";

export async function POST(request) {
  await connectMongoDB();

  try {
    const body = await request.json();
    const { coupun } = body;

    if (!coupun) {
      return new Response(
        JSON.stringify({ error: "Coupon code is required" }),
        { status: 400 }
      );
    }

    const foundCoupun = await Coupun.findOne({ coupun });

    if (!foundCoupun) {
      return new Response(
        JSON.stringify({ valid: false, error: "Coupon not found" }),
        { status: 404 }
      );
    }
    if (foundCoupun.status === "completed") {
        return new Response(
          JSON.stringify({ valid: false, error: "Coupon is already completed" }),
          { status: 400 }
        );
      }
  
    return new Response(
      JSON.stringify({ valid: true, coupon: foundCoupun, couponId: foundCoupun._id }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function PUT(request) {
    await connectMongoDB();
  
    try {
      const body = await request.json();
      const { couponId, userId } = body; 
      console.log(body)
    
  
      if (!couponId || !userId) {
        return new Response(
          JSON.stringify({ error: "Coupon ID and User ID are required" }),
          { status: 400 }
        );
      }
  
      const foundCoupon = await Coupun.findById(couponId);
  
      if (!foundCoupon) {
        return new Response(
          JSON.stringify({ error: "Coupon not found" }),
          { status: 404 }
        );
      }
  
      if (foundCoupon.status === 'completed') {
        return new Response(
          JSON.stringify({ error: "Coupon has already been used or completed" }),
          { status: 400 }
        );
      }

      foundCoupon.status = 'completed';
      foundCoupon.usedBy = userId;
      foundCoupon.updatedAt = Date.now(); 
  
      await foundCoupon.save();
  
      return new Response(
        JSON.stringify({ message: "Coupon marked as completed", coupon: foundCoupon }),
        { status: 200 }
      );
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500 }
      );
    }
  }
  