import { NextResponse } from "next/server";

import Doctor from "@/models/Doctor";
import dbConn from "@/utils/dbConn";

export async function GET() {
  try {
    await dbConn();

    const doctors = await Doctor.find();

    if (doctors) {
      return new NextResponse(JSON.stringify(doctors), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
