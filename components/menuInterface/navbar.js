import React from 'react';
import GrainIcon from '@mui/icons-material/Grain';

const Navbar = () => {
    return (
        <div className='flex justify-between mt-2 items-center'>
            <GrainIcon sx={{ fontSize: 60 }} className='text-gray-400 ml-1' />
            <img src="/shared/TNE-logo.png" className='h-12 logo' />

            <img src="/shared/profile-icon.jpeg" className='h-14 rounded-full' />

        </div>
    );
}

export default Navbar;
