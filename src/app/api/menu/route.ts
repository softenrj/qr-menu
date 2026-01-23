import { verifyAuth } from "@/middleware/auth";
import { Menu } from "@/model/menu";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";

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

    const section = req.nextUrl.searchParams.get("section");

    if (!section) {
      return sendRJResponse({
        success: false,
        message: "Section is required",
        status: 400,
      });
    }

    const result = await Menu.deleteMany({
      merchantId,
      section,
    });

    return sendRJResponse({
      success: true,
      message: "Section deleted successfully",
      data: {
        deletedCount: result.deletedCount,
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error while deleting section:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
