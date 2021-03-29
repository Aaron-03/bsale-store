

const inputName = document.getElementById('header__input-name');
 
inputName.addEventListener('keyup', searchByName);
btnResetFilter.addEventListener('click', resetFilter);



const selectPrices = () => {
    const pricesItem = document.querySelectorAll('.price__item');

    Array.from(pricesItem).forEach(p => {
        p.addEventListener('click', searchByPrices);
    });
}