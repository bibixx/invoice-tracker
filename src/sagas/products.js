import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getProductsSuccess,
  getProductsStart,
  getProductSuccess,
  getProductStart,
} from 'src/actions/products';

import * as productsApi from 'src/api/products';

function* getProducts({ payload: page }) {
  yield put(getProductsStart());
  const products = yield call(productsApi.getProducts, page);
  yield put(getProductsSuccess(products));
}

function* getProductById({ payload: id }) {
  yield put(getProductStart());
  const product = yield call(productsApi.getProductById, id);
  yield put(getProductSuccess(product));
}

function* productsSaga() {
  yield takeLatest('PRODUCTS/GET', getProducts);
  yield takeLatest('PRODUCTS/GET_BY_ID', getProductById);
}

export default productsSaga;
