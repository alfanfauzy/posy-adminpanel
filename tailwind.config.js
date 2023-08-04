/* eslint-disable global-require */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const preset = require('posy-fnb-core/dist/preset.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	presets: [preset],
	theme: {
		extend: {
			textColor: {
				'yellow-warning': '#C69A00',
			},
			width: {
				'big-500': '500px',
			},
			colors: {
				primary: '#00ba9b',
			},
			borderColor: {
				'border-primary': '#00ba9b',
			},
		},
	},
	plugins: [],
};
