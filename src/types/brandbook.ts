interface VoiceTone {
  examples: {
    casual: string;
    formal: string;
  };
  guidelines: string[];
  characteristics: string[];
}

interface Typography {
  primaryFont: string;
  secondaryFont: string;
  fontUsageGuidelines: string[];
}

interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  neutral: string[];
  colorUsageGuidelines: string[];
}

interface BrandIdentity {
  values: string[];
  vision: string;
  mission: string;
  personality: string[];
}

interface LogoGuidelines {
  dosDonts: {
    dos: string[];
    donts: string[];
  };
  clearSpace: string;
  minimumSize: string;
}

interface GeneratedJson {
  voiceTone?: VoiceTone;
  typography?: Typography;
  colorPalette?: ColorPalette;
  brandIdentity?: BrandIdentity;
  logoGuidelines?: LogoGuidelines;
}

export interface Brandbook {
  id: string;
  companyName: string;
  logoUrl: string;
  createdAt: string;
  updatedAt: string;
  tagline?: string;
  industry?: string;
  companyDescription?: string;
  targetAudience?: string;
  brandPersonalityKeywords?: string;
  visualStyleKeywords?: string;
  toneOfVoice?: string;
  missionStatement?: string;
  visionStatement?: string;
  brandColorsJson?: Array<{
    name: string;
    value: string;
    usageNote?: string;
  }> | null;
  primaryFontName?: string;
  secondaryFontName?: string;
  contactEmail?: string;
  contactWebsite?: string;
  contactPhone?: string;
  contactAddress?: string;
  pdfUrl?: string;
  generatedHtml?: string;
  generatedJson?: GeneratedJson;
  description?: string;
  authorName?: string;
  authorRole?: string;
  authorEmail?: string;
  preferredColor?: string;
  preferredFont?: string;
}

export interface CreateBrandbookRequest {
  companyName: string;
  tagline?: string;
  industry?: string;
  companyDescription?: string;
  targetAudience?: string;
  brandPersonalityKeywords?: string;
  visualStyleKeywords?: string;
  toneOfVoice?: string;
  missionStatement?: string;
  visionStatement?: string;
  logo: File;
  brandColors?: Array<{
    name: string;
    value: string;
    usageNote?: string;
  }>;
  primaryFontName?: string;
  secondaryFontName?: string;
  contactEmail?: string;
  contactWebsite?: string;
  contactPhone?: string;
  contactAddress?: string;
}

export interface UpdateBrandbookRequest
  extends Partial<Omit<CreateBrandbookRequest, 'logo'>> {
  logo?: File | string;
}

export interface GenerateLogoRequest {
  companyName: string;
  industry?: string;
  description?: string;
  preferredColor?: string;
  style?: string;
}
