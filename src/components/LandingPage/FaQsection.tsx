"use client"
import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'

function FaQsection() {
  return (
    <section id='faq'>
      <div className="bg-[#F8F5F0] h-full flex flex-col justify-center p-8 sm:p-12 md:p-20">
        <div className='flex items-baseline gap-2'>
          <h1 className='text-[#d1b895] font-playfair text-[48px] md:text-[54px] lg:text-[64px] font-bold'>FAQ</h1> <span className='text-[#4e4231] font-playfair text-[28px] md:text-[34px] lg:text-[44px] font-bold'>s</span>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className='decoration-accent cursor-pointer'>
              What is a QR Menu and how does it work?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                A QR Menu allows customers to scan a QR code using their phone and
                instantly view your restaurant menu online — no app required.
              </p>
              <p>
                Once scanned, the menu opens in the browser where customers can
                browse items, prices, descriptions, and updates in real time.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className='decoration-accent cursor-pointer'>
              Do customers need to install an app?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                No. Customers can access the menu directly through their mobile
                browser by scanning the QR code.
              </p>
              <p>
                This makes the experience fast, simple, and accessible on any
                smartphone.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className='decoration-accent cursor-pointer'>
              Can I update my menu anytime?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Yes. You can update items, prices, availability, and categories at
                any time from the dashboard.
              </p>
              <p>
                All changes are reflected instantly on the QR menu without
                reprinting codes.
              </p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className='decoration-accent cursor-pointer'>
              Is the QR Menu suitable for all restaurants?
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <p>
                Absolutely. QR menus work well for cafés, restaurants, food
                courts, bars, and cloud kitchens.
              </p>
              <p>
                It helps reduce printing costs, improve hygiene, and enhance the
                customer experience.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  )
}

export default FaQsection
