"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuItemCard from "./menu_ItemCard";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Tabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [numberOfItem, addItem] = useState([
    {
      id:1,
      items: [
        {
          img: "/",
          title: "abc",
          price: 34,
          originalPrice: 39
        }
      ]
    }
  ]);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");
  const [menuSections, setMenuSections] = useState([
    { id: 1, label: "Stater", notification: 2 },
    { id: 2, label: "Drinks" },
    { id: 3, label: "Tea" },
    { id: 4, label: "Desi food" },
    { id: 5, label: "Chines" }
  ]);

  const router = useRouter();

  const addSection = () => {
    setIsAddingSection(true);
  };

  const handleInput = (e) => {
    if (e.key === "Enter" && newSectionName.trim() !== "") {
      setMenuSections((prev) => [
        ...prev,
        { id: prev.length + 1, label: newSectionName,notification: numberOfItem.find((item) => item.id === activeTabIndex)?.items.length || 0 }
      ]);

      if (newSectionName.toLowerCase() === "china") {
        router.push(
          "https://www.instagram.com/reel/DFeUgWQyJgz/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA=="
        );
      }
      setNewSectionName("");
      setIsAddingSection(false);
    }
  };

  const doneEditing = () => {
    if (newSectionName.trim() !== "") {
      setMenuSections((prev) =>
        prev.map((section) =>
          section.id === activeTabIndex ? { ...section, label: newSectionName } : section
        )
      );
      setIsEditing(false);
      setNewSectionName("");
    }
  };


  //problem look ok.........

  const addNewItem = (e) => {
    addItem((prev)=>{
     const updatedTab = [...prev];
     updatedTab[activeTabIndex] = {
      ...updatedTab[activeTabIndex],
      items: [
        ...updatedTab[0].items,
        {
          img: e.image,
          title: e.title,
          price: e.price,
          originalPrice: e.originalPrice
        }
      ]
     }
     return updatedTab;
    })
    console.log(numberOfItem);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center mt-2 mb-10">
        <div className="relative flex gap-6 items-center bg-white shadow-lg p-2 rounded-full pl-3 pr-3">
          {menuSections.map((tab) => (
            <div key={tab.id} className="relative flex-auto">
              <input
                type="radio"
                id={`tab-${tab.id}`}
                name="tabs"
                className="hidden"
                checked={activeTabIndex === tab.id}
                onChange={() => setActiveTabIndex(tab.id)}
              />
              <label
                htmlFor={`tab-${tab.id}`}
                className={`relative flex items-center justify-center h-10 w-full text-sm font-medium cursor-pointer transition-all duration-300 rounded-full ${activeTabIndex === tab.id
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
                  }`}
              >
                {tab.label}
                {tab.notification && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 text-xs bg-red-500 text-white rounded-full">
                    {tab.notification}
                  </span>
                )}
              </label>
            </div>
          ))}

          {isAddingSection && (
            <input
              type="text"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={handleInput}
              autoFocus
              className="border rounded px-2 py-1"
            />
          )}

          <AddCircleOutlineIcon
            className="hover:text-blue-600 hover:transition hover:duration-300 hover:delay-50 hover:ease-in-out text-gray-700 cursor-pointer"
            onClick={addSection}
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mt-1">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
          <span className={`bg-clip-text ${!isEditing && 'text-transparent'} bg-gradient-to-r from-purple-500 to-pink-500`}>
            {isEditing ? (
              <input
                type="text"
                className="w-48 text-center px-1 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus-visible:no-underline transition-all"
                autoFocus
                placeholder="Enter text..."
                onChange={(e) => setNewSectionName(e.target.value)}
                value={newSectionName}
              />
            ) : (
              menuSections[activeTabIndex - 1].label
            )}
          </span>
          {isEditing ? (
            <DoneIcon className="relative bottom-3 left-1" onClick={doneEditing} />
          ) : (
            <EditIcon
              onClick={() => {
                setNewSectionName(menuSections[activeTabIndex-1].label)
                setIsEditing(true)
              }}
              fontSize="small"
              className="relative bottom-3 left-1 hover:translate-y-1 transition duration-200 delay-75 ease-in-out"
            />
          )}
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>
        <p className="text-lg text-gray-800 mb-8">Add Items in your {menuSections[activeTabIndex - 1].label} section.</p>
      </div>

      <div className="min-w-[75%] border-2 md:min-w-[65%] rounded-2xl max-h-[770px] md:max-h-[910px] overflow-auto [&::-webkit-scrollbar]:hidden flex justify-center md:justify-normal flex-wrap">
        <MenuItemCard onDone={addNewItem} />
        
        
      </div>
      <AddBoxIcon fontSize="large" onClick={addNewItem}/>
    </div>
  );
};

export default Tabs;
