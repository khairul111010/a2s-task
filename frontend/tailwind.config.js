/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#009A6E',
					light: '#009A6E/20',
					medium: '#009A6E/50',
					// dark: colors.blue[700],
				},
				secondary: {
					DEFAULT: '#D5351F',
					light: '#D5351F/20',
					medium: '#D5351F/50',
					// dark: colors.blue[700],
				},
			},
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
			},
		},
	},
  plugins: [],
}

