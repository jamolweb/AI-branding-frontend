'use client'

interface CompanyInputProps {
  companyName: string
  onCompanyNameChange: (name: string) => void
  slogan: string
  onSloganChange: (slogan: string) => void
}

export default function CompanyInput({
  companyName,
  onCompanyNameChange,
  slogan,
  onSloganChange
}: CompanyInputProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Enter Company Name
      </h2>
      <input
        type="text"
        value={companyName}
        onChange={(e) => onCompanyNameChange(e.target.value)}
        placeholder="Enter your company name..."
        className="w-full p-4 sm:p-5 bg-[rgba(255,255,255,0.08)] border-2 border-[rgba(255,255,255,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white placeholder-[rgba(255,255,255,0.5)] text-base sm:text-lg shadow-inner"
      />
      
      <div>
        <h3 className="text-xl font-medium text-white mb-4">
          Company Slogan <span className="text-[rgba(255,255,255,0.5)] text-sm">(Optional)</span>
        </h3>
        <input
          type="text"
          value={slogan}
          onChange={(e) => onSloganChange(e.target.value)}
          placeholder="Enter your company slogan..."
          className="w-full p-4 sm:p-5 bg-[rgba(255,255,255,0.08)] border-2 border-[rgba(255,255,255,0.15)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgb(239,252,118)] text-white placeholder-[rgba(255,255,255,0.5)] text-base sm:text-lg shadow-inner"
        />
      </div>
    </div>
  )
}
