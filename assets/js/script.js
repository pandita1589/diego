// Variables para controlar el panel de género
let generoSeleccionado = null;
const generoOverlay = document.getElementById('generoOverlay');
const generoContinuar = document.getElementById('generoContinuar');
const generoPanel = document.getElementById('generoPanel');

// Función para mostrar el panel de género después de la carga
function mostrarPanelGenero() {
    // Primero esperamos a que se oculte la pantalla de carga
    setTimeout(() => {
        generoOverlay.classList.add('visible');
        
        // Añadimos una pequeña animación después de que el panel sea visible
        setTimeout(() => {
            generoPanel.classList.add('animate-in');
        }, 300);
    }, 600); // Este tiempo debe ser mayor que el de ocultarPantallaCarga
}

// Función para seleccionar un género
function seleccionarGenero(genero) {
    // Limpiamos selecciones previas
    document.querySelectorAll('.genero-opcion').forEach(opcion => {
        opcion.classList.remove('seleccionado');
    });
    
    // Marcamos la opción seleccionada
    document.querySelector(`.genero-opcion[data-genero="${genero}"]`).classList.add('seleccionado');
    
    // Guardamos la selección
    generoSeleccionado = genero;
    
    // Activamos el botón de continuar
    generoContinuar.classList.add('activo');
}

// Función para continuar después de seleccionar el género
function continuarNavegacion() {
    if (!generoSeleccionado) return;
    
    // Guardamos la preferencia en localStorage para futuros usos
    localStorage.setItem('userGender', generoSeleccionado);
    
    // Ocultamos el panel con animación
    generoOverlay.classList.remove('visible');
    
    // Personalizamos elementos según el género (opcional)
    personalizarSegunGenero(generoSeleccionado);
}

// Función para personalizar elementos según el género seleccionado
function personalizarSegunGenero(genero) {
    // Ejemplos de personalización según el género
    let mensaje = '';
    let colorAccent = '';
    
    switch(genero) {
        case 'mujer':
            mensaje = '¡Bienvenida a nuestra tienda!';
            colorAccent = '#d63031'; // Mantener el rojo actual
            break;
        case 'hombre':
            mensaje = '¡Bienvenido a nuestra tienda!';
            colorAccent = '#0984e3'; // Azul
            break;
        case 'no-binario':
            mensaje = '¡Bienvenide a nuestra tienda!';
            colorAccent = '#6c5ce7'; // Púrpura
            break;
    }
    
    // Mostramos un mensaje personalizado (puede ser un toast o cambiar algún elemento)
    mostrarMensajeBienvenida(mensaje);
    
    // Opcionalmente podemos cambiar el color de acento según el género
    //document.documentElement.style.setProperty('--color-accent', colorAccent);
    
    // Modificar el lenguaje en todo el HTML según el género
    cambiarLenguajePorGenero(genero);
}

// Función para mostrar un mensaje de bienvenida personalizado
function mostrarMensajeBienvenida(mensaje) {
    // Creamos un elemento para el mensaje
    const mensajeElement = document.createElement('div');
    mensajeElement.className = 'mensaje-bienvenida';
    mensajeElement.innerHTML = `
        <div class="mensaje-contenido">
            <i class="fas fa-heart"></i>
            <span>${mensaje}</span>
        </div>
    `;
    
    // Estilos para el mensaje
    mensajeElement.style.position = 'fixed';
    mensajeElement.style.bottom = '20px';
    mensajeElement.style.left = '50%';
    mensajeElement.style.transform = 'translateX(-50%)';
    mensajeElement.style.backgroundColor = 'var(--color-accent)';
    mensajeElement.style.color = 'white';
    mensajeElement.style.padding = '15px 25px';
    mensajeElement.style.borderRadius = '30px';
    mensajeElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    mensajeElement.style.zIndex = '100';
    mensajeElement.style.display = 'flex';
    mensajeElement.style.alignItems = 'center';
    mensajeElement.style.justifyContent = 'center';
    mensajeElement.style.gap = '10px';
    mensajeElement.style.opacity = '0';
    mensajeElement.style.transition = 'opacity 0.5s, transform 0.5s';
    
    // Añadimos al DOM
    document.body.appendChild(mensajeElement);
    
    // Animamos la entrada
    setTimeout(() => {
        mensajeElement.style.opacity = '1';
        mensajeElement.style.transform = 'translateX(-50%) translateY(-10px)';
        
        // Y programamos la salida
        setTimeout(() => {
            mensajeElement.style.opacity = '0';
            mensajeElement.style.transform = 'translateX(-50%) translateY(20px)';
            
            // Eliminamos del DOM cuando termine la animación
            setTimeout(() => {
                document.body.removeChild(mensajeElement);
            }, 500);
        }, 4000);
    }, 100);
}

