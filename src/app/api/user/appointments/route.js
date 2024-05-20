import Appointment from "@/models/Appointment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";
import Timing from "@/models/Timing";
import mongoose from "mongoose";

export async function POST(req) {
  const { patient, doctor, appointmentDate, fee, token } = await req.json();
  try {
    await dbConn();

    // Convert appointmentDate to a Date object
    const appointmentDateTime = new Date(appointmentDate);
    const appointmentDay = appointmentDateTime.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Fetch the doctor's timing
    const doctorTimings = await Timing.findOne({ doctorId: doctor }).exec();
    if (!doctorTimings) {
      return new NextResponse("Doctor's timing not found", { status: 404 });
    }

    const { startTime, endTime, daysOfWeek } = doctorTimings;

    // Map day names to their corresponding numeric values
    const dayNameToNumberMap = {
      Sunday: "0",
      Monday: "1",
      Tuesday: "2",
      Wednesday: "3",
      Thursday: "4",
      Friday: "5",
      Saturday: "6",
    };

    // Convert daysOfWeek from names to numeric values
    const numericDaysOfWeek = daysOfWeek.map((day) => dayNameToNumberMap[day]);

    // Check if the appointment day is within the doctor's available days
    if (!numericDaysOfWeek.includes(appointmentDay.toString())) {
      return new NextResponse("Doctor is not available on this day", {
        status: 400,
      });
    }

    // Extract time parts for comparison
    const getTimeInMilliseconds = (date) => {
      return (
        date.getHours() * 60 * 60 * 1000 +
        date.getMinutes() * 60 * 1000 +
        date.getSeconds() * 1000 +
        date.getMilliseconds()
      );
    };

    const appointmentTimeInMilliseconds =
      getTimeInMilliseconds(appointmentDateTime);
    const startTimeInMilliseconds = getTimeInMilliseconds(new Date(startTime));
    const endTimeInMilliseconds = getTimeInMilliseconds(new Date(endTime));

    // Check if the appointment time is within the start and end time
    if (
      appointmentTimeInMilliseconds < startTimeInMilliseconds ||
      appointmentTimeInMilliseconds > endTimeInMilliseconds
    ) {
      return new NextResponse(
        "Appointment time is outside the doctor's available hours",
        { status: 400 }
      );
    }

    // If all validations pass, create the appointment
    const res = await Appointment({
      patient,
      doctor,
      appointmentDate: appointmentDateTime,
      fee,
      token,
    });

    await res.save();
    return new NextResponse("Appointment Done", { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
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
