import { RECORDS_PER_PAGE } from 'src/constants/pages';
import { fakeProducts } from 'src/utils/faker';

export const getProducts = page => Promise.resolve({
  products: fakeProducts.slice(page * RECORDS_PER_PAGE, (page + 1) * RECORDS_PER_PAGE),
  numberOfPages: Math.ceil(fakeProducts.length / RECORDS_PER_PAGE),
});

export const getProductById = id => Promise.resolve(
  { product: fakeProducts.find(({ id: productId }) => id === productId) },
);
