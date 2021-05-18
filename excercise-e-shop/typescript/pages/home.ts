import IProduct from '../interfaces/IProduct';
import ICartItem from '../interfaces/ICartItem';
import {setCart, getCart, setCartQuantity, findIndex, getElementById} from '../common/index.js';
import {LEN_MONEY} from '../constants/index.js';

let products: Array<IProduct> = [
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
 * @param {IProduct} product The product.
 * @param {string} section The section contains products.
 * @return {string} HTML Node as a string.
 */
function convertProductToHtml(product: IProduct, section: string): string {
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

/**
 * Add event Add to cart for button has class btn-add-to-cart
 */
function addEventAddToCartForBtn():void {
  let butts: any = document.getElementsByClassName('btn-add-to-cart');
  for (let butt of butts) {
    let id: number = +butt.getAttribute('data-id'); // Get ud of product from custom attribute has name data-id
    butt.addEventListener('click', () => addProductToCart(id));
  }
}

/**
 * Add a product into cart. If the product already existed in cart just only update quantity of it. Else add product into cart and set quantity equal 1.
 * Then rerender quantity of products in cart at header.
 *
 * @param {number || string} id The id of a cartItem.
 */
function addProductToCart(id: number | string) {
  let findId: number = findIndex(cart, id);
  if (findId === -1) {
    let product: IProduct = getElementById(products, id);
    let cartItem: ICartItem = {...product, quantity: 1};
    cart.push(cartItem);
  } else {
    cart[findId].quantity += 1;
  }
  setCart(cart);
  setCartQuantity();
}

function render() {
  // Fill data selected group
  let selectedGroup: any = document.querySelector('.selected-group');
  if (selectedGroup) {
    selectedGroup.innerHTML =  products.map(function (product) {
      return convertProductToHtml(product, 'selected');
    }).join('');
  }
  // Fill data today group
  let todayGroup: any = document.querySelector('.today-group');
  if (todayGroup) {
    todayGroup.innerHTML =  products.map(function (product) {
      return convertProductToHtml(product, 'today');
    }).join('');
  }
  if (selectedGroup || todayGroup) {
    addEventAddToCartForBtn();
  }
  setCartQuantity();
}

render();
let cart:Array<ICartItem> = getCart();
