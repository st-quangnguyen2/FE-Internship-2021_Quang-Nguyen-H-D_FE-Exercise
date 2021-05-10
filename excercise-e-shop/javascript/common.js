/**
 * Update cart in localStorage.
 */
export function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Return cart in localStorage.
 */
export function getCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

/**
 * Returns index of element has id equal passed id in an array.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {number} index of element.
 */
export function findIndex(arr, id) {
  return arr.findIndex(element => element.id === id);
}

/**
 * Returns an element has id equal passed id in an array.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {object} The element.
 */
export function getElementById(arr, id) {
  return arr.find(element => element.id === id);
}

/**
 * Compute quantity of products in cart. Then display it at header.
 */
 export function setCartQuantity() {
  document.querySelector('.cart-quantity').innerHTML = getCart().reduce((totalQuantity, cartItem) => {
    return totalQuantity + cartItem.quantity;
  }, 0);
}
