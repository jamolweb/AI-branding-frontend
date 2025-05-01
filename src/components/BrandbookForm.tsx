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
import { brandbookService } from '@/services/brandbook';
import { CreateBrandbookRequest } from '@/types/brandbook';
import { Loader2, Upload, ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import React from 'react';

// Define total number of steps and their names
const TOTAL_STEPS = 5;
const STEP_NAMES = [
  'Company Info',
  'Author Info',
  'Brand Identity',
  'Visual Identity',
  'Review & Submit',
];

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
                className={`flex-1 h-0.5 mt-4 transition-colors duration-300 ${
                  isCompleted || isActive
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
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 mb-1 ${
                  isActive
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
                className={`text-xs text-center transition-colors duration-300 ${
                  isActive
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
  const [error, setError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null); // Error for current step validation

  const [formData, setFormData] = useState<Partial<CreateBrandbookRequest>>({
    companyName: 'LuminoTech',
    industry: 'Green Energy Solutions',
    description:
      'LuminoTech specializes in smart solar technology, providing innovative and sustainable energy solutions for homes and businesses. Our mission is to make green energy more accessible and intelligent.',
    authorName: 'Maya Chen',
    authorRole: 'Creative Strategist',
    authorEmail: 'maya.chen@luminotech.io',
    tagline: 'Powering the Future with Smart Energy',
    preferredColor: '#00A86B',
    preferredFont: 'Poppins',
    mission: '',
    vision: '',
  });
  const [coreValuesInput, setCoreValuesInput] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'coreValuesInput') {
      setCoreValuesInput(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear step error when user types
    if (stepError) setStepError(null);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      // Basic validation (can be expanded)
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setStepError('Logo file size cannot exceed 5MB.');
        setLogoFile(null); // Clear selection
        e.target.value = ''; // Reset file input
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
        setLogoFile(null); // Clear selection
        e.target.value = ''; // Reset file input
        return;
      }
      setLogoFile(file);
      setStepError(null); // Clear error on valid selection
    }
  };

  // --- Step Navigation ---
  const nextStep = () => {
    setStepError(null); // Clear previous errors
    // Validation before proceeding
    if (
      currentStep === 1 &&
      (!formData.companyName || !formData.industry || !formData.tagline)
    ) {
      setStepError('Please fill in Company Name, Industry, and Tagline.');
      return;
    }
    if (
      currentStep === 2 &&
      (!formData.authorName || !formData.authorRole || !formData.authorEmail)
    ) {
      setStepError('Please fill in Author Name, Role, and Email.');
      return;
    }
    // No required fields for step 3 (Brand Identity)
    if (
      currentStep === 4 &&
      (!formData.preferredColor || !formData.preferredFont || !logoFile)
    ) {
      setStepError('Please provide Preferred Color, Font, and upload a Logo.');
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setStepError(null); // Clear errors when going back
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  // --- End Step Navigation ---

  const handleSubmit = async (e: React.FormEvent) => {
    // Ensure this is only called from the final step
    if (currentStep !== TOTAL_STEPS) return;

    e.preventDefault();
    setLoading(true);
    setError(null);
    setStepError(null);

    // Final validation (redundant if step validation is robust, but good practice)
    if (!logoFile) {
      setError('Logo file is missing.'); // Use main error state here
      setLoading(false);
      setCurrentStep(4); // Go back to logo step
      return;
    }

    try {
      const coreValuesArray = coreValuesInput
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v !== '');

      const finalFormData = {
        ...formData,
        coreValues: coreValuesArray.length > 0 ? coreValuesArray : undefined,
      };

      // Ensure all required fields are present before assertion
      // Note: We rely on step validation, but could add more checks here
      const requiredFields: (keyof Omit<
        CreateBrandbookRequest,
        'logo' | 'coreValues' | 'description' | 'mission' | 'vision'
      >)[] = [
        'companyName',
        'industry',
        'tagline',
        'authorName',
        'authorRole',
        'authorEmail',
        'preferredColor',
        'preferredFont',
      ];

      for (const field of requiredFields) {
        if (!finalFormData[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      const requestData: CreateBrandbookRequest = {
        // Type assertion needs care, ensure all required fields are validated/present
        companyName: finalFormData.companyName!,
        industry: finalFormData.industry!,
        description: finalFormData.description || '', // Default to empty string if undefined
        authorName: finalFormData.authorName!,
        authorRole: finalFormData.authorRole!,
        authorEmail: finalFormData.authorEmail!,
        logo: logoFile,
        tagline: finalFormData.tagline!,
        preferredColor: finalFormData.preferredColor!,
        preferredFont: finalFormData.preferredFont!,
        mission: finalFormData.mission || '', // Default to empty string
        vision: finalFormData.vision || '', // Default to empty string
        coreValues: finalFormData.coreValues,
      };

      console.log('Submitting Data:', requestData); // Debug log

      const result = await brandbookService.create(requestData);
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

  // Helper to render fields based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Company Information
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-white">
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
              <Label htmlFor="industry" className="text-white">
                Industry *
              </Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tagline" className="text-white">
                Tagline *
              </Label>
              <Input
                id="tagline"
                name="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
          </>
        );
      case 2: // Author Information
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="authorName" className="text-white">
                  Author Name *
                </Label>
                <Input
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="authorRole" className="text-white">
                  Author Role *
                </Label>
                <Input
                  id="authorRole"
                  name="authorRole"
                  value={formData.authorRole}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorEmail" className="text-white">
                Author Email *
              </Label>
              <Input
                id="authorEmail"
                name="authorEmail"
                type="email"
                value={formData.authorEmail}
                onChange={handleInputChange}
                required
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
          </>
        );
      case 3: // Brand Identity
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mission" className="text-white">
                Mission
              </Label>
              <Textarea
                id="mission"
                name="mission"
                value={formData.mission}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vision" className="text-white">
                Vision
              </Label>
              <Textarea
                id="vision"
                name="vision"
                value={formData.vision}
                onChange={handleInputChange}
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coreValuesInput" className="text-white">
                Core Values (comma-separated)
              </Label>
              <Input
                id="coreValuesInput"
                name="coreValuesInput"
                value={coreValuesInput}
                onChange={handleInputChange}
                placeholder="Innovation, Integrity, Excellence"
                className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
              />
            </div>
          </>
        );
      case 4: // Visual Identity
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferredColor" className="text-white">
                  Preferred Color *
                </Label>
                <Input
                  id="preferredColor"
                  name="preferredColor"
                  type="color"
                  value={formData.preferredColor}
                  onChange={handleInputChange}
                  required
                  className="bg-input text-white h-10 p-1 w-full" // Ensure color input takes full width
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferredFont" className="text-white">
                  Preferred Font *
                </Label>
                <Input
                  id="preferredFont"
                  name="preferredFont"
                  value={formData.preferredFont}
                  onChange={handleInputChange}
                  required
                  className="bg-[#1a1a1a] border-gray-800 text-white focus:ring-[rgb(239,252,118)] focus:border-[rgb(239,252,118)]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white">Logo *</Label>
              <div className="flex items-center gap-4 p-4 border border-dashed border-gray-600 rounded-md bg-[#1a1a1a]">
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                  onChange={handleLogoChange}
                  className="hidden"
                  required // Technically required by the step validation now
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
          </>
        );
      case 5: // Review & Submit
        return (
          <div className="space-y-4 text-white">
            <h3 className="text-xl font-semibold border-b border-gray-700 pb-2">
              Review Your Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <div>
                <strong>Company Name:</strong> {formData.companyName}
              </div>
              <div>
                <strong>Industry:</strong> {formData.industry}
              </div>
              <div>
                <strong>Tagline:</strong> {formData.tagline}
              </div>
              <div>
                <strong>Author Name:</strong> {formData.authorName}
              </div>
              <div>
                <strong>Author Role:</strong> {formData.authorRole}
              </div>
              <div>
                <strong>Author Email:</strong> {formData.authorEmail}
              </div>
              <div>
                <strong>Preferred Color:</strong>{' '}
                <span
                  style={{ backgroundColor: formData.preferredColor }}
                  className="inline-block w-4 h-4 rounded mr-1 border border-gray-500"
                ></span>{' '}
                {formData.preferredColor}
              </div>
              <div>
                <strong>Preferred Font:</strong> {formData.preferredFont}
              </div>
              {formData.description && (
                <div>
                  <strong>Description:</strong> {formData.description}
                </div>
              )}
              {formData.mission && (
                <div>
                  <strong>Mission:</strong> {formData.mission}
                </div>
              )}
              {formData.vision && (
                <div>
                  <strong>Vision:</strong> {formData.vision}
                </div>
              )}
              {coreValuesInput && (
                <div>
                  <strong>Core Values:</strong> {coreValuesInput}
                </div>
              )}
              {logoFile && (
                <div>
                  <strong>Logo:</strong> {logoFile.name}
                </div>
              )}
            </div>
            {/* Show general error message here as well */}
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
      className="w-full max-w-2xl mx-auto border border-gray-800"
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
        <CardContent className="space-y-6 pt-4">
          {error && currentStep === TOTAL_STEPS && (
            <div className="bg-red-900/20 text-red-400 p-3 rounded-md border border-red-900/50">
              {error}
            </div>
          )}
          {stepError && (
            <div className="bg-yellow-900/30 text-yellow-400 p-3 rounded-md border border-yellow-900/50">
              {stepError}
            </div>
          )}
          {renderStepContent()}
        </CardContent>
        <CardFooter className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className="text-white border-white/30 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          {currentStep < TOTAL_STEPS && (
            <Button
              type="button"
              onClick={nextStep}
              disabled={loading}
              className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
          {currentStep === TOTAL_STEPS && (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {loading ? 'Creating...' : 'Create Brandbook'}
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
}
