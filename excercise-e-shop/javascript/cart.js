console.log('This is cart page');

var header = document.querySelector('header');
header.style.background = "#444444";
header.style.position = "static";

setCartQuantity();

/**
 * Compute quantity of products in cart. Then display it at header.
 */
function setCartQuantity() {
  document.querySelector('.cart-quantity').innerHTML = getCart().reduce(function (totalQuantity, cartItem) {
    return totalQuantity + cartItem.quantity;
  }, 0);
}

/**
 * Update cart in localStorage.
 */
function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * Return cart in localStorage.
 */
function getCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

var cart = getCart();

/**
 * Transform data in cart. Then fill in it into cart group to display.
 */
function renderCartItem() {
  document.querySelector('.cart-product-group').innerHTML = cart.length ? cart.map(convertCartItemToHTML).join('') + clearAll : 'Hiện không có sản phẩm nào trong giỏ hàng';
}

var clearAll =  '' + 
  '<li class="cart-product-group-action">' +
    '<button class="btn btn-flat-primary" onclick="removeAll()">Remove all</button>' +
  '</li>';
  
/**
 * Returns a string as a result after transform cartItem object.
 * 
 * @param {object} cartItem The item in cart.
 * @return {string} HTML Node as a string.
 */
function convertCartItemToHTML(cartItem) {
  return '' +
    '<li class="list-item cart-product-item">' +
      '<div class="cart-product fl-row fl-1">' +
        '<div class="cart-product-img-container">' +
          '<a href="#" class="cart-product-link">' +
            '<img src="' + cartItem.image + '" alt="this is product image" class="cart-product-img">' +
          '</a>' +
        '</div>' +
        '<div class="cart-product-body flex fl-space-between fl-1">' +
          '<div class="cart-product-body-left">' +
            '<a href="#" class="cart-product-link">' +
              '<h4 class="cart-product-name">' + cartItem.name + '</h4>' +
            '</a>' +
            '<p class="cart-product-price">' + cartItem.price.toFixed(2) + '</p>' +
            (cartItem.discount ? '<p class="cart-product-price-discount">' + (cartItem.price * (100 + cartItem.discount) / 100).toFixed(2) + '</p>' : '') + 
          '</div>' + 
          '<div class="cart-product-body-right">' + 
            '<p class="cart-product-total-price">' + (cartItem.price * cartItem.quantity).toFixed(2) + '</p>' + 
            '<div class="cart-product-amount-group flex">' +
              '<button class="amount-decrease" onclick="updateCartItemQuantity(' + cartItem.id + ', ' + (cartItem.quantity - 1) + ')">-</button>' +
              '<input class="amount-inp" value="' + cartItem.quantity + '" type="number" onchange="quantityInputChange(this, ' + cartItem.id + ', ' + cartItem.quantity + ')">' + 
              '<button class="amount-increase" onclick="updateCartItemQuantity(' + cartItem.id + ', ' + (cartItem.quantity + 1) + ')">+</button>' +
            '</div>' + 
            '<div class="cart-product-remove-group">' + 
              '<button class="btn btn-flat-primary" onclick="removeCartItem(' + cartItem.id + ')">Remove</button>' + 
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</li>';
}


/**
 * When quantity input onchange update quantity of item in cart has id equal passed idpdate.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {number} index of element.
 */
function quantityInputChange(target, id, quantity) {
  var newQuantity = +target.value || quantity;
  updateCartItemQuantity(id, newQuantity);
}

/**
 * Update quantity of a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 * @param {number } quantity The quantity of cartItem will be updated.
 */
function updateCartItemQuantity(id, quantity) {
  var findId = findIndex(cart, id);
  if (quantity < 1) {
    quantity = 1;
  }
  if (quantity > 15) {
    quantity = 15;
  }
  cart[findId].quantity = quantity;
  setCart(cart);
  render();
}

/**
 * Remove a cartItem in cart. Then update cart and rerender components related.
 *
 * @param {number || string} id The id of a cartItem.
 */
function removeCartItem(id) {
  cart = cart.filter(function (cartItem) {
    return cartItem.id !== id;
  });
  setCart(cart);
  render();
}

/**
 * Compute total price of items in cart. Then fill in it into element has class is .total-price to display.
 */
function renderTotalPrice() {
  document.querySelector('.total-price').innerHTML = cart.reduce(function (total, cartItem) {
    return total + (cartItem.price * cartItem.quantity);
  }, 0).toFixed(2);
}

/**
 * Rerender items in cart, total price and quantity at header
 */
function render() {
  renderCartItem();
  renderTotalPrice();
  setCartQuantity();
}

/**
 * Remove all items in cart. Then update cart in localStorage and rerender components related.
 */
function removeAll() {
  cart = [];
  setCart(cart);
  render();
}

/**
 * Returns index of element has id equal passed id in an array.
 *
 * @param {array} arr The array.
 * @param {number || string} id The id .
 * @return {number} index of element.
 */
function findIndex(arr, id) {
  return arr.map(function (element) {
    return element.id;
  }).indexOf(id);
}

render();

