import Patient from "@/models/Patient";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const {
    date,
    cnic,
    name,
    fatherName,
    gender,
    nationality,
    bloodGroup,
    age,
    caseType,
    fee,
    contact,
    address,
  } = await req.json();
  console.log(
    date,
    cnic,
    name,
    fatherName,
    gender,
    nationality,
    bloodGroup,
    age,
    caseType,
    fee,
    contact,
    address
  );
  try {
    if (!date || !name || !fatherName || !gender || !age || !caseType || !fee) {
      return new NextResponse("Fields Missing", { status: 400 });
    }
    await dbConn();
    const patient = await Patient({
      date,
      cnic,
      name,
      fatherName,
      gender,
      nationality,
      bloodGroup,
      age,
      case: caseType,
      fee,
      contact,
      address,

      addedBy: "Test",
    });

    const res = await patient.save();

    if (res) {
      return new NextResponse("Patient Added Successfully!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConn();

    const patients = await Patient.find({
      case: "general",
    });

    if (patients) {
      return new NextResponse(JSON.stringify(patients), { status: 200 });
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
      return new NextResponse("Doctor Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
