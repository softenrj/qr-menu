import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const OrderTrackingChart = ({ orders }) => {
    // Convert orders array into a format suitable for the graph
    const chartData = orders.slice(0, Math.ceil(orders.length / 2)).map((order, index) => ({
        order: `Order ${index + 1}`,
        items: Array.isArray(order) ? order.length : order, // Ensure numerical value
    }));

    return (
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Live Order Tracking</h2>
            <div className="relative h-72 pt-3 rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <XAxis dataKey="order" tick={{ fontSize: 12 }} />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="items" stroke="#4F46E5" strokeWidth={3} dot={{ r: 0 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrderTrackingChart;
