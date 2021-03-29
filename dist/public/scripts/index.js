/**
 * Initial functions in case you search by URL
 * or there are previous products
 * in the localStorage
 */


// Start with local storage products
 const initProductsFromLocalStorage = () => {
    productStorage = JSON.parse(localStorage.getItem('shop')) || [];
    productStorage.forEach(p => {
        enabledContentShopAdded(p.id, true);
    });

    loadShopList(productStorage);
 }

 // Search by URL with parameters
 const initProductsFromURL = async () => {
    let url = window.location.href;
        url = new URL(url);
    
    nameText = url.searchParams.get("name") || '';
    categoryId = url.searchParams.get("category") || -1;
    prices = url.searchParams.get("prices") || '0_1000000';
    pageNum = url.searchParams.get("page") || 1;
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
 }

 // Load the categories and start functions
 const init = async () => {
    getCategories();
    await initProductsFromURL();
    setCategoryColor();
    initProductsFromLocalStorage();
 }

// Start
init();
