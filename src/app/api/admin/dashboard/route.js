import Doctor from "@/models/Doctor";
import Patient from "@/models/Patient";
import User from "@/models/User";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConn();

    const doctors = await Doctor.find({
      status: "active",
    });
    const users = await User.find();
    const patients = await Patient.find();
    const ePatients = await Patient.find({
      case: "emergency",
    });
    const gPatients = await Patient.find({
      case: "general",
    });

    const totalDoctor = doctors.length;
    const totalUsers = users.length;
    const totalPatients = patients.length;
    const generalPatients = gPatients.length;
    const emergencyPatients = ePatients.length;
    const data = {
      totalDoctor,
      totalUsers,
      totalPatients,
      emergencyPatients,
      generalPatients,
    };

    return new NextResponse(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
