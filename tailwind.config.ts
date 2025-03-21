import type { Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				zinc: {
					800: '#27272a',
					900: '#18181b',
				},
				yellow: {
					300: '#fde047',
					400: '#facc15',
				},
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				'3xl': '32px',
			},
		},
	},
	plugins: [],
	future: {
		hoverOnlyWhenSupported: true,
	},
}

export default config
