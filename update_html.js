const fs = require('fs');
const path = require('path');

const targetPath = path.join('c:', 'Users', 'USUARIO', 'OneDrive', 'Desktop', 'Proyectos', 'Menu Refugios', 'index.html');
let html = fs.readFileSync(targetPath, 'utf-8');

const { makeItem, makeItemNoPrice, makeMetodo } = (() => {
    function makeItem(name, price, desc = "") {
        const hotIcon = `<svg class="w-4 h-4 inline-block ml-1 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" title="Caliente"><path d="M8 3v4M12 3v4M16 3v4M5 9h14v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9zM19 9h2v3h-2"></path></svg>`;
        const coldIcon = `<svg class="w-4 h-4 inline-block ml-1 text-brand-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="miter" title="Frío"><path d="M7 6l1 14h8l1-14M6 6h12M14 6l1-4h-4M9 11l2 6M13 11l-1 6"></path></svg>`;
        
        let nameHtml = "";
        if (name.includes("(Frio o Caliente)")) {
            let cleanName = name.replace("(Frio o Caliente)", "").trim();
            nameHtml = `<span class="bg-[#f4f3f1] pr-4 z-10 transition-colors group-hover:text-brand-dark flex items-center">${cleanName} <span class="inline-flex ml-2 items-center">${hotIcon}${coldIcon}</span></span>`;
        } else {
            nameHtml = `<span class="bg-[#f4f3f1] pr-4 z-10 transition-colors group-hover:text-brand-dark flex items-center">${name}</span>`;
        }

        const descHtml = desc ? `<p class="text-[10px] md:text-xs text-brand-dark mt-1 normal-case tracking-normal opacity-80 font-normal leading-relaxed max-w-xl">${desc}</p>` : "";
        
        return `<li class="group">
            <div class="flex items-baseline justify-between">
                ${nameHtml}
                <div class="dotted-line group-hover:border-negro transition-colors"></div>
                ${price ? `<span class="bg-[#f4f3f1] pl-4 z-10 opacity-90">${price}</span>` : ''}
            </div>
            ${descHtml}
        </li>`;
    }

    function makeItemNoPrice(name, desc) {
        return `<li class="group">
            <div class="flex items-baseline justify-between">
                <span class="bg-[#f4f3f1] pr-4 z-10 transition-colors group-hover:text-brand-dark flex items-center">- ${name}</span>
            </div>
            <p class="text-[10px] md:text-xs text-brand-dark mt-1 normal-case tracking-normal opacity-80 font-normal leading-relaxed max-w-xl">${desc}</p>
        </li>`;
    }

    function makeMetodo(name, price, desc, svgPath) {
        const svg = `<svg class="w-8 h-8 md:w-10 md:h-10 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="miter">${svgPath}</svg>`;
        return `<li class="flex flex-col md:flex-row justify-between group gap-4 items-start md:items-center">
            <div class="flex items-center gap-4 z-10 bg-brand-light pr-4">
                <span class="bg-negro text-blanco p-2 md:p-3 rounded-none flex-shrink-0">${svg}</span>
                <div class="flex flex-col">
                    <span class="transition-colors group-hover:text-blanco text-sm md:text-base">${name}</span>
                    <p class="text-[10px] md:text-xs text-brand-dark mt-1 normal-case tracking-normal opacity-80 font-normal leading-relaxed max-w-sm group-hover:text-blanco transition-colors">${desc}</p>
                </div>
            </div>
            <div class="hidden md:block dotted-line border-negro opacity-50 flex-grow mx-4"></div>
            <span class="bg-brand-light pl-0 md:pl-4 z-10 md:text-right w-full md:w-auto text-sm md:text-base font-bold whitespace-nowrap">${price}</span>
        </li>`;
    }

    return { makeItem, makeItemNoPrice, makeMetodo };
})();

