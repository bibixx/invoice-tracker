const base = '/';

const endpointRoutes = {
  products: 'products',
};

export default ({
  productsList: () => `${base}/${endpointRoutes.products}`,
});
