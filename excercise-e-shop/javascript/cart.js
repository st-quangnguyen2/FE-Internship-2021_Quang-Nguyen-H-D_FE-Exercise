console.log("This is cart page");

var cart = getCart();

function getCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCartItem() {
  document.querySelector('.cart-product-group').innerHTML =  cart.map(convertCartItemToHTML).join('');
}

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
            <p class="cart-product-total-price">$${cartItem.price.toFixed(2)}</p>
          </div>
          <div class="cart-product-body-right">
            <p class="cart-product-price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
            <div class="cart-product-amount-group flex">
              <button class="amount-decrease" onclick="updateCartItemQuantity(${cartItem.id}, ${cartItem.quantity - 1})">-</button>
              <input class="amount-inp" value="${cartItem.quantity}" type="text">
              <button class="amount-increase" onclick="updateCartItemQuantity(${cartItem.id}, ${cartItem.quantity + 1})">+</button>
            </div>
            <div class="cart-product-remove-group">
              <button class="btn btn-flat-primary" onclick="removeCartItem(${cartItem.id})">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  `
}

function updateCartItemQuantity(id, quantity) {
  if(quantity && quantity < 16) {
    var findId = cart.findIndex(function (cartItem) {
      return cartItem.id === id;
    });
    cart[findId].quantity = quantity;
    setCart(cart);
    render();
  }
}

function removeCartItem(id) {
  cart = cart.filter(function (cartItem) {
    return cartItem.id !== id;
  });
  setCart(cart);
  render();
}

function renderTotalPrice() {
  document.querySelector('.total-price').innerHTML = cart.reduce(function (total, cartItem) {
    return total + (cartItem.price * cartItem.quantity);
  }, 0).toFixed(2);
}

function render(){
  renderCartItem();
  renderTotalPrice();
}

render();