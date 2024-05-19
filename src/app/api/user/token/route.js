import Patient from "@/models/Patient";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { caseType } = await req.json();

  try {
    if (!caseType) {
      return new NextResponse("Fields Missing", { status: 400 });
    }
    await dbConn();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const patients = await Patient.find({
      case: caseType,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    if (patients) {
      return new NextResponse(patients.length, { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
