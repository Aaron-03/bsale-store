/**
 * Complementary or helper functions 
 */
//

// Load a spin using a query
const showLoading = (position = 0, visible = true) => {
    const loading = document.getElementsByClassName(`loading__${ position }`)[0];
    if(loading) {
        loading.style.display = visible === true ? 'flex' : 'none';
    }
}

// Get the total amount to pay
const getTotalAmount = () => {
    return productStorage.reduce((acc, cur) => {
        acc += cur.quantity * cur.price;
        return acc;
    }, 0) || 0;
}

// Assign the color to each product category label
const setCategoryColor = () => {
    const spans = document.querySelectorAll('.article__description span');

    spans.forEach(span => {
        const categoryColor = categoryColors.find(cc => cc.catId == span.getAttribute('data-cat-id')) || { color: '' };
        span.classList.add(categoryColor.color);
    });
}

// Select a filter category by its id
const selectCategoryItem = (catId = '0') => {
    const categories = document.querySelectorAll('.filter__categories input');
    const allNotChecked = Array.from(categories).every(cat => cat.checked === false);

    if(allNotChecked === true) {
        categoryId = -1;
    }

    Array.from(categories).map(cat => {
        if(cat.getAttribute('data-id') !== catId) {
            cat.checked = false;
        }
        
        return cat;
    });
}

// Reset filter categories
const resetCategories = () => {
    const categories = document.querySelectorAll('.filter__categories input');
    Array.from(categories).map(cat => {
        cat.checked = false;
        return cat;
    });
}

// Get the quantity of the product
const getQuantityByProductId = (productId) => {
    const labels = document.querySelectorAll('.article__shop-buttons label');
    const lblQuantity = Array.from(labels).find(lbl => lbl.getAttribute('data-id') == productId);
    if(lblQuantity) {
        return parseInt(lblQuantity.textContent) || 0;
    }

    return 0;
}

// Reset filter prices
const resetPriceItems = () => {
    const pricesItem = document.querySelectorAll('.price__item');
    Array.from(pricesItem).forEach(pricesItem => {
        pricesItem.checked = false;
    });
}

// Reset the filter and global parameters for search
const resetFilter = () => {
    priceMin.value = '';
    priceMax.value = '';
    categoryId = -1;
    prices = '0_1000000';
    pageNum = 1;
    nameText = '';

    resetCategories();
    resetPriceItems();

    searchByPriceMinMax();
}

// Validate the characters entered for the filter prices
const writePrice = ({ target }) => {
    let priceText = parseInt(target.value.trim());

    if(isNaN(priceText) || priceText <= 0 || priceText > 9999999) {
        target.value = '';
        return;
    }

    target.value = priceText;
}

// Assign the "active" class to the current page
const setPageActive = (pageNum = 1) => {
    let btnPages = document.querySelectorAll('.product__pages button');
    btnPages.forEach(btnPage => {
        if(btnPage.getAttribute('data-page') !== pageNum) {
            btnPage.classList.remove('active');
        } else {
            btnPage.classList.add('active');
        }
    });
}

// Shows the total amount of products obtained
const setTotalProductText = (total = 0) => {
    const product__total = document.querySelectorAll('.product__total');
    product__total.forEach(prodTotal => {
        prodTotal.textContent = total;
    });
}

// Show or hide the second pagination
const productResumeFooterVisible = (visible = true) => {
    const product_resume_footer = document.getElementById('product__resume-footer');
    product_resume_footer.style.display = visible === true ? 'block' : 'none';
}

// Order by price
const orderByPrice = ({ target }) => {
    if(target.value === 'min_max') {
        productList = productList.sort((a, b) => a.price - b.price);
    } else if (target.value === 'max_min') {
        productList = productList.sort((a, b) => b.price - a.price);
    }
}


/**
 * 
 * Loading components in their respective lists
 */


// Load "articleComponent" after query
const loadProducts = (products = productList) => {
    const article__container = document.getElementById('article__container');
    article__container.innerHTML = '';

    products.forEach(product => {
        const html = articleComponent(product);
        article__container.innerHTML += html;
    });

    setCategoryColor();
    addListenersMinSum();
}

// Load "categoryComponent", categories for filtering
const loadCategories = (categories = []) => {
    categoryContent.innerHTML = '';
    categories.forEach(category => {
        categoryContent.innerHTML += categoryComponent(category);
    });
}

// Load "priceItemComponent" to filter price list
const loadPriceFilterList = () => {
    pricesContent.innerHTML = '';
    pricesForFilter.forEach(price => {
        pricesContent.innerHTML += priceItemComponent(price);
    });
}

// Load "shopItemComponent" to the shopping cart product list
const loadShopList = () => {
    const productSize = productStorage.length || 0;
    
    if(productSize === 0) {
        shop__list.innerHTML = '<p style="text-align: center; padding: 0.5rem;">No hay productos en el carrito</p>';
        btnWhatsapp.style.display = 'none';
    } else {
        shop__list.innerHTML = '';
        btnWhatsapp.style.display = 'flex';
        productStorage.forEach(p => {
            shop__list.innerHTML += shopItemComponent(p);
        });
    }

    shopQuantity.textContent = productSize || 0;

    const totalAmount = getTotalAmount();
    shop_totalAmount.textContent = `$ ${ totalAmount }`;
}

// Load "pageComponent" to the pagination
const loadPages = (productSize = productList.length) => {
    const pages = document.getElementsByClassName('product__pages');
    const pageNumbers = Math.ceil(productSize / 12);

    Array.from(pages).forEach(page => {
       page.innerHTML = '';

       for(let i = 0; i < pageNumbers; i++) {
           const btnPage = pageComponent(i + 1);
           page.innerHTML += btnPage;
       }
   
       let btnPages = document.querySelectorAll('.product__pages button');
       btnPages.forEach(btn => {
           if(btn.getAttribute('data-page') == '1') {
               btn.classList.add('active');
           }
       });
    });

    setTotalProductText(productSize);

    if(productSize > 10 && pageNumbers > 1) {
       productResumeFooterVisible();
    } else {
       productResumeFooterVisible(false);
    }
}



// Load "priceItemComponent" to filter price list
loadPriceFilterList();