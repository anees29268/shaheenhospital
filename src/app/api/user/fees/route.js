import { NextResponse } from "next/server";
import Fee from "@/models/Fee";

import dbConn from "@/utils/dbConn";
import { getServerSession } from "next-auth";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConn();

    const fees = await Fee.find().populate("patientId").populate("paymentId");

    if (fees) {
      return new NextResponse(JSON.stringify(fees), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}

export async function POST(req) {
  const { patientId, paymentId, desc, amount, discount } = await req.json();

  if (!patientId || !paymentId || !amount) {
    return new NextResponse("Fields Missing!", { status: 400 });
  }
  try {
    await dbConn();

    const fees = await Fee({
      patientId,
      paymentId,
      amount,
      discount,
      desc,
    });
    const res = await fees.save();

    if (res) {
      return new NextResponse("Fee Added", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function DELETE(request) {
  const { _id } = await request.json();
  const session = await getServerSession();

  try {
    const email = session.user.email;
    const user = await User.findOne({ email });

    if (user.role !== "admin") {
      return new NextResponse("Not allowed for USERS!", {
        status: 401,
      });
    }

    const res = await Fee.deleteOne({ _id });

    if (res) {
      return new NextResponse("Fee Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
