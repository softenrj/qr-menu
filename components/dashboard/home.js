"use client";
import React from "react";
import { useSession } from "next-auth/react";
import TypeWriter from "../TypeWriter";
import AccountDropdown from "../AccountDropdown";
import axios from "axios";
import OrderTrackingChart from "./orderTracking";

const Home = () => {
    const { data: session, status } = useSession();
    const [orders, setOrders] = React.useState([]);
    const [activeUsers, setActiveUsers] = React.useState(0);
    const [topOrderedItems, setTopOrderedItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [eachItems,setEachitems] = React.useState([]);

    // Memoized calculations
    const totalRevenue = React.useMemo(() => (
        orders.filter(order => order.status === "completed")
            .reduce((sum, order) => sum + order.total_Amount, 0)
    ), [orders]);


    const { totalRevenueToday, totalRevenueYesterday } = React.useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        return {
            totalRevenueToday: orders
                .filter(order => order.status === "completed" && order.createdAt.startsWith(today))
                .reduce((sum, order) => sum + order.total_Amount, 0),
            totalRevenueYesterday: orders
                .filter(order => order.status === "completed" && order.createdAt.startsWith(yesterdayStr))
                .reduce((sum, order) => sum + order.total_Amount, 0)
        };
    }, [orders]);

    const revenueTrend = React.useMemo(() => {
        if (totalRevenueYesterday === 0) return "No data for yesterday";
        const percentageChange = ((totalRevenueToday - totalRevenueYesterday) / totalRevenueYesterday) * 100;
        return `${percentageChange >= 0 ? "+" : ""}${percentageChange.toFixed(2)}% from last day`;
    }, [totalRevenueToday, totalRevenueYesterday]);

    const orderTrend = React.useMemo(() => {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayDate = yesterday.toISOString().split("T")[0];

        const todayOrders = orders.filter(order => order.createdAt.startsWith(today)).length;
        const yesterdayOrders = orders.filter(order => order.createdAt.startsWith(yesterdayDate)).length;

        if (yesterdayOrders === 0) return "No orders yesterday";
        const trend = ((todayOrders - yesterdayOrders) / yesterdayOrders) * 100;
        return `${trend > 0 ? "+" : ""}${trend.toFixed(2)}% from yesterday`;
    }, [orders]);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const [historyRes, activeUserRes] = await Promise.all([
                    axios.get('/api/history'),
                    axios.get('/api/Activeuser')
                ]);
                setOrders(historyRes.data.data);
                setActiveUsers(activeUserRes.data.visitors.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        if (!orders.length) return;
        
        const itemCounts = orders.reduce((acc, order) => {
            order.items?.forEach(item => {
                acc[item.name] = (acc[item.name] || 0) + 1;
            });
            return acc;
        }, {});

        const sortedItems = Object.entries(itemCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);

        setTopOrderedItems(sortedItems);

        orders.reduce((acc, order) => {
                setEachitems((prev) => (
                    [
                        ...prev,
                        order.items.length
                    ]
                ))
        })
    }, [orders]);

    const stats = [
        { title: "Total Orders", value: orders.length, icon: "📦", trend: orderTrend, color: "bg-blue-100" },
        { title: "Revenue", value: `₹${totalRevenue}`, icon: "💰", trend: revenueTrend, color: "bg-green-100" },
        { title: "Visitors", value: activeUsers, icon: "👥", trend: "Total visitors", color: "bg-purple-100" },
        { 
            title: "Most Ordered", 
            value: topOrderedItems[0]?.name || "N/A", 
            icon: "🍕", 
            trend: `Ordered ${topOrderedItems[0]?.count || 0} times`, 
            color: "bg-orange-100" 
        },
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
                {isLoading ? (
                    Array(4).fill(0).map((_, index) => (
                        <div key={index} className="bg-white p-6 rounded-xl shadow-sm animate-pulse">
                            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    ))
                ) : stats.map((stat, index) => (
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
                    <OrderTrackingChart orders={eachItems} />
                </div>

                {/* Popular Items */}
                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h2 className="text-xl font-semibold mb-4">Popular Items</h2>
                    <div className="space-y-4">
                        {isLoading ? (
                            Array(4).fill(0).map((_, index) => (
                                <div key={index} className="animate-pulse flex items-center justify-between p-3">
                                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                </div>
                            ))
                        ) : topOrderedItems.length > 0 ? (
                            topOrderedItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <span>{item.name}</span>
                                    <span className="text-blue-600 font-medium">{item.count} orders</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 p-3">No popular items yet</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;