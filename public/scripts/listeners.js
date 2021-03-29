
/**
 * Adding events for DOM elements
 * 
 */

// Search for each character entered
inputName.addEventListener('keyup', searchByName);

// Reset the filter
btnResetFilter.addEventListener('click', resetFilter);

// The search button of the filter will search for the prices entered
btnSearchByPrice.addEventListener('click', searchByPriceMinMax);

// orderOptions
orderOptions.addEventListener('change', (e) => {
    orderByPrice(e);
    loadProducts(productList);
});

// Validate the characters entered for the filter prices
priceMin.addEventListener('keyup', writePrice);
priceMax.addEventListener('keyup', writePrice);


// Search by product name
btnSearch.addEventListener('click', searchByName);


// Increase and decrease the number of products to purchase
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
 
