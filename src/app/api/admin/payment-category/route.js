import PaymentCategory from "@/models/PaymentCategory";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, desc } = await req.json();
  try {
    await dbConn();

    const cat = await PaymentCategory.create({
      title,
      desc,
    });
    if (cat) {
      return new NextResponse("Payment Category Added!", { status: 201 });
    }
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function GET() {
  try {
    await dbConn();

    const cat = await PaymentCategory.find();

    return new NextResponse(JSON.stringify(cat), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
export async function PUT(req) {
  const { _id, title, desc } = await req.json();
  try {
    await dbConn();

    await PaymentCategory.findByIdAndUpdate(_id, {
      title,
      desc,
    });

    return new NextResponse("Category Updated!", { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
}
