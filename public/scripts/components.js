/**
 * Components that will be loaded
 * in their respective lists
 * (Filtering, products, shopping cart)
 */

// Product component
const articleComponent = (article) => {
 
    const {
        id,
        name,
        price,
        urlImage,
        Category
    } = article;

    const img = urlImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrUpaLKtPgK1gc7dPkMHCQDBpF2cSKiU957Sg-lQlDZywWlAc59MTpC6IBecGghRLILk&usqp=CAU';

    return `
        <article class="article" data-id="${ id }">
            <div class="article__cover">
                <img
                    src="${ img }"
                    alt="${ name }"
                />
            </div>

            <h4 class="article__title">${ name }</h4>
            <hr />

            <div class="article__description">
               <label class="article_price">$ ${ price }</label>
   
               <span data-cat-id="${ Category.id }">${ Category.name }</span>
           </div>

           <div class="article__shop-added" data-id="${ id }">
               <p>Product added</p>
           </div>

           <div class="article__shop" data-id="${ id }">
               <div class="article__shop-buttons">
                   <button
                       type="button"
                       class="quantity quantityMin"
                       data-id="${ id }"
                   >-</button>
                   <label data-id="${ id }">0</label>
                   <button
                       type="button"
                       class="quantity quantitySum"
                       data-id="${ id }"
                   >+</button>
               </div>

               <button
                   type="button"
                   class="article__shop-btnAdd"
                   title="Añadir al carrito"
                   disabled
                   data-id="${ id }"
                   onclick="addArticleToShop(${ id })"
               >
                   Add
                   <img
                       src="./img/shop.svg"
                       alt="Añadir al carrito"
                       class="article_btnShop"
                       data-id="${ id }"
                   />
               </button>
           </div>
        </article>
    `;
}

// Pagination component
const pageComponent = (num = 1) => (
    `<button
        type="button"
        data-page="${ num }"
        onclick="searchByPage(this)"
    >${ num }</button>`
);

// Filtering category component
const categoryComponent = ({ id, name, total }) => (
    `<li>
        <input
            data-id="${ id }"
            type="checkbox"
            onchange="searchByCategory(this)"
        >

        <span>${ name } (${ total })</span>
    </li>
    `
);

// Product component in shopping cart list
const shopItemComponent = ({
    id,
    name,
    price,
    urlImage,
    quantity,
    Category
}) => (
    `
    <li class="shop__item">
        <button
            type="button"
            class="btnCloseShopItem"
            onclick="removeArticleToShop(${ id })"
        >X</button>
        <div class="shop__item-header">
            <img
                src="${ urlImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSrUpaLKtPgK1gc7dPkMHCQDBpF2cSKiU957Sg-lQlDZywWlAc59MTpC6IBecGghRLILk&usqp=CAU' }"
                alt="${ name }"
            >
        </div>

        <div class="shop__item-footer">
            <label>${ name }</label>
            <p>Categoría: ${ Category.name }</p>
            <p>Unidades: ${ quantity }</p>
            <p>Precio: ${ price }</p>
        </div>
    </li>
    `
);

// Filtering price component
const priceItemComponent = ({ id, name, value, text }) => (
    `
    <li>
        <input
            id="${ id }"
            class="price__item"
            type="radio"
            name="${ name }"
            value="${ value }"
        >
        <label
            for="${ id }"
            onclick="searchByPrices('${ value }')"
        >${ text }</label>
    </li>
    `
);
