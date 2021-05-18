export function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
export function getCart() {
    let cartJSON = localStorage.getItem('cart');
    return cartJSON ? JSON.parse(cartJSON) : [];
}
export function findIndex(arr, id) {
    return arr.findIndex((element) => element.id === id);
}
export function getElementById(arr, id) {
    return arr.find((element) => element.id === id);
}
export function setCartQuantity() {
    let cartQuantity = document.querySelector('.cart-quantity');
    if (cartQuantity) {
        cartQuantity.innerHTML = getCart().reduce((totalQuantity, cartItem) => {
            return totalQuantity + cartItem.quantity;
        }, 0).toString();
    }
}
