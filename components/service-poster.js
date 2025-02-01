import React from 'react';

const Card = () => {
    return (
        <div className='flex gap-6'>
            <div className="poster-1">
                <img src="/serviceTab/poster-1.jpeg" alt="A man ordering food from a tab" className='object-cover rounded-2xl h-[35em] w-[28em]' />
            </div>
            <div className="flex flex-col gap-6"><div className="poster-2">
                <img src="/serviceTab/poster-2.png" alt="A man ordering food from a tab" className=' object-cover rounded-2xl h-[17em] w-[20em]' />
            </div>

            <div className="poster-3">
                <img src="/serviceTab/poster-3.png" alt="A man ordering food from a tab" className=' object-cover rounded-2xl h-[17em] w-[20em]' />
            </div>
            </div>
        </div>
    );
}

export default Card;
