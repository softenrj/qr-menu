import React from 'react';
import MenuSubmitbtn from './menuSubmitbtn';

const MenuDone = () => {
    return (
        <div className='flex flex-col items-start'>
            <h1 className='font-dmSans text-black text-center  text-[20px] leading-[5rem] md:mr-80 ml-10'>
                🔴When you done adding items For generating Qr click on down button
            </h1>
            <MenuSubmitbtn />
        </div>
    );
}

export default MenuDone;
