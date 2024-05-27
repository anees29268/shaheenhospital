import Patient from "@/models/Patient";
import Fee from "@/models/Fee";
import Payment from "@/models/Payment";
import PaymentCategory from "@/models/PaymentCategory";
import Appointment from "@/models/Appointment";
import dbConn from "@/utils/dbConn";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConn();

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Patients (OPD)
    const opdResult = await Patient.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: null,
          totalFees: { $sum: "$fee" },
        },
      },
    ]);

    // Appointments
    const aptResults = await Appointment.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $group: {
          _id: null,
          totalFees: { $sum: "$fee" },
        },
      },
    ]);

    // Payments & Fees
    const testsResult = await Fee.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfToday, $lte: endOfToday },
        },
      },
      {
        $lookup: {
          from: "payments",
          localField: "paymentId",
          foreignField: "_id",
          as: "payment",
        },
      },
      { $unwind: "$payment" },
      {
        $lookup: {
          from: "paymentcategories",
          localField: "payment.paymentCat",
          foreignField: "_id",
          as: "paymentCategory",
        },
      },
      { $unwind: "$paymentCategory" },
      {
        $addFields: {
          netAmount: {
            $subtract: ["$amount", { $ifNull: ["$discount", 0] }],
          },
        },
      },
      {
        $group: {
          _id: "$paymentCategory.title",
          totalAmount: { $sum: "$netAmount" },
        },
      },
      {
        $project: {
          _id: 0,
          title: "$_id",
          totalAmount: 1,
        },
      },
    ]);

    const opdFee = opdResult[0]?.totalFees || 0;
    const aptFee = aptResults[0]?.totalFees || 0;

    return new NextResponse(
      JSON.stringify({
        opdFee,
        aptFee,
        testsResult,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(error.message, { status: 500 });
  }
}
