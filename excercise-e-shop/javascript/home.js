import {setCart, getCart, setCartQuantity, findIndex, getElementById} from './common.js';

let products = [
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

/**
 * Returns a string as a result after transform product object.
 * 
 * @param {object} product The product.
 * @param {string} section The section contains products.
 * @return {string} HTML Node as a string.
 */
function convertProductToHtml(product, section) {
  return `
    <li class="list-item col-3 col-xs-6"> 
      <div class="prd ${section}">
        ${product.discount ? `<span class="discount">-${product.discount}%</span>` : ''}
        <a href="#" class="prd-link prd-img-group">
          <img
            src="${product.image}"
            alt="product image"
            class="prd-img"
          >
        </a>
        <div class="prd-body">
          <a href="#" class="prd-link">
            <p class="prd-name">${product.name}</p>
          </a>
          <p
            class="prd-price ${product.discount ? 'prd-price-discount' : ''}"
            data-price="$${(product.price * 100 / (100 - product.discount)).toFixed(2)}"
          >
            $${product.price.toFixed(2)}
          </p>
        </div>
        <div class="prd-action">
          <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">Add to cart</button>
        </div>
      </div>
    </li>
  `;
}

/**
 * Add event Add to cart for button has class btn-add-to-cart
 */
function addEventAddToCartForBtn() {
  let butts = document.getElementsByClassName('btn-add-to-cart');
  for (let butt of butts) {
    let id = +butt.getAttribute('data-id'); // Get ud of product from custom attribute has name data-id
    butt.addEventListener('click', () => addProductToCart(id));
  }
}

/**
 * Add a product into cart. If the product already existed in cart just only update quantity of it. Else add product into cart and set quantity equal 1.
 * Then rerender quantity of products in cart at header.
 *
 * @param {number || string} id The id of a cartItem.
 */
function addProductToCart(id) {
  let findId = findIndex(cart, id);
  if (findId === -1) {
    let product = getElementById(products, id);
    product.quantity = 1;
    cart.push(product);
  } 
  else {
    cart[findId].quantity += 1;
  }
  setCart(cart);
  setCartQuantity();
}

function render() {
  // Fill data selected group
  document.querySelector('.selected-group').innerHTML =  products.map(function (product) {
    return convertProductToHtml(product, 'selected');
  }).join('');
  // Fill data today group
  document.querySelector('.today-group').innerHTML =  products.map(function (product) {
    return convertProductToHtml(product, 'today');
  }).join('');
  addEventAddToCartForBtn();
  setCartQuantity();
}

render();
let cart = getCart();
