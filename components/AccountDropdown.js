import React from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import Signout from "@/components/Signout"

const AccountDropdown = () => {
    return (
        <Menu as="div">
            <div>
                <MenuButton>
                    <img className=' hover:border-2 hover:border-indigo-600 hover:transition-all hover:duration-150 hover:ease-in-out h-[4em] rounded-full' src="/profile.jpg" alt="account-image" />
                </MenuButton>
            </div>
            <MenuItems className="absolute mr-10 text-center right-0 z-10 mt-2 w-[180px] min-h-[110px] origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <div>
                    <MenuItem>
                        <a
                            href="/services"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            Services
                        </a>
                    </MenuItem>

                    <MenuItem>
                    <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                        >
                            Menu QR
                        </a>
                    </MenuItem>

                    <MenuItem>
                    <Signout />
                    </MenuItem>
                </div>


            </MenuItems>
        </Menu>
    );
}

export default AccountDropdown;
