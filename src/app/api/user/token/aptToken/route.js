import Appointment from "@/models/Appointment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { doctorId, appointmentDate } = await req.json();

  try {
    if (!appointmentDate) {
      return new NextResponse("Fields Missing", { status: 400 });
    }
    await dbConn();
    const startDate = new Date(appointmentDate);
    startDate.setHours(0, 0, 0, 0); // Set to the start of the day
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 1);

    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    if (appointments) {
      return new NextResponse(appointments.length, { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
