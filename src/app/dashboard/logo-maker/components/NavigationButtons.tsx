'use client'

interface NavigationButtonsProps {
  currentStep: number
  isLoading: boolean
  selectedStyle: string
  description: string
  companyName: string
  hasGeneratedLogos: boolean
  onBack: () => void
  onNext: () => void
  onCreateNew: () => void
}

export default function NavigationButtons({
  currentStep,
  isLoading,
  selectedStyle,
  description,
  companyName,
  hasGeneratedLogos,
  onBack,
  onNext,
  onCreateNew
}: NavigationButtonsProps) {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto w-full">
      {currentStep === 4 && hasGeneratedLogos ? (
        <button
          onClick={onCreateNew}
          className="px-4 sm:px-6 py-2.5 sm:py-3 text-white hover:text-white transition-all duration-300 bg-[rgba(239,252,118,0.2)] hover:bg-[rgba(239,252,118,0.3)] rounded-xl font-medium text-sm sm:text-base w-[140px] sm:w-auto"
        >
          Create New Logo
        </button>
      ) : currentStep > 1 && currentStep < 4 && (
        <button
          onClick={onBack}
          className="px-4 sm:px-6 py-2.5 sm:py-3 text-[rgba(255,255,255,0.8)] hover:text-white transition-all duration-300 bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.12)] rounded-xl font-medium text-sm sm:text-base w-[100px] sm:w-auto"
        >
          Back
        </button>
      )}
      {currentStep < 4 && (
        <button
          onClick={onNext}
          disabled={
            (currentStep === 1 && !selectedStyle) ||
            (currentStep === 2 && !description.trim()) ||
            (currentStep === 3 && !companyName.trim()) ||
            isLoading
          }
          className="px-4 sm:px-8 py-2.5 sm:py-3 bg-[rgb(239,252,118)] text-black rounded-xl hover:bg-[rgba(239,252,118,0.9)] disabled:opacity-50 transition-all duration-300 ml-auto font-semibold text-base sm:text-lg shadow-lg hover:shadow-[0_0_20px_rgba(239,252,118,0.3)] transform hover:-translate-y-1 w-[100px] sm:w-auto"
        >
          {currentStep === 3 ? 'Generate' : 'Next'}
        </button>
      )}
    </div>
  )
}
