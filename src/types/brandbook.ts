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
  voiceTone: VoiceTone;
  typography: Typography;
  colorPalette: ColorPalette;
  brandIdentity: BrandIdentity;
  logoGuidelines: LogoGuidelines;
}

export interface Brandbook {
  id: string;
  companyName: string;
  logoUrl: string;
  createdAt: string;
  tagline?: string;
  industry?: string;
  description?: string;
  pdfUrl?: string;
  generatedHtml?: string;
  generatedJson?: GeneratedJson;
}

export interface CreateBrandbookRequest {
  companyName: string;
  industry: string;
  description: string;
  authorName: string;
  authorRole: string;
  authorEmail: string;
  logo: File;
  tagline?: string;
  preferredColor?: string;
  preferredFont?: string;
  mission?: string;
  vision?: string;
  coreValues?: string[];
}

export interface UpdateBrandbookRequest
  extends Partial<CreateBrandbookRequest> {
  logo?: File;
}

export interface GenerateLogoRequest {
  companyName: string;
  industry?: string;
  description?: string;
  preferredColor?: string;
  style?: string;
}
