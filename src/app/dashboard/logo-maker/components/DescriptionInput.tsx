'use client'

import { Wand2 } from 'lucide-react'

interface DescriptionInputProps {
  description: string
  onDescriptionChange: (description: string) => void
  onEnhancePrompt: () => void
  isLoading: boolean
}

export default function DescriptionInput({
  description,
  onDescriptionChange,
  onEnhancePrompt,
  isLoading
}: DescriptionInputProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Describe Your Logo
      </h2>
      <div className="flex flex-col space-y-3">
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe additional details for your logo... (e.g., design elements, colors, style preferences, brand personality)"
          className="w-full p-4 sm:p-5 bg-[rgba(255,255,255,0.08)] border-2 border-[rgba(255,255,255,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white placeholder-[rgba(255,255,255,0.5)] min-h-[150px] sm:min-h-[180px] text-base sm:text-lg resize-y shadow-inner"
        />
        <div className="flex justify-end">
          <button
            onClick={onEnhancePrompt}
            disabled={isLoading || !description.trim()}
            className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[rgba(255,255,255,0.12)] rounded-xl hover:bg-[rgba(255,255,255,0.18)] disabled:opacity-50 transition-all duration-300 text-[rgb(239,252,118)] font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
            title="Make prompt better"
          >
            <Wand2 size={16} />
            <span>Enhance Prompt</span>
          </button>
        </div>
      </div>
    </div>
  )
}
