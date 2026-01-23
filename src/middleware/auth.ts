import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/utils/jwt";
import { userpayload } from "@/types/users";
import mongoose from "mongoose";
import mongoServer from "@/config/mongoConfig";


export const verifyAuth = async (req: NextRequest) => {
  await mongoServer()
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const merchantId = verifyToken(token) as mongoose.Types.ObjectId;

    return merchantId;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 401 }
    );
  }
};
