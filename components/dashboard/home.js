"use client";
import React from "react";
import { useSession } from "next-auth/react";
import TypeWriter from "../TypeWriter";
import Image from "next/image";
import AccountDropdown from "../AccountDropdown";

const Home = () => {
    const { data: session, status } = useSession();

    // Sample data - replace with real data from your API
    const stats = [
        { title: "Total Orders", value: "2,543", icon: "📦", trend: "+12% from last month", color: "bg-blue-100" },
        { title: "Revenue", value: "$12,450", icon: "💰", trend: "+18% from last week", color: "bg-green-100" },
        { title: "Active Users", value: "1,230", icon: "👥", trend: "+5% daily growth", color: "bg-purple-100" },
        { title: "Most Ordered", value: "Cheese Pizza", icon: "🍕", trend: "Ordered 324 times", color: "bg-orange-100" },
    ];

    return (
        <div className="xl:ml-[25%] md:mt-0 sm:mt-20 md:ml-80 sm:ml-12 ml-4 flex-1 p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Hello,{" "}
                        <span className="text-gray-600">
                            {session?.user?.name || "Guest"} 👋
                        </span>
                    </h1>
                    <p className="text-gray-500 mt-2">
                        <TypeWriter content={["Here's your restaurant performance dashboard"]} />
                    </p>
                </div>
                <AccountDropdown />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-bold mt-2">{stat.value}</p>
                            </div>
                            <div className={`${stat.color} p-3 rounded-lg text-2xl`}>
                                {stat.icon}
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className="text-green-500 text-sm">{stat.trend}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Live Orders Card */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Live Order Tracking</h2>
                    <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src="/dashboard/orders-chart.png"
                            alt="Order Chart"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow">
                            <p className="text-sm">Current Active Orders: 42</p>
                        </div>
                    </div>
                </div>

                {/* Popular Items */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
                    <div className="space-y-4">
                        {['Cheese Pizza', 'Pasta Carbonara', 'Caesar Salad', 'Tiramisu'].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <span>{item}</span>
                                <span className="text-blue-600 font-medium">1,234 orders</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
                    <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                            src="/dashboard/revenue-chart.png"
                            alt="Revenue Chart"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;