import { verifyAuth } from "@/middleware/auth";
import { Menu } from "@/model/menu";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const merchantId = req.nextUrl.searchParams.get("merchantId");

    if (!merchantId) {
      return sendRJResponse({
        success: false,
        message: "Unauthorized",
        status: 401,
      });
    }

    const menu = await Menu.find({ merchantId })
      .sort({ createdAt: -1 })
      .lean();

    return sendRJResponse({
      success: true,
      message: "Menu fetched successfully",
      data: menu,
      status: 200,
    });
  } catch (error) {
    console.error("Error while fetching menu:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