// Modificamos la función existente para que muestre el panel de género
function ocultarPantallaCarga() {
    const pantallaCarga = document.getElementById('pantallaCarga');
    const cargaMensaje = document.getElementById('cargaMensaje');
    
    cargaMensaje.classList.add('oculto');
    
    setTimeout(() => {
        pantallaCarga.style.opacity = '0';
        
        setTimeout(() => {
            pantallaCarga.style.display = 'none';
            // Mostramos el panel de género cuando termina la carga
            mostrarPanelGenero();
        }, 500);
    }, 500);
}

// Event listeners cuando la página se carga
document.addEventListener('DOMContentLoaded', function() {
    // Comportamiento original
    setTimeout(ocultarPantallaCarga, 2000);
    
    // Verificar el tema guardado
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-theme');
        document.getElementById('themeText').textContent = 'Modo claro';
        document.getElementById('themeIcon').classList.replace('fa-sun', 'fa-moon');
    }
    
    // Verificar si ya hay un género guardado
    const generoGuardado = localStorage.getItem('userGender');
    if (generoGuardado) {
        // Si ya hay un género guardado, podríamos saltarnos la selección
        // o pre-seleccionar esa opción
        // generoSeleccionado = generoGuardado;
        // El panel se mostrará de todas formas, pero podrías ocultarlo así:
        // generoOverlay.style.display = 'none';
        
        // Por ahora, lo dejamos mostrar siempre para este ejemplo
        
        // Pero aplicamos el lenguaje específico al cargar la página
        cambiarLenguajePorGenero(generoGuardado);
    }
});

// Toggle del tema oscuro/claro
document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const isDarkMode = document.body.classList.contains('dark-theme');
    
    localStorage.setItem('darkMode', isDarkMode);
    
    if (isDarkMode) {
        document.getElementById('themeText').textContent = 'Modo claro';
        document.getElementById('themeIcon').classList.replace('fa-sun', 'fa-moon');
    } else {
        document.getElementById('themeText').textContent = 'Modo oscuro';
        document.getElementById('themeIcon').classList.replace('fa-moon', 'fa-sun');
    }
});

// Funciones para formulario y productos
function mostrarFormulario(producto, precio) {
    document.getElementById('producto-seleccionado').value = producto;
    document.getElementById('precio-producto').value = precio;
    document.getElementById('overlay').style.display = 'flex';
    document.getElementById('formulario').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('formulario').style.opacity = '1';
    }, 50);
}

function cerrarFormulario() {
    document.getElementById('formulario').style.opacity = '0';
    
    setTimeout(() => {
        document.getElementById('overlay').style.display = 'none';
    }, 300);
}

function enviarWhatsApp() {
    // Aquí va la lógica para enviar el pedido por WhatsApp
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;
    const producto = document.getElementById('producto-seleccionado').value;
    const precio = document.getElementById('precio-producto').value;
    const cantidad = document.getElementById('cantidad').value;
    
    if (!nombre || !telefono || !direccion) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    // Armar el mensaje
    let mensaje = `Hola, quiero realizar el siguiente pedido:\n\n`;
    mensaje += `*Producto:* ${producto}\n`;
    mensaje += `*Precio:* ${precio}\n`;
    mensaje += `*Cantidad:* ${cantidad}\n`;
    mensaje += `*Total:* S/. ${(parseFloat(precio.replace('S/. ', '')) * parseInt(cantidad)).toFixed(2)}\n\n`;
    mensaje += `*Datos de entrega:*\n`;
    mensaje += `*Nombre:* ${nombre}\n`;
    mensaje += `*Teléfono:* ${telefono}\n`;
    mensaje += `*Dirección:* ${direccion}`;
    
    // Codificar mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    
    // Abrir WhatsApp Web con el mensaje
    window.open(`https://wa.me/51973699649?text=${mensajeCodificado}`);
    
    // Cerrar formulario
    cerrarFormulario();
}

