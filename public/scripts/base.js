/**
 * Global variables
 */
 let nameText = '';
 let categoryId = 0;
 let prices = '';
 let pageNum = 1;

 let productList = [];
 let productStorage = [];

 let categoryColors = [
     { catId: 1, color: 'color_1' },
     { catId: 2, color: 'color_2' },
     { catId: 3, color: 'color_3' },
     { catId: 4, color: 'color_4' },
     { catId: 5, color: 'color_5' },
     { catId: 6, color: 'color_6' },
     { catId: 7, color: 'color_7' }
 ];

 // Buttons (Search, Reset, PriceMin, PriceMax)
 const btnSearchByPrice = document.getElementById('btnSearchByPrice');
 const btnResetFilter = document.getElementById('btnResetFilter');
 let priceMin = document.getElementById('priceMin');
 let priceMax = document.getElementById('priceMax');

 const categoryContent = document.getElementsByClassName('filter__categories')[0];