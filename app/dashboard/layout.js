"use client";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DashboardLayout = ({ children }) => {
    const [activeUsers, setActiveUsers] = useState([]);
    const notificationSound = "/notification.mp3"; // Path to notification sound

    useEffect(() => {
        let isMounted = true; // Prevents state update on unmounted components

        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/Activeuser?notifi=true");
                const data = await res.json();

                if (isMounted && data.activeUsers) {
                    // Check for new users
                    const newUsers = data.activeUsers.filter(user => !activeUsers.includes(user));

                    if (newUsers.length > 0) {
                        newUsers.forEach(user => {
                            toast.success(`New User Scanned: ${user}`, {
                                position: "top-right",
                                autoClose: 3000,
                            });

                            // Play notification sound
                            const audio = new Audio(notificationSound);
                            audio.play();
                        });

                        setActiveUsers(data.activeUsers); // Update state with new users
                    }
                }
            } catch (error) {
                console.error("Error fetching active users:", error);
            }
        };

        // Fetch immediately, then every 5 seconds
        fetchUsers();
        const interval = setInterval(fetchUsers, 5000);

        // Cleanup function to clear interval when unmounting
        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [activeUsers]); // Dependency added to track new users

    return (
        <div>
            <ToastContainer />
            {children}
        </div>
    );
};

export default DashboardLayout;
