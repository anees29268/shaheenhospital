import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";
import Timing from "@/models/Timing";

export async function POST(req) {
  const { doctorId, startTime, endTime, daysOfWeek, roomNo } = await req.json();
  try {
    await dbConn();
    const res = await Timing.create({
      doctorId,
      startTime,
      endTime,
      daysOfWeek,
      roomNo,
    });

    if (res) {
      return new NextResponse("Timing Added!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function GET(req) {
  try {
    await dbConn();
    const res = await Timing.find().populate("doctorId");

    if (res) {
      return new NextResponse(JSON.stringify(res), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PUT(req) {
  const { _id, doctor, startTime, endTime, selectedDays, roomNo } =
    await req.json();

  try {
    const doctorAppointment = await Timing.findByIdAndUpdate(
      _id,
      {
        doctorId: doctor,
        startTime,
        endTime,
        daysOfWeek: selectedDays,
        roomNo,
      },
      { new: true }
    );

    if (doctorAppointment) {
      return new NextResponse("Timing Updated!", {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function DELETE(req) {
  const { _id } = await req.json();
  try {
    const res = await Timing.deleteOne({ _id });

    if (res) {
      return new NextResponse("Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
