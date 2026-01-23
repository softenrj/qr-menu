import mongoServer from "@/config/mongoConfig";
import { signIn } from "@/service/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await mongoServer()
    const { email, password } = await req.json();

    const result = await signIn(email, password);
    if (!result) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const res = NextResponse.json(
      {
        success: true,
        message: "Login successful",
        data: result.merchant,
      },
      { status: 200 }
    );

    res.cookies.set("token", result.token, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    console.error("Signin route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
