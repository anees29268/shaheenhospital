import Patient from "@/models/Patient";
import dbConn from "@/utils/dbConn";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  const { id, caseType, doctor } = await req.json();

  try {
    await dbConn();

    let pat;

    if (caseType === "emergency") {
      pat = await Patient.findById(id);
    } else {
      if (doctor && id) {
        console.log("Doctor && ID");
        pat = await Appointment.find({
          patient: id,
          doctor,
        })
          .populate("patient")
          .populate("doctor");
      } else if (!id) {
        console.log("Not ID");
        console.log(doctor);
        pat = await Appointment.find({
          doctor,
        })
          .populate("patient")
          .populate("doctor");
      } else {
        console.log("ID");
        pat = await Appointment.find({
          patient: id,
        })
          .populate("patient")
          .populate("doctor");
      }
    }

    return new NextResponse(JSON.stringify(pat), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
}
