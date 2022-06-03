'use strict';

let burger = document.getElementById('burger');
let menu = document.getElementById('menu');
let close = document.getElementById('close');
burger.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
close.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});

let searchBtn = document.getElementById('search-btn');
let searchForm = document.getElementById('search-form');
searchBtn.addEventListener('click', () => {
  searchForm.classList.toggle('hidden');
});

let productsFilterPopup = document.querySelector('.products__filter-list');
let productsFilterTitle = document.querySelector('.products__filter-title');
let productsFilterIcon = document.querySelector('.products__filter-icon');
productsFilterTitle.addEventListener('click', event => {
  productsFilterPopup.classList.toggle('hidden');
  productsFilterTitle.classList.toggle('products__filter--active');
  productsFilterIcon.classList.toggle('products__filter--active');
});

let productsCategory = document.querySelectorAll('.products__category');
productsCategory.forEach( header => {
  header.addEventListener('click', event => {
      event.target.nextElementSibling.classList.toggle('hidden');
  })
});

let productsChangeBtn = document.querySelectorAll('.products__change-btn');
productsChangeBtn.forEach(select => {
    select.addEventListener('click', event => {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});


