import IProduct from './IProduct.js';

type ICartItem = IProduct & {
  quantity: number;
};

export default ICartItem;
