"use client"
import Link from "next/link"
import React from "react"
import { Icon } from "@iconify/react"
import Tooltip from "./Tooltip"

function Footer() {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id)
        el?.scrollIntoView({ behavior: "smooth" })
    }
    return (
        <footer className="bg-[#F8F5F0] border-t border-[#e8e1d6]">
            <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

                {/* Brand */}
                <div className="flex flex-col gap-4">
                    <Link href="/" className="text-2xl font-bold tracking-tight">
                        <span className="text-[#A18D6D]">QR</span>Menu
                    </Link>

                    <p className="text-[#5e5240] text-sm leading-relaxed">
                        Smart QR menus for modern restaurants. Update menus instantly,
                        reduce costs, and give customers a seamless dining experience.
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                        <Tooltip content="Instagram">
                            <a href="https://www.instagram.com/raj_s.e?igsh=YjZqZmVsd3kwNWsx" className="text-[#5e5240] hover:text-[#A18D6D] transition">
                                <Icon icon="ri:instagram-line" width="22" />
                            </a>
                        </Tooltip>

                        <Tooltip content="Facebook">
                            <a href="https://www.facebook.com/share/1BeSWL4QxY/" className="text-[#5e5240] hover:text-[#A18D6D] transition">
                                <Icon icon="ri:facebook-line" width="22" />
                            </a>
                        </Tooltip>

                        <Tooltip content="LinkedIn">
                            <a href="https://www.linkedin.com/in/raj-sharma-23447527b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-[#5e5240] hover:text-[#A18D6D] transition">
                                <Icon icon="ri:linkedin-line" width="22" />
                            </a>
                        </Tooltip>

                        <Tooltip content="GitHub">
                            <a href="https://github.com/softenrj" className="text-[#5e5240] hover:text-[#A18D6D] transition">
                                <Icon icon="ri:github-line" width="22" />
                            </a>
                        </Tooltip>
                    </div>
                    <a href="mailto:rjsharmase@gmail.com" className="italic from-accent-foreground">rajsharmase@gmail.com</a>
                </div>

                {/* Product */}
                <div>
                    <h3 className="text-sm font-semibold text-[#3f3629] uppercase tracking-wider mb-4">
                        Product
                    </h3>
                    <ul className="space-y-2 text-sm text-[#5e5240]">
                        <li onClick={() => scrollToSection('feature')} className="hover:text-[#A18D6D] cursor-pointer">Features</li>
                        <Tooltip content="Its All free Bro!"><li className="hover:text-[#A18D6D] cursor-pointer">Pricing</li></Tooltip>
                        <li onClick={() => scrollToSection('home')} className="hover:text-[#A18D6D] cursor-pointer">Hone</li>
                        <Tooltip content="Nope"><li className="hover:text-[#A18D6D] cursor-pointer">Updates</li></Tooltip>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <Tooltip content="Not yet! 😁">
                        <h3 className="text-sm font-semibold text-[#3f3629] uppercase tracking-wider mb-4">
                        Company
                    </h3>
                    </Tooltip>
                    <ul className="space-y-2 text-sm text-[#5e5240]">
                        <li className="hover:text-[#A18D6D] cursor-pointer">About Us</li>
                        <li className="hover:text-[#A18D6D] cursor-pointer">Careers</li>
                        <li className="hover:text-[#A18D6D] cursor-pointer">Blog</li>
                        <li className="hover:text-[#A18D6D] cursor-pointer">Contact</li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-sm font-semibold text-[#3f3629] uppercase tracking-wider mb-4">
                        Support
                    </h3>
                    <ul className="space-y-2 text-sm text-[#5e5240]">
                        <li onClick={() => scrollToSection('faq')} className="hover:text-[#A18D6D] cursor-pointer">FAQs</li>
                        <li className="hover:text-[#A18D6D] cursor-pointer">Privacy Policy</li>
                        <Tooltip content="Do whatever you want, but never trouble your mother, father, or nation."><li className="hover:text-[#A18D6D] cursor-pointer">Terms of Service</li></Tooltip>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#e8e1d6] py-4 px-6 text-center text-xs text-[#7a6f5b]">
                © {new Date().getFullYear()} QRMenu. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
