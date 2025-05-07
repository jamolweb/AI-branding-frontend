'use client'

import React from 'react'
import { Paintbrush, Globe, Clock } from 'lucide-react'

const WhyBrandllySection = () => {
  const features = [
    {
      icon: <Paintbrush className="w-6 h-6 text-primary" />,

      title: "Generate unique logos, brand books, and marketing visuals",
      description: "Create professional branding assets powered by AI technology"
    },
    {
      icon: <Globe className="w-6 h-6 text-primary" />,
      title: "Launch hosted websites on your own subdomain",
      description: "Get your brand online quickly with custom web presence"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Save time, reduce costs, and eliminate creative bottlenecks",
      description: "Streamline your branding process with efficient AI solutions"
    }
  ]

  return (
    <div className="py-24 bg-transparent">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-white">
          Why Brandlly?
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Harness the power of AI to transform your branding journey
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            <div className="mb-5 p-3 bg-white/10 inline-block rounded-lg">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
              {feature.title}
            </h3>
            <p className="text-white/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhyBrandllySection
