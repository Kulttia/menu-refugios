/** @type {import('tailwindcss').Config} */
module.exports = {
    // Tailwind escanea estos archivos y genera SOLO las clases que se usan.
    content: ['./index.html'],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#4e342e',
                    light: '#a1887f',
                },
                negro: '#1a1a1a',
                blanco: '#fafafa',
            },
            fontFamily: {
                sans: ['Montserrat', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            letterSpacing: {
                'title': '0.15em',
                'widest': '0.1em',
            },
        },
    },
    plugins: [],
}
