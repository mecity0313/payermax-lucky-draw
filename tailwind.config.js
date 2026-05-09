/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'brand-gold': '#FFD700',
                'brand-dark': '#0F172A',
                'brand-blue': '#1E3A8A',
            },
            animation: {
                'spin-slow': 'spin 8s linear infinite',
            }
        },
    },
    plugins: [],
}
