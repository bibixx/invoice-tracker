import { all } from 'redux-saga/effects';

import productsSaga from './products';

export default function* () {
  yield all([
    productsSaga(),
  ]);
}
