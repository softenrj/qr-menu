import { NextRequest, NextResponse } from "next/server"
import { Merchants } from "@/model/merchants"
import mongoServer from "@/config/mongoConfig"
import { verifyToken } from "@/utils/jwt"

export async function GET(req: NextRequest) {
  try {
    await mongoServer()

    const token = req.cookies.get("token")?.value
    if (!token) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const merchantId = verifyToken(token);

    if (!merchantId) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    const merchant = await Merchants.findById(merchantId).select("-password")

    if (!merchant) {
      return NextResponse.json({ success: false }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      data: merchant,
    })
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}
