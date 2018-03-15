import { fork } from 'redux-saga/effects'

import listSaga from './listSaga'

// Consider using takeEvery
export default function* root() {
    yield fork(listSaga)
}