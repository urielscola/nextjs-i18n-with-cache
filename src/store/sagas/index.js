import { all } from 'redux-saga/effects';

import toolSaga from './tools';

export default function* rootSaga() {
  yield all([toolSaga()]);
}
