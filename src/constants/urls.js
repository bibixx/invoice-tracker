const urls = {
  products: '/products',
  companies: '/companies',
};

export default ({
  products: () => '/',
  productById: id => `${urls.products}/${id}`,
  companies: () => urls.companies,
  companyById: id => `${urls.companies}/${id}`,
});
