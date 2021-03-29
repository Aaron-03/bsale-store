/**
 * Global variables
 */

 let nameText = ''; // Product name
 let categoryId = -1; // Category Id
 let prices = '0_1000000'; // Price range
 let pageNum = 1; // Page number

 let productList = []; // Product list obtained
 let productStorage = []; // Products for save in local storage

 // Color list for categories
 let categoryColors = [
     { catId: 1, color: 'color_1' },
     { catId: 2, color: 'color_2' },
     { catId: 3, color: 'color_3' },
     { catId: 4, color: 'color_4' },
     { catId: 5, color: 'color_5' },
     { catId: 6, color: 'color_6' },
     { catId: 7, color: 'color_7' }
 ];

 // Price list to filter
 let pricesForFilter = [
     { id: 'price1', name: 'price', value: '0_1500', text: 'Hasta 1500' },
     { id: 'price2', name: 'price', value: '1500_4500', text: '1500 hasta 4500' },
     { id: 'price3', name: 'price', value: '3500_7500', text: '3500 hasta 7500' },
     { id: 'price4', name: 'price', value: '7500_100000', text: 'Mayor a 7500' },
 ];

 // Buttons (Search, Reset, PriceMin, PriceMax)
 const btnSearchByPrice = document.getElementById('btnSearchByPrice');
 const btnResetFilter = document.getElementById('btnResetFilter');
 let priceMin = document.getElementById('priceMin');
 let priceMax = document.getElementById('priceMax');

 // Product name input
 const inputName = document.getElementById('header__input-name');

 // Search header button
 const btnSearch = document.getElementById('btnSearch');

 // Order options from filter
 const orderOptions = document.getElementById('orderOptions');

 // Category list container
 const categoryContent = document.getElementsByClassName('filter__categories')[0];

 // Price list container
 const pricesContent = document.getElementsByClassName('filter__prices')[0];

 // General shopping cart list container
 const shop__list_id = document.getElementById('shop__list');

 // Shopping cart list
 const shop__list = document.getElementsByClassName('shop__list')[0];
 
 // Quantity of products in the cart
 const shopQuantity = document.getElementById('shopQuantity');

 // WhatsApp button to buy
 const btnWhatsapp = document.getElementById('btnWhatsapp');

 // Total amount container
 const shop__total = document.getElementById('shop__total');

 // Total amount
 const shop_totalAmount = document.getElementById('totalAmount');