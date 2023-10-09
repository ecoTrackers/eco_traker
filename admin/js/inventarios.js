function cargarCategoriasInventario(showAsTitles) {
    const categoryList = document.getElementById('categoryList');

    if (categoryList) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        categoryList.innerHTML = '';

        categories.forEach(categoryName => {
            const categoryContainer = document.createElement('div');
            categoryContainer.className = showAsTitles ? 'category-container' : 'list-group-item d-flex flex-column mb-4';

            const categoryTitle = document.createElement(showAsTitles ? 'h1' : 'span');
            categoryTitle.className = showAsTitles ? 'category-title' : 'category-name fs-4 fw-semibold';
            categoryTitle.textContent = categoryName;

            const productList = document.createElement('ul');
            productList.className = 'list-group mt-2';
            productList.id = `${categoryName.replace(' ', '')}-products`; 

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
        });
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

    let productQuantity = 0;

    while (true) {
        const quantityInput = prompt(`Ingrese la cantidad del producto "${productName}":`);

        if (quantityInput === null) {
            return;  // Cancelado por el usuario
        }

        productQuantity = parseInt(quantityInput);

        if (!isNaN(productQuantity) && productQuantity >= 0) {
            break;
        } else {
            alert('La cantidad debe ser un número entero no negativo.');
        }
    }

    const productItem = document.createElement('li');
    productItem.className = 'list-group-item d-flex justify-content-between align-items-center';

    const productContent = document.createElement('div');
    productContent.className = 'product-content d-flex justify-content-between w-100';

    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';

    const productNameElement = document.createElement('span');
    productNameElement.className = 'product-name me-auto';
    productNameElement.textContent = productName;

    const decrementButton = document.createElement('button');
    decrementButton.className = 'btn btn-outline-secondary btn-sm';
    decrementButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
    decrementButton.addEventListener('click', () => {
        decrementProductQuantity(productQuantityElement);
    });

    const productQuantityElement = document.createElement('span');
    productQuantityElement.className = 'product-quantity-badge badge bg-secondary';
    productQuantityElement.textContent = productQuantity;

    const incrementButton = document.createElement('button');
    incrementButton.className = 'btn btn-outline-secondary btn-sm';
    incrementButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
    incrementButton.addEventListener('click', () => {
        incrementProductQuantity(productQuantityElement);
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
        editarNombreProducto(productItem);
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'btn btn-outline-danger btn-sm ';
    deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteButton.addEventListener('click', () => {
        eliminarProducto(productItem);
    });

    productContent.appendChild(productNameElement);
    productContent.appendChild(quantityControls);
    productContent.appendChild(editButton);
    productContent.appendChild(deleteButton);

    productItem.appendChild(productContent);

    // Encuentra la lista de productos para la categoría correspondiente
    const productList = document.getElementById(`${categoryName.replace(/\s+/g, '-')}-products`);
    if (productList) {
        // Insertar antes del botón de agregar
        const addButton = productList.nextElementSibling; // Obtener el botón de agregar
        productList.insertBefore(productItem, addButton);
    } else {
        console.error('Product list not found for category:', categoryName);
    }
}

function editarNombreProducto(productItem) {
    const newProductName = prompt('Editar nombre del producto:', productItem.querySelector('.product-name').textContent);
    if (newProductName !== null && newProductName.trim() !== '') {
        productItem.querySelector('.product-name').textContent = newProductName;
    }
}


function editarNombreProducto(productItem) {
    const newProductName = prompt('Editar nombre del producto:', productItem.querySelector('.product-name').textContent);
    if (newProductName !== null && newProductName.trim() !== '') {
        productItem.querySelector('.product-name').textContent = newProductName;
    }
}

function incrementProductQuantity(quantityElement) {
    let quantity = parseInt(quantityElement.textContent);
    quantity++;
    quantityElement.textContent = quantity;
}

function decrementProductQuantity(quantityElement) {
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 0) {
        quantity--;
        quantityElement.textContent = quantity;
    }
}

function eliminarProducto(productItem) {
    productItem.remove();
}
