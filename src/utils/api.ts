import { NextResponse } from "next/server";


export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data: T;
}

type RJResponse<T = null> = {
  success: boolean
  message: string
  data?: T
}

export function sendRJResponse<T>({
  success,
  message,
  status = 200,
  data,
}: {
  success: boolean
  message: string
  status?: number
  data?: T
}) {
  return NextResponse.json<RJResponse<T>>(
    {
      success,
      message,
      data,
    },
    { status }
  )
}