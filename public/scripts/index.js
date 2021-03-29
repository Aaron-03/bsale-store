// window.onload = () => {


 
 
const searchByName = async ({ target }) => {
    nameText = target.value;
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
}
 
 
 
 
 
 /**
  * COMPONENTS
  */
 
 
 

 
 const getCategorySelected = () => {
    const categories = document.querySelectorAll('.filter__categories input');
     categories.forEach(cat => {
         cat.addEventListener('change', addCategory);
     });
 }
 
 
 
 const searchByPage = async ({ target }) => {
     pageNum = target.getAttribute('data-page');
     let btnPages = document.querySelectorAll('.product__pages button');
     btnPages.forEach(btnPage => {
         if(btnPage.getAttribute('data-page') !== pageNum) {
             btnPage.classList.remove('active');
         } else {
             btnPage.classList.add('active');
         }
     });
 
     const { error, data } = await sendData(nameText, categoryId, prices, pageNum);
 
     loadProducts(data.products);
 }
 
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
            if(btn.getAttribute('data-page') === '1') {
                btn.classList.add('active');
            }
            btn.addEventListener('click', searchByPage);
        });
     });

     setTotalProductText(productSize);

     if(productSize > 10 && pageNumbers > 1) {
        productResumeFooterVisible();
     } else {
        productResumeFooterVisible(false);
     }
 }
 
 const addCategory = async ({ target }) => {
    pageNum = 1; 
    categoryId = target.getAttribute('data-id');

    selectCategoryItem(categoryId);
     
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
 }
 
 const setTotalProductText = (total = 0) => {
     const product__total = document.querySelectorAll('.product__total');
     product__total.forEach(prodTotal => {
        prodTotal.textContent = total;
     });
 }

 const productResumeFooterVisible = (visible = true) => {
    const product_resume_footer = document.getElementById('product__resume-footer');
    product_resume_footer.style.display = visible === true ? 'block' : 'none';
 }
 
 const sendData = async (name = '', category = '', prices = '', page = 1) => {
     let result = { error: false, data: null };
     console.log('Name:' + name);
     console.log('Category:' + category);
     console.log('Prices:' + prices);
     console.log('Page:' + page);

     showLoading(1, true);

     try {
         const URL = `http://localhost:4000/api/products/?name=${ name }&category=${ category }&prices=${ prices }&page=${ page }`;
 
         const response = await fetch(URL);
         const data = await response.json();
 
         if(data.success === false) {
             result.error = true;
             return result;
         }
 
         result.data = data;
         productList = data.products;
 
     } catch (error) {
         result.error = true;
         showLoading(1, false);
         alert('Error al obtener productos');
     }
     showLoading(1, false);
     return result;
 }

 const searchByPrices = async ({ target }) => {
    prices = target.value;
    const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
 }
 




 

 const loadCategories = (categories = []) => {
    categoryContent.innerHTML = '';
    categories.forEach(category => {
        categoryContent.innerHTML += categoryComponent(category);
    });

    getCategorySelected();
 }

 const getCategories = async () => {

    showLoading(0, true);
    try {
        const response = await fetch('http://localhost:4000/api/categories');
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

 btnSearchByPrice.addEventListener('click', searchByPriceMinMax);



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

 

 
 
 
 //selectPrices();
 getCategories();
 getCategorySelected();
 setCategoryColor();
 searchByPriceMinMax();
 //sendData();
// }
