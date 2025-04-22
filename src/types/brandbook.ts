export interface Brandbook {
	id: string
	companyName: string
	logoUrl: string
	createdAt: string
	tagline?: string
	industry?: string
	description?: string
	pdfUrl?: string
	generatedHtml?: string
}

export interface CreateBrandbookRequest {
	companyName: string
	industry: string
	description: string
	authorName: string
	authorRole: string
	authorEmail: string
	logo: File
	tagline?: string
	preferredColor?: string
	preferredFont?: string
}

export interface UpdateBrandbookRequest
	extends Partial<CreateBrandbookRequest> {
	logo?: File
}

export interface GenerateLogoRequest {
	companyName: string
	industry?: string
	description?: string
	preferredColor?: string
	style?: string
}
