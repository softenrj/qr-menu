"use client"
import React, { useEffect, useState } from 'react';
import ItemCard from './itemCard';
import axios from 'axios';


const Menupopulate = ({ activeSection }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const resp = await axios.get('/api/menuItems');
                setItems(resp.data);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchItem();
    }, [activeSection]);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {items
                .filter((item) => activeSection === "All" || item.section === activeSection) 
                .map((item) => (
                    <ItemCard
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        image={item.image}
                        orp={item.originalPrice}
                        pr={item.price}
                    />
                ))
            }
        </div>

    );
}

export default Menupopulate;
