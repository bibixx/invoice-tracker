export const getProducts = page => ({ type: 'PRODUCTS/GET', payload: page });

export const getProductsSuccess = product => ({ type: 'PRODUCTS/GET/SUCCESS', payload: product });
export const getProductsFailure = error => ({ type: 'PRODUCTS/GET/FAILURE', payload: error });
export const getProductsStart = () => ({ type: 'PRODUCTS/GET/START' });
