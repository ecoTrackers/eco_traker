async function cargarCategoriasInventario(showAsTitles) {
    const categoryList = document.getElementById('categoryList');

    if (categoryList) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        categoryList.innerHTML = '';

        for (const categoryName of categories) {
            const categoryContainer = document.createElement('div');
            categoryContainer.className = showAsTitles ? 'category-container' : 'list-group-item d-flex flex-column mb-4';

            const categoryTitle = document.createElement(showAsTitles ? 'h1' : 'span');
            categoryTitle.className = showAsTitles ? 'category-title' : 'category-name fs-4 fw-semibold';
            categoryTitle.textContent = categoryName;

            const productList = document.createElement('ul');
            productList.className = 'list-group mt-2';
            productList.id = `${categoryName.replace(/\s+/g, '-')}-products`;

            // localstore
            const productsFromLocalStorage = JSON.parse(localStorage.getItem(categoryName)) || [];

            for (const product of productsFromLocalStorage) {
                const productItem = createProductElement(product); 
                productList.appendChild(productItem);
            }

            const addButton = document.createElement('button');
            addButton.className = 'btn btn-primary';
            addButton.addEventListener('click', () => {
                agregarProducto(categoryName);
            });
            addButton.innerHTML = `<i class="fa-solid fa-plus"></i> Agregar Producto`;

            categoryContainer.appendChild(categoryTitle);
            categoryContainer.appendChild(addButton);
            categoryContainer.appendChild(productList);

            categoryList.appendChild(categoryContainer);
        }
    } else {
        console.error('Element with id "categoryList" not found.');
    }
}

function agregarProducto(categoryName) {
    const productName = prompt(`Ingrese el nombre del producto para la categoría "${categoryName}":`);

    if (productName === null || productName.trim() === '') {
        alert('Debe ingresar un nombre para el producto.');
        return;
    }

    let productQuantity;

    while (true) {
        const quantityInput = prompt(`Ingrese la cantidad del producto "${productName}":`);

        if (quantityInput === null) {
            return;
        }

        productQuantity = parseInt(quantityInput);

        if (!isNaN(productQuantity) && productQuantity >= 0) {
            break;
        } else {
            alert('La cantidad debe ser un número entero no negativo.');
        }
    }

    // Crear un objeto de producto
    const product = {
        name: productName,
        quantity: productQuantity
    };

    // Crear el elemento del producto utilizando createProductElement
    const productItem = createProductElement(product);

    // Encuentra la lista de productos para la categoría correspondiente
    const productListId = `${categoryName.replace(/\s+/g, '-')}-products`;
    const productList = document.getElementById(productListId);

    if (!productList) {
        console.error('Product list not found for category:', categoryName);
        return;
    }

    productList.appendChild(productItem);

    // Obtiene los productos actuales de la categoría o inicializa un array vacío
    const products = JSON.parse(localStorage.getItem(categoryName)) || [];

    // Agrega el nuevo producto a la lista de productos
    products.push(product);

    // Guarda la lista de productos actualizada en el localStorage
    localStorage.setItem(categoryName, JSON.stringify(products));
}

function createProductElement(product) {
    const productItem = document.createElement('li');
    productItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const productContent = document.createElement('div');
    productContent.className = 'product-content d-flex justify-content-between w-100';

    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';

    const productNameElement = document.createElement('span');
    productNameElement.className = 'product-name me-auto';
    productNameElement.textContent = product.name; // Usar el nombre del producto del objeto

    const decrementButton = document.createElement('button');
    decrementButton.className = 'btn btn-outline-secondary btn-sm';
    decrementButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
    decrementButton.addEventListener('click', () => {
        decrementProductQuantity(productQuantityElement, product.name);
    });
    

    const productQuantityElement = document.createElement('span');
    productQuantityElement.className = 'product-quantity-badge badge bg-secondary';
    productQuantityElement.textContent = product.quantity; // Usar la cantidad del producto del objeto

    const incrementButton = document.createElement('button');
    incrementButton.className = 'btn btn-outline-secondary btn-sm';
    incrementButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
    incrementButton.addEventListener('click', () => {
        incrementProductQuantity(productQuantityElement, product.name);
    });
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'quantity-buttons pe-2';
    buttonsContainer.appendChild(decrementButton);
    buttonsContainer.appendChild(productQuantityElement);
    buttonsContainer.appendChild(incrementButton);

    quantityControls.appendChild(buttonsContainer);

    const editButton = document.createElement('button');
    editButton.className = 'btn btn-outline-success btn-sm mx-1';
    editButton.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    editButton.addEventListener('click', () => {
        editarNombreProducto(productItem, product.name);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
        eliminarProducto(productItem, product.name);
    });

    productContent.appendChild(productNameElement);
    productContent.appendChild(quantityControls);
    productContent.appendChild(editButton);
    productContent.appendChild(deleteButton);

    productItem.appendChild(productContent);

    return productItem;
}

function editarNombreProducto(productItem, oldProductName) {
    const newProductName = prompt('Editar nombre del producto:', oldProductName);
    if (newProductName !== null && newProductName.trim() !== '') {
        const productNameElement = productItem.querySelector('.product-name');
        productNameElement.textContent = newProductName;

        // Actualizar el nombre del producto en el localStorage
        actualizarProductoEnLocalStorage(oldProductName, newProductName);
    } else if (newProductName.trim() === '') {
        alert('El nombre del producto no puede estar vacío.');
    }
}

//Pendiente arreglar funcionalidad
function actualizarProductoEnLocalStorage(categoryName, oldProductName, newProductName) {
    // Obtener productos actuales de la categoría
    const products = JSON.parse(localStorage.getItem(categoryName)) || [];

    // Encontrar el producto con el nombre antiguo y actualizarlo
    const updatedProducts = products.map(product => {
        if (product.name === oldProductName) {
            return {
                name: newProductName,
                quantity: product.quantity
            };
        }
        return product;
    });

    // Guardar la lista actualizada en el localStorage
    localStorage.setItem(categoryName, JSON.stringify(updatedProducts));
}


function incrementProductQuantity(quantityElement, productName) {
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
    actualizarCantidadEnLocalStorage(productName, categoryName, quantity);
}

function decrementProductQuantity(quantityElement, productName) {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
        actualizarCantidadEnLocalStorage(productName, categoryName, quantity);
    }
}
//pendiente arreglar funcionalidad
function actualizarCantidadEnLocalStorage(productName, categoryName, newQuantity) {
    const products = JSON.parse(localStorage.getItem(categoryName)) || [];

    const updatedProducts = products.map(product => {
        if (product.name === productName) {
            return {
                name: productName,
                quantity: newQuantity
            };
        }
        return product;
    });

    localStorage.setItem(categoryName, JSON.stringify(updatedProducts));
}

function eliminarProducto(productItem, productName) {
    if (confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"?`)) {
        // Eliminar el producto del localStorage
        eliminarProductoDeLocalStorage(productName);

        // Eliminar el elemento del producto del DOM
        productItem.remove();
    }
}

function eliminarProductoDeLocalStorage(categoryName, productName) {
    const products = JSON.parse(localStorage.getItem(categoryName)) || [];

    // Filtra los productos, excluyendo el que se va a eliminar
    const updatedProducts = products.filter(product => product !== productName);

    // Actualiza la lista de productos en el localStorage
    localStorage.setItem(categoryName, JSON.stringify(updatedProducts));
}