const itemsEsp = [
    ["Tradicional", "$3.000", "Café de tostión intensa, con notas a chocolate, extraído bajo método de goteo, que le da suavidad y sabor."],
    ["Americano", "$6.500", "Café de origen a base de espresso con acidez cítrica y tostión media. ¡Disfruta de sus tonos achocolatados y final a vino!."],
    ["Americano Doble", "$7.500", "Café de origen, a base de doble espresso, con acidez cítrica y tostión media. ¡Disfruta de sus tonos achocolatados y final a vino!."],
    ["Espresso", "$6.000", "Un shot corto de nuestro mejor café."],
    ["Doppio", "$7.000", "Doble shot de espresso para un boost de energía y sabor que te hará conquistar el día."],
    ["Café Tonic", "$13.000", "Fusión refrescante y burbujeante que une la intensidad del espresso doble con la chispa de la tónica"],
    ["Cortado", "$6.000", "A base de espresso con un toque de leche espumada."],
    ["Mocaccino", "$9.000", "Una combinación de espresso, leche cremada y un toque de chocolate."],
    ["Latte (Frio o Caliente)", "$10.000", "Bebida a base café espresso, hielo y sedosa capa de espuma de leche y vainilla."],
    ["Latte Caramelo (Frio o Caliente)", "$13.000", "Bebida a base café espresso, hielo y sedosa capa de espuma de leche y un toque de caramelo."],
    ["Capuccino (Frio o Caliente)", "$9.000", "Café suave a base de doble espresso, con leche cremada, disfrútalo en su forma original."],
    ["Capuccino Vainilla Canela (Frio o Caliente)", "$10.000", "Café suave a base de doble espresso, con leche cremada, finalizado con esencia de vainilla y canela."],
    ["Café Chai", "$12.000", "Un shot de espresso mezclado con té chai, suavizado con leche cremada. Despierta y reconforta al mismo tiempo."],
    ["Café Roncrema (Frio o Caliente)", "$13.000", "Base de capuccino, con un shot de crema de ron y endulzado con caña."],
    ["Granizado de café", "$13.000", "Refrescante combinación de doble espresso , hielos y un toque de salsa de chocolate."],
    ["Afogatto", "$13.000", "Bola de helado de vainilla, ahogado en un trago de espresso."]
].map(args => makeItem(...args)).join("\\n");

const itemsCold = [
    ["Cold Brew", "$11.000", "Café refrescante, infusionado en frio durante varias horas."],
    ["Cold Brew Naranja", "$13.000", "Café refrescante, infusionado en frio durante varias horas, con un toque cítrico de jugo de naranja."]
].map(args => makeItem(...args)).join("\\n");

const itemsSincafe = [
    ["Chocolatada (Frio o Caliente)", "$9.000", "Cacao orgánico al 70% en leche espumosa."],
    ["Chai Latte (Frio o Caliente)", "$12.000", "De origen hindú a base de té negro.  acompañada de distintas especias y plantas."],
    ["Matcha Latte (Frio o Caliente)", "$13.000", "De origen asiático con múltiples beneficios, saludable y refrescante. (preparada en bebida de almendras)."]
].map(args => makeItem(...args)).join("\\n");

const itemsInfusiones = [
    ["Gripal", "Jengibre, limón y miel ayuda a prevenir los síntomas de la gripa."],
    ["Anti estrés", "Uva y flores de Bach, ideal para momentos de estrés elevados."],
    ["Calma", "Piña y naranja. estabiliza el sistema nervioso central y disminuye la ansiedad."],
    ["Frutal", "Mix de frutas deshidratadas, uchuva, fresa, piña."]
].map(args => makeItemNoPrice(...args)).join("\\n");

const metodos = [
    makeMetodo("Prensa Francesa", "$ 13.000", "Perfil más redondo y dulce, con cuerpo denso. Se intensifican los sabores a panela y frutas maduras del Chiroso en una taza más reconfortante. *Disponible en dos o cuatro tazas.", '<path d="M7 8h10v12H7z M12 2v6 M9 2h6 M6 13h12" />'),
    makeMetodo("V60", "$16.000", "Extracción limpia y brillante que resalta notas florales y cítricas del Chiroso. Ideal para percibir su acidez viva y cuerpo medio. Dos tazas. *Disponible en dos tazas.", '<path d="M4 4h16l-8 12L4 4z M9 16v4h6v-4" />')
].join("\\n");

