/**
 * 
 * Communication functions with the backend
 */


// Search by product name
const searchByName = async ({ target }) => {
    nameText = target.value;
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
}

// Gets the filter categories
const getCategories = async () => {
    try {
        showLoading(0, true);
        const response = await fetch(`${ PROTOCOL }//${ HOST }/api/categories`);
        const data = await response.json();

        if(data.success === true) {
            loadCategories(data.categories);
        } else {
            alert('Error al obtener categorías');
        }
    } catch (error) {
        showLoading(0, false);
        console.log(error);
    }
    showLoading(0, false);
}

// Make a general query with all search criteria
const sendData = async (name = '', category = '', prices = '', page = 1) => {
    let result = { error: false, data: null };
    orderOptions.value = '';

    showLoading(1, true);

    try {
        const URL = `${ PROTOCOL }//${ HOST }/api/products/?name=${ name }&category=${ category }&prices=${ prices }&page=${ page }`;

        const response = await fetch(URL);
        const data = await response.json();

        if(data.success === false) {
            result.error = true;
            alert('Ops! Intente nuevamente');
            return result;
        }

        result.data = data;
        productList = data.products;

    } catch (error) {
        result.error = true;
        showLoading(1, false);
        alert('Ops! Intente nuevamente');
    }
    showLoading(1, false);
    return result;
}

// Search products by a price range
const searchByPrices = async (price = '0_1000000') => {
    console.log(price)
    prices = price;
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
}

// Gets products filtering using min and max prices
const searchByPriceMinMax = async () => {
    let priceMinVal = priceMin.value || '0';
    let priceMaxVal = priceMax.value || '10000000';

    const priceMinMax = `${ priceMinVal }_${ priceMaxVal }`;
    const { error, data } = await sendData(nameText, categoryId, priceMinMax, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
}

// Gets products filtering using category id
const searchByCategory = async (target) => {
    pageNum = 1;
    categoryId = target.getAttribute('data-id');

    selectCategoryItem(categoryId);
        
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
}

// Get products by page number
const searchByPage = async (target) => {
    pageNum = target.getAttribute('data-page') || 1;
    setPageActive(pageNum);

    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
    }
}