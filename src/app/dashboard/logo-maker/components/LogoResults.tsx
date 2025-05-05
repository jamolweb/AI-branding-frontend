'use client'

import { Message } from '../types'
import LogoCard from './LogoCard'
import LoadingSpinner from './LoadingSpinner'

interface LogoResultsProps {
  messages: Message[]
  isLoading: boolean
  onViewImage: (imageUrl: string) => void
  onDownloadImage: (imageUrl: string) => void
  onRegenerateImage: (prompt: string, jobId?: string) => void
  onDeleteImage: (logoId: string) => void
}

export default function LogoResults({
  messages,
  isLoading,
  onViewImage,
  onDownloadImage,
  onRegenerateImage,
  onDeleteImage
}: LogoResultsProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Your Generated Logos
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          {messages.map((message, index) => (
            message.type === 'assistant' && message.images && (
              <div key={index} className="space-y-6 sm:space-y-8 bg-[rgba(0,0,0,0.2)] p-4 sm:p-6 rounded-2xl border border-[rgba(255,255,255,0.08)]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 mt-4 sm:mt-6">
                  {message.images.map((image, imgIndex) => {
                    const logoId = image.split('/').pop()?.split('?')[0];
                    return (
                      <LogoCard
                        key={imgIndex}
                        image={image}
                        logoId={logoId}
                        showRegenerate={true}
                        showFavorite={false}
                        onView={onViewImage}
                        onDownload={onDownloadImage}
                        onRegenerate={(_, jobId) => onRegenerateImage(message.content, message.jobId)}
                        onDelete={onDeleteImage}
                        jobId={message.jobId}
                      />
                    );
                  })}
                </div>
              </div>
            )
          ))}
        </div>
      )}
    </div>
  )
}
