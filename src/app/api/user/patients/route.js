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
    token,
  } = await req.json();

  try {
    if (
      !date ||
      !token ||
      !name ||
      !fatherName ||
      !gender ||
      !age ||
      !caseType ||
      !fee
    ) {
      return new NextResponse("Fields Missing", { status: 400 });
    }
    await dbConn();
    let patient;
    if (caseType === "emergency") {
      patient = await Patient({
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
        tokenNo: token,
        addedBy: "Test",
      });
    } else {
      patient = await Patient({
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
        tokenNo: 0,
        addedBy: "Test",
      });
    }

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

    const patients = await Patient.find();

    if (patients) {
      return new NextResponse(JSON.stringify(patients), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PUT(req) {
  const { _id, name, fatherName, fee, cnic, contact, caseType, address } =
    await req.json();

  try {
    const res = await Patient.findByIdAndUpdate(
      _id,
      {
        name,
        fatherName,
        cnic,
        contact,
        case: caseType,
        address,
        fee,
      },
      {
        new: true,
      }
    );

    if (res) {
      return new NextResponse("Patient Updated!", { status: 200 });
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
