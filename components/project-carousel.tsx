"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github?: string
  demo?: string
}

export function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleNext = () => {
    if (isAnimating) return
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const handlePrev = () => {
    if (isAnimating) return
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
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

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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

  const handleDemoClick = (e: React.MouseEvent<HTMLAnchorElement>, github: string) => {
    e.preventDefault()

    // Extract the repository name from the GitHub URL
    const repoPath = github.replace("https://github.com/", "")

    // Open in a new tab with GitHub Pages URL if it's a GitHub repository
    // or open the GitHub repository directly
    if (repoPath.includes("atifashraf46")) {
      const repoName = repoPath.split("/").pop()
      window.open(`https://atifashraf46.github.io/${repoName}`, "_blank")
    } else {
      window.open(github, "_blank")
    }
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
            <div className="relative aspect-video rounded-lg overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300"></div>
              <Image
                src={projects[currentIndex].image || "/placeholder.svg"}
                alt={projects[currentIndex].title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex gap-2">
                  {projects[currentIndex].github && (
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-white hover:text-blue-400 hover:bg-white/10"
                    >
                      <Link href={projects[currentIndex].github!} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {projects[currentIndex].demo && (
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="text-white hover:text-blue-400 hover:bg-white/10"
                    >
                      <Link href={projects[currentIndex].demo!} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold font-heading text-white mb-2">{projects[currentIndex].title}</h3>
                <p className="text-white/80">{projects[currentIndex].description}</p>
              </div>

              <div>
                <h4 className="text-blue-400 mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {projects[currentIndex].technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/30 transition-all duration-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {projects[currentIndex].github && (
                  <Button
                    asChild
                    variant="outline"
                    className="border-blue-500/30 text-white hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 group"
                  >
                    <Link href={projects[currentIndex].github!} target="_blank">
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Link>
                  </Button>
                )}
                {projects[currentIndex].github && (
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white group"
                    onClick={(e) => handleDemoClick(e as any, projects[currentIndex].github!)}
                  >
                    <Link href="#" onClick={(e) => handleDemoClick(e, projects[currentIndex].github!)}>
                      <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {projects.map((_, index) => (
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
