import { RECORDS_PER_PAGE } from 'src/constants/pages';
import { fakeProducts } from 'src/utils/faker';

export const getProducts = page => Promise.resolve({
  products: fakeProducts.slice(page * RECORDS_PER_PAGE, (page + 1) * RECORDS_PER_PAGE).map(({
    id, timestamp, name, warrantyLength,
  }) => ({
    id, timestamp, name, warrantyLength,
  })),
  numberOfPages: Math.ceil(fakeProducts.length / RECORDS_PER_PAGE),
});

export const getProductById = id => Promise.resolve(
  fakeProducts.find(({ id: productId }) => id === productId),
);
