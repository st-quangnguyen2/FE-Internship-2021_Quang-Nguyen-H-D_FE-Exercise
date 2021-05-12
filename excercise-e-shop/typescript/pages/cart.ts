import ICartItem from '../interfaces/ICartItem';
import {setCart, getCart, setCartQuantity, findIndex, getElementById} from '../common/index.js';
import {LEN_MONEY} from '../constants/index.js';

let header: any = document.querySelector('header');
if (header) {
  header.style.background = "#444444";
  header.style.position = "static";
}

/**
 * Update quantity of a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 * @param {number } quantity The quantity of cartItem will be updated.
 */
function updateCartItemQuantity(id: number, quantity: number) {
  let findId: number = findIndex(cart, id);
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
 * Remove a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 */
 function removeCartItem(id: number | string) {
  cart = cart.filter(cartItem =>  cartItem.id !== id);
  render();
}

/**
 * Remove all items in cart. Then update cart in localStorage and rerender components related.
 */
 function removeAll(): void {
  cart = [];
  render();
}

/**
 * Returns a string as a result after transform cartItem object.
 * 
 * @param {ICartItem} cartItem The item in cart.
 * @return {string} HTML Node as a string.
 */
function convertCartItemToHTML(cartItem: ICartItem): string {
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
              ${cartItem.discount ? `<p class="cart-product-price-discount">${(cartItem.price * (100 + cartItem.discount) / 100).toFixed(LEN_MONEY)}</p>` : ''}
            </div>
          <div class="cart-product-body-right">
          <p class="cart-product-total-price">${(cartItem.price * cartItem.quantity).toFixed(LEN_MONEY)}</p>
            <div class="cart-product-amount-group flex">
              <button class="amount-btn amount-decrease" data-id="${cartItem.id}" data-quantity="${cartItem.quantity - 1}">-</button>
              <input class="amount-inp" value="${cartItem.quantity}" type="number" data-id="${cartItem.id}" data-quantity="${cartItem.quantity}"> 
              <button class="amount-btn amount-increase" data-id="${cartItem.id}" data-quantity="${cartItem.quantity + 1}">+</button>
            </div>
            <div class="cart-product-remove-group">
              <button class="btn btn-flat-primary btn-remove-item" data-id="${cartItem.id}">Remove</button>
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
function addEventForBtn(): void {
  let butts: any = document.getElementsByClassName('amount-btn');
  for (let butt of butts) {
    let id: number = +butt.getAttribute('data-id');
    let quantity: number = +butt.getAttribute('data-quantity');
    butt.addEventListener('click', () => updateCartItemQuantity(id, quantity));
  }
}

/**
 * Add event change quantity of cart item for inputs have class amount-inp
 */
function addEventForInp() {
  let inps: any = document.getElementsByClassName('amount-inp');
  for (let inp of inps) {
    inp.addEventListener('change', () => {
      let id: number = +inp.getAttribute('data-id');
      let quantity: number = +inp.getAttribute('data-quantity');
      let newQuantity: number = +inp.value || quantity;
      updateCartItemQuantity(id, newQuantity);
    }) ;
  }
}

/**
 * Add event remove item in cart for buttons have class name btn-remove-item 
 */
function addEventRemoveCartItem(): void {
  let butts: any = document.getElementsByClassName('btn-remove-item');
  for (let butt of butts) {
    let id = +butt.getAttribute('data-id');
    butt.addEventListener('click', () =>  removeCartItem(id));
  }
}

/**
 * Add event remove all item in cart for button has class name btn-remove-all 
 */
function addEventRemoveAll(): void {
  let butt: any = document.querySelector('.btn-remove-all');
  if (butt) {
    butt.addEventListener('click', removeAll);
  }
}

/**
 * Transform data in cart. Then fill in it into cart group to display and add event for it.
 */
function renderCartItem(): void {
  let clearAll: string = `
    <li class="cart-product-group-action">
      <button class="btn btn-flat-primary btn-remove-all"">Remove all</button>
    </li>
    `;
  let cartGroup: any = document.querySelector('.cart-product-group');
  if (cartGroup) {
    cartGroup.innerHTML = cart.length ? cart.map(convertCartItemToHTML).join('') + clearAll : 'Hiện không có sản phẩm nào trong giỏ hàng';
    addEventForBtn();
    addEventForInp();
    addEventRemoveCartItem();
    addEventRemoveAll();
  }
}

/**
 * Compute total price of items in cart. Then fill in it into element has class is .total-price to display.
 */
function renderTotalPrice(): void {
  let totalPrice: any = document.querySelector('.total-price');
  if (totalPrice) {
    totalPrice.innerHTML = cart.reduce((total, cartItem) => {
      return total + (cartItem.price * cartItem.quantity);
    }, 0).toFixed(2);
  }
}

/**
 * Rerender items in cart, total price and quantity at header
 */
function render(): void {
  setCart(cart);
  renderCartItem();
  renderTotalPrice();
  setCartQuantity();
}

let cart: Array<ICartItem> = getCart();
render();
