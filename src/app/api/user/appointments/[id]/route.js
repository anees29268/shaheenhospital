import Appointment from "@/models/Appointment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = await params;


  try {
    await dbConn();

    const res = await Appointment.find({
        patient:id
    })
      .populate("patient")
      .populate("doctor");


    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
