"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, Download, ArrowRight, LayoutGrid, Rows } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { HireMeButton } from "@/components/hire-me-modal"
import { ProjectCarousel } from "@/components/project-carousel"
import { CertificationCarousel } from "@/components/certification-carousel"
import { CertificationGallery } from "@/components/certification-gallery"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "react-intersection-observer"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [scrollY, setScrollY] = useState(0)
  const [currentAboutIndex, setCurrentAboutIndex] = useState(0)
  const [aboutDirection, setAboutDirection] = useState(0)
  const [certView, setCertView] = useState<"carousel" | "gallery">("carousel")

  const aboutItems = [
    {
      title: "Software Engineer",
      description: "Passionate about building robust and scalable applications with clean, maintainable code.",
    },
    {
      title: "Problem Solver",
      description: "Approaching complex challenges with analytical thinking and creative solutions.",
    },
    {
      title: "Continuous Learner",
      description: "Always expanding my knowledge and staying current with emerging technologies.",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutDirection(1)
      setCurrentAboutIndex((prevIndex) => (prevIndex + 1) % aboutItems.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [aboutItems.length])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Get all sections
      const sections = document.querySelectorAll("section[id]")

      // Find the section that is currently in view
      let current = ""
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        if (scrollY >= sectionTop - 200 && scrollY < sectionTop + sectionHeight - 200) {
          current = section.getAttribute("id") || ""
        }
      })

      if (current && current !== activeSection) {
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollY, activeSection])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Resume", href: "#resume" },
    { name: "Certifications", href: "#certifications" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const aboutVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  }

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrollY > 50 ? "bg-black/90 backdrop-blur-md border-b border-blue-500/20" : "bg-transparent"}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="font-bold text-xl font-heading text-white">
            <Link href="/" className="hover:text-blue-400 transition-colors duration-300 flex items-center">
              <span className="text-blue-500">M</span>AH
              <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:text-blue-400 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full ${activeSection === item.href.substring(1) ? "text-blue-400 after:w-full" : "text-white/80"}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {[
              { icon: <Github className="h-5 w-5" />, href: "https://github.com/atifashraf46", label: "GitHub" },
              {
                icon: <Linkedin className="h-5 w-5" />,
                href: "https://www.linkedin.com/in/mohammadatifhussain",
                label: "LinkedIn",
              },
              { icon: <Mail className="h-5 w-5" />, href: "mailto:atifashraf341@gmail.com", label: "Email" },
            ].map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="text-white hover:text-blue-400 hover:bg-blue-500/10 hover:scale-110 transition-all duration-300"
              >
                <Link href={social.href} target="_blank" aria-label={social.label}>
                  {social.icon}
                </Link>
              </Button>
            ))}
            <Button className="hidden sm:flex bg-blue-600 hover:bg-blue-700 text-white ml-2">
              <Link href="#contact">Hire Me</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-16">
          {/* Background with tech-inspired elements */}
          <div className="absolute inset-0 bg-black">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-purple-500/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/20 via-blue-500/10 to-transparent"></div>

            {/* Animated tech particles */}
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-blue-500/30 blur-sm"
                  style={{
                    width: `${Math.random() * 6 + 2}px`,
                    height: `${Math.random() * 6 + 2}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
                    animationDelay: `${Math.random() * 10}s`,
                  }}
                ></div>
              ))}
            </div>

            {/* Digital circuit lines */}
            <div className="absolute inset-0 opacity-20 bg-[url('/circuit-pattern.png')]"></div>
          </div>

          <div className="container grid gap-8 md:grid-cols-2 items-center relative z-10">
            <motion.div
              className="space-y-8 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-2">
                <motion.h2
                  className="text-xl md:text-2xl font-medium text-blue-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Hello, I'm
                </motion.h2>
                <motion.h1
                  className="text-4xl md:text-6xl font-bold tracking-tight font-heading text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Mohammad Atif Hussain
                </motion.h1>
                <motion.div
                  className="h-1 w-20 bg-blue-500 mt-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  style={{ transformOrigin: "left" }}
                ></motion.div>
              </div>

              <motion.p
                className="text-xl text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Aspiring software developer skilled in Python, JavaScript, and full-stack web development. Passionate
                about problem-solving and scalable application design.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300 group"
                >
                  <Link href="#projects">
                    View My Work
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="gap-2 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1SI6D8BTwS4ZgACDBlB_pwgpTKLZyVAaw/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    Download CV
                  </a>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                <Image src="/profile-image.png" alt="Mohammad Atif Hussain" fill className="object-cover" priority />

                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-glow-slide"></div>
              </div>
            </motion.div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Link href="#about" className="text-white/50 hover:text-white transition-colors duration-300">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm">Scroll Down</span>
                <div className="w-5 h-10 rounded-full border-2 border-white/20 flex justify-center pt-1">
                  <div className="w-1 h-2 bg-blue-500 rounded-full animate-scrollDown"></div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* About Section */}
        <Section id="about" title="About Me">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative aspect-square overflow-hidden rounded-lg border border-blue-500/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-500/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300"></div>
                <Image
                  src="/profile-image.png"
                  alt="Mohammad Atif Hussain"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/30 to-blue-500/0 animate-glow-slide"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-[100px] overflow-hidden">
                <AnimatePresence initial={false} custom={aboutDirection} mode="wait">
                  <motion.div
                    key={currentAboutIndex}
                    custom={aboutDirection}
                    variants={aboutVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "tween", duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <h3 className="text-2xl font-heading font-bold text-white">
                      <span className="text-blue-500">{aboutItems[currentAboutIndex].title}</span>
                    </h3>
                    <p className="text-white/80 mt-2">{aboutItems[currentAboutIndex].description}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-center mt-4 gap-2">
                {aboutItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setAboutDirection(index > currentAboutIndex ? 1 : -1)
                      setCurrentAboutIndex(index)
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAboutIndex ? "bg-blue-500 scale-125" : "bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <p className="text-white/80">
                Hello! I'm Md Atif Hussain, a passionate and driven software developer with a strong foundation in
                full-stack web development and a love for solving real-world problems through code.
              </p>

              <p className="text-white/80">
                I recently graduated with a B.Tech in Computer Science and Engineering (Artificial Intelligence and
                Machine Learning) from Jyothishmathi Institute of Technology and Science, affiliated with JNTUH. My time
                at college shaped my technical skills and problem-solving mindset, giving me hands-on experience with
                technologies like Python, JavaScript, React.js, Node.js, Flask, and REST APIs. I also completed a
                Salesforce Developer internship at Smart InternZ, where I built CRM automation tools using Apex and
                integrated Salesforce APIs to streamline workflows.
              </p>

              <p className="text-white/80">
                Beyond academics, I was an active member of the Techspartens Club, where I organized tech events and
                developed strong leadership and team coordination skills. I continuously upskill through workshops and
                certifications in Web Development, Cloud Computing, AWS, and Data Structures.
              </p>

              <p className="text-white/80">
                I'm enthusiastic about joining a forward-thinking team where I can contribute, learn, and grow as a
                developer. I'm open to relocation and ready to take on exciting challenges in the tech industry.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: "Name", value: "Mohammad Atif Hussain" },
                  { label: "Email", value: "atifashraf341@gmail.com" },
                  { label: "Location", value: "Hyderabad" },
                  { label: "Availability", value: "Full-time & immediate joining" },
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-blue-400 text-sm">{item.label}:</p>
                    <p className="text-white font-medium">{item.value}</p>
                  </div>
                ))}
              </div>

              <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-4 group">
                <Link href="#contact">
                  Let's Talk
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Skills Section */}
        <Section id="skills" title="My Skills" className="bg-gradient-to-b from-black via-blue-950/20 to-black">
          <div className="grid gap-8 md:grid-cols-2">
            <SkillCard title="Frontend Development" skills={frontendSkills} icon="/icons/frontend.png" />
            <SkillCard title="Backend Development" skills={backendSkills} icon="/icons/backend.png" />
          </div>

          <div className="mt-12">
            <SkillCard title="Soft Skills" skills={softSkills} icon="/icons/tools.png" />
          </div>

          <div className="mt-12">
            <Card className="bg-white/5 border-blue-500/20 hover-card overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center">
                  <Image src="/icons/tools.png" alt="Tools" width={24} height={24} className="mr-2" />
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {otherSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 border-blue-500/30 py-1.5 px-3 transition-all duration-300 hover:scale-110"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Resume Section */}
        <Section id="resume" title="My Resume">
          <div className="flex justify-center mb-8">
            <Button
              variant="outline"
              className="border-blue-500/30 text-white hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300 group"
              asChild
            >
              <a
                href="https://drive.google.com/file/d/1SI6D8BTwS4ZgACDBlB_pwgpTKLZyVAaw/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                Download Full Resume
              </a>
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Work Experience */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center">
                <Image src="/icons/work.png" alt="Work Experience" width={24} height={24} className="mr-2" />
                Work Experience
              </h3>

              <div className="relative pl-6 border-l border-blue-500/30 space-y-10">
                <ResumeItem
                  title="Salesforce Developer Internship"
                  organization="Smart InternZ"
                  period="Nov 2023 – Dec 2023"
                  description={[
                    "Completed an 8-week Salesforce Developer internship at Smart InternZ.",
                    "Developed CRM automation solutions using Apex and improved data management workflows by integrating Salesforce APIs.",
                  ]}
                  tags={["Salesforce", "Apex", "CRM", "API Integration"]}
                  index={0}
                />
              </div>
            </div>

            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold font-heading text-white flex items-center">
                <Image src="/icons/education.png" alt="Education" width={24} height={24} className="mr-2" />
                Education
              </h3>

              <div className="relative pl-6 border-l border-blue-500/30 space-y-10">
                <ResumeItem
                  title="B.Tech in Computer Science and Engineering (AI & ML)"
                  organization="Jyothishmathi Institute of Technology and Science, JNTUH"
                  period="2021 - 2025"
                  description={["Graduate | CGPA (Present): 7.6"]}
                  tags={["Computer Science", "AI", "ML"]}
                  index={0}
                />
                <ResumeItem
                  title="MPC with Computer Science"
                  organization="Trinity Junior College"
                  period="2019 - 2021"
                  description={["Grad 2021 | Percentage: 90.6%"]}
                  tags={["Computer Science"]}
                  index={1}
                />
              </div>
            </div>
          </div>
        </Section>

        {/* Certifications Section */}
        <Section
          id="certifications"
          title="My Certifications"
          className="bg-gradient-to-b from-black via-blue-950/20 to-black"
        >
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/5 rounded-lg p-1 border border-blue-500/20">
              <Button
                variant={certView === "carousel" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCertView("carousel")}
                className={`flex items-center gap-2 ${
                  certView === "carousel" ? "bg-blue-600" : "text-white hover:text-blue-400 hover:bg-white/5"
                }`}
              >
                <Rows className="h-4 w-4" />
                Carousel
              </Button>
              <Button
                variant={certView === "gallery" ? "default" : "ghost"}
                size="sm"
                onClick={() => setCertView("gallery")}
                className={`flex items-center gap-2 ${
                  certView === "gallery" ? "bg-blue-600" : "text-white hover:text-blue-400 hover:bg-white/5"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                Gallery
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {certView === "carousel" ? (
              <motion.div
                key="carousel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CertificationCarousel certifications={certifications} />
              </motion.div>
            ) : (
              <motion.div
                key="gallery"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CertificationGallery certifications={certifications} />
              </motion.div>
            )}
          </AnimatePresence>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="My Projects">
          <ProjectCarousel projects={projects} />
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Get In Touch" className="bg-gradient-to-b from-black via-blue-950/20 to-black">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-white/5 border-blue-500/20 hover-card">
              <CardContent className="p-6 space-y-6">
                <h3 className="text-xl font-heading font-bold text-white flex items-center">
                  <Image src="/icons/contact.png" alt="Contact" width={24} height={24} className="mr-2" />
                  Contact Information
                </h3>

                {[
                  { icon: "/icons/email.png", text: "atifashraf341@gmail.com", label: "Email" },
                  { icon: "/icons/phone.png", text: "+91 9347252368", label: "Phone" },
                  { icon: "/icons/location.png", text: "Hyderabad", label: "Location" },
                  { icon: "/icons/availability.png", text: "Available", label: "Status" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 group">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 group-hover:text-blue-300 transition-all duration-300">
                      <Image src={item.icon || "/placeholder.svg"} alt={item.label} width={20} height={20} />
                    </div>
                    <div>
                      <p className="text-sm text-blue-400">{item.label}</p>
                      <p className="text-white group-hover:text-blue-300 transition-colors duration-300">{item.text}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <h4 className="text-white font-medium mb-3">Connect with me:</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: "/icons/github.png", href: "https://github.com/atifashraf46", label: "GitHub" },
                      {
                        icon: "/icons/linkedin.png",
                        href: "https://www.linkedin.com/in/mohammadatifhussain",
                        label: "LinkedIn",
                      },
                      { icon: "/icons/email.png", href: "mailto:atifashraf341@gmail.com", label: "Email" },
                    ].map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        target="_blank"
                        className="p-3 bg-blue-500/10 rounded-full hover:bg-blue-500/20 transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <Image src={social.icon || "/placeholder.svg"} alt={social.label} width={20} height={20} />
                      </Link>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-blue-500/20 hover-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center">
                  <Image src="/icons/message.png" alt="Message" width={24} height={24} className="mr-2" />
                  Send Me a Message
                </h3>

                <form className="space-y-4" action="https://formsubmit.co/atifashraf341@gmail.com" method="POST">
                  <input type="hidden" name="_subject" value="New portfolio contact message!" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-white/80">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-white/80">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-white/80">
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      required
                      className="flex h-10 w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="Subject"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-white/80">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="flex min-h-[120px] w-full rounded-md border border-blue-500/30 bg-white/5 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02] transition-all duration-300 group"
                  >
                    Send Message
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="py-8 relative overflow-hidden border-t border-blue-500/20">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-5"></div>

        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row relative z-10">
          <p className="text-center text-sm leading-loose text-white/60 md:text-left">
            © {new Date().getFullYear()} Mohammad Atif Hussain. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: <Github className="h-5 w-5" />, href: "https://github.com/atifashraf46", label: "GitHub" },
              {
                icon: <Linkedin className="h-5 w-5" />,
                href: "https://www.linkedin.com/in/mohammadatifhussain",
                label: "LinkedIn",
              },
              { icon: <Mail className="h-5 w-5" />, href: "mailto:atifashraf341@gmail.com", label: "Email" },
            ].map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                asChild
                className="text-white/60 hover:text-blue-400 hover:bg-blue-500/10 hover:scale-110 transition-all duration-300"
              >
                <Link href={social.href} target="_blank" aria-label={social.label}>
                  {social.icon}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </footer>

      {/* Hire Me Button */}
      <HireMeButton />
    </div>
  )
}

