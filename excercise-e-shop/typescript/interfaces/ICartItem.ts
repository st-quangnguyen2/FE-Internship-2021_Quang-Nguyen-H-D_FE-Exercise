import IProduct from './IProduct';

type ICartItem = IProduct & {
  quantity: number;
};

export default ICartItem;
