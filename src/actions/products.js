export const getProducts = page => ({ type: 'PRODUCTS/GET', payload: page });
export const getProductById = id => ({ type: 'PRODUCTS/GET_BY_ID', payload: id });

export const getProductsSuccess = products => ({ type: 'PRODUCTS/GET/SUCCESS', payload: products });
export const getProductsFailure = error => ({ type: 'PRODUCTS/GET/FAILURE', payload: error });
export const getProductsStart = () => ({ type: 'PRODUCTS/GET/START' });

export const getProductSuccess = product => ({ type: 'PRODUCTS/GET_BY_ID/SUCCESS', payload: product });
export const getProductFailure = error => ({ type: 'PRODUCTS/GET_BY_ID/FAILURE', payload: error });
export const getProductStart = () => ({ type: 'PRODUCTS/GET_BY_ID/START' });
