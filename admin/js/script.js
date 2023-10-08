async function loadContent(section) {
    try {
        const response = await fetch(`${section}.html`);
        const content = await response.text();
        document.getElementById('main-content').innerHTML = content;

        const headerText = getHeaderText(section);
        document.getElementById('header-text').innerText = headerText;
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


