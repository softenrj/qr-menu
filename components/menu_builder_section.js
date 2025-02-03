"use client";
import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabs = [
    { id: 1, label: "Stater", notification: 2 },
    { id: 2, label: "Drinks" },
    { id: 3, label: "Tea" },
    { id: 4, label: "Desi food" },
    { id: 5, label: "chines" }
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="relative flex gap-6 items-center bg-white shadow-lg p-2 rounded-full pl-3 pr-3">
        {tabs.map((tab, index) => (
          <div key={tab.id} className="relative flex-auto">
            <input
              type="radio"
              id={`tab-${tab.id}`}
              name="tabs"
              className="hidden"
              checked={activeTab === tab.id}
              onChange={() => setActiveTab(tab.id)}
            />
            <label
              htmlFor={`tab-${tab.id}`}
              className={`relative flex items-center justify-center h-10 w-full text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${
                activeTab === tab.id ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              {tab.label}
              {tab.notification && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">
                  {tab.notification}
                </span>
              )}
            </label>
          </div>
        ))}
       
      </div>
    </div>
  );
};

export default Tabs;