// Section component with animations
function Section({
  id,
  title,
  children,
  className = "",
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id={id} className={`py-20 relative overflow-hidden ${className}`} ref={ref}>
      <div className="absolute inset-0 bg-[url('/circuit-pattern.png')] opacity-5"></div>
      <div className="container relative z-10">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold font-heading text-white">{title}</h2>
          <div className="h-1 w-20 bg-blue-500 mt-4"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

// Skill Card Component
function SkillCard({
  title,
  skills,
  icon,
}: { title: string; skills: { name: string; level: number; description?: string }[]; icon: string }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <Card className="bg-white/5 border-blue-500/20 hover-card overflow-hidden" ref={ref}>
      <CardContent className="p-6">
        <h3 className="text-xl font-heading font-bold text-white mb-6 flex items-center">
          <Image src={icon || "/placeholder.svg"} alt={title} width={24} height={24} className="mr-2" />
          {title}
        </h3>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-item"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-white">{skill.name}</span>
                <span className="text-sm font-medium text-blue-400">{skill.level}%</span>
              </div>
              {skill.description && <p className="text-xs text-white/70 mb-2">{skill.description}</p>}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

// Resume Item Component
function ResumeItem({
  title,
  organization,
  period,
  description,
  tags,
  achievements,
  index,
}: {
  title: string
  organization: string
  period: string
  description: string[]
  tags: string[]
  achievements?: string[]
  index: number
}) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      className="relative hover-card-subtle group"
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-black border-4 border-blue-500/30 group-hover:border-blue-500 transition-colors duration-300 flex items-center justify-center">
        <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
      </div>
      <Card className="bg-white/5 border-blue-500/20">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-heading text-white text-lg font-bold group-hover:text-blue-400 transition-colors duration-300">
                {title}
              </h4>
              <p className="text-white/70">{organization}</p>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border-none">{period}</Badge>
          </div>

          <ul className="space-y-2 text-white/80 mb-4">
            {description.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                {item}
              </li>
            ))}
          </ul>

          {achievements && achievements.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-medium text-blue-400 mb-2">Achievements:</h5>
              <ul className="space-y-2 text-white/80">
                {achievements.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mr-2 text-blue-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tech, techIndex) => (
                <Badge
                  key={techIndex}
                  variant="outline"
                  className="bg-white/5 text-white/70 border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

// Sample data - replace with your own
const projects = [
  {
    title: "Amazon Clone",
    description: "A responsive Amazon clone website with product listings and UI elements.",
    image: "/project-amazon.png",
    technologies: ["HTML", "CSS", "Bootstrap"],
    github: "https://github.com/atifashraf46/Amazon-Clone",
    demo: "https://github.com/atifashraf46/Amazon-Clone",
  },
  {
    title: "Rock-Paper-Scissors Game",
    description: "Interactive game with score tracking and animations.",
    image: "/project-rockpaper.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/atifashraf46/MICRO.IT/tree/main/ROCK-PAPER-SESSIOR",
    demo: "https://github.com/atifashraf46/MICRO.IT/tree/main/ROCK-PAPER-SESSIOR",
  },
  {
    title: "Tic-Tac-Toe Game",
    description: "Classic Tic-Tac-Toe game with win detection and player turns.",
    image: "/project-tictactoe.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/atifashraf46/MICRO.IT/tree/main/TIC-TAC-TOE",
    demo: "https://github.com/atifashraf46/MICRO.IT/tree/main/TIC-TAC-TOE",
  },
  {
    title: "Hourly Bus Demand Prediction",
    description: "Machine learning model to predict hourly bus demand based on historical data.",
    image: "/project-bus.png",
    technologies: ["Python", "Machine Learning", "Data Analysis"],
    github: "#",
    demo: "#",
  },
  {
    title: "Fetal Brain Abnormality Detection",
    description: "AI-based system for detecting abnormalities in fetal brain scans.",
    image: "/project-brain.png",
    technologies: ["Python", "Deep Learning", "Computer Vision"],
    github: "#",
    demo: "#",
  },
]

const frontendSkills = [
  { name: "HTML/CSS", level: 95 },
  { name: "JavaScript", level: 90 },
  { name: "React", level: 85 },
  { name: "Bootstrap", level: 90 },
  { name: "UI/UX", level: 80 },
]

const backendSkills = [
  { name: "Python", level: 90 },
  { name: "Node.js", level: 80 },
  { name: "MongoDB", level: 75 },
  { name: "SQL", level: 70 },
  { name: "Flask", level: 75 },
]

const softSkills = [
  {
    name: "Communication Skills",
    level: 91,
    description: "Clearly explains technical concepts to both technical and non-technical stakeholders.",
  },
  {
    name: "Problem-Solving",
    level: 90,
    description: "Approaches bugs and errors with logical thinking and creative solutions.",
  },
  {
    name: "Team Collaboration",
    level: 95,
    description: "Works efficiently in cross-functional teams using tools like Git, Slack, and Agile boards.",
  },
  {
    name: "Critical Thinking",
    level: 89,
    description: "Analyzes project requirements deeply and proposes optimal solutions before implementation.",
  },
  {
    name: "Time Management",
    level: 95,
    description: "Learns new technologies quickly and adapts to evolving project needs.",
  },
  {
    name: "Initiative & Self-Motivation",
    level: 91,
    description: "Proactively takes responsibility and continues learning outside the job scope.",
  },
  {
    name: "Adaptability",
    level: 95,
    description: "Learns new technologies quickly and adapts to evolving project needs.",
  },
]

const otherSkills = [
  "Git",
  "GitHub",
  "Responsive Design",
  "RESTful APIs",
  "TypeScript",
  "UI/UX Design",
  "AWS",
  "Salesforce",
  "Apex",
]

const certifications = [
  {
    title: "Salesforce Developer",
    issuer: "Smart InternZ",
    date: "December 2023",
    description:
      "Completed an 8-week Salesforce Developer internship at Smart InternZ. Developed CRM automation solutions using Apex and improved data management workflows by integrating Salesforce APIs.",
    image: "/cert-salesforce.png",
    link: "https://drive.google.com/file/d/1JFdFyjLgyD_66oUD9rbLDkrqplBHQ_1a/view?usp=drive_link",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2023",
    description:
      "This certification involved 300+ hours of learning and hands-on practice, covering everything from: ✅ HTML & CSS ✅ Flexbox & Grid ✅ Responsive layouts ✅ Web accessibility ✅ Real-world projects. Building pixel-perfect and responsive websites that adapt across devices is no longer just a concept for me — it's a skill I now own! 💪💻",
    image: "/cert-responsive.png",
    link: "https://drive.google.com/file/d/1BrFSP05FIUbgoXwwj8dza4Qc0wTuRuhf/view?usp=drive_link",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2023",
    description:
      "Representing over 300+ hours of focused learning and hands-on coding. Throughout this journey, I've built a solid foundation in: ✅ JavaScript ES6 ✅ Functional Programming ✅ Object-Oriented Programming ✅ Recursion, Algorithms & Big-O Thinking ✅ Working with Arrays, Objects, Stacks, Queues, Linked Lists ✅ Dynamic Programming, Search and Sorting Algorithms ✅ Debugging and writing clean, testable code",
    image: "/cert-javascript.png",
    link: "https://drive.google.com/file/d/1Q890g8Ejq8pKKzT1n9ccfERzbkFPnGA8/view?usp=drive_link",
  },
  {
    title: "MongoDB",
    issuer: "MongoDB University",
    date: "2023",
    description: "Comprehensive training on MongoDB database design, querying, and administration.",
    image: "/cert-mongodb.png",
    link: "https://drive.google.com/drive/folders/1Jo34XoksdA-_Sd4X_grHAHQdNuoQeTVl?usp=drive_link",
  },
  {
    title: "Python Programming Lesson",
    issuer: "CodeTantra",
    date: "2022",
    description: "Mastered Python programming fundamentals, data structures, and application development.",
    image: "/cert-python.png",
    link: "https://drive.google.com/file/d/1SVDIOEqK-m15N9UWvsEwF3F3rocr4Nng/view?usp=drive_link",
  },
  {
    title: "Data Structures Using Python Programming",
    issuer: "CodeTantra",
    date: "2022",
    description: "Advanced course on implementing and using data structures in Python for efficient algorithms.",
    image: "/cert-datastructures.png",
    link: "https://drive.google.com/file/d/1oAyE66ffIh703uogz1quSqS8JigoOTVQ/view?usp=drive_link",
  },
  {
    title: "PCAP: Programming Essentials in Python",
    issuer: "Cisco Networking Academy®",
    date: "2022",
    description: "Professional certification in Python programming covering core concepts and best practices.",
    image: "/cert-pcap.png",
    link: "https://drive.google.com/file/d/1Tcb_X7QC50FBb37Xfiu6kjTW6yK5wCWk/view?usp=drive_link",
  },
  {
    title: "AWS S3 Basics",
    issuer: "Coursera",
    date: "2023",
    description: "Learned AWS S3 storage service fundamentals, configuration, and best practices.",
    image: "/cert-aws.png",
    link: "https://drive.google.com/file/d/1xFjecwXXBc5dZfJCXcVmHzjANYfZHsub/view?usp=drive_link",
  },
  {
    title: "L'OREAL Sustainability Challenge",
    issuer: "Unstop",
    date: "2023",
    description: "Participated in developing sustainable solutions for the beauty industry.",
    image: "C:\Users\atifa\OneDrive\Desktop\cover images\certificate cvr img\lorel.png",
    link: "https://drive.google.com/file/d/10tCqBHnrvlgr_lpt1S_VK10kNYJbxd7t/view?usp=drive_link",
  },
  {
    title: "Humane-R Presents: Lead, Engage, Inspire",
    issuer: "Unstop",
    date: "2023",
    description: "Leadership and team management training program focused on engagement and inspiration.",
    image: "/cert-humaner.png",
    link: "https://drive.google.com/file/d/1C_kJAm8ubbxrRJYBFfYIJGZeAu0cxLQU/view?usp=drive_link",
  },
  {
    title: "National Level Hackathon",
    issuer: "Hackathon Organization",
    date: "2023",
    description: "Participated in a national-level hackathon, developing innovative solutions under time constraints.",
    image: "C:\Users\atifa\OneDrive\Desktop\cover images\certificate cvr img\hacthon.png",
    link: "https://drive.google.com/file/d/1ynG6xl9kh4thI5cP_BMc_ISRx9iDUl1M/view?usp=drive_link",
  },
]
