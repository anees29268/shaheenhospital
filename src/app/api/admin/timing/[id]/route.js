import dbConn from "@/utils/dbConn";
import Timing from "@/models/Timing";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;
  try {
    await dbConn();
    const res = await Timing.findOne({
      doctorId: id,
    }).populate("doctorId");

    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
