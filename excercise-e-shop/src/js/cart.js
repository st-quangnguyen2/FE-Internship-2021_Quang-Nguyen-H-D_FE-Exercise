import { setCart, getCart, setCartQuantity, findIndex } from './common.js';
import { LEN_MONEY } from './constants.js';
import '../assets/scss/style.scss';

let header = document.querySelector('header');
header.style.background = '#444444';
header.style.position = 'static';

/**
 * Update quantity of a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 * @param {number } quantity The quantity of cartItem will be updated.
 */
function updateCartItemQuantity(id, quantity) {
  let findId = findIndex(cart, id);
  if (quantity < 1) {
    quantity = 1;
  }
  if (quantity > 15) {
    quantity = 15;
  }
  cart[findId].quantity = quantity;
  render();
}

/**
 * When quantity input onchange update quantity of item in cart has id equal passed id .
 *
 * @param {HTMLElement} target The array.
 * @param {number || string} id The id .
 * @param {number} quantity The quantity of item before input change .
 */
function quantityInputChange(target, id, quantity) {
  let newQuantity = +target.value || quantity;
  updateCartItemQuantity(id, newQuantity);
}

/**
 * Remove a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 */
function removeCartItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
  render();
}

/**
 * Remove all items in cart. Then update cart in localStorage and rerender components related.
 */
function removeAll() {
  cart = [];
  render();
}

/**
 * Returns a string as a result after transform cartItem object.
 *
 * @param {object} cartItem The item in cart.
 * @return {string} HTML Node as a string.
 */
function convertCartItemToHTML(cartItem) {
  return `
    <li class="list-item cart-product-item">
      <div class="cart-product fl-row fl-1">
        <div class="cart-product-img-container">
          <a href="#" class="cart-product-link">
            <img src="${cartItem.image}" alt="this is product image" class="cart-product-img">
          </a>
        </div>
        <div class="cart-product-body flex fl-space-between fl-1">
          <div class="cart-product-body-left">
            <a href="#" class="cart-product-link">
              <h4 class="cart-product-name">${cartItem.name}</h4>
              </a>
              <p class="cart-product-price">${cartItem.price.toFixed(LEN_MONEY)}</p>
              ${
                cartItem.discount
                  ? `<p class="cart-product-price-discount">${(
                      (cartItem.price * (100 + cartItem.discount)) /
                      100
                    ).toFixed(LEN_MONEY)}</p>`
                  : ''
              }
            </div>
          <div class="cart-product-body-right">
          <p class="cart-product-total-price">${(cartItem.price * cartItem.quantity).toFixed(
            LEN_MONEY
          )}</p>
            <div class="cart-product-amount-group flex">
              <button class="amount-btn amount-decrease" data-id="${cartItem.id}" data-quantity="${
    cartItem.quantity - 1
  }">-</button>
              <input class="amount-inp" value="${cartItem.quantity}" type="number" data-id="${
    cartItem.id
  }" data-quantity="${cartItem.quantity}"> 
              <button class="amount-btn amount-increase" data-id="${cartItem.id}" data-quantity="${
    cartItem.quantity + 1
  }">+</button>
            </div>
            <div class="cart-product-remove-group">
              <button class="btn btn-flat-primary btn-remove-item" data-id="${
                cartItem.id
              }">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  `;
}

/**
 * Add event decrease or increase quantity of cart item for buttons have class amount-btn
 */
function addEventForBtn() {
  let butts = document.getElementsByClassName('amount-btn');
  for (let butt of butts) {
    let id = +butt.getAttribute('data-id');
    let quantity = +butt.getAttribute('data-quantity');
    butt.addEventListener('click', () => updateCartItemQuantity(id, quantity));
  }
}

/**
 * Add event change quantity of cart item for inputs have class amount-inp
 */
function addEventForInp() {
  let inps = document.getElementsByClassName('amount-inp');
  for (let inp of inps) {
    inp.addEventListener('change', () => {
      let id = +inp.getAttribute('data-id');
      let quantity = +inp.getAttribute('data-quantity');
      let newQuantity = +inp.value || quantity;
      updateCartItemQuantity(id, newQuantity);
    });
  }
}

/**
 * Add event remove item in cart for buttons have class name btn-remove-item
 */
function addEventRemoveCartItem() {
  let butts = document.getElementsByClassName('btn-remove-item');
  for (let butt of butts) {
    let id = +butt.getAttribute('data-id');
    butt.addEventListener('click', () => removeCartItem(id));
  }
}

/**
 * Add event remove all item in cart for button has class name btn-remove-all
 */
function addEventRemoveAll() {
  let butt = document.querySelector('.btn-remove-all');
  if (butt) {
    butt.addEventListener('click', removeAll);
  }
}

/**
 * Transform data in cart. Then fill in it into cart group to display and add event for it.
 */
function renderCartItem() {
  let clearAll = `
    <li class="cart-product-group-action">
      <button class="btn btn-flat-primary btn-remove-all"">Remove all</button>
    </li>
    `;
  document.querySelector('.cart-product-group').innerHTML = cart.length
    ? cart.map(convertCartItemToHTML).join('') + clearAll
    : 'Hiện không có sản phẩm nào trong giỏ hàng';
  addEventForBtn();
  addEventForInp();
  addEventRemoveCartItem();
  addEventRemoveAll();
}

/**
 * Compute total price of items in cart. Then fill in it into element has class is .total-price to display.
 */
function renderTotalPrice() {
  document.querySelector('.total-price').innerHTML = cart
    .reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0)
    .toFixed(2);
}

/**
 * Rerender items in cart, total price and quantity at header
 */
function render() {
  setCart(cart);
  renderCartItem();
  renderTotalPrice();
  setCartQuantity();
}

let cart = getCart();
render();
