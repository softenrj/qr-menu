"use client"
import React,{useContext} from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ItemContext from './itemContext';

const Cart = () => {
    const {itemprop} = useContext(ItemContext);
    const lenofitem = itemprop.length;
    
    const visibleItems = itemprop.slice(-3);
    return (
        <div className='fixed mb-16 z-10 rounded-full bg-green-600 bottom-0 left-1/2 translate-x-[-50%] inline-flex items-center'>
            <div className="items inline-flex mr-6 max-w-44 ">
                {visibleItems.map((i, idx) => (
                    <img key={idx}
                        src={i.image}
                        className={`h-14 w-14 rounded-full object-cover border-[4px] border-green-600 ${lenofitem > 1 ? '-mr-4' : null}`}
                    />
                    
                ))}
                
            </div>
            <div className="info flex flex-col justify-start text-white font-dmSans mr-2 text-sm">
                <span className="whitespace-nowrap font-bold">View cart</span>
                <span>{lenofitem} Items</span>
            </div>

            <div className="next bg-green-700 flex justify-center items-center rounded-full h-10 w-10 mr-1">
                <NavigateNextIcon sx={{ fontSize: 30, color: 'white' }} />
            </div>
            
            
        </div>
    );
}

export default Cart;
