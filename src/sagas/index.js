import { all } from 'redux-saga/effects';

import productsSaga from './products';
import companiesSaga from './companies';

export default function* () {
  yield all([
    productsSaga(),
    companiesSaga(),
  ]);
}
