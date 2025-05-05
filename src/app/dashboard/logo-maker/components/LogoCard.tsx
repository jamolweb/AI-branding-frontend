'use client'

import { Download, Heart, Maximize2, RefreshCw, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import ImageModal from './ImageModal'

export interface LogoCardProps {
  image: string
  logoId?: string
  prompt?: string
  createdAt?: string
  favoritesCount?: number
  isFavorite?: boolean
  showFavorite?: boolean
  showRegenerate?: boolean
  onView?: (imageUrl: string) => void
  onDownload?: (imageUrl: string) => void
  onRegenerate?: (imageUrl: string, logoId?: string) => void
  onDelete?: (logoId: string) => void
  onToggleFavorite?: (logoId: string) => void
  jobId?: string
}

export default function LogoCard({
  image,
  logoId,
  prompt,
  createdAt,
  favoritesCount,
  isFavorite = false,
  showFavorite = true,
  showRegenerate = false,
  onView,
  onDownload,
  onRegenerate,
  onDelete,
  onToggleFavorite,
  jobId
}: LogoCardProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleView = () => {
    if (onView) {
      onView(image)
    } else {
      setSelectedImage(image)
    }
  }

  const handleDownload = () => {
    if (onDownload) {
      onDownload(image)
    }
  }

  const handleRegenerate = () => {
    if (onRegenerate && logoId) {
      onRegenerate(image, jobId)
    }
  }

  const handleDelete = () => {
    if (onDelete && logoId) {
      onDelete(logoId)
    }
  }

  const handleToggleFavorite = () => {
    if (onToggleFavorite && logoId) {
      onToggleFavorite(logoId)
    }
  }

  return (
    <div className="relative group transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden">
      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={prompt || 'Generated logo'}
          fill
          className="rounded-xl shadow-xl w-full h-auto object-cover"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-xl flex items-center justify-center space-x-4 p-4">
        <button
          onClick={handleView}
          className="p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110"
          title="View Larger"
        >
          <Maximize2 size={20} className="text-black" />
        </button>

        <button
          onClick={handleDownload}
          className="p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110"
          title="Download"
        >
          <Download size={20} className="text-black" />
        </button>

        {showRegenerate && onRegenerate && (
          <button
            onClick={handleRegenerate}
            className="p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110"
            title="Regenerate"
          >
            <RefreshCw size={20} className="text-black" />
          </button>
        )}

        {showFavorite && onToggleFavorite && (
          <button
            onClick={handleToggleFavorite}
            className={`p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110 ${isFavorite
                ? 'bg-[rgb(239,252,118)] text-black'
                : 'bg-white text-black hover:bg-[rgb(239,252,118)]'
              }`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? 'currentColor' : 'none'}
            />
          </button>
        )}

        {onDelete && (
          <button
            onClick={handleDelete}
            className="p-3 bg-[rgb(239,252,118)] rounded-full hover:bg-[rgba(239,252,118,0.8)] transition-all duration-300 shadow-lg hover:shadow-[0_0_15px_rgba(239,252,118,0.4)] scale-100 hover:scale-110"
            title="Delete"
          >
            <Trash2 size={20} className="text-black" />
          </button>
        )}
      </div>

      {(prompt || createdAt || favoritesCount !== undefined) && (
        <div className="mt-2">
          {prompt && <p className="text-white text-sm truncate">{prompt}</p>}
          {createdAt && (
            <p className="text-[rgba(255,255,255,0.4)] text-xs">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          )}
          {favoritesCount !== undefined && (
            <p className="text-[rgba(255,255,255,0.4)] text-xs">
              {favoritesCount} {favoritesCount === 1 ? 'favorite' : 'favorites'}
            </p>
          )}
        </div>
      )}

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
