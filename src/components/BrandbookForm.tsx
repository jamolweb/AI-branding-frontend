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
import {
  Loader2,
  Upload,
  ArrowLeft,
  ArrowRight,
  Trash2,
  Wand2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const TOTAL_STEPS = 5;
const STEP_NAMES = [
  'Core Info',
  'AI Guidance',
  'Visual Identity',
  'Contact Info',
  'Review & Submit',
];

const defaultColor = { name: '', value: '#000000', usageNote: '' };
const MAX_COLORS = 5;

interface StepperProps {
  totalSteps: number;
  currentStep: number;
  stepNames: string[];
}

const Stepper: React.FC<StepperProps> = ({
  totalSteps,
  currentStep,
  stepNames,
}) => {
  if (stepNames.length !== totalSteps) {
    console.warn('Stepper: stepNames length does not match totalSteps.');
  }

  return (
    <div className="flex items-start justify-center w-full px-4 py-4">
      {' '}
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const stepName = stepNames[index] || `Step ${stepNumber}`;

        return (
          <React.Fragment key={stepNumber}>
            {stepNumber > 1 && (
              <div
                className={`flex-1 h-0.5 mt-4 transition-colors duration-300 ${isCompleted || isActive
                  ? 'bg-[rgb(239,252,118)]'
                  : 'bg-gray-600'
                  }`}
                style={{ minWidth: '20px' }}
              />
            )}
            <div
              className="flex flex-col items-center mx-1"
              style={{ width: '80px' }}
            >
              {' '}
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

export function BrandbookForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [enhanceLoading, setEnhanceLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<CreateBrandbookRequest>>(
    NODE_ENV === 'development'
      ? {
        companyName: 'LuminoTech',
        tagline:
          'Empowering Tomorrow Through Intelligent, Sustainable Energy Solutions',
        industry: 'Technology',
        companyDescription:
          'LuminoTech stands at the forefront of the global movement toward sustainable energy, offering state-of-the-art smart technologies designed to reduce carbon emissions, optimize energy consumption, and reshape how the world powers its future. Our solutions combine advanced data analytics, renewable energy integration, and IoT-enabled systems to empower businesses and communities with cleaner, smarter energy choices.',
        targetAudience:
          'Businesses, communities, and individuals interested in adopting smart, sustainable energy solutions, reducing their carbon footprint, and integrating renewable energy systems and IoT technologies.',
        brandPersonalityKeywords:
          'Innovative, sustainable, intelligent, eco-friendly, forward-thinking',
        visualStyleKeywords:
          'Minimalist, modern, clean, geometric, tech-focused',
        toneOfVoice: 'Professional, authoritative, empowering, visionary',
        missionStatement:
          'Our mission is to drive the global transition to sustainable energy by delivering innovative, intelligent, and accessible technology solutions that enhance efficiency, reduce environmental impact, and promote energy independence for all.',
        visionStatement:
          'We envision a future where every home, business, and city is powered by intelligent energy systems that are clean, efficient, and resilient—creating a healthier planet and a more sustainable tomorrow.',
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
      },
  );

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
  const [generatedLogoUrl, setGeneratedLogoUrl] = useState<string | null>(null);
  const [logoPreviewUrl, setLogoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (logoFile) {
      const objectUrl = URL.createObjectURL(logoFile);
      setLogoPreviewUrl(objectUrl);

      return () => {
        URL.revokeObjectURL(objectUrl);
      };
    }
    return undefined;
  }, [logoFile]);

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
      if (!prev || !prev.brandColors) return prev;
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
        return prev;
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

  const handleGenerateLogo = async () => {
    if (!formData.companyName || !formData.industry) {
      setStepError(
        'Please provide Company Name and Industry to generate a relevant logo.',
      );
      return;
    }

    try {
      setIsGeneratingLogo(true);
      setStepError(null);

      const prompt = `Create a professional logo for ${formData.companyName
        }, a company in the ${formData.industry} industry. ${formData.tagline ? `Tagline: "${formData.tagline}". ` : ''
        }${formData.brandPersonalityKeywords
          ? `Brand personality: ${formData.brandPersonalityKeywords}. `
          : ''
        }${formData.visualStyleKeywords
          ? `Visual style: ${formData.visualStyleKeywords}.`
          : ''
        }`;

      const result = await brandbookService.generateLogoWithAI(prompt);

      if (result.logoUrl) {
        setGeneratedLogoUrl(result.logoUrl);

        const fetchResponse = await fetch(result.logoUrl);
        const blob = await fetchResponse.blob();
        const file = new File(
          [blob],
          `${formData.companyName.replace(/\s+/g, '_')}_AI_Logo.png`,
          { type: 'image/png' },
        );

        setLogoFile(file);
      } else {
        setStepError(
          'Failed to generate logo. Please try again or upload one manually.',
        );
      }
    } catch (error) {
      console.error('Logo generation error:', error);
      setStepError(
        'Error generating logo. Please try again or upload one manually.',
      );
    } finally {
      setIsGeneratingLogo(false);
    }
  };

  const nextStep = () => {
    setStepError(null);
    let isValid = true;

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

  const handleSubmit = async () => {
    if (currentStep !== TOTAL_STEPS) return;

    setLoading(true);
    setError(null);
    setStepError(null);

    if (!logoFile) {
      setError('Logo file is missing.');
      setLoading(false);
      setCurrentStep(3);
      return;
    }

    try {
      const finalBrandColors = formData.brandColors?.filter(
        (c) => c.name.trim() && c.value.trim(),
      );

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
        logo: logoFile,
        brandColors: finalBrandColors,
        primaryFontName: formData.primaryFontName,
        secondaryFontName: formData.secondaryFontName,
        contactEmail: formData.contactEmail,
        contactWebsite: formData.contactWebsite,
        contactPhone: formData.contactPhone,
        contactAddress: formData.contactAddress,
      };

      console.log('Submitting Data:', requestData);

      const backendFormData = new FormData();

      Object.entries(requestData).forEach(([key, value]) => {
        if (key === 'logo' && value instanceof File) {
          backendFormData.append(key, value);
        } else if (key === 'brandColors' && Array.isArray(value)) {
          backendFormData.append(key, JSON.stringify(value));
        } else if (value !== undefined && value !== null) {
          backendFormData.append(key, String(value));
        }
      });

      const result = await brandbookService.create(backendFormData);

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
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
                          },
                        );

                        let enhancedText = '';

                        console.log(response.data);
                        if (
                          response.data &&
                          typeof response.data === 'string'
                        ) {
                          const quoteMatch =
                            response.data.match(/\*"([^"]*)"\*/);
                          if (quoteMatch && quoteMatch[1]) {
                            enhancedText = quoteMatch[1];
                          } else {
                            const asteriskMatch =
                              response.data.match(/\*([^\*]*)\*/);
                            if (asteriskMatch && asteriskMatch[1]) {
                              if (
                                asteriskMatch[1].startsWith('"') &&
                                asteriskMatch[1].endsWith('"')
                              ) {
                                enhancedText = asteriskMatch[1]
                                  .slice(1, -1)
                                  .trim();
                              } else {
                                enhancedText = asteriskMatch[1].trim();
                              }
                            } else {
                              enhancedText = response.data
                                .replace(/\*\*Enhanced Prompt:\*\*/g, '')
                                .replace(/\*/g, '')
                                .replace(/\"([^\"]*)\"/, '$1')
                                .replace(/\([^\)]*\)/g, '')
                                .trim();
                            }
                          }
                        } else if (
                          response.data &&
                          response.data.enhancedText
                        ) {
                          enhancedText = response.data.enhancedText;
                        } else {
                          throw new Error('Invalid response format');
                        }

                        if (enhancedText) {
                          const e = {
                            target: {
                              name: 'companyDescription',
                              value: enhancedText,
                            },
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
      case 2:
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
      case 3:
        return (
          <>
            <div className="space-y-2">
              <Label className="text-white/80">Logo *</Label>
              <div className="flex flex-col gap-3">
                {(logoPreviewUrl || generatedLogoUrl) && (
                  <div className="w-full flex justify-center mb-4 p-4 bg-[#1a1a1a] rounded-md">
                    <img
                      src={generatedLogoUrl || logoPreviewUrl || ''}
                      alt="Logo preview"
                      className="max-w-full max-h-40 object-contain"
                    />
                  </div>
                )}

                <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-dashed border-gray-600 rounded-md bg-[#1a1a1a]">
                  <input
                    id="logo"
                    name="logo"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                    onChange={handleLogoChange}
                    className="hidden"
                    required
                  />
                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('logo')?.click()}
                      className="text-white border-white/30 hover:bg-white/10 flex-1"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {logoFile ? 'Change Logo' : 'Upload Logo'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleGenerateLogo}
                      disabled={isGeneratingLogo}
                      className="text-white border-white/30 hover:bg-white/10 flex-1"
                    >
                      {isGeneratingLogo ? (
                        <>
                          <div className="w-4 h-4 mr-2 animate-spin rounded-full border-b-2 border-white"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {!logoFile && !isGeneratingLogo && (
                  <p className="text-sm text-gray-500">
                    Upload a logo (Max 5MB: PNG, JPG, GIF, WEBP) or generate one
                    with AI.
                  </p>
                )}
                {logoFile && (
                  <p className="text-sm text-gray-400">
                    Selected: {logoFile.name}
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
                      required={index < 1}
                    />
                    <Input
                      type="color"
                      value={color.value}
                      onChange={(e) =>
                        handleColorChange(index, 'value', e.target.value)
                      }
                      className="p-1 h-10 w-14 bg-input"
                      required={index < 1}
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
                  onChange={(value) =>
                    handleFontChange('primaryFontName', value)
                  }
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
                  onChange={(value) =>
                    handleFontChange('secondaryFontName', value)
                  }
                  placeholder="Select secondary font"
                  searchPlaceholder="Search fonts..."
                  emptyMessage="No matching fonts found"
                />
              </div>
            </div>
          </>
        );
      case 4:
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
      case 5:
        return (
          <div className="space-y-4 text-white">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
              Review Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
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

  return (
    <Card
      className="w-full max-w-3xl mx-auto border border-gray-800"
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
      <div>
        <CardContent className="space-y-6 pt-4 min-h-[300px]">
          {' '}
          {stepError && (
            <div className="bg-yellow-900/30 text-yellow-400 p-3 rounded-md border border-yellow-900/50">
              {stepError}
            </div>
          )}
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between gap-4 mt-6">
          {' '}
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className="text-white border-white/30 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
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
