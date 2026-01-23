"use client"

import React from "react"

const transactions = [
    {
        id: "TXN001",
        merchant: "Fresh Foods Pvt Ltd",
        email: "support@freshfoods.com",
        amount: 297,
        status: "Success",
        date: "22 Jan 2026",
    },
    {
        id: "TXN002",
        merchant: "Burger Hub",
        email: "contact@burgerhub.in",
        amount: 149,
        status: "Success",
        date: "18 Jan 2026",
    },
    {
        id: "TXN003",
        merchant: "Daily Mart",
        email: "help@dailymart.com",
        amount: 89,
        status: "Failed",
        date: "15 Jan 2026",
    },
]

function index() {
    return (
        <div className="min-h-screen bg-gray-50 px-6 pt-20">
            <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-gray-900">
                    Fresh Foods Pvt Ltd
                </p>
                <p className="text-xs text-gray-800">
                    MerchantId: 098309$32428
                </p>
                <p className="text-xs text-gray-500">
                    support@freshfoods.com
                </p>
            </div>

            {/* Header */}
            <h1 className="mb-6 font-mono text-2xl text-zinc-950">
                Transaction History
            </h1>

            {/* Transactions */}
            <div className="flex flex-col gap-4">
                {transactions.map((txn) => (
                    <div
                        key={txn.id}
                        className="rounded-2xl bg-white p-4 shadow-sm hover:shadow-md transition"
                    >
                        {/* Merchant Info */}
                        <div className="mb-2">
                            <p className="text-sm font-semibold text-gray-900">
                                {txn.merchant}
                            </p>
                            <p className="text-xs text-gray-500">
                                {txn.email}
                            </p>
                        </div>

                        {/* Transaction Meta */}
                        <div className="flex items-center justify-between text-sm">
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">
                                    Transaction ID
                                </p>
                                <p className="font-mono text-xs text-gray-800">
                                    {txn.id}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                    ₹{txn.amount}
                                </p>
                                <p
                                    className={`text-xs font-medium ${txn.status === "Success"
                                            ? "text-green-600"
                                            : "text-red-600"
                                        }`}
                                >
                                    {txn.status}
                                </p>
                            </div>
                        </div>

                        {/* Date */}
                        <p className="mt-2 text-xs text-gray-400">
                            {txn.date}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default index
