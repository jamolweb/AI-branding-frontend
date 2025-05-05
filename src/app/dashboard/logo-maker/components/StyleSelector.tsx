'use client'

import { logoStyles } from '../data/logoStyles'

interface StyleSelectorProps {
  selectedStyle: string
  onStyleSelect: (styleId: string) => void
}

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Choose Logo Style
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {logoStyles.map(style => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style.id)}
            className={`p-4 sm:p-6 rounded-xl border-2 transition-all duration-300 ${selectedStyle === style.id
                ? 'border-[rgb(239,252,118)] bg-[rgba(239,252,118,0.15)] shadow-[0_0_15px_rgba(239,252,118,0.2)]'
                : 'border-[rgba(255,255,255,0.15)] hover:border-[rgba(239,252,118,0.6)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
          >
            <h3 className="text-white font-semibold text-base sm:text-lg mb-2 sm:mb-3">{style.name}</h3>
            <p className="text-[rgba(255,255,255,0.6)] text-sm">
              {style.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