// Función para cambiar el lenguaje en todo el HTML según género
function cambiarLenguajePorGenero(genero) {
    // Diccionario de palabras según género
    const palabras = {
        // Formato: 'palabra_original': {mujer: 'versión_femenina', hombre: 'versión_masculina', 'no-binario': 'versión_no_binaria'}
        'Bienvenido': {mujer: 'Bienvenida', hombre: 'Bienvenido', 'no-binario': 'Bienvenide'},
        'Completa tus datos': {mujer: 'Completa tus datos', hombre: 'Completa tus datos', 'no-binario': 'Completá tus datos'},
        'Estamos trabajando': {mujer: 'Estamos trabajando', hombre: 'Estamos trabajando', 'no-binario': 'Estamos trabajande'},
        'Explorar productos': {mujer: 'Explorar productos', hombre: 'Explorar productos', 'no-binario': 'Explorá productos'},
        'Comprar ahora': {mujer: 'Comprar ahora', hombre: 'Comprar ahora', 'no-binario': 'Comprá ahora'},
        'Enviar pedido': {mujer: 'Enviar pedido', hombre: 'Enviar pedido', 'no-binario': 'Enviá pedido'},
        'Reintentar': {mujer: 'Reintentar', hombre: 'Reintentar', 'no-binario': 'Reintentá'},
        'Todos los derechos reservados': {mujer: 'Todas las derechas reservadas', hombre: 'Todos los derechos reservados', 'no-binario': 'Todes les derechos reservades'},
        // Puedes añadir más palabras aquí según sea necesario
    };
    
    // Recorrer todo el contenido del documento
    const recorrerNodos = (nodo) => {
        // Si es un nodo de texto
        if (nodo.nodeType === Node.TEXT_NODE) {
            let texto = nodo.nodeValue;
            let textoModificado = texto;
            
            // Buscar y reemplazar palabras
            for (let palabra in palabras) {
                if (texto.includes(palabra)) {
                    const regex = new RegExp(`\\b${palabra}\\b`, 'g');
                    textoModificado = textoModificado.replace(regex, palabras[palabra][genero]);
                }
            }
            
            // Actualizar el texto si ha cambiado
            if (texto !== textoModificado) {
                nodo.nodeValue = textoModificado;
            }
        } 
        // Si tiene hijos, procesarlos
        else if (nodo.nodeType === Node.ELEMENT_NODE) {
            // Procesar atributos
            if (nodo.hasAttributes()) {
                Array.from(nodo.attributes).forEach(attr => {
                    if (attr.name.toLowerCase() === 'placeholder' || 
                        attr.name.toLowerCase() === 'title' || 
                        attr.name.toLowerCase() === 'alt') {
                        let texto = attr.value;
                        let textoModificado = texto;
                        
                        for (let palabra in palabras) {
                            if (texto.includes(palabra)) {
                                const regex = new RegExp(`\\b${palabra}\\b`, 'g');
                                textoModificado = textoModificado.replace(regex, palabras[palabra][genero]);
                            }
                        }
                        
                        if (texto !== textoModificado) {
                            attr.value = textoModificado;
                        }
                    }
                });
            }
            
            // Procesar hijos
            Array.from(nodo.childNodes).forEach(recorrerNodos);
        }
    };
    
    // Iniciar el recorrido desde el body
    recorrerNodos(document.body);
    
    // Casos específicos que pueden necesitar tratamiento especial
    const h2Bienvenido = document.querySelector('.caratula h2');
    if (h2Bienvenido && h2Bienvenido.textContent.includes('Bienvenido')) {
        switch(genero) {
            case 'mujer':
                h2Bienvenido.textContent = 'Bienvenida a Mi Tienda';
                break;
            case 'hombre':
                h2Bienvenido.textContent = 'Bienvenido a Mi Tienda';
                break;
            case 'no-binario':
                h2Bienvenido.textContent = 'Bienvenide a Mi Tienda';
                break;
        }
    }
}

function recargarPagina() {
    window.location.reload();
}

