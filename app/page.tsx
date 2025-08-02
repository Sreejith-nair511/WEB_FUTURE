"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Rocket,
  Trophy,
  Users,
  Github,
  Linkedin,
  Instagram,
  Star,
  ArrowRight,
  Play,
  Award,
  Zap,
  Brain,
  Cog,
  Menu,
  X,
} from "lucide-react"

// Floating Navbar Component
function FloatingNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = ["Home", "Vision", "Projects", "Achievements", "Join"]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md" : "bg-transparent"
      } rounded-full border border-purple-500/30 px-6 py-3`}
    >
      <div className="flex items-center justify-between">
        <motion.div
          className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
        >
          AdAstra
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 ml-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {item}
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"
                layoutId="navbar-indicator"
              />
            </motion.a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pt-4 border-t border-purple-500/30"
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

// Glowing Stars Background Component
function GlowingStarsBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Larger glowing orbs */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `radial-gradient(circle, ${
              ["#3b82f6", "#8b5cf6", "#ec4899"][Math.floor(Math.random() * 3)]
            }, transparent)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}

// Sparkles Text Component
function SparklesText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {children}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

// Card Hover Effect Component
function CardHoverEffect({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{ scale: 1.05, rotateY: 5 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// Wavy Background Component
function WavyBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="none">
        <motion.path
          d="M0,400 C300,200 600,600 1200,400 L1200,800 L0,800 Z"
          fill="url(#waveGradient)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function AdAstraHomepage() {
  const { scrollYProgress } = useScroll()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const whatWeDo = [
    {
      title: "Drone Development",
      icon: <Rocket className="w-8 h-8" />,
      content: "Advanced UAV systems for surveillance, delivery, and agricultural applications across India",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI + Robotics",
      icon: <Brain className="w-8 h-8" />,
      content: "Intelligent automation solutions for Indian manufacturing and service industries",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Industrial Tie-ups",
      icon: <Cog className="w-8 h-8" />,
      content: "Partnerships with Tata, Mahindra, and emerging Indian tech startups",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Workshops + Training",
      icon: <Users className="w-8 h-8" />,
      content: "Skill development programs aligned with Digital India and Make in India initiatives",
      gradient: "from-orange-500 to-red-500",
    },
  ]

  const projects = [
    {
      title: "Swadeshi Surveillance Drone",
      desc: "Indigenous border monitoring system for Indian Armed Forces",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["Python", "OpenCV", "ROS", "TensorFlow"],
      achievement: "Selected for DefExpo 2024",
    },
    {
      title: "Kisan Mitra AgriBot",
      desc: "AI-powered farming assistant for precision agriculture in rural India",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["IoT", "Machine Learning", "Arduino", "React"],
      achievement: "Winner - Smart India Hackathon 2023",
    },
    {
      title: "Urban Delivery Swarm",
      desc: "Multi-drone coordination system for last-mile delivery in Indian cities",
      image: "/placeholder.svg?height=300&width=400",
      tech: ["ROS", "Python", "5G", "Cloud"],
      achievement: "Funded by Startup India",
    },
  ]

  const achievements = [
    {
      year: "2024",
      title: "National Robotics Championship",
      desc: "1st Place - All India Council for Technical Education (AICTE)",
      icon: <Trophy className="w-6 h-6" />,
      color: "from-yellow-400 to-orange-500",
    },
    {
      year: "2023",
      title: "Smart India Hackathon",
      desc: "Grand Winner - Ministry of Electronics & IT",
      icon: <Award className="w-6 h-6" />,
      color: "from-blue-400 to-purple-500",
    },
    {
      year: "2023",
      title: "IIT Bombay TechFest",
      desc: "Best Innovation Award - Robotics Category",
      icon: <Star className="w-6 h-6" />,
      color: "from-green-400 to-cyan-500",
    },
    {
      year: "2022",
      title: "AdAstra Foundation",
      desc: "Established with support from CIT Alumni Network",
      icon: <Rocket className="w-6 h-6" />,
      color: "from-purple-400 to-pink-500",
    },
  ]

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Alumni, Software Engineer at Flipkart",
      quote:
        "AdAstra transformed me from a curious first-year to a confident robotics engineer. The hands-on projects prepared me for real-world challenges in the Indian tech ecosystem.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Dr. Priya Nair",
      role: "Faculty Advisor, Dept. of Electronics",
      quote:
        "These students consistently push boundaries. Their work on indigenous drone technology is contributing to India's self-reliance in defense and agriculture.",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Rahul Gupta",
      role: "Final Year, Placed at Tata Consultancy Services",
      quote:
        "From zero coding knowledge to building AI-powered robots - AdAstra's mentorship and project-based learning made the impossible possible!",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <FloatingNavbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center" ref={heroRef}>
        <GlowingStarsBackground />

        <motion.div className="text-center max-w-6xl mx-auto px-4 z-10" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.h1
              className="text-6xl md:text-9xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-magenta-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              style={{ backgroundSize: "200% 200%" }}
            >
              AdAstra
            </motion.h1>

            <motion.div
              className="text-3xl md:text-5xl font-light mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <SparklesText>Rise Above. Build Beyond.</SparklesText>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              The official Robotics & Drone Club of CIT – where innovation takes flight across Bharat
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-magenta-600 hover:from-blue-700 hover:via-purple-700 hover:to-magenta-700 text-white px-12 py-6 text-xl rounded-full group relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10 flex items-center">
                Join the Movement
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 border-2 border-blue-400/30 rounded-full"
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 border-2 border-purple-400/30 rounded-full"
          animate={{ rotate: -360, scale: [1, 0.8, 1] }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-16 h-16 border-2 border-magenta-400/30 rounded-full"
          animate={{ rotate: 360, y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </section>

      {/* Our Vision Section */}
      <section id="vision" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-12">
              <SparklesText className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Our Vision
              </SparklesText>
            </h2>
            <motion.p
              className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
            >
              To pioneer <span className="text-blue-400 font-semibold">Innovation</span> in robotics, achieve complete{" "}
              <span className="text-purple-400 font-semibold">Autonomy</span> in drone technology, and elevate Indian{" "}
              <span className="text-magenta-400 font-semibold">Engineering</span> to new heights through intelligent
              systems that serve humanity.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section id="projects" className="relative py-32 px-4">
        <WavyBackground>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                What We Do
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transforming ideas into reality through cutting-edge technology and Indian innovation
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {whatWeDo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <CardHoverEffect>
                    <Card className="bg-gray-900/80 border-gray-700 hover:border-purple-400 transition-all duration-300 h-full">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${item.gradient} mr-4`}>{item.icon}</div>
                          <h3 className="text-2xl font-bold">{item.title}</h3>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">{item.content}</p>
                      </CardContent>
                    </Card>
                  </CardHoverEffect>
                </motion.div>
              ))}
            </div>
          </div>
        </WavyBackground>
      </section>

      {/* Featured Projects Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-magenta-400 to-blue-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-300">Innovation that's making India proud on the global stage</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <CardHoverEffect>
                  <Card className="bg-gray-900/80 border-gray-700 hover:border-purple-400 transition-all duration-300 overflow-hidden group">
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-green-600 hover:bg-green-700">
                        {project.achievement}
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{project.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="border-gray-600 text-gray-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black bg-transparent group"
                      >
                        <Play className="mr-2 w-4 h-4 group-hover:scale-110 transition-transform" />
                        View Demo
                      </Button>
                    </CardContent>
                  </Card>
                </CardHoverEffect>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Timeline */}
      <section id="achievements" className="relative py-32 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Our Journey
            </h2>
            <p className="text-xl text-gray-300">Milestones that shaped India's robotics future</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 via-purple-600 to-magenta-600 rounded-full" />

            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-16 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                  <CardHoverEffect>
                    <Card className="bg-gray-900/90 border-gray-700 hover:border-purple-400 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-3">
                          <Badge className={`bg-gradient-to-r ${achievement.color} text-black mr-3`}>
                            {achievement.year}
                          </Badge>
                          <div className="text-yellow-400">{achievement.icon}</div>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{achievement.title}</h3>
                        <p className="text-gray-300">{achievement.desc}</p>
                      </CardContent>
                    </Card>
                  </CardHoverEffect>
                </div>

                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-black"
                  whileInView={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-magenta-400 bg-clip-text text-transparent">
              Voices of Innovation
            </h2>
            <p className="text-xl text-gray-300">Stories from the AdAstra family</p>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
            >
              <CardHoverEffect>
                <Card className="bg-gray-900/90 border-gray-700 p-8">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-center mb-6">
                      <img
                        src={testimonials[currentTestimonial].image || "/placeholder.svg"}
                        alt={testimonials[currentTestimonial].name}
                        className="w-16 h-16 rounded-full border-2 border-purple-400 mr-4"
                      />
                      <div className="text-left">
                        <h4 className="text-xl font-bold text-white">{testimonials[currentTestimonial].name}</h4>
                        <p className="text-purple-400">{testimonials[currentTestimonial].role}</p>
                      </div>
                    </div>
                    <p className="text-xl md:text-2xl text-gray-300 italic leading-relaxed">
                      "{testimonials[currentTestimonial].quote}"
                    </p>
                  </CardContent>
                </Card>
              </CardHoverEffect>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial ? "bg-purple-400 scale-125" : "bg-gray-600 hover:bg-gray-500"
                }`}
                onClick={() => setCurrentTestimonial(index)}
              />
            ))}
          </div>

          {/* Hashtag Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {["#AdAstraRoar", "#SilentAchievers", "#MakeInIndia", "#DigitalBharat", "#InnovateIndia"].map(
                (hashtag, index) => (
                  <motion.span
                    key={hashtag}
                    className="text-blue-400 hover:text-purple-400 cursor-pointer transition-colors"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {hashtag}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Join Us CTA Section */}
      <section id="join" className="relative py-32 px-4">
        <WavyBackground>
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                <SparklesText>Be the Future</SparklesText>
              </h2>
              <p className="text-2xl text-gray-300 mb-12">Your journey to revolutionize Indian robotics starts here</p>

              <CardHoverEffect>
                <Card className="bg-gray-900/90 border-gray-700 p-8">
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        placeholder="Your Name"
                        className="bg-black/50 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400 h-12"
                      />
                      <Input
                        placeholder="Email Address"
                        type="email"
                        className="bg-black/50 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400 h-12"
                      />
                    </div>
                    <Input
                      placeholder="Area of Interest (Drones, AI, Robotics, IoT, etc.)"
                      className="bg-black/50 border-gray-600 focus:border-purple-400 text-white placeholder-gray-400 h-12"
                    />
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-magenta-600 hover:from-purple-700 hover:via-blue-700 hover:to-magenta-700 text-white py-6 text-xl font-semibold relative overflow-hidden group"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <span className="relative z-10 flex items-center justify-center">
                          <Rocket className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                          Launch with AdAstra
                          <Zap className="ml-3 w-6 h-6 group-hover:scale-110 transition-transform" />
                        </span>
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </CardHoverEffect>
            </motion.div>
          </div>
        </WavyBackground>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <motion.h3
                className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
                whileHover={{ scale: 1.05 }}
              >
                AdAstra
              </motion.h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Where innovation takes flight across Bharat. Join us in shaping the future of robotics and drone
                technology for a self-reliant India.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: <Instagram className="w-5 h-5" />, color: "hover:text-pink-400" },
                  { icon: <Linkedin className="w-5 h-5" />, color: "hover:text-blue-400" },
                  { icon: <Github className="w-5 h-5" />, color: "hover:text-gray-300" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className={`p-3 rounded-full border border-gray-600 text-gray-400 ${social.color} transition-all duration-300 hover:border-current hover:scale-110`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-purple-400">Quick Links</h4>
              <div className="space-y-3">
                {["Team", "Events", "Resources", "Certificates", "Gallery"].map((link, index) => (
                  <motion.div
                    key={link}
                    className="text-gray-300 hover:text-white cursor-pointer transition-colors"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {link}
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-6 text-blue-400">Our Partners</h4>
              <div className="space-y-3 text-gray-400">
                <div>Tata Group</div>
                <div>Mahindra Tech</div>
                <div>Startup India</div>
                <div>DRDO</div>
                <div>IIT Alumni Network</div>
              </div>
            </div>
          </div>

          <motion.div
            className="border-t border-gray-800 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-lg">&copy; 2024 AdAstra Robotics & Drone Club. Proudly Made in India 🇮🇳</p>
            <p className="text-sm text-gray-500 mt-2">Empowering the next generation of Indian innovators</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
