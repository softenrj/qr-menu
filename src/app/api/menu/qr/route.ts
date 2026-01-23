import { verifyAuth } from "@/middleware/auth";
import { MQR } from "@/model/qrs";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const merchantId = await verifyAuth(req);

    if (!merchantId) {
      return sendRJResponse({
        success: false,
        message: "Unauthorized",
        status: 401,
      });
    }

    const qrs = await MQR.find({ merchantId })
      .sort({ createdAt: -1 }) 
      .lean();

    return sendRJResponse({
      success: true,
      message: "QRs fetched successfully",
      data: qrs,
      status: 200,
    });
  } catch (error) {
    console.error("Error while fetching QRs:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
