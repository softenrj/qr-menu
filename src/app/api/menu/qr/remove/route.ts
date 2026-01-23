import { verifyAuth } from "@/middleware/auth";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { MQR } from "@/model/qrs";

export async function DELETE(req: NextRequest) {
  try {
    const merchantId = await verifyAuth(req);

    if (!merchantId) {
      return sendRJResponse({
        success: false,
        message: "Unauthorized",
        status: 401,
      });
    }

    const id = req.nextUrl.searchParams.get("id");

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return sendRJResponse({
        success: false,
        message: "Valid QR id is required",
        status: 400,
      });
    }

    const deletedQR = await MQR.findOneAndDelete({
      _id: id,
      merchantId,
    });

    if (!deletedQR) {
      return sendRJResponse({
        success: false,
        message: "QR not found",
        status: 404,
      });
    }

    return sendRJResponse({
      success: true,
      message: "QR deleted successfully",
      data: deletedQR,
      status: 200,
    });
  } catch (error) {
    console.error("Error while deleting QR:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
