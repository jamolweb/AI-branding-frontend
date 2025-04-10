export interface Logo {
	id: string
	prompt: string
	imageUrl: string
	status: string
	createdAt: string
	_count: {
		favoritedBy: number
	}
}

export interface FavoriteLogo {
	id: string
	logo: Logo
}
