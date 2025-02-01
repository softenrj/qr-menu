import React from "react";
import HomeNavButton from "./homeNavButton";
import AccountDropdown from "./AccountDropdown";

function Navbar() {
    return (
        <div className="bg-[#ffffff] h-20 pt-2 pb-2
        flex items-center justify-between px-10 shadow-md">

            <div className="flex items-center">
                <video src="/shared/logo.mp4"
                loop
                autoPlay
                muted
                disablePictureInPicture
                 className="h-20"></video>
            </div>


            <div className="flex items-center gap-6 text-gray-800 ">

                <HomeNavButton link="/" content="Home" />
                <HomeNavButton link="/About" content="About" />
                <HomeNavButton link="/Contact" content="Contact" />

                <div className="account-tab flex items-center">
                    <AccountDropdown />
                </div>
            </div>

        </div>
    );
}

export default Navbar;
