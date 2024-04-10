import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html,js,jsx,css,ts,tsx}'],
	theme: {
		extend: {},
	},

	plugins: [daisyui],
	daisyui: {
		themes: ['dracula', 'nord'],
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: true,
		themeRoot: ':root',
	},
}