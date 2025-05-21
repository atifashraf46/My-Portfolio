"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowRight } from "lucide-react"

export function HireMeButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 text-white rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:scale-110 animate-pulse-slow group"
        aria-label="Hire Me"
      >
        <span className="font-bold group-hover:scale-110 transition-transform duration-300">Hire Me</span>
      </button>

      <HireMeModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}

interface HireMeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function HireMeModal({ open, onOpenChange }: HireMeModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-gray-900/95 border-blue-500/20 text-white backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading text-white">Let's Work Together</DialogTitle>
          <DialogDescription className="text-white/70">
            Fill out the form below to discuss your project needs and how I can help.
          </DialogDescription>
        </DialogHeader>
        <form action="https://formsubmit.co/atifashraf341@gmail.com" method="POST" className="grid gap-4 py-4">
          <input type="hidden" name="_subject" value="Hire Me Inquiry from Portfolio!" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="hire-name" className="text-sm font-medium text-white/80">
                Name
              </label>
              <input
                id="hire-name"
                name="name"
                required
                className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="hire-email" className="text-sm font-medium text-white/80">
                Email
              </label>
              <input
                id="hire-email"
                name="email"
                type="email"
                required
                className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                placeholder="Your email"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="project-type" className="text-sm font-medium text-white/80">
              Project Type
            </label>
            <select
              id="project-type"
              name="project-type"
              className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
            >
              <option value="" className="bg-gray-900">
                Select project type
              </option>
              <option value="website" className="bg-gray-900">
                Website Development
              </option>
              <option value="app" className="bg-gray-900">
                Mobile App
              </option>
              <option value="ecommerce" className="bg-gray-900">
                E-commerce
              </option>
              <option value="design" className="bg-gray-900">
                UI/UX Design
              </option>
              <option value="other" className="bg-gray-900">
                Other
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-sm font-medium text-white/80">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
            >
              <option value="" className="bg-gray-900">
                Select budget range
              </option>
              <option value="small" className="bg-gray-900">
                $1,000 - $5,000
              </option>
              <option value="medium" className="bg-gray-900">
                $5,000 - $10,000
              </option>
              <option value="large" className="bg-gray-900">
                $10,000 - $20,000
              </option>
              <option value="enterprise" className="bg-gray-900">
                $20,000+
              </option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="hire-message" className="text-sm font-medium text-white/80">
              Project Details
            </label>
            <textarea
              id="hire-message"
              name="message"
              required
              className="flex min-h-[120px] w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
              placeholder="Describe your project and requirements"
            ></textarea>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white hover:scale-[1.02] transition-all duration-300 group"
            >
              Submit Inquiry
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
