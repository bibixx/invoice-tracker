import { call, put, takeLatest } from 'redux-saga/effects';

import { getCompaniesSuccess, getCompaniesStart } from 'src/actions/companies';

import * as companiesApi from 'src/api/companies';

function* getCompanies({ payload: page }) {
  yield put(getCompaniesStart());
  const companies = yield call(companiesApi.getCompanies, page);
  yield put(getCompaniesSuccess(companies));
}

function* companiesSaga() {
  yield takeLatest('COMPANIES/GET', getCompanies);
}

export default companiesSaga;
