"use client"

import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import FeatureCard from "./FeatureCard"
import { MenuFeatures } from "@/types/MenuFeatures"
import { BarChart3, Bot, Check, CreditCard, LayoutDashboard, QrCode, ShieldCheck, Sparkles } from "lucide-react"

export const cards: MenuFeatures[] = [
  {
    title: ["Dynamic Menus for", "Modern", "Restaurants"],
    description:
      "Create, update, and publish menus in real-time. Change prices, add dishes, or hide items instantly without reprinting or downtime.",
    featureList: [
      "Real-time menu updates",
      "Works for cafes, dhabas & fine-dine",
      "No app required for customers"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768656837/original-e8270706177487165a27c6ae895aa842_oxioc5.webp",
    icon: Check,
    iconTitle: "Live Syncing",
    iconSubTitle: "Updated instantly"
  },

  {
    title: ["Real-time", "Dashboard &", "Insights"],
    description:
      "Track orders, revenue, and performance live from a single dashboard. Make data-driven decisions without manual reports.",
    featureList: [
      "Live order tracking",
      "Revenue & finance overview",
      "Daily, weekly & monthly insights"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663740/0fa73dbd-3ac8-4492-b4dd-e1789e304c4f-cover_grmypr.png",
    icon: LayoutDashboard,
    iconTitle: "Live Dashboard",
    iconSubTitle: "Orders updating now"
  },

  {
    title: ["Secure", "Owner", "Access"],
    description:
      "Enterprise-grade authentication keeps your restaurant data safe. Only authorized owners and staff can access sensitive controls.",
    featureList: [
      "Secure owner login",
      "Role-based access control",
      "Encrypted data protection"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663841/95d27c15-c891-421f-a637-047de5216691-cover_ex6hju.png",
    icon: ShieldCheck,
    iconTitle: "Protected Access",
    iconSubTitle: "Security enabled"
  },

  {
    title: ["AI-powered", "Food", "Assistance"],
    description:
      "Let AI help customers discover dishes they love. Smart recommendations increase order value and improve customer satisfaction.",
    featureList: [
      "AI dish recommendations",
      "Personalized suggestions",
      "Boosts average order value"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663918/d74ee50fcf9a9e22287f69a1613bdba2_v6tzcl.webp",
    icon: Bot,
    iconTitle: "AI Assistant",
    iconSubTitle: "Smart suggestions"
  },

  {
    title: ["QR Code", "Table", "Management"],
    description:
      "Assign QR codes to each table and manage orders seamlessly. Perfect for dine-in, cafes, and high-footfall restaurants.",
    featureList: [
      "Table-wise QR codes",
      "No waiter dependency",
      "Faster order flow"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768663966/qr-code-interactive-digital-menu_c7vovg.webp",
    icon: QrCode,
    iconTitle: "QR Enabled",
    iconSubTitle: "Table-wise ordering"
  },

  {
    title: ["Smooth", "Customer-side", "Menu"],
    description:
      "Ultra-fast, mobile-first menu experience designed for customers. Smooth animations and instant loading on any device.",
    featureList: [
      "Lightning-fast menu load",
      "Mobile & tablet optimized",
      "No app download required"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768664039/Screenshot_2026-01-17_210340_pjxvcs.png",
    icon: Sparkles,
    iconTitle: "Smooth UX",
    iconSubTitle: "Optimized experience"
  },

  {
    title: ["Instant", "Payments &", "Receipts"],
    description:
      "Accept payments instantly via UPI, cards, or wallets. Generate digital receipts automatically after every order.",
    featureList: [
      "UPI & card payments",
      "Instant receipt generation",
      "Payment status tracking"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768664077/original-9f056d23aaba6d34bac3b1a2de7e7711_kcxddy.webp",
    icon: CreditCard,
    iconTitle: "Payments Ready",
    iconSubTitle: "Paid successfully"
  },

  {
    title: ["Smart", "Reports &", "Analytics"],
    description:
      "Understand your restaurant’s performance with powerful analytics. Export reports and monitor trends effortlessly.",
    featureList: [
      "Sales & finance reports",
      "Downloadable insights",
      "Growth trend analysis"
    ],
    image:
      "https://res.cloudinary.com/dcyn3ewpv/image/upload/v1768664206/1658314-full_qi7d5e.jpg",
    icon: BarChart3,
    iconTitle: "Analytics",
    iconSubTitle: "Insights generated"
  }
];

export default function SectionTwo() {
    const containerRef = useRef<HTMLElement>(null)
    

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    const rawX = useTransform(
        scrollYProgress,
        [0, 1],
        [0, -(cards.length - 1) * (typeof window !== "undefined" ? window.innerWidth : 0)]
    )

    const x = useSpring(rawX, {
        stiffness: 70,
        damping: 25,
        mass: 0.9
    })

    
    return (
        <section
            id="feature"
            ref={containerRef}
            className="relative h-[300vh] bg-[#F8F5F0] rounded-t-4xl"
        >
            <div className="absolute -z-10 inset-0 bg-black/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/30 lg:to-transparent pointer-events-none" />
            <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                <motion.ul
                    style={{ x }}
                    className="flex"
                >
                    {cards.map((data, i) => (
                        <motion.li key={i} className="w-screen shrink-0">
                            <FeatureCard feature={data} />
                        </motion.li>
                    ))}
                </motion.ul>
            </div>
        </section>
    )
}
