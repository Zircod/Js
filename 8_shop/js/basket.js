'use strict';

const basketCounterEl = document.querySelector('.header__link-basket');
const basketTotalEl = document.querySelector('.header__basketTotal');
const basketTotalValueEl = document.querySelector('.header__basketTotalValue');
const basketEl = document.querySelector('.header__basket');

/**
 * Обработчик открытия корзины при клике на ее значок.
 */
document.querySelector('.header__list-basket')
  .addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

/**
 * В корзине хранится количество каждого товара
 * Ключ это id продукта, значение это товар в корзине - объект, содержащий
 * id, название товара, цену, и количество штук, например:
 * {
 *    1: {id: 1, name: "product 1", price: 30, count: 2},
 *    3: {id: 3, name: "product 3", price: 25, count: 1},
 * }
 */
const basket = {};

/**
 * Обработчик клика на кнопку "Добавить в корзину" с делегированием события.
 * Событие вешается на ближайшего общего для всех кнопок предка.
 */
document.querySelector('.products__list-grid')
  .addEventListener('click', event => {
    if (!event.target.closest('.products__item-btn')) {
      return;
    }

    const productsItem = event.target.closest('.products__item');
    const id = +productsItem.dataset.id;
    const name = productsItem.dataset.name;
    const price = +productsItem.dataset.price;

    addToCart(id, name, price);
});

/**
 * Функция добавляет продукт в корзину.
 * @param {number} id - Id продукта.
 * @param {string} name - Название продукта.
 * @param {number} price - Цена продукта.
 */
function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id: id, name: name, price: price, count: 0 };
  }

  basket[id].count++;
  basketCounterEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);

  renderProductInBasket(id);
}

/**
 * Считает и возвращает количество продуктов в корзине.
 * @return {number} - Количество продуктов в корзине.
 */
function getTotalBasketCount() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.count, 0);
}

/**
 * Считает и возвращает итоговую цену по всем добавленным продуктам.
 * @return {number} - Итоговую цену по всем добавленным продуктам.
 */
function getTotalBasketPrice() {
  return Object
    .values(basket)
    .reduce((acc, product) => acc + product.price * product.count, 0);
}

/**
 * Функция отрисовывает в корзину информацию о продукте.
 * @param {number} productId - Id продукта.
 */
function renderProductInBasket(productId) {
  const basketRowEl = basketEl
  .querySelector(`.header__basketRow[data-id="${productId}"]`);

  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }

  const product = basket[productId];
  basketRowEl.querySelector('.header__basketCount').textContent = product.count;
  basketRowEl
    .querySelector('.header__basketTotalRow')
    .textContent = (product.price * product.count).toFixed(2);


}

/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId - Id товара.
 */
function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="header__basketRow" data-id="${productId}">
      <div>
        ${basket[productId].name}
      </div>
      <div>
        <span class="header__basketCount">${basket[productId].count}</span> шт.
      </div>
      <div>
        $${basket[productId].price}
      </div>
      <div>
        $<span class="header__basketTotalRow">
          ${(basket[productId].price * basket[productId].count).toFixed(2)}
         </span>
      </div>
    </div>
  `;

  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}


