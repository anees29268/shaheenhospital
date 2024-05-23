import Payment from "@/models/Payment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, amount, paymentCat } = await req.json();

  try {
    if (!title || !amount || !paymentCat) {
      return new NextResponse("Fields Messing", { status: 400 });
    }
    await dbConn();

    const payment = await Payment({
      title,
      amount,
      paymentCat,
    });

    const res = await payment.save();

    if (res) {
      return new NextResponse("Payment Added Successfully!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConn();

    const res = await Payment.find().populate("paymentCat");

    if (res) {
      return new NextResponse(JSON.stringify(res), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PUT(req) {
  const { _id, title, amount, paymentCat } = await req.json();
  try {
    await dbConn();

    const res = await Payment.findByIdAndUpdate(
      _id,
      {
        title,
        amount,
        paymentCat,
      },
      { new: true }
    );

    if (res) {
      return new NextResponse("Payment Updated!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function DELETE(req) {
  const { _id } = await req.json();
  try {
    const res = await Payment.deleteOne({ _id });

    if (res) {
      return new NextResponse("Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
