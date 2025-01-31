import React from 'react';
import Link from 'next/link';

const HomeNavButton = ({link,content}) => {
    return (
        <Link href={link}
            className="
                        relative before:absolute before:content-center before:bg-yellow-400 before:bottom-0 before:left-0
                        before:h-[6px] before:w-0 hover:before:w-full before:transition-all before:ease-in-out before:duration-300
                        font-dmSans text-[22px] font-semibold
                    ">

            {content}
        </Link>
    );
}

export default HomeNavButton;
