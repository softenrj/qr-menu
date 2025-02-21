"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Aside from "@/components/dashboard/aside";

const SalesRevenue = () => {
  // Mock data
  const financialData = {
    totalRevenue: "$15,230",
    averageOrder: "$42.50",
    todaySales: "$2,450",
    conversionRate: "18.7%"
  };

  const chartData = [
    { day: 'Mon', sales: 3450 },
    { day: 'Tue', sales: 4210 },
    { day: 'Wed', sales: 3780 },
    { day: 'Thu', sales: 5290 },
    { day: 'Fri', sales: 6310 },
    { day: 'Sat', sales: 7840 },
    { day: 'Sun', sales: 6520 },
  ];

  const paymentMethods = [
    { method: 'Credit Card', percentage: 62, color: '#3B82F6' },
    { method: 'Mobile Pay', percentage: 28, color: '#10B981' },
    { method: 'Cash', percentage: 10, color: '#6366F1' },
  ];

  return (
    <div className="xl:ml-[25%] md:ml-80 sm:ml-12 ml-4 flex-1 p-6">
        <Aside activeTab={'salesrevenue'} />
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Sales Analytics</h1>
          <p className="text-gray-500 mt-2">Real-time financial performance dashboard</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button className="px-4 py-2 bg-white border rounded-lg">Day</button>
          <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg">Week</button>
          <button className="px-4 py-2 bg-white border rounded-lg">Month</button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Object.entries(financialData).map(([key, value]) => (
          <div key={key} className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
            <p className="text-2xl font-semibold mt-2">{value}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Weekly Sales Performance</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar 
                  dataKey="sales" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span>{method.method}</span>
                  <span>{method.percentage}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${method.percentage}%`,
                      backgroundColor: method.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Sales Feed */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Live Sales Feed</h2>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Order #100{index}</p>
                  <p className="text-sm text-gray-500">Table 0{index+1}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">${(Math.random()*50 + 20).toFixed(2)}</p>
                  <p className="text-sm text-green-500">Completed</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesRevenue;