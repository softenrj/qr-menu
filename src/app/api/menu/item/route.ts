import { verifyAuth } from "@/middleware/auth";
import { Menu } from "@/model/menu";
import { sendRJResponse } from "@/utils/api";
import { NextRequest } from "next/server";
import mongoose from "mongoose";

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
        message: "Valid menu id is required",
        status: 400,
      });
    }

    const deletedMenu = await Menu.findOneAndDelete({
      _id: id,
      merchantId,
    });

    if (!deletedMenu) {
      return sendRJResponse({
        success: false,
        message: "Menu item not found",
        status: 404,
      });
    }

    return sendRJResponse({
      success: true,
      message: "Menu item deleted successfully",
      data: deletedMenu,
      status: 200,
    });
  } catch (error) {
    console.error("Error deleting menu item:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
