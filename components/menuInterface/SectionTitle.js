import React from 'react';

const SectionTitle = ({activesection}) => {
    return (
        <div className='text-3xl font-bold text-pink-500 text-center mt-8
        '>
            {activesection}
            <hr className="border-b-0 border-dotted border-8 w-20 mt-4 mx-auto" />
        </div>
    );
}

export default SectionTitle;