const otrasBebidas = [
    ["Té Hatsú", "$7.000", "Amarillo: Carambolo y flor de loto • Blanco: Té blanco y mangostino • Negro: Té negro y jugo de limón • Morado: Té blanco y flor de cerezo."],
    ["Sodas", "$13.000", "Refrescante y con sabores de frutas naturales. Frutos rojos (Mora y Uva) • Frutos amarillos (Naranja y maracuyá)."],
    ["Soda Michelada", "$6.000", "Bebida gasificada, hielos y limón. Escarchado con sal."],
    ["Soda Hatsú", "$6.000", "Limón y hierbabuena • Sandía y albahaca • Uva Blanca y romero • Frambuesa y rosas."]
].map(args => makeItem(...args)).join("\\n");

const cervezas = [
    ["Tres Cordilleras", "$12.000", ""],
    ["Roja Comarca", "$15.000", ""],
    ["Negra Mordor", "$15.000", ""]
].map(args => makeItem(...args)).join("\\n");

const panes = [
    ["Palito De Queso", "$9.000", "Elaborado a partir de mantequilla 100% natural, relleno de queso campesino y finalizado con parmesano."],
    ["Croissants", "$10.000", "Tres quesos | Espinaca y queso | Almendras | Pistacho | Cheesecake"],
    ["Rollo De Canela", "$9.000", "Hecho con mantequilla natural, crema de canela y frosting de nuez del nogal."],
    ["Empanadas Argentinas", "$9.000", "Fugazzeta | Capresse | Espinaca y queso"]
].map(args => makeItem(...args)).join("\\n");

const postres = [
    ["Torta De Zanahoria", "$13.000", "Bizcocho de zanahoria, relleno con crema de maní, cubierto con Maní molido."],
    ["Torta De Limón y Amapola", "$13.000", "Bizcocho de limón y semillas de amapola, relleno de crema alimonada de almendras, cubierto con crema de coco."],
    ["Muffin de guayaba y queso", "$9.000", "Elaborado con masa de queso y centro de guayaba, Lo mejor de lo dulce y lo salado."],
    ["Galletas", "$9.000", "Avena | Macadamia | Chocolate | Doble Chocolate | Red Velvet | Pistacho"],
    ["Alfajor", "$3.000", "Deliciosas galletas rellenas de arequipe."]
].map(args => makeItem(...args)).join("\\n");


