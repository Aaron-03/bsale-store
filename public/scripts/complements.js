
const showLoading = (position = 0, visible = true) => {
    const loading = document.getElementsByClassName(`loading__${ position }`)[0];
    if(loading) {
        loading.style.display = visible === true ? 'flex' : 'none';
    }
}

const selectCategoryItem = (categoryId = '0') => {
    const categories = document.querySelectorAll('.filter__categories input');
    Array.from(categories).map(cat => {
        if(cat.getAttribute('data-id') !== categoryId) {
            cat.checked = false;
        }
        
        return cat;
    });
}

const resetCategories = () => {
    const categories = document.querySelectorAll('.filter__categories input');
    Array.from(categories).map(cat => {
        cat.checked = false;
        return cat;
    });
}

const resetPriceItems = () => {
    const pricesItem = document.querySelectorAll('.price__item');
    Array.from(pricesItem).forEach(pricesItem => {
        pricesItem.checked = false;
    });
}



const loadProducts = (products = productList) => {
    const article__container = document.getElementById('article__container');
    article__container.innerHTML = '';

    products.forEach(product => {
        const html = articleComponent(product);
        article__container.innerHTML += html;
    });

    setCategoryColor();
    //addListenersBtnAddShop();
    addListenersMinSum();
}

const setCategoryColor = () => {
    const spans = document.querySelectorAll('.article__description span');

    spans.forEach(span => {
        const categoryColor = categoryColors.find(cc => cc.catId == span.getAttribute('data-cat-id')) || { color: '' };
        span.classList.add(categoryColor.color);
    });
}

const getQuantityByProductId = (productId) => {
    const labels = document.querySelectorAll('.article__shop-buttons label');
    const lblQuantity = Array.from(labels).find(lbl => lbl.getAttribute('data-id') == productId);
    if(lblQuantity) {
        return parseInt(lblQuantity.textContent) || 0;
    }

    return 0;
}