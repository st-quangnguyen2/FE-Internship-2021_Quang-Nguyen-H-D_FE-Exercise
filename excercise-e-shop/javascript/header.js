setCartQuantity();
function setCartQuantity() {
  document.querySelector('.cart-quantity').innerHTML = getCart().reduce(function (totalQuantity, cartItem) {
    return totalQuantity + cartItem.quantity;
  }, 0);
}