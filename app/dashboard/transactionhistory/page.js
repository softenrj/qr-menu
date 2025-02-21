"use client";
import React, { useState, useRef, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CSVLink } from "react-csv";
import Aside from "@/components/dashboard/aside";

const TransactionHistory = () => {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock transactions
  const transactions = [...Array(50)].map((_, i) => ({
    id: `#TX${2356 + i}`,
    amount: `$${(Math.random() * 100 + 20).toFixed(2)}`,
    method: ["Credit Card", "Mobile Pay", "Cash"][i % 3],
    status: i % 5 === 0 ? "Refunded" : "Completed",
    timestamp: new Date(Date.now() - i * 600000).toISOString(),
    items: [`Item ${i + 1}`, `Item ${i + 2}`],
  }));

  const parentRef = useRef();

  const rowVirtualizer = useVirtualizer({
    count: transactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 80, []),
  });

  return (
    <div className="xl:ml-[25%] md:ml-80 sm:ml-12 ml-4 flex-1 p-6">
      <Aside activeTab={"transactionhistory"} />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Transaction Monitor</h1>
          <p className="text-gray-500 mt-2">Track your payments in real-time</p>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search transactions..."
            className="px-4 py-2 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <CSVLink
            data={transactions}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6">
        {["all", "completed", "refunded"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg capitalize transition text-sm font-medium ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Virtualized Transactions */}
      <div
        ref={parentRef}
        className="bg-white rounded-lg shadow overflow-auto"
        style={{ height: "600px" }}
      >
        <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: "relative" }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const transaction = transactions[virtualRow.index];
            return (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
                className="border-b border-gray-100 p-6 hover:bg-gray-50 transition"
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-gray-800">{transaction.id}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-700">{transaction.amount}</p>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-500">
                  Method: <span className="text-gray-700 font-medium">{transaction.method}</span> • Items: {transaction.items.join(", ")}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Indicator */}
      <div className="mt-6 flex items-center gap-2 text-sm text-green-500">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        Receiving live transaction updates...
      </div>
    </div>
  );
};

export default TransactionHistory;
