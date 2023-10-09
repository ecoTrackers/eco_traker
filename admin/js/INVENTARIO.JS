function renderCategoryList(showAsTitles) {
    const categoryList = document.getElementById('categoryList');

    if (categoryList) {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];

        // Limpiamos el contenido previo en caso de que hubiera
        categoryList.innerHTML = '';

        categories.forEach(categoryName => {
            const newCategory = document.createElement(showAsTitles ? 'h3' : 'li');
            newCategory.className = showAsTitles ? 'category-title' : 'list-group-item d-flex justify-content-between align-items-center';
            newCategory.innerHTML = showAsTitles ? categoryName : `
                <span class="category-name">${categoryName}</span>
                <div class="flex-shrink-1">
                    <button class="btn btn-outline-success btn-sm mr-2" onclick="editCategory(this)">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCategory(this)">Eliminar</button>
                </div>
            `;
            categoryList.appendChild(newCategory);
        });
    } else {
        console.error('Element with id "categoryList" not found.');
    }
}
