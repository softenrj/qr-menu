"use client"
import React,{useContext} from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ItemContext from './itemContext';

const Cart = ({doneAdd}) => {
    const {itemprop} = useContext(ItemContext);
    const lenofitem = itemprop.length;
    
    const visibleItems = itemprop.slice(-3);
    const totalQuantity = itemprop.reduce((acc, item) => acc + item.quantity, 0);
    return (
        <div className={`fixed mb-10 z-10 rounded-full bg-[#239e44] bottom-0 left-1/2 translate-x-[-50%] inline-flex items-center justify-between ${lenofitem > 2 ? 'w-52':null}`}>
            <div className="inline-flex mr-4 max-w-[120px] p-1">
                {visibleItems.map((i, idx) => (
                    <img key={idx}
                        src={i.image}
                        className={`h-10 w-10 md:h-16 md:w-16 rounded-full object-cover border-[2px] border-[#1d7d36] ${lenofitem > 1 ? '-mr-4' : null}`}
                    />
                    
                ))}
                
            </div>
            <div className="info flex flex-col justify-start text-white font-dmSans mt-1 mr-2 text-sm">
                <span className="whitespace-nowrap font-bold">View cart</span>
                <span>{ totalQuantity }</span>
            </div>

            <div className="next bg-[#1d7d36] flex justify-center items-center rounded-full h-10 w-10 mr-1">
                <NavigateNextIcon sx={{ fontSize: 30, color: 'white' }} onClick={doneAdd} />
            </div>
            
            
        </div>
    );
}

export default Cart;
