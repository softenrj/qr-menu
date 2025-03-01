"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";


const AiChat = ({ onClose }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const resp = await axios.get('/api/menuItems');
                setItems(resp.data.map((i) => (
                    i.title
                )));
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchItem();
    }, []);
    const [isVisible, setIsVisible] = useState(true);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            text: "Welcome to DineBuddy! 🍴 I can help with menu suggestions, dietary restrictions, and reservations. How can I assist you today?",
            isBot: true,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const generateResponse = async (userMessage) => {
        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: userMessage,
                    Avitem: items
                 }),
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch AI response");
            }
    
            const data = await response.json();
            return data.response; // Return AI-generated response
    
        } catch (error) {
            console.error("Error fetching response:", error);
            return "Sorry, I'm having trouble connecting to the kitchen. Please try again!";
        }
    };
    
    

    const handleSend = async () => {
        const trimmedMessage = inputMessage.trim();
        if (!trimmedMessage) return;

        // Add user message
        setMessages(prev => [...prev, {
            text: trimmedMessage,
            isBot: false,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);

        try {
            // Get AI response
            const aiResponse = await generateResponse(trimmedMessage);
            
            // Add AI response
            setMessages(prev => [...prev, {
                text: aiResponse,
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);

        } catch (error) {
            setMessages(prev => [...prev, {
                text: "Our chefs are busy right now. Please try again later!",
                isBot: true,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }

        setInputMessage("");
    };

    const quickSuggestions = [
        "Super Starters",
        "Diet Options",
        "Chef's Specials",
        "Popular Dishes",
        "Vegetarian Choices",
        "Dessert Menu"
    ];



    const handleSuggestionClick = (suggestion) => {
        setInputMessage(suggestion);
        inputRef.current.focus();
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 300, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="fixed w-[90%] ml-[5%] mb-3 max-w-md bg-white z-50 bottom-0 rounded-2xl overflow-hidden shadow-xl border border-gray-100"
                    drag="y"
                    dragConstraints={{ top: 0, bottom: 0 }}
                    dragElastic={0.1}
                    onDragEnd={(_, { offset }) => offset.y > 50 && (setIsVisible(false), onClose())}
                >
                    {/* Chat Header */}
                    <div className="p-4 flex items-center bg-gradient-to-r from-rose-400 to-red-500">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white p-2 rounded-full">
                                <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v7m0-7V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4H5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">DineBuddy</h3>
                                <p className="text-amber-100 text-sm">AI Dining Assistant</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => (setIsVisible(false), onClose())}
                            className="ml-auto text-white hover:text-amber-100 transition-colors"
                            aria-label="Close chat"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="h-[20rem] flex flex-col">
                        <div className="flex-1 p-4 bg-gray-50 space-y-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div className={`max-w-xs p-3 rounded-2xl ${msg.isBot ? "bg-white text-gray-800" : "bg-rose-500 text-white"}`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className={`text-xs mt-1 ${msg.isBot ? "text-gray-500" : "text-amber-100"}`}>{msg.time}</p>
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Suggestions */}
                        <div className="px-4 py-2 bg-white border-t border-gray-200">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-200 scrollbar-track-gray-100">
                                {quickSuggestions.map((suggestion, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="px-3 py-2 bg-amber-50 text-rose-700 text-sm font-medium rounded-lg hover:bg-amber-100 transition-colors whitespace-nowrap"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200">
                        <div className="flex space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask about menu items, dietary info, or reservations..."
                                className="flex-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 text-sm"
                            />
                            <button
                                onClick={handleSend}
                                className="bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 transition-colors"
                                aria-label="Send message"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-500 mt-2">
                            Powered by AI - GEMINI
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AiChat;