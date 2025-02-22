"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import dynamic from "next/dynamic";
import Aside from "@/components/dashboard/aside";
import axios from "axios";

const CSVLink = dynamic(
  () => import("react-csv").then((mod) => mod.CSVLink),
  { ssr: false }
);

const TransactionHistory = () => {
  const [csvData, setCsvData] = useState([]);
  const [filter, setFilter] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const parentRef = useRef();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("/api/history");
        setTransactions(res.data.data);
        
        // Prepare CSV data after fetch
        setCsvData(res.data.data.map(tx => ({
          ID: tx._id,
          Date: new Date(tx.createdAt).toLocaleDateString(),
          Amount: `₹${tx.total_Amount}`,
          Status: tx.status,
          Items: tx.items.map(item => item.name).join(", ")
        })));
        
      } catch (err) {
        console.log(err);
      }
    };
    fetchTransactions();
  }, []);
  

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesFilter = filter === "all" || transaction.status === filter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      transaction._id.toLowerCase().includes(searchLower) ||
      transaction.items?.some(item =>
        item.name.toLowerCase().includes(searchLower)
      );

    return matchesFilter && matchesSearch;
  });

  const rowVirtualizer = useVirtualizer({
    count: filteredTransactions.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 96, []),
    overscan: 5,
  });

  const statusStyles = {
    completed: "bg-green-100 text-green-800",
    Canceled: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800"
  };

  return (
    <div className="xl:ml-[25%] md:ml-80 sm:ml-12 ml-4 flex-1 p-6">
      <Aside activeTab={"transactionhistory"} />

      {/* Header Section */}
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-500">Track and manage payment transactions</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search transactions..."
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            )}
          </div>

          <CSVLink
            data={csvData}
            filename="transactions.csv"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
            asyncOnClick={true}
          >
            Export CSV
          </CSVLink>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {["all", "completed", "canceled"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filter === f
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading/Error State */}
       
        <div
          ref={parentRef}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-auto h-[60vh]"
        >
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }}
          >
            {filteredTransactions.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 p-4">
                No transactions found matching your criteria
              </div>
            ) : (
              rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const transaction = filteredTransactions[virtualRow.index];
                return (
                  <div
                    key={virtualRow.key}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    className="px-6 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">
                            #{transaction._id.slice(-6)}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[transaction.status] || "bg-red-200"
                              }`}
                          >
                            {transaction.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Items: {transaction.items?.map(item => item.name).join(", ")}
                        </p>
                      </div>

                      <div className="mt-2 sm:mt-0 sm:text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          ₹{transaction.total_Amount}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      

      {/* Live Status */}
      <div className="mt-6 flex items-center gap-2 text-sm text-green-600">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </div>
        Receiving live updates
      </div>
    </div>
  );
};

export default TransactionHistory;