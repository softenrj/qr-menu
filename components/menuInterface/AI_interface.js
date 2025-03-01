import React, { useState } from "react";
import AiChat from "./ai_chat";

const AIInterface = () => {
    const [clicked, setClick] = useState(false);

    const handleClose = () => {
        setClick(false);
    };

    return (
        <>
            {/* Floating AI Logo */}
            <div
                className="h-12 w-12 rounded-full fixed z-20 right-3 bottom-12 
                           cursor-pointer overflow-hidden shadow-[0_0_7px_#AA60C8]" 
                onClick={() => setClick(!clicked)}
            >
                <video
                    loop
                    autoPlay
                    muted
                    disablePictureInPicture
                    src="/Menuinterface/ailogo.mp4"
                    className="h-full w-full object-cover animate-spin-slow"
                ></video>
            </div>

            {/* AI Chat Component (positioned separately) */}
            {clicked && (
                <div className="fixed bottom-0 left-0 z-30">
                    <AiChat onClose={handleClose} />
                </div>
            )}
        </>
    );
};

export default AIInterface;
