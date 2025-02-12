import { NextResponse } from "next/server";
import os from "os";

export async function GET() {
  const networkInterfaces = os.networkInterfaces();
  let localIP = "localhost";

  for (const key in networkInterfaces) {
    for (const net of networkInterfaces[key]) {
      if (net.family === "IPv4" && !net.internal) {
        localIP = net.address;
        break;
      }
    }
  }

  return NextResponse.json({ ip: `http://${localIP}:3000` });
}
