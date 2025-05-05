'use client'

import { X } from 'lucide-react'
import Image from 'next/image'

interface ImageModalProps {
  imageUrl: string
  onClose: () => void
}

export default function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-8">
      <div className="relative max-w-3xl w-full bg-gradient-to-b from-[rgb(30,30,35)] to-[rgb(15,15,20)] rounded-2xl p-4 border-2 border-[rgba(239,252,118,0.3)] shadow-[0_0_30px_rgba(239,252,118,0.2)]">
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 p-2 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] z-10"
        >
          <X size={18} className="text-black" />
        </button>
        <div className="w-full max-w-xl mx-auto max-h-[80vh] p-2 bg-[rgba(255,255,255,0.03)] rounded-xl">
          <Image
            src={imageUrl}
            alt="Selected logo"
            width={500}
            height={500}
            className="object-contain rounded-xl shadow-2xl mx-auto"
          />
        </div>
      </div>
    </div>
  )
}
