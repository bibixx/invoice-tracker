import { call, put, takeLatest } from 'redux-saga/effects';

import { getProductsSuccess, getProductsStart } from 'src/actions/products';

import * as productsApi from 'src/api/products';

function* getProducts({ payload: page }) {
  yield put(getProductsStart());
  const products = yield call(productsApi.getProducts, page);
  yield put(getProductsSuccess(products));
}

function* productsSaga() {
  yield takeLatest('PRODUCTS/GET', getProducts);
}

export default productsSaga;
