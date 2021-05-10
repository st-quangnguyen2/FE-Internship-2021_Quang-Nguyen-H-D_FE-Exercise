import { setCart, getCart, setCartQuantity, findIndex, getElementById } from '../common/index.js';
import { LEN_MONEY } from '../constants/index.js';
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
];
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
            data-price="$${(product.price * 100 / (100 - product.discount)).toFixed(LEN_MONEY)}"
          >
            $${product.price.toFixed(LEN_MONEY)}
          </p>
        </div>
        <div class="prd-action">
          <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">Add to cart</button>
        </div>
      </div>
    </li>
  `;
}
function addEventAddToCartForBtn() {
    let butts = document.getElementsByClassName('btn-add-to-cart');
    for (let butt of butts) {
        let id = +butt.getAttribute('data-id');
        butt.addEventListener('click', () => addProductToCart(id));
    }
}
function addProductToCart(id) {
    let findId = findIndex(cart, id);
    if (findId === -1) {
        let product = getElementById(products, id);
        let cartItem = Object.assign(Object.assign({}, product), { quantity: 1 });
        cart.push(cartItem);
    }
    else {
        cart[findId].quantity += 1;
    }
    setCart(cart);
    setCartQuantity();
}
function render() {
    let selectedGroup = document.querySelector('.selected-group');
    if (selectedGroup) {
        selectedGroup.innerHTML = products.map(function (product) {
            return convertProductToHtml(product, 'selected');
        }).join('');
    }
    let todayGroup = document.querySelector('.today-group');
    if (todayGroup) {
        todayGroup.innerHTML = products.map(function (product) {
            return convertProductToHtml(product, 'today');
        }).join('');
    }
    if (selectedGroup || todayGroup) {
        addEventAddToCartForBtn();
    }
    setCartQuantity();
}
render();
let cart = getCart();
