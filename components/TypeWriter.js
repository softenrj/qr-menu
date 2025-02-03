"use client"
import { Typewriter } from 'react-simple-typewriter'
import React from 'react';

const TypeWriter = ({lp,content}) => {
    return (
        <Typewriter 
            words={content}
            loop= {lp ? 1:Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
        />
    );
}

export default TypeWriter;
