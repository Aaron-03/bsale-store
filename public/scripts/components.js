


const articleComponent = (article) => {
 
    const {
        id,
        name,
        price,
        urlImage,
        Category
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

const pageComponent = (num = 1) => (
    `<button type="button" data-page="${ num }">${ num }</button>`
);

const categoryComponent = ({ id, name, total }) => (
    `<li>
        <input
            data-id="${ id }"
            type="checkbox"
            onChange="addCategory"
        >

        <span>${ name } (${ total })</span>
    </li>
    `
);


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
                src="${ urlImage }"
                alt="${ name }"
            >
        </div>

        <div class="shop__item-footer">
            <label>Producto Chévere</label>
            <p>Category: ${ Category.name }</p>
            <p>Unidades: ${ quantity }</p>
            <p>Price: ${ price }</p>
        </div>
    </li>
    `
);

const loadShopList = () => {
    const shop__list = document.getElementsByClassName('shop__list')[0];
    shop__list.innerHTML = '';

    productStorage.forEach(p => {
        shop__list.innerHTML = shopItemComponent(p);
    });
}