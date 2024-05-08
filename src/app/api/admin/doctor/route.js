import { NextResponse } from "next/server";

import Doctor from "@/models/Doctor";
import dbConn from "@/utils/dbConn";

export async function POST(req) {
  const {
    name,
    cnic,
    email,
    specialization,
    contact,
    desc,
    address,
    hiringDate,
  } = await req.json();

  try {
    if (
      (!name || !cnic || !email, !specialization || !contact || !hiringDate)
    ) {
      return new NextResponse("Fields Message", { status: 400 });
    }
    await dbConn();
    const doctor = await Doctor({
      name,
      cnic,
      email,
      specialization,
      contact,
      desc,
      address,
      hiringDate,
    });

    const res = await doctor.save();

    if (res) {
      return new NextResponse("Doctor Created Successfully!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
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
export async function PUT(req) {
  const { _id, name, cnic, contact, specialization, desc, address } =
    await req.json();

  try {
    const res = await Doctor.findByIdAndUpdate(_id, {
      name,
      cnic,
      contact,
      specialization,
      desc,
      address,
    });

    if (res) {
      return new NextResponse("Doctor Updated!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function DELETE(request) {
  const { _id } = await request.json();

  try {
    const res = await Doctor.deleteOne({ _id });

    if (res) {
      console.log(res);
      return new NextResponse("Doctor Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
