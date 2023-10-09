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

// funciones de categorias

function deleteCategory(button) {
    button.parentElement.parentElement.remove();
}

function editCategory(button) {
    const listItem = button.closest('li');
    const categoryNameElement = listItem.querySelector('.category-name');
    const categoryName = categoryNameElement.innerText.trim();
    document.getElementById('editedCategoryName').value = categoryName;
    $('#editCategoryModal').modal('show');

    editedCategory = categoryNameElement;
}


function saveEditedCategory() {
    const editedName = document.getElementById('editedCategoryName').value;
    if (editedName !== '') {
        editedCategory.textContent = editedName;
        $('#editCategoryModal').modal('hide');
    }
}

function addCategory() {
    const categoryName = prompt("Ingrese el nombre de la nueva categoría:");
    
    if (categoryName !== null && categoryName.trim() !== '') {
        const categoryList = document.getElementById('categoryList');

        const newCategory = document.createElement('li');
        newCategory.className = 'list-group-item d-flex justify-content-between align-items-center';

        const categoryNameSpan = document.createElement('span');
        categoryNameSpan.className = 'category-name';
        categoryNameSpan.innerText = categoryName;

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'flex-shrink-1 mb-2 mt-2';

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-success btn-sm mx-1';
        editButton.innerText = 'Editar';
        editButton.onclick = function() {
            editCategory(this);
        };

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-danger btn-sm';
        deleteButton.innerText = 'Eliminar';
        deleteButton.onclick = function() {
            deleteCategory(this);
        };

        buttonsDiv.appendChild(editButton);
        buttonsDiv.appendChild(deleteButton);

        newCategory.appendChild(categoryNameSpan);
        newCategory.appendChild(buttonsDiv);

        categoryList.appendChild(newCategory);
    }
}