// Datos de las universidades de Lima, Perú
const universidadesData = {
    univ1: {
        nombre: "Universidad Nacional Mayor de San Marcos",
        ubicacion: "Cercado de Lima",
        pais: "Perú",
        fundacion: "1551",
        estudiantes: "32,000+",
        historia: "La Universidad Nacional Mayor de San Marcos (UNMSM) es la universidad más antigua de América y una de las más prestigiosas del Perú. Fundada el 12 de mayo de 1551 por Real Cédula del rey Carlos V, es conocida como la 'Decana de América'. A lo largo de sus casi cinco siglos de historia, ha formado a importantes intelectuales, científicos y líderes políticos peruanos.",
        logros: [
            "Primera universidad fundada oficialmente en el continente americano",
            "Ha formado a 9 presidentes de la República del Perú",
            "Cuenta con el Centro Cultural más importante del país",
            "Reconocida por su excelencia en medicina, derecho e investigación científica"
        ],
        sitioWeb: "https://www.unmsm.edu.pe/"
    },
    univ2: {
        nombre: "Pontificia Universidad Católica del Perú",
        ubicacion: "San Miguel",
        pais: "Perú",
        fundacion: "1917",
        estudiantes: "25,000+",
        historia: "La Pontificia Universidad Católica del Perú (PUCP) fue fundada en 1917 por el R.P. Jorge Dintilhac SS.CC. Es reconocida como la mejor universidad privada del Perú y una de las más prestigiosas de América Latina. Su campus principal, ubicado en el distrito de San Miguel en Lima, es conocido por sus amplias áreas verdes y moderna infraestructura.",
        logros: [
            "Clasificada consistentemente como la mejor universidad del Perú",
            "Primera universidad peruana en obtener la acreditación institucional de SINEACE",
            "Líder en investigación científica con más de 40 grupos de investigación",
            "Ha producido destacados literatos, entre ellos el Premio Nobel Mario Vargas Llosa"
        ],
        sitioWeb: "https://www.pucp.edu.pe/"
    },
    univ3: {
        nombre: "Universidad Nacional de Ingeniería",
        ubicacion: "Rímac",
        pais: "Perú",
        fundacion: "1876",
        estudiantes: "12,000+",
        historia: "La Universidad Nacional de Ingeniería (UNI) fue fundada en 1876 por el ingeniero polaco Eduardo de Habich como Escuela de Ingenieros. Es la institución educativa líder en formación de ingenieros y arquitectos en el Perú. Su campus principal se ubica en el distrito del Rímac en Lima y es conocido como 'La ciudadela universitaria'.",
        logros: [
            "Formación de los principales ingenieros y arquitectos del país",
            "Centro de Investigación Sísmica y Mitigación de Desastres (CISMID)",
            "Primer reactor nuclear de investigación en Perú",
            "Ganador de numerosas competencias internacionales de robótica y ciencias"
        ],
        sitioWeb: "https://www.uni.edu.pe/"
    },
    univ4: {
        nombre: "Universidad Nacional Agraria La Molina",
        ubicacion: "La Molina",
        pais: "Perú",
        fundacion: "1902",
        estudiantes: "5,000+",
        historia: "La Universidad Nacional Agraria La Molina (UNALM) fue fundada en 1902 como Escuela Nacional de Agricultura y Veterinaria. Especializada en ciencias agrarias, alimentarias y ambientales, es reconocida por su contribución al desarrollo agrícola sostenible del Perú. Su campus en el distrito de La Molina es uno de los más grandes y verdes de Lima.",
        logros: [
            "Líder en investigación agrícola y desarrollo rural en Perú",
            "Centro de conservación de la biodiversidad peruana",
            "Pionera en programas de agricultura sostenible y seguridad alimentaria",
            "Desarrollo de variedades mejoradas de cultivos andinos"
        ],
        sitioWeb: "https://www.lamolina.edu.pe/"
    },
    univ5: {
        nombre: "Universidad de Lima",
        ubicacion: "Santiago de Surco",
        pais: "Perú",
        fundacion: "1962",
        estudiantes: "20,000+",
        historia: "La Universidad de Lima fue fundada en 1962 como una institución educativa privada sin fines de lucro. Inicialmente orientada a las ciencias empresariales, hoy ofrece una amplia gama de programas académicos. Su moderno campus en el distrito de Santiago de Surco es reconocido por su arquitectura e infraestructura de vanguardia.",
        logros: [
            "Reconocida por su excelencia en negocios y comunicaciones",
            "Centro de emprendimiento e innovación líder en el país",
            "Importantes convenios con universidades internacionales",
            "Su Cine Universitario es un referente cultural en Lima"
        ],
        sitioWeb: "https://www.ulima.edu.pe/"
    },
    univ6: {
        nombre: "Universidad del Pacífico",
        ubicacion: "Jesús María",
        pais: "Perú",
        fundacion: "1962",
        estudiantes: "4,500+",
        historia: "La Universidad del Pacífico es una institución educativa privada fundada en 1962, especializada en economía, finanzas y gestión empresarial. Es considerada la escuela de negocios más prestigiosa del Perú. Se caracteriza por su enfoque en la excelencia académica, la responsabilidad social y su selectivo proceso de admisión.",
        logros: [
            "Clasificada como la mejor escuela de negocios del Perú",
            "Acreditaciones internacionales en sus programas de MBA",
            "Centro de investigación económica líder en el país",
            "Alta tasa de empleabilidad de sus egresados en posiciones directivas"
        ],
        sitioWeb: "https://www.up.edu.pe/"
    },
    univ7: {
        nombre: "Universidad Ricardo Palma",
        ubicacion: "Santiago de Surco",
        pais: "Perú",
        fundacion: "1969",
        estudiantes: "15,000+",
        historia: "La Universidad Ricardo Palma (URP) fue fundada en 1969 y recibió su nombre en honor al reconocido escritor peruano. Es una institución privada conocida por sus facultades de Medicina, Arquitectura e Ingeniería. Su campus principal se encuentra en el distrito de Santiago de Surco en Lima.",
        logros: [
            "Reconocida por su Facultad de Medicina Humana",
            "Su Facultad de Arquitectura es una de las más prestigiosas del país",
            "Instituto de Investigaciones Museológicas y Artísticas",
            "Convenios internacionales con universidades de Europa y América"
        ],
        sitioWeb: "https://www.urp.edu.pe/"
    },
    univ8: {
        nombre: "Universidad Peruana Cayetano Heredia",
        ubicacion: "San Martín de Porres",
        pais: "Perú",
        fundacion: "1961",
        estudiantes: "3,800+",
        historia: "La Universidad Peruana Cayetano Heredia (UPCH) fue fundada en 1961 por un grupo de profesores liderados por el Dr. Honorio Delgado. Es reconocida como la institución líder en ciencias de la salud en el Perú. Su campus principal se encuentra en el distrito de San Martín de Porres en Lima.",
        logros: [
            "Mejor universidad peruana en investigación biomédica",
            "Importantes descubrimientos en enfermedades tropicales y de altura",
            "Primera en realizar trasplantes de órganos en el Perú",
            "Múltiples reconocimientos internacionales en medicina e investigación"
        ],
        sitioWeb: "https://www.cayetano.edu.pe/"
    },
    univ9: {
        nombre: "Universidad Nacional Federico Villarreal",
        ubicacion: "Cercado de Lima",
        pais: "Perú",
        fundacion: "1963",
        estudiantes: "25,000+",
        historia: "La Universidad Nacional Federico Villarreal (UNFV) fue fundada en 1963. Es la segunda universidad nacional más importante de Lima después de San Marcos. Cuenta con numerosas sedes distribuidas en varios distritos de Lima y ofrece una amplia variedad de carreras profesionales en distintas áreas del conocimiento.",
        logros: [
            "Formación de destacados profesionales en el ámbito público",
            "Facultad de Oceanografía, Pesquería y Ciencias Alimentarias pionera en el país",
            "Importante acervo bibliográfico e histórico",
            "Programas de extensión social en zonas vulnerables de Lima"
        ],
        sitioWeb: "http://www.unfv.edu.pe/"
    },
    univ10: {
        nombre: "Universidad San Ignacio de Loyola",
        ubicacion: "La Molina",
        pais: "Perú",
        fundacion: "1995",
        estudiantes: "22,000+",
        historia: "La Universidad San Ignacio de Loyola (USIL) fue fundada en 1995 por Raúl Diez Canseco Terry. Se enfoca en la formación de emprendedores con visión global. Su campus principal se encuentra en el distrito de La Molina en Lima, y cuenta con sedes internacionales en Miami y Paraguay.",
        logros: [
            "Pionera en educación bilingüe universitaria en Perú",
            "Centro de Emprendimiento reconocido en Latinoamérica",
            "Acreditaciones internacionales en turismo y gastronomía",
            "Alianzas estratégicas con universidades de Estados Unidos y Europa"
        ],
        sitioWeb: "https://www.usil.edu.pe/"
    },
    univ11: {
        nombre: "Universidad de San Martín de Porres",
        ubicacion: "Santa Anita",
        pais: "Perú",
        fundacion: "1962",
        estudiantes: "35,000+",
        historia: "La Universidad de San Martín de Porres (USMP) fue fundada en 1962. Es una de las universidades privadas más grandes del Perú. Sus facultades se encuentran distribuidas en varios campus en Lima, siendo su sede principal en el distrito de Santa Anita. Es reconocida por sus facultades de Derecho, Medicina y Ciencias de la Comunicación.",
        logros: [
            "Una de las universidades con mayor población estudiantil del país",
            "Instituto de Gobierno y Gestión Pública reconocido nacionalmente",
            "Importantes logros deportivos a nivel nacional e internacional",
            "Pionera en programas de responsabilidad social universitaria"
        ],
        sitioWeb: "https://www.usmp.edu.pe/"
    },
    univ12: {
        nombre: "Universidad Científica del Sur",
        ubicacion: "Villa El Salvador",
        pais: "Perú",
        fundacion: "1998",
        estudiantes: "10,000+",
        historia: "La Universidad Científica del Sur fue fundada en 1998 con un enfoque en las ciencias de la salud, ciencias ambientales y ciencias empresariales. Su campus principal se encuentra en el distrito de Villa El Salvador, al sur de Lima, y se caracteriza por su compromiso con el desarrollo sostenible y la investigación científica.",
        logros: [
            "Líder en investigación sobre conservación marina y biodiversidad",
            "Pionera en programas de medicina veterinaria y ciencias ambientales",
            "Centro de investigación en acuicultura y recursos hidrobiológicos",
            "Importante labor en conservación de especies en peligro de extinción"
        ],
        sitioWeb: "https://www.cientifica.edu.pe/"
    },
    univ13: {
        nombre: "Universidad Nacional Tecnológica de Lima Sur",
        ubicacion: "Villa El Salvador",
        pais: "Perú",
        fundacion: "2001",
        estudiantes: "5,000+",
        historia: "La Universidad Nacional Tecnológica de Lima Sur (UNTELS) fue creada en 2001 para atender las necesidades educativas de la zona sur de Lima. Se especializa en carreras de ingeniería y tecnología. Su campus se encuentra en el distrito de Villa El Salvador y busca impulsar el desarrollo tecnológico y la innovación en el país.",
        logros: [
            "Formación de profesionales técnicos para el desarrollo de Lima Sur",
            "Centro de desarrollo de tecnologías para pequeñas y medianas empresas",
            "Programas de extensión comunitaria en zonas vulnerables",
            "Proyectos de innovación tecnológica con impacto social"
        ],
        sitioWeb: "https://www.untels.edu.pe/"
    },
    univ14: {
        nombre: "Universidad Privada del Norte",
        ubicacion: "Los Olivos",
        pais: "Perú",
        fundacion: "1994",
        estudiantes: "80,000+",
        historia: "La Universidad Privada del Norte (UPN) inició sus operaciones en Trujillo en 1994 y se expandió a Lima en 2007. Forma parte del grupo Laureate International Universities, una red global de instituciones educativas. En Lima cuenta con varios campus en los distritos de Los Olivos, San Juan de Lurigancho y Breña.",
        logros: [
            "Modelo educativo basado en competencias y empleabilidad",
            "Campus inteligentes con tecnología de vanguardia",
            "Acreditaciones internacionales en ingeniería y negocios",
            "Red internacional de intercambios con más de 80 universidades"
        ],
        sitioWeb: "https://www.upn.edu.pe/"
    },
    univ15: {
        nombre: "Universidad Autónoma del Perú",
        ubicacion: "Villa El Salvador",
        pais: "Perú",
        fundacion: "2007",
        estudiantes: "16,000+",
        historia: "La Universidad Autónoma del Perú fue fundada en 2007 en el distrito de Villa El Salvador. Se enfoca en brindar educación superior accesible a los jóvenes de la zona sur de Lima. Su campus moderno cuenta con instalaciones deportivas, laboratorios especializados y centros de investigación.",
        logros: [
            "Rápido crecimiento y consolidación en el sur de Lima",
            "Importantes convenios con empresas para inserción laboral",
            "Centro de emprendimiento para el desarrollo de startups",
            "Iniciativas de responsabilidad social en comunidades vulnerables"
        ],
        sitioWeb: "https://autonoma.pe/"
    },
    univ16: {
        nombre: "Universidad ESAN",
        ubicacion: "Santiago de Surco",
        pais: "Perú",
        fundacion: "1963",
        estudiantes: "7,000+",
        historia: "La Universidad ESAN se originó como la Escuela de Administración de Negocios para Graduados en 1963, siendo la primera escuela de negocios de posgrado en América Latina. En 2003 se convirtió en universidad, manteniendo su enfoque en negocios, economía y ciencias administrativas. Su campus se encuentra en el distrito de Santiago de Surco en Lima.",
        logros: [
            "MBA más prestigioso del Perú con reconocimiento internacional",
            "Triple corona de acreditaciones (AACSB, EQUIS, AMBA)",
            "Centro de investigación económica y empresarial de referencia",
            "Importante red de contactos empresariales y alumni"
        ],
        sitioWeb: "https://www.esan.edu.pe/"
    },
    univ17: {
        nombre: "Universidad Tecnológica del Perú",
        ubicacion: "Lima (varios distritos)",
        pais: "Perú",
        fundacion: "1997",
        estudiantes: "50,000+",
        historia: "La Universidad Tecnológica del Perú (UTP) fue fundada en 1997 y forma parte del grupo Intercorp. Se ha consolidado como una de las universidades más grandes del país, con campus en varios distritos de Lima como Cercado de Lima, San Juan de Lurigancho, Los Olivos y Ate. Se especializa en carreras de ingeniería, tecnología y negocios con un enfoque práctico orientado al mercado laboral.",
        logros: [
            "Pionera en educación tecnológica accesible en Perú",
            "Infraestructura moderna con laboratorios especializados en ingeniería",
            "Programas de doble titulación internacional",
            "Importante red de convenios con empresas para prácticas profesionales"
        ],
        sitioWeb: "https://www.utp.edu.pe/"
    }
};

