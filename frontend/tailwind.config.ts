import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	container: {
  		center: true,
  		padding: '2rem',
  		screens: {
  			'2xl': '1400px'
  		}
  	},
  	extend: {
  		colors: {
  			brand: {
  				black: 'rgb(0, 0, 0)',
  				dark: 'rgb(26, 32, 44)',
  				error: 'rgb(211, 47, 47)',
  				'error-light': 'rgb(255, 236, 236)',
  				success: 'rgb(43, 142, 65)',
  				'success-light': 'rgb(215, 255, 224)',
  				warning: 'rgb(249, 157, 60)',
  				info: 'rgb(81, 142, 248)',
  				beige: 'rgb(247, 243, 239)',
  				'beige-light': 'rgb(251, 251, 249)',
  				cream: 'rgb(255, 254, 254)',
  				neutral: {
  					'50': 'rgb(255, 254, 254)',
  					'100': 'rgb(251, 251, 249)',
  					'200': 'rgb(247, 243, 239)',
  					'300': 'rgb(241, 237, 237)',
  					'400': 'rgb(221, 213, 214)',
  					'500': 'rgb(180, 168, 169)',
  					'600': 'rgb(160, 146, 147)',
  					'700': 'rgb(119, 105, 106)',
  					'800': 'rgb(78, 67, 67)',
  					'900': 'rgb(49, 42, 42)'
  				}
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'Inter',
  				'sans-serif'
  			],
  			serif: [
  				'Cormorant Garamond',
  				'serif'
  			]
  		},
  		fontSize: {
  			display: [
  				'56px',
  				{
  					lineHeight: '56px',
  					fontWeight: '400'
  				}
  			],
  			h1: [
  				'40px',
  				{
  					lineHeight: '40px',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'32px',
  				{
  					lineHeight: '40px',
  					fontWeight: '500'
  				}
  			],
  			'body-lg': [
  				'18px',
  				{
  					lineHeight: '28px',
  					fontWeight: '400'
  				}
  			],
  			'body-lg-medium': [
  				'18px',
  				{
  					lineHeight: '28px',
  					fontWeight: '500'
  				}
  			],
  			body: [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '400'
  				}
  			],
  			'body-medium': [
  				'16px',
  				{
  					lineHeight: '24px',
  					fontWeight: '500'
  				}
  			],
  			small: [
  				'14px',
  				{
  					lineHeight: '20px',
  					fontWeight: '400'
  				}
  			],
  			xs: [
  				'12px',
  				{
  					lineHeight: '16px',
  					fontWeight: '400'
  				}
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

export default config