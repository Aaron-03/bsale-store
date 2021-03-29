// window.onload = () => {

const addListenersMinSum = () => {
    const btnsMin = document.getElementsByClassName('quantityMin');
    const btnsSum = document.getElementsByClassName('quantitySum');

    Array.from(btnsMin).forEach(btn => {
        btn.addEventListener('click', decrementQuantity);
    });

    Array.from(btnsSum).forEach(btn => {
        btn.addEventListener('click', incrementQuantity);
    });
}

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

const addArticleToShop = (productId) => {
    const shopQuantity = document.getElementById('shopQuantity');
    const product = productList.find(p => p.id === productId) || null;
    if(product === null) {
        alert('Intente agregar el producto nuevamente');
        return;
    }
    const quantity = getQuantityByProductId(productId);
    product.quantity = quantity;
    productStorage.push(product);
    localStorage.setItem('shop', JSON.stringify(productStorage) || null);
    shopQuantity.textContent = productStorage.length;
    enabledContentShopAdded(product.id, true);
    loadShopList();
}

const removeArticleToShop = (productId) => {
    const prodList = productStorage.filter(p => p.id != productId) || [];
    localStorage.setItem('shop', JSON.stringify(prodList) || null);
    enabledContentShopAdded(productId, false);
    loadShopList();
}

    

// const addListenersBtnAddShop = () => {
//     const btns = document.getElementsByClassName('article__shop-btnAdd');

//     Array.from(btns).forEach(btn => {
//         btn.addEventListener('click', addArticleToShop);
//     });
// }

    
const enableBtnAddShop = (btnId = '', enabled = false) => {
    const btns = document.getElementsByClassName('article__shop-btnAdd');

    Array.from(btns).forEach(btn => {
        if(btn.getAttribute('data-id') === btnId) {
            btn.disabled = !enabled;
        }
    });
}

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

    const buyFromWhatsapp = () => {
        console.log('ascascascascacasc')
    }
    
    const showShopList = (show = true) => {
        const shop__list = document.getElementById('shop__list');
        shop__list.style.right = show === true ? '0' : '-100%';
    }


    

    
   





// };
