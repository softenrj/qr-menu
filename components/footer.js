import React from "react";
import Link from "next/link";
import { Twitter, Facebook, Instagram, GitHub } from "@mui/icons-material";

function Footer() {
  return (
    <footer className="relative pt-12 pb-8 bg-[#f4f5f7]">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Section */}
          <div className="w-full lg:w-6/12 mb-6 lg:mb-0">
            <h4 className="text-4xl font-bold text-gray-800">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg text-gray-600 mt-2">
              Follow us on social media. We typically respond within 1-2 business days.
            </h5>
          </div>

          {/* Right Section - Social Icons */}
          <div className="flex space-x-4">
            {[
              { href: "#", icon: <Twitter fontSize="small" />, color: "text-blue-400" },
              { href: "#", icon: <Facebook fontSize="small" />, color: "text-blue-600" },
              { href: "#", icon: <Instagram fontSize="small" />, color: "text-pink-400" },
              { href: "https://github.com/softenrj", icon: <GitHub fontSize="small" />, color: "text-black" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className={`bg-white shadow-lg h-12 w-12 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-xl ${item.color}`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center text-gray-700 text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
