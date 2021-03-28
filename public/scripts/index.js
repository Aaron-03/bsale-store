
/**
 * Global variables
 */
let nameText = '';
let categoryId = 0;
let prices = '';
let pageNum = 1;

const categories = document.querySelectorAll('.filter__categories input');

const searchByName = ({ target }) => {
    nameText = target.value;
    sendData(nameText, categoryId, '0_50000', pageNum);
    console.log(categories);
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
    categories.forEach(cat => {
        cat.addEventListener('change', addCategory);
    });
}

const pageComponent = (num = 1) => {

    return `
        <button type="button" data-page="${ num }">${ num }</button>
    `;
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

const loadPages = (productSize = 0) => {
    const pages = document.getElementsByClassName('product__pages')[0];
    const pageNumbers = Math.ceil(productSize / 12);
    pages.innerHTML = '';

    for(let i = 0; i < pageNumbers; i++) {
        const btnPage = pageComponent(i + 1);
        pages.innerHTML += btnPage;
    }

    let btnPages = document.querySelectorAll('.product__pages button');
    btnPages.forEach(btn => {
        if(btn.getAttribute('data-page') === '1') {
            btn.classList.add('active');
        }
        btn.addEventListener('click', searchByPage);
    });
}

const addCategory = async ({ target }) => {
    categoryId = target.getAttribute('data-id');

    
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
    const product__total = document.getElementById('product__total');
    product__total.textContent = total;
}

const sendData = async (name = '', category = '', prices = '', page = 1) => {
    let result = { error: false, data: null };
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



getCategorySelected();
//sendData();