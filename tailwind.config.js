import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{html,js,jsx,css}'],
	theme: {
		extend: {},
	},

	plugins: [daisyui],
	daisyui: {
		// synthwave is dark mode and pastel is light
		themes: [
			'dracula', 'nord'],
		// darkTheme: "synthwave",
		base: true,
		styled: true,
		utils: true,
		prefix: '',
		logs: true,
		themeRoot: ':root',
	},
}

export const daisyColors = {
	primary: 'bg-primary',
	primaryContent: 'bg-primary-content',
	secondary: 'bg-secondary',
	secondaryContent: 'bg-secondary-content',
	accent: 'bg-accent',
	accentContent: 'bg-accent-content',
	neutral: 'bg-neutral',
	neutralContent: 'bg-neutral-content',
	base100: 'bg-base-100',
	base200: 'bg-base-200',
	base300: 'bg-base-300',
	baseContent: 'bg-base-content',
	info: 'bg-info',
	infoContent: 'bg-info-content',
	success: 'bg-success',
	successContent: 'bg-success-content',
	warning: 'bg-warning',
	warningContent: 'bg-warning-content',
	error: 'bg-error',
	errorContent: 'bg-error-content',
}

export const daisyThemes = {
	dark: 'dracula',
	light: 'nord'
}