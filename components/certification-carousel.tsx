"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, ChevronLeft, ChevronRight, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  image: string
  link?: string
}

export function CertificationCarousel({ certifications }: { certifications: Certification[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleNext = () => {
    if (isAnimating) return
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + certifications.length) % certifications.length)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 100) {
      handleNext()
    } else if (touchEndX.current - touchStartX.current > 100) {
      handlePrev()
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait" onExitComplete={() => setIsAnimating(false)}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.5 }}
            onAnimationStart={() => setIsAnimating(true)}
            className="grid gap-8 md:grid-cols-2 items-center"
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative h-full w-full rounded-lg overflow-hidden">
                <Image
                  src={certifications[currentIndex].image || "/placeholder.svg"}
                  alt={certifications[currentIndex].title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <Badge className="bg-blue-500/80 text-white border-none">{certifications[currentIndex].issuer}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-blue-500/20 text-blue-400 mt-1">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-1">
                    {certifications[currentIndex].title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-blue-400">{certifications[currentIndex].issuer}</p>
                    <span className="text-white/50">•</span>
                    <p className="text-white/70">{certifications[currentIndex].date}</p>
                  </div>
                </div>
              </div>

              <p className="text-white/80">{certifications[currentIndex].description}</p>

              {certifications[currentIndex].link && (
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white group">
                  <Link href={certifications[currentIndex].link!} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    View Certificate
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {certifications.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500 scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-blue-500/20 hover:text-blue-400 rounded-full hidden md:flex"
        onClick={handlePrev}
        disabled={isAnimating}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-blue-500/20 hover:text-blue-400 rounded-full hidden md:flex"
        onClick={handleNext}
        disabled={isAnimating}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}
