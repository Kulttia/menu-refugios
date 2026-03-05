import re

content = ""
with open('c:/Users/USUARIO/OneDrive/Desktop/Proyectos/Menu Refugios/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Fonts and Tailwind Config
content = re.sub(
    r'<link href="https://fonts.googleapis.com/css2\?family=Space\+Grotesk.*?rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">',
    content
)

content = content.replace(
    "font-family: 'Space Grotesk', sans-serif;",
    "font-family: 'Montserrat', sans-serif;"
)
content = content.replace(
    "sans: ['Space Grotesk', 'sans-serif'],",
    "sans: ['Montserrat', 'sans-serif'],\n                        serif: ['\"Playfair Display\"', 'serif'],"
)
content = content.replace(
    "extend: {",
    "extend: {\n                    letterSpacing: {\n                        'title': '0.15em',\n                    },"
)

# 2. Typography Replacements

# Titles (Playfair Display)
content = re.sub(r'text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter', r'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-2xl md:text-3xl font-black uppercase tracking-tighter', r'text-2xl md:text-3xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-6xl md:text-8xl font-black uppercase tracking-tighter', r'text-4xl md:text-6xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-3xl md:text-4xl font-black uppercase tracking-tighter', r'text-2xl md:text-3xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-4xl md:text-5xl font-black uppercase tracking-tighter', r'text-3xl md:text-4xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-5xl md:text-7xl font-black uppercase', r'text-4xl md:text-5xl lg:text-6xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-3xl font-black uppercase tracking-tighter', r'text-2xl md:text-3xl font-serif font-bold uppercase tracking-title', content)
content = re.sub(r'text-5xl font-black tracking-tighter uppercase', r'text-2xl md:text-3xl font-serif font-bold tracking-title uppercase', content)
content = re.sub(r'text-5xl md:text-7xl font-black text-blanco uppercase tracking-widest', r'text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-blanco uppercase tracking-title', content)
content = re.sub(r'text-3xl font-black uppercase tracking-widest', r'text-2xl font-serif font-bold uppercase tracking-title', content)

# Products / Montserrat (small bold)
content = re.sub(r'text-xl md:text-3xl font-bold uppercase tracking-tight', r'text-xs md:text-sm font-bold uppercase tracking-widest', content)
content = re.sub(r'text-xl md:text-2xl font-bold uppercase tracking-tight', r'text-xs md:text-sm font-bold uppercase tracking-widest', content)
content = re.sub(r'text-2xl md:text-3xl font-bold text-brand-dark', r'text-sm md:text-base font-bold text-brand-dark uppercase tracking-widest', content)
content = re.sub(r'text-xl md:text-2xl font-bold flex flex-col', r'text-xs md:text-sm font-bold flex flex-col', content)
content = re.sub(r'text-xl font-bold text-brand-dark', r'text-xs md:text-sm font-bold text-brand-dark uppercase tracking-widest', content)

# Header Nav Links & Details
content = re.sub(r'font-bold text-xl tracking-tight uppercase', r'font-bold text-xs tracking-widest uppercase', content)

# Mobile Menu
content = re.sub(r'text-xl text-brand-dark text-xl font-bold', r'text-xs font-bold text-brand-dark uppercase', content)

# Map button
content = re.sub(r'px-10 py-6 text-3xl font-black uppercase tracking-widest', r'px-8 py-4 text-xs md:text-sm font-bold uppercase tracking-widest', content)

# 3. Layout changes (w-full aspect-square for carousel, and images update)
content = content.replace('max-w-7xl mx-auto border-b-[6px] border-negro overflow-hidden relative bg-brand-light', 'w-full border-b-[6px] border-negro overflow-hidden relative bg-brand-light')
content = content.replace('aspect-square md:aspect-[3/2] lg:aspect-[2/1]', 'aspect-square')

content = content.replace('https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')
content = content.replace('https://images.unsplash.com/photo-1541183182604-89d892d19cb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')

# Update banner aspect ratio to square
content = content.replace('h-48 md:h-80 relative overflow-hidden', 'w-full aspect-square relative overflow-hidden')
content = content.replace('my-24 border-[6px]', 'w-full my-24 border-y-[6px]')

# Footer copyrights
content = re.sub(r'text-xl uppercase tracking-widest', r'text-xs md:text-sm uppercase tracking-widest', content)
content = re.sub(r'text-lg uppercase tracking-widest', r'text-xs uppercase tracking-widest', content)


with open('c:/Users/USUARIO/OneDrive/Desktop/Proyectos/Menu Refugios/index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done")
