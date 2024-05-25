import { NextResponse } from "next/server";
import Fee from "@/models/Fee";

import dbConn from "@/utils/dbConn";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await dbConn();

    const fees = await Fee.findById(id)
      .populate("patientId")
      .populate("paymentId");

    if (fees) {
      return new NextResponse(JSON.stringify(fees), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
