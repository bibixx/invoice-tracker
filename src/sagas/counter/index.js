import { delay } from 'redux-saga';
import { put, takeLatest } from 'redux-saga/effects';

import { increment } from 'src/actions/counter';

export function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

export default function* counterSagas() {
  yield takeLatest('INCREMENT_ASYNC', incrementAsync);
}
