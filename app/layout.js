import { Geist, Geist_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sessionwrap from '@/components/Sessionwrap'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["500"],
})

export const metadata = {
  title: "My QR Menu",
  description: "Easily generate and manage your digital QR-based menu -Raj",
};


export default function RootLayout({ children,session }) {
  return (
    <html lang="en">
      <body
        className={`${playfair} ${geistSans.variable} ${geistMono.variable} ${dmSans.variable} antialiased [&::-webkit-scrollbar]:hidden`}
      >
        <Sessionwrap>
        {children}
        </Sessionwrap>
      </body>
    </html>
  );
}
