import User from "@/models/User";
import dbConn from "@/utils/dbConn";
import { getServerSession } from "next-auth";

import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession();
  const { email } = await req.json();

  if (!session) {
    return new NextResponse("Please logged in to get this details", {
      status: 401,
    });
  }
  try {
    await dbConn();
    const user = await User.findOne({ email });

    return new NextResponse(JSON.stringify(user), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(error, {
      status: 500,
    });
  }
}
