"use client"
import React from "react";
import { LinkedIn, Facebook, Instagram, GitHub } from "@mui/icons-material";

function Footer() {
  const [date,setdate] = React.useState("");
  React.useEffect(() => {
    setdate(new Date().getFullYear())
  },[])
  return (
    <footer className="relative pt-2 pb-4 bg-[#ffffff]">
      <div className="container mx-auto px-8 pt-2">
        <div className="flex flex-wrap justify-between items-center">

          <div className="w-full lg:w-6/12 mb-6 lg:mb-0">
            <h4 className="text-2xl font-bold text-gray-800">
              Let's keep in touch!
            </h4>
            <h5 className="text-sm text-gray-600 mt-2">
              Follow us on social media. We typically respond within 1-2 business days.
            </h5>
          </div>

          <div className="flex space-x-4">
            {[
              { href: "https://www.linkedin.com/in/raj-sharma-23447527b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app ", icon: <LinkedIn fontSize="small" />, color: "text-blue-600" },
              { href: "https://www.facebook.com/profile.php?id=100093479301790&mibextid=ZbWKwL", icon: <Facebook fontSize="small" />, color: "text-blue-600" },
              { href: "https://www.instagram.com/raj_s.e?igsh=YjZqZmVsd3kwNWsx", icon: <Instagram fontSize="small" />, color: "text-pink-400" },
              { href: "https://github.com/softenrj", icon: <GitHub fontSize="small" />, color: "text-black" },
            ].map((item, index) => (
              <a
                target="_blank"
                key={index}
                href={item.href}
                className={`bg-white shadow-lg h-8 w-8 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${item.color}`}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>


        <div className="mt-8 text-center text-gray-700 text-sm">
          © {date} Soften. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