const newMain = `<main class="max-w-5xl mx-auto px-6 py-12">

        <!-- Categoría: Café -->
        <section id="cafe" class="mb-32">
            <div class="border-y-[8px] border-negro py-6 mb-16 bg-brand-dark text-blanco px-4 transform -rotate-1">
                <h3 class="text-4xl md:text-6xl font-serif font-bold uppercase tracking-title text-center">Café</h3>
            </div>

            <!-- Sub: A base de espresso -->
            <div class="mb-16">
                <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 inline-block border-b-[6px] border-brand-light pb-2">A base de espresso</h4>
                <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest">
                    ${itemsEsp}
                </ul>
            </div>

            <!-- Sub: A base de Cold Brew -->
            <div class="mb-16">
                <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 inline-block border-b-[6px] border-brand-light pb-2">A base de Cold Brew</h4>
                <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest">
                    ${itemsCold}
                </ul>
            </div>

            <!-- Sub: Bebidas sin café -->
            <div class="mb-16">
                <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 inline-block border-b-[6px] border-brand-light pb-2">Bebidas sin Café</h4>
                <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest">
                    ${itemsSincafe}
                </ul>
            </div>

            <!-- Sub: Infusiones -->
            <div class="mb-16">
                <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 inline-block border-b-[6px] border-brand-light pb-2">Infusiones</h4>
                <p class="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-dark mb-6 flex justify-between">
                    <span>Bebida natural a base de frutas y plantas aromáticas.</span>
                    <span class="bg-[#f4f3f1] px-2">$5.500</span>
                </p>
                <div class="dotted-line border-brand-dark mb-6 opacity-30"></div>
                <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest pl-4">
                    ${itemsInfusiones}
                </ul>
                <p class="text-[10px] md:text-xs text-brand-dark mt-8 normal-case tracking-normal opacity-80 font-bold leading-relaxed">* Puedes solicitar tus bebidas en bebida de almendras por $4.000</p>
            </div>

            <!-- Sub: Metodos -->
            <div class="mb-16 p-8 border-[6px] border-negro bg-brand-light relative">
                <div class="absolute -top-6 -right-6 bg-blanco border-[4px] border-negro p-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] rotate-3 hidden md:block">
                    <p class="font-bold text-negro uppercase tracking-widest text-xs">Destacado</p>
                </div>
                <h4 class="text-3xl md:text-4xl font-serif font-bold uppercase tracking-title text-negro mb-10 flex items-center gap-4">Métodos</h4>
                <ul class="space-y-6 md:space-y-8 text-xs md:text-sm font-bold uppercase tracking-widest">
                    ${metodos}
                </ul>
            </div>

            <!-- Sub: Otras Bebidas & Cervezas -->
            <div class="grid md:grid-cols-2 gap-12 mt-16">
                <div>
                    <h4 class="text-2xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 border-b-[6px] border-brand-light pb-2">Otras Bebidas</h4>
                    <ul class="space-y-4 text-xs md:text-sm font-bold uppercase tracking-widest">
                        ${otrasBebidas}
                    </ul>
                </div>
                <div>
                    <h4 class="text-2xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 border-b-[6px] border-brand-light pb-2">Cervezas Artesanales</h4>
                    <ul class="space-y-4 text-xs md:text-sm font-bold uppercase tracking-widest mb-4">
                        ${cervezas}
                    </ul>
                    <p class="text-[10px] md:text-xs text-brand-dark normal-case tracking-normal opacity-80 font-normal leading-relaxed">* Espumosa bebida de origen. ¡Disfruta de sus diferentes presentaciones y tonalidades!</p>
                </div>
            </div>
        </section>

        <!-- Categoría: Repostería -->
        <section id="reposteria" class="mb-32">
            <div class="border-y-[8px] border-negro py-6 mb-16 bg-brand-light text-negro px-4 transform rotate-1">
                <h3 class="text-4xl md:text-6xl font-serif font-bold uppercase tracking-title text-center">Repostería</h3>
            </div>

            <div class="grid md:grid-cols-2 gap-16">
                <!-- Sub: Panes -->
                <div>
                    <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 border-b-[6px] border-brand-dark pb-2 inline-block">Panes & Salados</h4>
                    <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest">
                        ${panes}
                    </ul>
                </div>

                <!-- Sub: Tortas y postres -->
                <div>
                    <h4 class="text-2xl md:text-3xl font-serif font-bold uppercase tracking-title text-brand-dark mb-8 border-b-[6px] border-brand-dark pb-2 inline-block">Tortas y Postres</h4>
                    <ul class="space-y-4 md:space-y-6 text-xs md:text-sm font-bold uppercase tracking-widest">
                        ${postres}
                    </ul>
                </div>
            </div>
        </section>

        <!-- Sección Falsa de Libros -->
        <section id="libros" class="mb-32">
            <div class="border-y-[8px] border-negro py-6 mb-16 bg-brand-dark text-blanco px-4 transform -rotate-1">
                <h3 class="text-4xl md:text-6xl font-serif font-bold uppercase tracking-title text-center">Libros</h3>
            </div>
            <div class="text-center bg-brand-light border-[6px] border-negro p-12">
                <p class="text-xl md:text-2xl font-serif font-bold uppercase tracking-title text-negro">Selección disponible en tienda</p>
                <p class="text-xs md:text-sm font-bold uppercase tracking-widest text-brand-dark mt-4">Nuestros libros rotan cada semana. Visítanos para descubrir nuestras recomendaciones.</p>
            </div>
        </section>

    </main>`;

const mainRegex = /<main class="max-w-5xl mx-auto px-6 py-12">([\s\S]*?)<\/main>/;
html = html.replace(mainRegex, newMain);

fs.writeFileSync(targetPath, html, 'utf-8');
console.log('Update Complete.');
