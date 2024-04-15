import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	// define: {
	//   'process.env': process.env
	// },
	server: {
		host: true,
		preTransformRequests: false,
	},
	base: './',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'), // add this line
		},
	},
})
