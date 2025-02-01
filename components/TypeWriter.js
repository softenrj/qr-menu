"use client"
import { Typewriter } from 'react-simple-typewriter'
import React from 'react';

const TypeWriter = ({content}) => {
    return (
        <Typewriter 
            words={content}
            loop={Infinity}
            cursor
            cursorStyle='_'
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
        />
    );
}

export default TypeWriter;
