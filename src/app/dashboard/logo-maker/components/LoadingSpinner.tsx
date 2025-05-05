'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 bg-[rgba(0,0,0,0.2)] rounded-2xl border border-[rgba(255,255,255,0.1)]">
      <div className="w-16 h-16 border-4 border-[rgb(239,252,118)] border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(239,252,118,0.3)]"></div>
      <p className="text-[rgba(255,255,255,0.9)] text-lg font-medium">Generating your logos...</p>
    </div>
  )
}
