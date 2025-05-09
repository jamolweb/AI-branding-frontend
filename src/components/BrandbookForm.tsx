'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SearchableSelect } from '@/components/ui/searchable-select';
import { api } from '@/services/api';
import { brandbookService } from '@/services/brandbook';
import { popularFonts } from '@/data/brandbook';
import { CreateBrandbookRequest } from '@/types/brandbook';
import { NODE_ENV } from '@/env';
import { Loader2, Upload, ArrowLeft, ArrowRight, Trash2, Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

// Define total number of steps and their names
const TOTAL_STEPS = 5;
const STEP_NAMES = [
  'Core Info',
  'AI Guidance',
  'Visual Identity',
  'Contact Info',
  'Review & Submit',
];

// Default color structure
const defaultColor = { name: '', value: '#000000', usageNote: '' };
const MAX_COLORS = 5;

// --- Stepper Component ---
interface StepperProps {
  totalSteps: number;
  currentStep: number;
  stepNames: string[]; // Added prop for names
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  stepNames,
}) => {
  // Ensure stepNames array has the correct length
  if (stepNames.length !== totalSteps) {
    console.warn('Stepper: stepNames length does not match totalSteps.');
    // Optionally return null or a default state
  }

  return (
    <div className="flex items-start justify-center w-full px-4 py-4">
      {' '}
      {/* Align items start */}
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const stepName = stepNames[index] || `Step ${stepNumber}`; // Fallback name

        return (
          <React.Fragment key={stepNumber}>
            {/* Connecting line (adjust vertical alignment if needed) */}
            {stepNumber > 1 && (
              <div
                className={`flex-1 h-0.5 mt-4 transition-colors duration-300 ${isCompleted || isActive
                  ? 'bg-[rgb(239,252,118)]'
                  : 'bg-gray-600'
                  }`}
                style={{ minWidth: '20px' }} // Ensure line has some width
              />
            )}
            {/* Step Container (Circle + Label) */}
            <div
              className="flex flex-col items-center mx-1"
              style={{ width: '80px' }}
            >
              {' '}
              {/* Added container with fixed width */}
              {/* Step Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 mb-1 ${isActive
                  ? 'bg-[rgb(239,252,118)] text-black'
                  : isCompleted
                    ? 'bg-[rgba(239,252,118,0.5)] text-gray-800'
                    : 'bg-gray-600 text-gray-400'
                  }`}
              >
                <span className="font-semibold text-sm">{stepNumber}</span>
              </div>
              {/* Step Label */}
              <span
                className={`text-xs text-center transition-colors duration-300 ${isActive
                  ? 'text-[rgb(239,252,118)]'
                  : isCompleted
                    ? 'text-gray-400'
                    : 'text-gray-500'
                  }`}
              >
                {stepName}
              </span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
// --- End Stepper Component ---

export function BrandbookForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1); // Step state
  const [loading, setLoading] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false); // Loading state for enhance prompt button
  const [error, setError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null); // Error for current step validation

  // --- State for Enhanced Form Data ---
  const [formData, setFormData] = useState<Partial<CreateBrandbookRequest>>(
    NODE_ENV === 'development'
      ? {
        // Initialize with default data in development environment
        companyName: 'LuminoTech',
        tagline: 'Empowering Tomorrow Through Intelligent, Sustainable Energy Solutions',
        industry: 'Technology',
        companyDescription: 'LuminoTech stands at the forefront of the global movement toward sustainable energy, offering state-of-the-art smart technologies designed to reduce carbon emissions, optimize energy consumption, and reshape how the world powers its future. Our solutions combine advanced data analytics, renewable energy integration, and IoT-enabled systems to empower businesses and communities with cleaner, smarter energy choices.',
        targetAudience: 'Businesses, communities, and individuals interested in adopting smart, sustainable energy solutions, reducing their carbon footprint, and integrating renewable energy systems and IoT technologies.',
        brandPersonalityKeywords: 'Innovative, sustainable, intelligent, eco-friendly, forward-thinking',
        visualStyleKeywords: 'Minimalist, modern, clean, geometric, tech-focused',
        toneOfVoice: 'Professional, authoritative, empowering, visionary',
        missionStatement: 'Our mission is to drive the global transition to sustainable energy by delivering innovative, intelligent, and accessible technology solutions that enhance efficiency, reduce environmental impact, and promote energy independence for all.',
        visionStatement: 'We envision a future where every home, business, and city is powered by intelligent energy systems that are clean, efficient, and resilient—creating a healthier planet and a more sustainable tomorrow.',
        primaryFontName: 'Poppins',
        secondaryFontName: 'Roboto',
        contactEmail: 'maya.chen@luminotech.io',
        contactWebsite: 'https://www.luminotech.io',
        contactPhone: '',
        contactAddress: '',
        brandColors: [
          {
            name: 'Primary',
            value: '#00A86B',
            usageNote: 'Main call-to-action color',
          },
          {
            name: 'Secondary',
            value: '#1A1A1A',
            usageNote: 'Backgrounds, dark text',
          },
        ],
      }
      : {
        companyName: '',
        tagline: '',
        industry: '',
        companyDescription: '',
        targetAudience: '',
        brandPersonalityKeywords: '',
        visualStyleKeywords: '',
        toneOfVoice: '',
        missionStatement: '',
        visionStatement: '',
        primaryFontName: '',
        secondaryFontName: '',
        contactEmail: '',
        contactWebsite: '',
        contactPhone: '',
        contactAddress: '',
        brandColors: [
          {
            name: '',
            value: '#000000',
            usageNote: '',
          },
        ],
      }
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  // const [referenceImageFiles, setReferenceImageFiles] = useState<File[]>([]); // Keep commented for now
  // --- End State ---

  // --- Input Handlers ---
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (stepError) setStepError(null);
  };

  const handleFontChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (stepError) setStepError(null);
  };

  const handleColorChange = (
    index: number,
    field: 'name' | 'value' | 'usageNote',
    value: string,
  ) => {
    setFormData((prev) => {
      if (!prev || !prev.brandColors) return prev; // Type guard
      const newColors = [...prev.brandColors];
      if (newColors[index]) {
        newColors[index] = { ...newColors[index], [field]: value };
      }
      return { ...prev, brandColors: newColors };
    });
    if (stepError) setStepError(null);
  };

  const addColorField = () => {
    setFormData((prev) => {
      if (!prev || !prev.brandColors || prev.brandColors.length >= MAX_COLORS)
        return prev;
      return {
        ...prev,
        brandColors: [...prev.brandColors, { ...defaultColor }],
      };
    });
  };

  const removeColorField = (index: number) => {
    setFormData((prev) => {
      if (!prev || !prev.brandColors || prev.brandColors.length <= 1)
        return prev; // Keep at least one
      const newColors = prev.brandColors.filter((_, i) => i !== index);
      return { ...prev, brandColors: newColors };
    });
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setStepError('Logo file size cannot exceed 5MB.');
        setLogoFile(null);
        e.target.value = '';
        return;
      }
      const allowedTypes = [
        'image/png',
        'image/jpeg',
        'image/jpg',
        'image/gif',
        'image/webp',
      ];
      if (!allowedTypes.includes(file.type)) {
        setStepError(
          'Invalid logo file type. Please use PNG, JPG, GIF, or WEBP.',
        );
        setLogoFile(null);
        e.target.value = '';
        return;
      }
      setLogoFile(file);
      setStepError(null);
    }
  };
  // --- End Input Handlers ---

  // --- Step Navigation & Validation ---
  const nextStep = () => {
    setStepError(null);
    let isValid = true;

    // Validate current step before proceeding
    if (currentStep === 1) {
      if (
        !formData.companyName ||
        !formData.industry ||
        !formData.companyDescription
      ) {
        setStepError(
          'Please fill in Company Name, Industry, and Company Description.',
        );
        isValid = false;
      }
    }
    if (currentStep === 2) {
      if (
        !formData.targetAudience ||
        !formData.brandPersonalityKeywords ||
        !formData.visualStyleKeywords ||
        !formData.toneOfVoice
      ) {
        setStepError(
          'Please provide Target Audience, Personality Keywords, Visual Keywords, and Tone of Voice.',
        );
        isValid = false;
      }
    }
    if (currentStep === 3) {
      if (
        !logoFile ||
        !formData.primaryFontName ||
        !formData.brandColors ||
        formData.brandColors.length === 0 ||
        formData.brandColors.some((c) => !c.name || !c.value)
      ) {
        setStepError(
          'Please upload a Logo, specify a Primary Font, and define at least one Brand Color (with name and value).',
        );
        isValid = false;
      }
    }
    if (currentStep === 4) {
      if (!formData.contactEmail || !formData.contactWebsite) {
        // Example: require email and website
        setStepError('Please provide at least Contact Email and Website.');
        isValid = false;
      }
    }

    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setStepError(null);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  // --- End Step Navigation ---

  // --- Form Submission ---
  const handleSubmit = async (/* e: React.FormEvent */) => {
    // No event needed if using button onClick
    if (currentStep !== TOTAL_STEPS) return;

    // e.preventDefault(); // Not needed if not using <form> onSubmit
    setLoading(true);
    setError(null);
    setStepError(null);

    if (!logoFile) {
      setError('Logo file is missing.');
      setLoading(false);
      setCurrentStep(3); // Go back to visuals step
      return;
    }

    try {
      // Filter out empty color entries before submission
      const finalBrandColors = formData.brandColors?.filter(
        (c) => c.name.trim() && c.value.trim(),
      );

      // Construct final request data, ensuring required fields are present
      const requestData: CreateBrandbookRequest = {
        companyName: formData.companyName || '',
        tagline: formData.tagline,
        industry: formData.industry,
        companyDescription: formData.companyDescription,
        targetAudience: formData.targetAudience,
        brandPersonalityKeywords: formData.brandPersonalityKeywords,
        visualStyleKeywords: formData.visualStyleKeywords,
        toneOfVoice: formData.toneOfVoice,
        missionStatement: formData.missionStatement,
        visionStatement: formData.visionStatement,
        logo: logoFile, // Already validated
        brandColors: finalBrandColors,
        primaryFontName: formData.primaryFontName,
        secondaryFontName: formData.secondaryFontName,
        contactEmail: formData.contactEmail,
        contactWebsite: formData.contactWebsite,
        contactPhone: formData.contactPhone,
        contactAddress: formData.contactAddress,
      };

      console.log('Submitting Data:', requestData);

      // --- Prepare FormData for Backend ---
      const backendFormData = new FormData();

      Object.entries(requestData).forEach(([key, value]) => {
        if (key === 'logo' && value instanceof File) {
          backendFormData.append(key, value);
        } else if (key === 'brandColors' && Array.isArray(value)) {
          // Stringify complex objects/arrays if backend expects it with FormData
          backendFormData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          backendFormData.append(key, String(value));
        }
      });
      // TODO: Handle referenceImageFiles append if implemented

      // Replace requestData with backendFormData in the service call
      const result = await brandbookService.create(backendFormData); // Pass FormData

      router.push(`/dashboard/brandbook/view/${result.id}`);
    } catch (err) {
      console.error('Submission error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to create brandbook. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };
  // --- End Form Submission ---

  // --- Step Rendering Logic ---
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Core Info
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white/80">
                Company Name *
              </Label>
              <Input
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline" className="text-white/80">
                Tagline
              </Label>
              <Input
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-white/80">
                Industry *
              </Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                placeholder="e.g., Technology, Fashion, Finance"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyDescription" className="text-white/80">
                Company Description *
              </Label>
              <div className="flex flex-col space-y-2">
                <Textarea
                  id="companyDescription"
                  name="companyDescription"
                  value={formData.companyDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="Briefly describe what your company does or offers."
                  className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                />
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    onClick={async () => {
                      try {
                        setEnhanceLoading(true);

                        const response = await api.post(
                          `/deepseek/make-prompt-better`,
                          {
                            text: formData.companyDescription,
                          }
                        );

                        // Extract the enhanced text from the response
                        let enhancedText = '';

                        console.log(response.data);
                        if (response.data && typeof response.data === 'string') {
                          // First, try to extract text between quotes inside asterisks
                          // Pattern: *"text"*
                          const quoteMatch = response.data.match(/\*"([^"]*)"\*/);
                          if (quoteMatch && quoteMatch[1]) {
                            enhancedText = quoteMatch[1];
                          } else {
                            // Second, try to extract any text between asterisks
                            // Pattern: *text*
                            const asteriskMatch = response.data.match(/\*([^\*]*)\*/);
                            if (asteriskMatch && asteriskMatch[1]) {
                              // Check if there are quotes inside and extract from them
                              if (asteriskMatch[1].startsWith('"') && asteriskMatch[1].endsWith('"')) {
                                enhancedText = asteriskMatch[1].slice(1, -1).trim();
                              } else {
                                enhancedText = asteriskMatch[1].trim();
                              }
                            } else {
                              // Last resort: strip all markdown formatting
                              enhancedText = response.data
                                .replace(/\*\*Enhanced Prompt:\*\*/g, '')
                                .replace(/\*/g, '')
                                .replace(/\"([^\"]*)\"/, '$1') // Extract text from quotes
                                .replace(/\([^\)]*\)/g, '') // Remove parenthetical comments
                                .trim();
                            }
                          }
                        } else if (response.data && response.data.enhancedText) {
                          // If the response is in the expected format with enhancedText property
                          enhancedText = response.data.enhancedText;
                        } else {
                          throw new Error('Invalid response format');
                        }

                        if (enhancedText) {
                          const e = {
                            target: {
                              name: 'companyDescription',
                              value: enhancedText
                            }
                          } as React.ChangeEvent<HTMLTextAreaElement>;
                          handleInputChange(e);
                        }
                      } catch (error) {
                        console.error('Error enhancing prompt:', error);
                        setError('Failed to enhance prompt. Please try again.');
                      } finally {
                        setEnhanceLoading(false);
                      }
                    }}
                    className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black text-xs py-1 px-2"
                    disabled={!formData.companyDescription || enhanceLoading}
                  >
                    <span className="flex items-center">
                      {enhanceLoading ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          <span>Enhancing...</span>
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-1" />
                          <span>Enhance Prompt</span>
                        </>
                      )}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </>
        );
      case 2: // AI Guidance
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="targetAudience" className="text-white/80">
                Target Audience *
              </Label>
              <Textarea
                id="targetAudience"
                name="targetAudience"
                value={formData.targetAudience}
                onChange={handleInputChange}
                required
                placeholder="Describe your ideal customer or audience."
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="brandPersonalityKeywords"
                className="text-white/80"
              >
                Brand Personality Keywords *
              </Label>
              <Input
                id="brandPersonalityKeywords"
                name="brandPersonalityKeywords"
                value={formData.brandPersonalityKeywords}
                onChange={handleInputChange}
                required
                placeholder="e.g., Modern, playful, luxurious, eco-friendly"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visualStyleKeywords" className="text-white/80">
                Visual Style Keywords *
              </Label>
              <Input
                id="visualStyleKeywords"
                name="visualStyleKeywords"
                value={formData.visualStyleKeywords}
                onChange={handleInputChange}
                required
                placeholder="e.g., Minimalist, geometric, photographic, dark"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="toneOfVoice" className="text-white/80">
                Tone of Voice *
              </Label>
              {/* TODO: Consider changing to Select/Radio if predefined options exist */}
              <Input
                id="toneOfVoice"
                name="toneOfVoice"
                value={formData.toneOfVoice}
                onChange={handleInputChange}
                required
                placeholder="e.g., Professional, friendly, witty, authoritative"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="missionStatement" className="text-white/80">
                Mission Statement (Optional)
              </Label>
              <Textarea
                id="missionStatement"
                name="missionStatement"
                value={formData.missionStatement}
                onChange={handleInputChange}
                placeholder="Enter if defined, otherwise AI will generate."
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="visionStatement" className="text-white/80">
                Vision Statement (Optional)
              </Label>
              <Textarea
                id="visionStatement"
                name="visionStatement"
                value={formData.visionStatement}
                onChange={handleInputChange}
                placeholder="Enter if defined, otherwise AI will generate."
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
          </>
        );
      case 3: // Visual Identity
        return (
          <>
            <div className="space-y-2">
              <Label className="text-white/80">Logo *</Label>
              <div className="flex items-center gap-4 p-4 border border-dashed border-gray-600 rounded-md bg-[#1a1a1a]">
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                  onChange={handleLogoChange}
                  className="hidden"
                  required
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('logo')?.click()}
                  className="text-white border-white/30 hover:bg-white/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {logoFile ? 'Change Logo' : 'Choose Logo'}
                </Button>
                {logoFile && (
                  <p className="text-sm text-gray-400">
                    Selected: {logoFile.name}
                  </p>
                )}
                {!logoFile && (
                  <p className="text-sm text-gray-500">
                    Max 5MB (PNG, JPG, GIF, WEBP)
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white/80">Brand Colors *</Label>
              <div className="space-y-3">
                {formData.brandColors?.map((color, index) => (
                  <div
                    key={index}
                    className="flex items-center text-white gap-2 p-3 border border-gray-700/50 rounded-md bg-[#1f1f1f]"
                  >
                    <Input
                      type="text"
                      placeholder={`Color ${index + 1} Name (e.g., Primary)`}
                      value={color.name}
                      onChange={(e) =>
                        handleColorChange(index, 'name', e.target.value)
                      }
                      className="flex-1 bg-[#2a2a2a] border-gray-600"
                      required={index < 1} // Require at least one color name
                    />
                    <Input
                      type="color"
                      value={color.value}
                      onChange={(e) =>
                        handleColorChange(index, 'value', e.target.value)
                      }
                      className="p-1 h-10 w-14 bg-input"
                      required={index < 1} // Require at least one color value
                    />
                    <Input
                      type="text"
                      placeholder="Usage Note (Optional)"
                      value={color.usageNote}
                      onChange={(e) =>
                        handleColorChange(index, 'usageNote', e.target.value)
                      }
                      className="flex-1 bg-[#2a2a2a] border-gray-600"
                    />
                    {formData.brandColors &&
                      formData.brandColors.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          onClick={() => removeColorField(index)}
                          className="text-red-400 hover:bg-red-900/30"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                  </div>
                ))}
                {(!formData.brandColors ||
                  formData.brandColors.length < MAX_COLORS) && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addColorField}
                      className="w-full text-white/70 border-white/20 hover:bg-white/10"
                    >
                      + Add Color (up to {MAX_COLORS})
                    </Button>
                  )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryFontName" className="text-white/80">
                  Primary Font Name *
                </Label>
                <SearchableSelect
                  options={popularFonts}
                  value={formData.primaryFontName || ''}
                  onChange={(value) => handleFontChange('primaryFontName', value)}
                  placeholder="Select primary font"
                  searchPlaceholder="Search fonts..."
                  emptyMessage="No matching fonts found"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryFontName" className="text-white/80">
                  Secondary Font Name (Optional)
                </Label>
                <SearchableSelect
                  options={popularFonts}
                  value={formData.secondaryFontName || ''}
                  onChange={(value) => handleFontChange('secondaryFontName', value)}
                  placeholder="Select secondary font"
                  searchPlaceholder="Search fonts..."
                  emptyMessage="No matching fonts found"
                />
              </div>
            </div>
            {/* TODO: Add optional reference image upload UI */}
          </>
        );
      case 4: // Contact Info
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="contactEmail" className="text-white/80">
                Contact Email *
              </Label>
              <Input
                id="contactEmail"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
                placeholder="your@company.com"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactWebsite" className="text-white/80">
                Website *
              </Label>
              <Input
                id="contactWebsite"
                name="contactWebsite"
                type="url"
                value={formData.contactWebsite}
                onChange={handleInputChange}
                required
                placeholder="https://yourcompany.com"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-white/80">
                Phone Number (Optional)
              </Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleInputChange}
                placeholder="+1 234 567 890"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactAddress" className="text-white/80">
                Address (Optional)
              </Label>
              <Textarea
                id="contactAddress"
                name="contactAddress"
                value={formData.contactAddress}
                onChange={handleInputChange}
                placeholder="123 Main St, Anytown, USA"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
          </>
        );
      case 5: // Review & Submit
        return (
          <div className="space-y-4 text-white">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
              Review Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              {/* Display user-provided info only */}
              <div>
                <strong>Company:</strong> {formData.companyName}
              </div>
              <div>
                <strong>Tagline:</strong> {formData.tagline || '-'}
              </div>
              <div>
                <strong>Industry:</strong> {formData.industry}
              </div>
              <div>
                <strong>Description:</strong>{' '}
                {formData.companyDescription || '-'}
              </div>
              <div>
                <strong>Audience:</strong> {formData.targetAudience || '-'}
              </div>
              <div>
                <strong>Personality:</strong>{' '}
                {formData.brandPersonalityKeywords || '-'}
              </div>
              <div>
                <strong>Visual Style:</strong>{' '}
                {formData.visualStyleKeywords || '-'}
              </div>
              <div>
                <strong>Tone:</strong> {formData.toneOfVoice || '-'}
              </div>
              <div>
                <strong>Mission:</strong> {formData.missionStatement || '-'}
              </div>
              <div>
                <strong>Vision:</strong> {formData.visionStatement || '-'}
              </div>
              <div>
                <strong>Primary Font:</strong> {formData.primaryFontName || '-'}
              </div>
              <div>
                <strong>Secondary Font:</strong>{' '}
                {formData.secondaryFontName || '-'}
              </div>
              <div>
                <strong>Logo:</strong> {logoFile?.name || 'Not uploaded'}
              </div>
              <div>
                <strong>Colors:</strong>{' '}
                {formData.brandColors
                  ?.map((c) => `${c.name} (${c.value})`)
                  .join(', ') || '-'}
              </div>
              <div>
                <strong>Contact Email:</strong> {formData.contactEmail || '-'}
              </div>
              <div>
                <strong>Website:</strong> {formData.contactWebsite || '-'}
              </div>
              <div>
                <strong>Phone:</strong> {formData.contactPhone || '-'}
              </div>
              <div>
                <strong>Address:</strong> {formData.contactAddress || '-'}
              </div>
            </div>
            {error && (
              <div className="bg-red-900/20 text-red-400 p-3 rounded-md border border-red-900/50 mt-4">
                {error}
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };
  // --- End Step Rendering ---

  return (
    <Card
      className="w-full max-w-3xl mx-auto border border-gray-800" // Increased max-width
      style={{ backgroundColor: '#141414' }}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold text-white text-center">
          Create New Brandbook
        </CardTitle>
        <Stepper
          totalSteps={TOTAL_STEPS}
          currentStep={currentStep}
          stepNames={STEP_NAMES}
        />
      </CardHeader>
      {/* Use div wrapper, handle submit via button onClick */}
      <div>
        <CardContent className="space-y-6 pt-4 min-h-[300px]">
          {' '}
          {/* Added min-height */}
          {stepError && (
            <div className="bg-yellow-900/30 text-yellow-400 p-3 rounded-md border border-yellow-900/50">
              {stepError}
            </div>
          )}
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between gap-4 mt-6">
          {' '}
          {/* Added margin-top */}
          {/* Back Button */}
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className="text-white border-white/30 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          {/* Next Button */}
          {currentStep < TOTAL_STEPS && (
            <Button
              type="button"
              onClick={nextStep}
              disabled={loading}
              className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
            >
              Next <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {/* Submit Button */}
          {currentStep === TOTAL_STEPS && (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}{' '}
              {loading ? 'Generating Brandbook...' : 'Generate Brandbook'}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
