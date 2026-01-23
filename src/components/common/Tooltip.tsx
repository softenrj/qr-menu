"use client"
import React from 'react'
import { TooltipContent, TooltipTrigger, Tooltip as Tp } from "@/components/ui/tooltip"

function Tooltip({ content, children }: { content: string, children: React.ReactNode }) {
    return (
        <Tp>
            <TooltipTrigger className='cursor-pointer'>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tp>
    )
}

export default Tooltip