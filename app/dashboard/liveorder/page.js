"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Aside from "@/components/dashboard/aside";

const LiveOrders = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order");
        setOrders(response.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  
    const interval = setInterval(fetchOrders, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  // Mark order as done: call /api/order/done endpoint
  const markOrderAsDone = async (orderId) => {
    try {
      await axios.post("/api/order/done", { orderId });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error marking order as done:", err);
      setError("Failed to mark order as done");
    }
  };

  // Cancel order: call /api/order/cancel endpoint
  const cancelOrder = async (orderId) => {
    try {
      await axios.post("/api/order/cancel", { orderId });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error canceling order:", err);
      setError("Failed to cancel order");
    }
  };

  return (
    <div className="xl:ml-[25%] md:ml-80 sm:ml-12 ml-4 flex-1 p-6">
      <Aside activeTab={'liveorder'} />

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Live Orders</h1>
          <p className="text-gray-500 mt-2">Real-time order tracking system</p>
        </div>
        <input 
          type="text" 
          placeholder="Search orders..." 
          className="px-4 py-2 rounded-lg bg-white shadow-sm border border-gray-200"
        />
      </div>

      {/* Loading & Error States */}
      {loading ? (
        <p className="text-gray-500">Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No live orders found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">#{order._id.slice(-4)}</h3>
                  <p className="text-gray-500 text-sm">{order.time}</p>
                  <p className="text-gray-500 text-sm">Total Amount: {order.total_Amount}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  order.status === 'ready' ? 'bg-green-100 text-green-800' :
                  order.status === 'preparing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-gray-600">
                  {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>🪑 Table {order.table}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end gap-2">
                <button 
                  onClick={() => markOrderAsDone(order._id)}                  className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"
                >
                  Done Order
                </button>
                <button 
                  onClick={() => cancelOrder(order._id)}
                  className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                >
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveOrders;
