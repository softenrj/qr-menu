"use client"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { ArrowRight, QrCode, Sparkles } from "lucide-react"
import React from "react"
import AuthDialog from "@/components/Auth";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function SectionOne() {
  const [open, setOpen] = React.useState<boolean>(false);
  const onClose = () => setOpen(false);

  return (
    <>
      <section id="home" className="min-h-screen flex items-center bg-transparent pt-20 lg:pt-0">
        <div className="absolute inset-0 bg-black/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/90 lg:via-black/30 lg:to-transparent pointer-events-none" />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12"
        >
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-4xl mx-auto lg:mx-0">
            <motion.div variants={item} className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className="text-[10px] lg:text-sm font-bold tracking-widest text-white uppercase">
                  The New Standard for Dhabas
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={item}
              className="font-playfair text-[42px] md:text-[68px] lg:text-[84px] leading-[1.1] text-white font-semibold"
            >
              A smarter way <br className="hidden sm:block" />
              to serve <span className="italic text-orange-400 font-normal underline decoration-orange-400/30 underline-offset-8">guests.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 text-zinc-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl font-light"
            >
              Instant QR menus for modern restaurants. No app downloads required.
              Just scan, order, and enjoy.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <i
                  onClick={() => setOpen(true)}
                  className="group w-full inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-10 py-4 text-white font-bold shadow-xl shadow-orange-900/20 transition-all hover:bg-orange-500"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </i>
              </motion.div>

              <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/About"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 px-10 py-4 text-white font-semibold backdrop-blur-xl hover:bg-white hover:text-black transition-all"
                >
                  <QrCode className="w-5 h-5 opacity-70" />
                  Live Demo
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-16 pt-8 border-t border-white/10 flex justify-center lg:justify-start gap-12"
            >
              <div className="text-center lg:text-left">
                <p className="text-white text-xl lg:text-2xl font-bold italic tracking-tighter">Instant</p>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium">Activation</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-white text-xl lg:text-2xl font-bold italic tracking-tighter">Zero</p>
                <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-medium">Monthly Fees</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <AuthDialog open={open} onClose={onClose} />
    </>

  )
}