// Función para abrir el modal con la información de la universidad
function abrirModalUniversidad(univId) {
    const data = universidadesData[univId];
    if (!data) return;
    
    // Llenar la información en el modal
    document.getElementById('universidadNombre').textContent = data.nombre;
    document.getElementById('universidadLogo').src = document.querySelector(`.universidad-item[data-id="${univId}"] img`).src;
    document.getElementById('universidadLogo').alt = data.nombre;
    document.getElementById('universidadUbicacion').textContent = data.ubicacion;
    document.getElementById('universidadPais').textContent = data.pais;
    document.getElementById('universidadFundacion').textContent = data.fundacion;
    document.getElementById('universidadEstudiantes').textContent = data.estudiantes;
    document.getElementById('universidadHistoria').textContent = data.historia;
    
    // Limpiar y rellenar la lista de logros
    const logrosList = document.getElementById('universidadLogros');
    logrosList.innerHTML = '';
    data.logros.forEach(logro => {
        const li = document.createElement('li');
        li.textContent = logro;
        logrosList.appendChild(li);
    });
    
    // Actualizar enlace del sitio web
    document.getElementById('universidadSitioWeb').href = data.sitioWeb;
    
    // Mostrar el modal con animación
    const modal = document.getElementById('universidadModal');
    modal.classList.add('visible');
    
    // Prevenir el scroll de la página
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function cerrarModalUniversidad() {
    const modal = document.getElementById('universidadModal');
    modal.classList.remove('visible');
    
    // Restaurar el scroll
    document.body.style.overflow = '';
}

// Agregar event listeners cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para abrir el modal al hacer clic en un logo
    document.querySelectorAll('.universidad-item').forEach(item => {
        item.addEventListener('click', function() {
            const univId = this.getAttribute('data-id');
            abrirModalUniversidad(univId);
        });
    });
    
    // Event listener para cerrar el modal
    document.getElementById('cerrarUniversidadModal').addEventListener('click', cerrarModalUniversidad);
    
    // También cerrar el modal al hacer clic fuera del contenido
    document.getElementById('universidadModal').addEventListener('click', function(e) {
        if (e.target === this) {
            cerrarModalUniversidad();
        }
    });
    
    // Cerrar el modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && document.getElementById('universidadModal').classList.contains('visible')) {
            cerrarModalUniversidad();
        }
    });
});