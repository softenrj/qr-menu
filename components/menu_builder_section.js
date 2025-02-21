"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { v4 as uuidv4 } from "uuid";
import MenuItemCard from "./menuCard";
import MenuItemCard_default from "./menu_ItemCard_default";
import axios from "axios";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [menuSections, setMenuSections] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsRes = await axios.get("/api/sections");
        const itemsRes = await axios.get("/api/menuItems");
        setMenuSections(sectionsRes.data);
        setMenuItems(itemsRes.data);
        if (sectionsRes.data.length > 0) {
          setActiveTab(sectionsRes.data[0].label);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  const addSection = () => setIsAddingSection(!isAddingSection);

  const handleInput = async (e) => {
    if (e.key === "Enter" && newSectionName.trim() !== "") {
      try {
        const res = await axios.post("/api/sections", { label: newSectionName });
        setMenuSections((prev) => [...prev, res.data.section]);
        setNewSectionName("");
        setIsAddingSection(false);
      } catch (error) {
        console.error("Error adding section:", error);
      }
    }
  };


  const doneEditing = async () => {
    if (!newSectionName.trim()) return;
    try {
      await axios.put("/api/sections", { oldLabel: activeTab, newLabel: newSectionName });
      setMenuSections((prev) =>
        prev.map((section) => (section.label === activeTab ? { ...section, label: newSectionName } : section))
      );
      setMenuItems((prev) =>
        prev.map((item) => (item.section === activeTab ? { ...item, section: newSectionName } : item))
      );
      setActiveTab(newSectionName);
      setIsEditing(false);
      setNewSectionName("");
    } catch (error) {
      console.error("Error updating section:", error);
    }
  };


  const sectionDelete = async () => {
    try {
      await axios.delete(`/api/sections`, { data: { label: activeTab } });
      await axios.delete(`/api/menuItems`,{ data: { label: activeTab } });
      setMenuSections((prev) => prev.filter((item) => item.label !== activeTab));
      setMenuItems((prev) => prev.filter((item) => item.section !== activeTab));
      setActiveTab(menuSections.length > 1 ? menuSections[1].label : "");
      setIsEditing(!isEditing);
    } catch (error) {
      console.error("Error deleting section:", error);
    }
  };


  const addNewItem = async (data) => {
    try {
      const newItem = {
        id: uuidv4(),
        section: activeTab,
        image: data.image,
        originalPrice: data.originalPrice,
        price: data.price,
        title: data.title,
      };
      await axios.post("/api/menuItems", newItem);
      setMenuItems((prev) => [...prev, newItem]);
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleCardDelete = async (id) => {
    try{
      await axios.delete(`/api/menuItems?id=${id}`);
      setMenuItems((prev) => 
        prev.filter((item) => item.id !== id)
      )
    }catch(error){
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Tabs Section */}
      <div className="flex justify-center items-center mt-2 mb-10 md:w-[70rem] overflow-x-scroll-auto">
        <div className="relative flex gap-6 items-center bg-white shadow-lg p-2 rounded-full pl-3 pr-3 ">
          {menuSections.map((tab) => (
            <div key={tab.label} className="relative flex-auto ">
              <input
                type="radio"
                id={`tab-${tab.label}`}
                name="tabs"
                className="hidden"
                checked={activeTab === tab.label}
                onChange={() => {setActiveTab(tab.label); setIsEditing(false)}}
              />
              <label htmlFor={`tab-${tab.label}`} className={`relative flex items-center justify-center h-10 w-full text-sm font-medium cursor-pointer ${activeTab === tab.label ? "text-blue-600 font-semibold" : "text-gray-700"}`}>
                {tab.label}
              </label>
            </div>
          ))}
          {isAddingSection && <input type="text" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} onKeyDown={handleInput} autoFocus className="border rounded px-1 py-1 w-40" />}
          <AddCircleOutlineIcon className="hover:text-blue-600 text-gray-700 cursor-pointer transition duration-300" onClick={addSection} />
        </div>
      </div>


      {(activeTab) ?
          <div className="max-w-3xl mx-auto text-center mt-1">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className={`bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 ${!isEditing && 'text-transparent'}`}>
            <DeleteForeverIcon className=" cursor-pointer" onClick={sectionDelete} />
            {isEditing ? (
              <input type="text" className="w-48 text-center px-1 py-2 border border-gray-300 rounded-md" autoFocus placeholder="Enter text..." onChange={(e) => setNewSectionName(e.target.value)} value={newSectionName} />
            ) : (
              activeTab
            )}
            </span>
            {isEditing ? <DoneIcon onClick={doneEditing} /> : <EditIcon onClick={() => { setNewSectionName(activeTab); setIsEditing(true); }} />}
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h1>
          <p className="text-lg text-gray-800 mb-8">Add item as by just click on default item card.</p>
        </div>
        : null  
    }

      {/* Menu Items */}
      {(activeTab) ? 
      <div className="w-[75%] border-2 md:w-[87%] rounded-2xl max-h-[770px] overflow-auto flex justify-center md:justify-normal flex-wrap [&::-webkit-scrollbar]:hidden">
      {menuItems.filter((item) => item.section === activeTab).map((item) => (
        <MenuItemCard key={item.id} image={item.image} title={item.title} price={item.price} originalPrice={item.originalPrice} deleteCard={() => handleCardDelete(item.id)} />
      ))}
      <MenuItemCard_default onDone={addNewItem} />
    </div>
    :null
    }
    </div >
  );
};

export default Tabs;
