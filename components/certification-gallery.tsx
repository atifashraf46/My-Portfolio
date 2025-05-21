"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Certification {
  title: string
  issuer: string
  date: string
  description: string
  image: string
  link?: string
}

export function CertificationGallery({ certifications }: { certifications: Certification[] }) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <div className="mt-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {certifications.map((cert, index) => (
          <motion.div
            key={index}
            className="relative group cursor-pointer"
            whileHover={{ y: -5 }}
            onClick={() => setSelectedCert(cert)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-blue-500/20 bg-black">
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                <h4 className="text-white font-bold text-sm truncate">{cert.title}</h4>
                <p className="text-blue-400 text-xs">{cert.issuer}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedCert && (
          <Dialog open={!!selectedCert} onOpenChange={() => setSelectedCert(null)}>
            <DialogContent className="sm:max-w-[700px] bg-gray-900/95 border-blue-500/20 text-white backdrop-blur-lg">
              <DialogHeader>
                <DialogTitle className="text-2xl font-heading text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-400" />
                  {selectedCert.title}
                </DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-75"></div>
                  <div className="relative h-full w-full rounded-lg overflow-hidden">
                    <Image
                      src={selectedCert.image || "/placeholder.svg"}
                      alt={selectedCert.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-blue-500/20 text-blue-400 border-none">{selectedCert.issuer}</Badge>
                      <span className="text-white/50">•</span>
                      <p className="text-white/70 text-sm">{selectedCert.date}</p>
                    </div>
                  </div>
                  <p className="text-white/80 text-sm">{selectedCert.description}</p>
                  {selectedCert.link && (
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white group mt-4">
                      <Link href={selectedCert.link} target="_blank">
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        View Certificate
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}
