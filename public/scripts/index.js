window.onload = () => {
/**
 * Global variables
 */
 let nameText = '';
 let categoryId = 0;
 let prices = '';
 let pageNum = 1;

 // Buttons (Search, Reset, PriceMin, PriceMax)
 const btnSearchByPrice = document.getElementById('btnSearchByPrice');
 const btnResetFilter = document.getElementById('btnResetFilter');
 let priceMin = document.getElementById('priceMin');
 let priceMax = document.getElementById('priceMax');

 
 
 const searchByName = async ({ target }) => {
     nameText = target.value;
     const { error, data } = await sendData(nameText, categoryId, prices, pageNum);

     if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
     }
 }
 
 
 const inputName = document.getElementById('header__input-name');
 
 inputName.addEventListener('keyup', searchByName);
 
 
 /**
  * COMPONENTS
  */
 
 const articleComponent = (article) => {
 
     const {
         id,
         name,
         price,
         urlImage
     } = article;
 
     return `
         <article class="article" data-id="${ id }">
             <div class="article__cover">
                 <img
                     src="${ urlImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrUpaLKtPgK1gc7dPkMHCQDBpF2cSKiU957Sg-lQlDZywWlAc59MTpC6IBecGghRLILk&usqp=CAU' }"
                     alt="${ name }"
                 />
             </div>
 
             <h4 class="article__title">${ name }</h4>
             <hr />
 
             <div class="article__description">
                 <label class="article_price">$ ${ price }</label>
 
                 <button title="Añadir al carrito">
                     <img
                         src="./img/shop.svg"
                         alt="Añadir al carrito"
                         class="article_shop"
                     />
                 </button>
             </div>
         </article>
     `;
 }
 
 const loadProducts = (products = []) => {
     const article__container = document.getElementById('article__container');
     article__container.innerHTML = '';
 
     products.forEach(product => {
         const html = articleComponent(product);
         article__container.innerHTML += html;
     });
 }
 
 const getCategorySelected = () => {
    const categories = document.querySelectorAll('.filter__categories input');
     categories.forEach(cat => {
         cat.addEventListener('change', addCategory);
     });
 }
 
 const pageComponent = (num = 1) => (
    `<button type="button" data-page="${ num }">${ num }</button>`
 );
 
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
 
 const loadPages = (productSize = 0) => {
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
     categoryId = target.getAttribute('data-id');
     const categories = document.querySelectorAll('.filter__categories input');
     Array.from(categories).map(cat => {
         if(cat.getAttribute('data-id') !== categoryId) {
             cat.checked = false;
         }
         
         return cat;
     });
     
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
     try {
         const URL = `http://localhost:4000/api/products/?name=${ name }&category=${ category }&prices=${ prices }&page=${ page }`;
 
         const response = await fetch(URL);
         const data = await response.json();
 
         if(data.success === false) {
             result.error = true;
             return result;
         }
 
         result.data = data;
 
     } catch (error) {
         result.error = true;
         alert('Error al obtener productos');
     }
 
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
 
 const selectPrices = () => {
    const pricesItem = document.querySelectorAll('.price__item');

    Array.from(pricesItem).forEach(p => {
        p.addEventListener('click', searchByPrices);
    });
 }

 const categoryComponent = ({ id, name, total }) => (
    `<li>
        <input
            data-id="${ id }"
            type="checkbox"
        >

        <span>${ name } (${ total })</span>
    </li>
    `
 );

 const loadCategories = (categories = []) => {
    const categoryContent = document.getElementsByClassName('filter__categories')[0];
    categoryContent.innerHTML = '';
    categories.forEach(category => {
        categoryContent.innerHTML += categoryComponent(category);
    });

    getCategorySelected();
 }

 const getCategories = async () => {
    try {
        const response = await fetch('http://localhost:4000/api/categories');
        const data = await response.json();

        if(data.success === true) {
            loadCategories(data.categories);
        } else {
            alert('Error al obtener categorías');
        }
    } catch (error) {
        console.log(error);
    }
 }

 const searchByPriceMinMax = async () => {
    let priceMinVal = priceMin.value || '0';
    let priceMaxVal = priceMin.value || '10000000';

    const priceMinMax = `${ priceMinVal }_${ priceMaxVal }`;
    const { error, data } = await sendData(nameText, categoryId, priceMinMax, pageNum);

    if(error === false) {
        loadProducts(data.products);
        loadPages(data.total);
    }
 }

 btnSearchByPrice.addEventListener('click', searchByPriceMinMax);

 const resetCategories = () => {
    const categories = document.querySelectorAll('.filter__categories input');
    Array.from(categories).map(cat => {
        cat.checked = false;
        return cat;
    });

    categoryId = -1;
 }

 const resetPriceItems = () => {
    const pricesItem = document.querySelectorAll('.price__item');

    Array.from(pricesItem).forEach(pricesItem => {
        pricesItem.checked = false;
    });

    prices = '0_1000000';
 }

 const resetFilter = () => {
    priceMin.value = '';
    priceMax.value = '';

    resetCategories();
    resetPriceItems();

    searchByPriceMinMax();
 }

 

 btnResetFilter.addEventListener('click', resetFilter);
 
 selectPrices();
 getCategories();
 getCategorySelected();
 //searchByPriceMinMax();
 //sendData();
}
