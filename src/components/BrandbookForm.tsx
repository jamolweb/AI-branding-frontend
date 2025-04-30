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
import { Loader2, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function BrandbookForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<CreateBrandbookRequest>>({
    companyName: 'LuminoTech',
    industry: 'Green Energy Solutions',
    description:
      'LuminoTech specializes in smart solar technology, providing innovative and sustainable energy solutions for homes and businesses. Our mission is to make green energy more accessible and intelligent.',
    authorName: 'Maya Chen',
    authorRole: 'Creative Strategist',
    authorEmail: 'maya.chen@luminotech.io',
    tagline: 'Powering the Future with Smart Energy',
    preferredColor: '#00A86B', // Deep green
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
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!logoFile) {
        setError('Please select a logo file');
        setLoading(false);
        return;
      }

      const coreValuesArray = coreValuesInput
        .split(',')
        .map((v) => v.trim())
        .filter((v) => v !== '');

      const finalFormData = {
        ...formData,
        coreValues: coreValuesArray.length > 0 ? coreValuesArray : undefined,
      };

      const requestData: CreateBrandbookRequest = {
        ...(finalFormData as Required<
          Omit<CreateBrandbookRequest, 'logo' | 'coreValues'> & {
            coreValues?: string[];
          }
        >),
        logo: logoFile,
      };

      const result = await brandbookService.create(requestData);
      router.push(`/dashboard/brandbook/view/${result.id}`);
    } catch (err) {
      setError('Failed to create brandbook. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      className="w-full max-w-2xl mx-auto border border-gray-800"
      style={{ backgroundColor: '#141414' }}
    >
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">
          Create New Brandbook
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-red-900/20 text-red-400 p-3 rounded-md border border-red-900/50">
              {error}
            </div>
          )}

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
                className="bg-input text-white h-10 p-1"
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

          <div className="space-y-4">
            <Label className="text-white">Logo *</Label>
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
        </CardContent>

        <CardFooter className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard/brandbook')}
            className="text-white border-white/30 hover:bg-white/10"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-[rgb(239,252,118)] hover:bg-[rgb(220,232,108)] text-black"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {loading ? 'Creating...' : 'Create Brandbook'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
