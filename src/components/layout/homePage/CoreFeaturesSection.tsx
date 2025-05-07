'use client'

import React from 'react'
import { Palette, BookOpen, Globe, Image, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

const CoreFeaturesSection = () => {
  const features = [
    {
      icon: <Palette className="w-6 h-6" />,
      emoji: "🎨",
      title: "AI Logo Generator",
      description: "Just enter your brand name and description"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      emoji: "📘",
      title: "Custom Brand Book",
      description: "Professional guidelines created in seconds"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      emoji: "🌐",
      title: "Instant Website Hosting",
      description: "Live sites on your own subdomain"
    },
    {
      icon: <Image className="w-6 h-6" aria-label="Marketing Visuals Icon" />,
      emoji: "🖼️",
      title: "Marketing Visuals",
      description: "AI-generated images and banners"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      emoji: "✍️",
      title: "Text & Content Generation",
      description: "Taglines, bios, brand messages"
    }
  ]

  return (
    <section className="py-24 bg-transparent">
      <div className="text-center mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-white"
        >
          Core Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl text-white/70 max-w-2xl mx-auto"
        >
          Everything you need to build your brand, all in one place
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all duration-300"
            role="article"
            aria-label={`${feature.title} feature`}
          >
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">{feature.emoji}</span>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
            </div>
            <p className="text-white/70 ml-10">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default CoreFeaturesSection
