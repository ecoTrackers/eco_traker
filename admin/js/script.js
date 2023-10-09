async function loadContent(section) {
    try {
        const response = await fetch(`${section}.html`);
        const content = await response.text();
        document.getElementById('main-content').innerHTML = content;

        const headerText = getHeaderText(section);
        document.getElementById('header-text').innerText = headerText;

        if (section === 'categorias') {
            const categoriasScript = document.createElement('script');
            categoriasScript.src = './js/categorias.js';

            categoriasScript.onload = function() {
                cargarCategorias()
            };

            document.body.appendChild(categoriasScript);
        }

        if (section === 'inventario') {
            const categoriasScript = document.createElement('script');
            categoriasScript.src = './js/inventarios.js';

            categoriasScript.onload = function() {
                cargarCategoriasInventario()
            };

            document.body.appendChild(categoriasScript);
        }

    } catch (error) {
        console.error('Error loading content:', error);
    }
}


function getHeaderText(section) {
    switch (section) {
        case 'categorias':
            return 'Categorias';
        case 'inventario':
            return 'Inventario';
        case 'ordenes':
            return 'Ordenes';
        case 'historial':
            return 'Historial de Ventas';
        default:
            return 'Principal';
    }
}
