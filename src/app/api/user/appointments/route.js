import Appointment from "@/models/Appointment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { patient, doctor, appointmentDate, fee } = await req.json();
  try {
    await dbConn();

    const res = await Appointment({
      patient,
      doctor,
      appointmentDate,
      fee,
    });
    await res.save();
    return new NextResponse("Appointment Done", { status: 201 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
export async function GET(req) {
  try {
    await dbConn();

    const res = await Appointment.find().populate("patient").populate("doctor");

    if (res) {
      return new NextResponse(JSON.stringify(res), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
