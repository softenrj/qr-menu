import { verifyAuth } from "@/middleware/auth";
import { Menu } from "@/model/menu";
import { uploadToCloudinary } from "@/service/cloudnary";
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

    const formData = await req.formData();

    const file = formData.get("image") as File | null;
    const title = String(formData.get("title") || "").trim();
    const section = String(formData.get("section") || "").trim();

    const priceRaw = formData.get("price");
    const originalPriceRaw = formData.get("originalPrice");
    const quantity = Number(formData.get("quantity"));

    const price = Number(priceRaw);
    const originalPrice =
      originalPriceRaw !== null && originalPriceRaw !== ""
        ? Number(originalPriceRaw)
        : undefined;

    if (!file || !title || !section || isNaN(price)) {
      return sendRJResponse({
        success: false,
        status: 400,
        message: "Invalid input data",
      });
    }

    if (!file.type.startsWith("image/")) {
      return sendRJResponse({
        success: false,
        status: 400,
        message: "Only image files allowed",
      });
    }

    if (file.size > 12 * 1024 * 1024) {
      return sendRJResponse({
        success: false,
        status: 400,
        message: "File is too large",
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await uploadToCloudinary(
      buffer,
      `qr-menu/${merchantId}`
    );

    const menu = await Menu.create({
      merchantId,
      image: imageUrl,
      title,
      price,
      originalPrice,
      section,
      quantity
    });

    return sendRJResponse({
      success: true,
      message: "Menu uploaded successfully",
      data: menu,
      status: 201,
    });
  } catch (error) {
    console.error("Error while menu upload:", error);

    return sendRJResponse({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}