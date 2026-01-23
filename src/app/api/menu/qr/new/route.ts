import { verifyAuth } from "@/middleware/auth";
import { MQR } from "@/model/qrs";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const merchantId = await verifyAuth(req);

    if (!merchantId) {
      return sendRJResponse({
        success: false,
        message: "Unauthorized",
        status: 401,
      });
    }

    const { name } = await req.json();

    if (!name || !name.trim()) {
      return sendRJResponse({
        success: false,
        message: "QR name is required",
        status: 400,
      });
    }

    const qr = await MQR.create({
      merchantId,
      name: name.trim(),
    });

    return sendRJResponse({
      success: true,
      message: "QR created successfully",
      data: qr,
      status: 201,
    });
  } catch (error) {
    console.error("Error while creating QR:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
