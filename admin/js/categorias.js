function cargarCategorias() {
    const categoryList = document.getElementById('categoryList');

    if (categoryList) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        
        categoryList.innerHTML = '';

        categories.forEach(categoryName => {
            const newCategory = document.createElement('li');
            newCategory.className = 'list-group-item d-flex justify-content-between align-items-center';
            newCategory.innerHTML = `
                <span class="category-name">${categoryName}</span>
                <div class="flex-shrink-1">
                    <button class="btn btn-outline-success btn-sm mr-2" onclick="editCategory(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCategory(this)">Eliminar</button>
                </div>
            `;
            categoryList.appendChild(newCategory);
        });
    } else {
        console.error('...');
    }
}


function deleteCategory(button) {
    const listItem = button.closest('li');
    const categoryName = listItem.querySelector('.category-name').textContent.trim();
    listItem.remove();

    const categories = JSON.parse(localStorage.getItem('categories')) || [];

    const updatedCategories = categories.filter(category => category !== categoryName);

    localStorage.setItem('categories', JSON.stringify(updatedCategories));
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

        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        const updatedCategories = categories.map(category => {
            if (category === editedCategory.innerText.trim()) {
                return editedName;
            }
            return category;
        });

        localStorage.setItem('categories', JSON.stringify(updatedCategories));
    }
}

function addCategory(defaultName) {
    const categoryName = prompt('Ingrese el nombre de la categoría:', defaultName || '');
    if (categoryName) {
        const categoryList = document.getElementById('categoryList');

        const newCategory = document.createElement('li');
        newCategory.className = 'list-group-item d-flex justify-content-between align-items-center';
        newCategory.innerHTML = `
            <span class="category-name">${categoryName}</span>
            <div class="flex-shrink-1">
                <button class="btn btn-outline-success btn-sm mr-2" onclick="editCategory(this)">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(this)">Eliminar</button>
            </div>
        `;

        categoryList.appendChild(newCategory);

        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        categories.push(categoryName);

        localStorage.setItem('categories', JSON.stringify(categories));
    }
}

document.addEventListener('DOMContentLoaded', cargarCategorias);


document.addEventListener('DOMContentLoaded', () => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    console.log('Datos obtenidos del Local Storage:', categories);
});

