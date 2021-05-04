console.log("This is home page");

function getCart() {
  return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
}

function setCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function setCartQuantity() {
  document.querySelector('.cart-quantity').innerHTML = getCart().reduce(function (totalQuantity, cartItem) {
    return totalQuantity + cartItem.quantity;
  }, 0);
}

setCartQuantity();

var products = [
  {
    id: 1,
    name: 'T-Shirt Summer Vibes',
    price: 89.99,
    discount: 25,
    image: './assets/images/sample/product-1.png'
  },
  {
    id: 2,
    name: 'Loose Knit 3/4 Sleeve',
    price: 119.99,
    discount: 0,
    image: './assets/images/sample/product-2.png'
  },
  {
    id: 3,
    name: 'Basic Slim Fit T-Shirt',
    price: 79.99,
    discount: 0,
    image: './assets/images/sample/product-3.png'
  },
  {
    id: 4,
    name: 'Loose Textured T-Shirt',
    price: 119.99,
    discount: 0,
    image: './assets/images/sample/product-4.png'
  }
]

//fill data selected group
document.querySelector('.selected-group').innerHTML =  products.map(function (product) {
    return '' +
      '<li class="selected-item col-3 col-xs-6">' + 
        convertProductToHtml(product) + 
      '</li>'
  }).join('')
;

document.querySelector('.today-group').innerHTML =  products.map(function (product) {
  return '' +
    '<li class="today-item col-3 col-xs-6">' + 
      convertProductToHtml(product) + 
    '</li>'
}).join('')
;

var cart = getCart();


function convertProductToHtml(product) {
  return '' +
    '<div class="prd">'
      + (product.discount ? '<span class="discount">-' + product.discount + '%</span>' : '') +
      '<a href="#" class="prd-link prd-img-group">' + 
        '<img ' + 
          'src="' + product.image + '"' +
          'alt="product image"' +
          'class="prd-img"' +
        '>' +
      '</a>' +
      '<div class="prd-body">' +
        '<a href="#" class="prd-link">' +
          '<p class="prd-name">' + product.name + '</p>' +
        '</a>' +
        '<p ' +
          'class="prd-price ' + (product.discount ? 'prd-price-discount"' : '"') +
          'data-price="$' + (product.price * 100 / (100 - product.discount)).toFixed(2) + '"' +
        '>' + 
          '$' + product.price.toFixed(2) +
        '</p>' +
      '</div>' +
      '<div class="prd-action">' +
        '<button class="btn btn-primary" onclick="addProductToCart(' + product.id + ')">Add to cart</button>' +
      '</div>' +
    '</div>';
}

function addProductToCart(id) {
  var findId = findIndex(cart, id);
  if (findId === -1) {
    var product = getElementById( products, id);
    product.quantity = 1;
    cart.push(product);
  } 
  else {
    cart[findId].quantity += 1;
  }
  setCart(cart);
  setCartQuantity();
}

function getElementById(arr, id) {
  for(var i = 0; i < arr.length; i++){
    if(arr[i].id === id){
      return arr[i];
    }
  }
  return null;
}

function findIndex(arr, id) {
  return arr.map(function (element) {
    return element.id;
  }).indexOf(id);
}
