"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Aside = ({ activeTab }) => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex xl:w-[25%] h-screen bg-gray-900 p-6 fixed left-0 top-0 flex-col gap-8 
        rounded-r-3xl shadow-[0_3px_10px_rgba(0,0,0,0.2)] border-r border-gray-700">
        {/* Logo Section */}
        <div className="flex gap-3 items-center p-4 bg-gray-800 rounded-2xl shadow-sm">
          <img 
            src="/shared/TNE-logo.png" 
            className="w-12 h-12 rounded-lg object-cover"
            alt="QMenu Logo"
          />
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Qmenu
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {[
            { name: "Dashboard", href: "dashboard", key: "dashboard" , icon: "🏠" },
            { name: "Live Orders", href: "dashboard/liveorder", key: "liveorder", icon: "📦" },
            { name: "Sales Analytics", href: "dashboard/salesrevenue", key: "salesrevenue", icon: "💰" },
            { name: "Transactions", href: "dashboard/transactionhistory", key: "transactionhistory", icon: "📊" },
            { name: "Menu Builder", href: "menuBuilder", key: "menuBuilder", icon: "🍽️" },
          ].map(({ name, href, key, icon }) => (
            <Link
              key={key}
              href={`/${href}`}
              className={`flex items-center p-4 rounded-xl transition-all duration-200 group
                ${
                  activeTab === key 
                    ? "bg-blue-500/20 border-l-4 border-blue-400 text-white" 
                    : "text-gray-300 hover:bg-gray-800/50 hover:pl-6"
                }`}
              onClick={handleLinkClick}
            >
              <span className="text-xl mr-3">{icon}</span>
              <span className="text-sm font-medium">{name}</span>
              <div className={`ml-auto w-2 h-2 rounded-full ${
                activeTab === key ? "bg-blue-400" : "bg-transparent"
              }`} />
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Navigation */}
      <nav className="sm:hidden fixed top-0 left-0 w-full bg-gray-900 border-b border-gray-800 flex items-center justify-between p-4 z-50">
        <div className="flex items-center gap-3">
          <img 
            src="/shared/TNE-logo.png" 
            className="w-10 h-10 rounded-lg"
            alt="QMenu Logo"
          />
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Qmenu
          </p>
        </div>
        <button
          className="text-2xl text-gray-300 hover:text-white transition-colors"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-16 left-0 w-full bg-gray-900/95 backdrop-blur-sm flex flex-col p-4 border-b border-gray-800 z-40">
          {[
           { name: "Dashboard", href: "dashboard", key: "dashboard" , icon: "🏠" },
           { name: "Live Orders", href: "dashboard/liveorder", key: "liveorder", icon: "📦" },
           { name: "Sales Analytics", href: "dashboard/salesrevenue", key: "salesrevenue", icon: "💰" },
           { name: "Transactions", href: "dashboard/transactionhistory", key: "transactionhistory", icon: "📊" },
           { name: "Menu Builder", href: "menuBuilder", key: "menuBuilder", icon: "🍽️" },
          ].map(({ name, href, key, icon }) => (
            <Link
              key={key}
              href={`/${href}`}
              className={`flex items-center p-3 rounded-lg transition-colors
                ${
                  activeTab === key 
                    ? "bg-blue-500/20 text-white" 
                    : "text-gray-300 hover:bg-gray-800"
                }`}
              onClick={handleLinkClick}
            >
              <span className="text-lg mr-3">{icon}</span>
              <span className="text-sm font-medium">{name}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Aside;
