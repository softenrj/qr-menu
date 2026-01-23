import mongoServer from "@/config/mongoConfig";
import { IROLE, Merchants } from "@/model/merchants";
import { newUser } from "@/service/auth";
import { sendRJResponse } from "@/utils/api";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoServer();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return sendRJResponse({
        success: false,
        message: "All Fields Are Required",
        status: 401,
      })
    }

    const isExists = await Merchants.findOne({ email });
    if (isExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    const result = await newUser(name, email, password, role);
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Signup failed",
        },
        { status: 500 }
      );
    }

    const res = NextResponse.json(
      {
        success: true,
        message: "Merchant created successfully",
        data: result.merchant,
      },
      { status: 201 }
    );

    res.cookies.set("token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Signup route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
