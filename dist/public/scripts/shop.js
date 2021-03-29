/**
 *
 * Special functions for managing the shopping cart
 */


// Show "Product added" if the product is selected
// Show options to choose quantity if the product is not selected
const enabledContentShopAdded = (productId = '0', enabled = true) => {
    const shopContents = document.getElementsByClassName('article__shop');
    const shopAddedContents = document.getElementsByClassName('article__shop-added');

    Array.from(shopContents).forEach(shopContent => {
        if(shopContent.getAttribute('data-id') == productId) {
            shopContent.style.display = enabled === true ? 'none' : 'flex';
        }
    });

    Array.from(shopAddedContents).forEach(shopAddedContent => {
        if(shopAddedContent.getAttribute('data-id') == productId) {
            shopAddedContent.style.display = enabled === true ? 'flex' : 'none';
        }
    });
}

// Add the product to the shopping cart
const addArticleToShop = (productId) => {
    const product = productList.find(p => p.id === productId) || null;
    if(product === null) {
        alert('Intente agregar el producto nuevamente');
        return;
    }

    product.quantity = getQuantityByProductId(productId);
    productStorage.push(product);

    localStorage.setItem('shop', JSON.stringify(productStorage) || null);
    shopQuantity.textContent = productStorage.length;
    enabledContentShopAdded(productId, true);
    loadShopList();
}

// Remove the product from shopping cart by id
const removeArticleToShop = (productId) => {
    productStorage = productStorage.filter(p => p.id != productId) || [];
    localStorage.setItem('shop', JSON.stringify(productStorage) || null);
    enabledContentShopAdded(productId, false);
    loadShopList();
}

// Show or hide the add to shopping cart button
const enableBtnAddShop = (btnId = '', enabled = false) => {
    const btns = document.getElementsByClassName('article__shop-btnAdd');

    Array.from(btns).forEach(btn => {
        if(btn.getAttribute('data-id') === btnId) {
            btn.disabled = !enabled;
        }
    });
}

// Decrease the quantity of the product
const decrementQuantity = ({ target }) => {
    const quantities = document.querySelectorAll('.article__shop-buttons label');

    quantities.forEach(q => {
        const btnId = q.getAttribute('data-id');
        if(btnId === target.getAttribute('data-id')) {
            let num = (parseInt(q.textContent) || 0) - 1;

            if(num <= 0) {
                q.textContent = 0;
                enableBtnAddShop(btnId, false);
            } else {
                enableBtnAddShop(btnId, true);
                q.textContent = num;
            }
        }
    });
}

// Increase the quantity of the product
const incrementQuantity = ({ target }) => {
    const quantities = document.querySelectorAll('.article__shop-buttons label');

    quantities.forEach(q => {
        const btnId = q.getAttribute('data-id');
        if(btnId === target.getAttribute('data-id')) {
            let num = (parseInt(q.textContent) || 0) + 1;
            if(num < 100) {
                enableBtnAddShop(btnId, true);
                q.textContent = num;
            }
            
        }
    });
}

// Go to whatsapp for the purchase
const buyFromWhatsapp = () => {
    const phone = '51960229721';
    const message = 'Muchas gracias por ver el proyecto, muy pronto se ordenará de verdad :)!';
    const link = `https://wa.me/${ phone }?text=${ message }`;
    window.open(link, '_blank');
}

// Show or hide the shopping cart
const showShopList = () => {
    shop__list_id.classList.toggle('active');
}
