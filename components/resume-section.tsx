import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Briefcase, GraduationCap } from "lucide-react"

export function ResumeSection() {
  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-tr from-primary/10 via-transparent to-transparent"></div>

      <div className="container relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl font-bold font-heading text-white">My Resume</h2>
          <div className="h-1 w-20 bg-primary mt-4"></div>
          <p className="mt-4 text-white/70 max-w-xl text-center">A summary of my education and work experience</p>
          <Button
            variant="outline"
            className="mt-6 border-white/10 text-white hover:bg-primary/20 hover:text-primary hover:border-primary/30 transition-all duration-300 group"
          >
            <Download className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
            Download Full Resume
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Work Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/20 text-primary">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Work Experience</h3>
            </div>

            <div className="relative pl-6 border-l border-white/10 space-y-10">
              {workExperience.map((job, index) => (
                <div key={index} className="relative hover-card-subtle group">
                  <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-black border-4 border-primary/30 group-hover:border-primary transition-colors duration-300"></div>
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-heading text-white group-hover:text-primary transition-colors duration-300">
                            {job.title}
                          </CardTitle>
                          <CardDescription className="text-white/70">{job.company}</CardDescription>
                        </div>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                          {job.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-white/80">
                        {job.responsibilities.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="mr-2 text-primary">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {job.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="bg-white/5 text-white/70 border-white/10 hover:bg-primary/10 hover:text-primary transition-all duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/20 text-primary">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold font-heading text-white">Education</h3>
            </div>

            <div className="relative pl-6 border-l border-white/10 space-y-10">
              {education.map((edu, index) => (
                <div key={index} className="relative hover-card-subtle group">
                  <div className="absolute -left-[25px] h-10 w-10 rounded-full bg-black border-4 border-primary/30 group-hover:border-primary transition-colors duration-300"></div>
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="font-heading text-white group-hover:text-primary transition-colors duration-300">
                            {edu.degree}
                          </CardTitle>
                          <CardDescription className="text-white/70">{edu.institution}</CardDescription>
                        </div>
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none">
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80">{edu.description}</p>
                      {edu.achievements && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-white mb-2">Achievements:</h4>
                          <ul className="space-y-2 text-white/80">
                            {edu.achievements.map((item, i) => (
                              <li key={i} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const workExperience = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2021 - Present",
    responsibilities: [
      "Led the development of the company's flagship web application using React and Next.js",
      "Implemented responsive designs and improved site performance by 40%",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "Web Developer",
    company: "Digital Solutions LLC",
    period: "2018 - 2021",
    responsibilities: [
      "Developed and maintained client websites and web applications",
      "Collaborated with designers to implement pixel-perfect UI",
      "Integrated third-party APIs and services",
    ],
    technologies: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
  {
    title: "Junior Developer",
    company: "StartUp Ventures",
    period: "2016 - 2018",
    responsibilities: [
      "Assisted in the development of web applications",
      "Fixed bugs and implemented new features",
      "Participated in daily stand-ups and sprint planning",
    ],
    technologies: ["HTML/CSS", "JavaScript", "jQuery", "PHP"],
  },
]

const education = [
  {
    degree: "Master of Computer Science",
    institution: "Tech University",
    period: "2014 - 2016",
    description:
      "Specialized in web technologies and software engineering with a focus on modern JavaScript frameworks and cloud computing.",
    achievements: [
      "Graduated with honors (GPA: 3.8/4.0)",
      "Published research paper on web performance optimization",
      "Received scholarship for academic excellence",
    ],
  },
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "State University",
    period: "2010 - 2014",
    description:
      "Studied fundamental computer science concepts, algorithms, data structures, and software development methodologies.",
    achievements: [
      "Dean's List for 6 consecutive semesters",
      "Led team project that won university hackathon",
      "Teaching assistant for Introduction to Programming",
    ],
  },
]
