import ICartItem from '../interfaces/ICartItem.js';

/**
 * Update cart in localStorage.
 */
 export function setCart(cart: Array<ICartItem>): void {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Return cart in localStorage.
 */
export function getCart(): Array<ICartItem> {
  let cartJSON: string | null = localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : [];
}

/**
 * Returns index of element has id equal passed id in an array.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {number} index of element.
 */
export function findIndex(arr: any, id: number | string): number {
  return arr.findIndex((element: any) => element.id === id);
}

/**
 * Returns an element has id equal passed id in an array.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {object} The element.
 */
export function getElementById(arr : any, id: number | string) : any {
  return arr.find((element: any) => element.id === id);
}

/**
 * Compute quantity of products in cart. Then display it at header.
 */
 export function setCartQuantity() : void {
  let cartQuantity: any = document.querySelector('.cart-quantity');
  if(cartQuantity) {
    cartQuantity.innerHTML = getCart().reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity;
    }, 0).toString();
  }
  
}
