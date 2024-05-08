import User from "@/models/User";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { name, cnic, email, password } = await req.json();

  try {
    if (!name || !cnic || !email || !password) {
      return new NextResponse("Fields Messing", { status: 400 });
    }
    await dbConn();
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const user = await User({
      name,
      cnic,
      email,
      password: secPass,
    });

    const res = await user.save();

    if (res) {
      return new NextResponse("User Created Successfully!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConn();

    const users = await User.find();

    if (users) {
      return new NextResponse(JSON.stringify(users), { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PUT(req) {
  const { _id, name, cnic, email, password } = await req.json();

  try {
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const res = await User.findByIdAndUpdate(_id, {
      name,
      cnic,
      email,
      password: secPass,
    });

    if (res) {
      return new NextResponse("User Updated!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function DELETE(request) {
  const { _id } = await request.json();

  try {
    const res = await User.deleteOne({ _id });

    if (res) {
      console.log(res);
      return new NextResponse("User Deleted!", { status: 200 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
