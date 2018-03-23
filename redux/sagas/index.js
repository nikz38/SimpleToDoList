import { fork } from 'redux-saga/effects'

import listSaga from './listSaga'
import authSaga from './authSaga'

// Consider using takeEvery
export default function* root() {
    yield fork(listSaga)
    yield fork(authSaga)

}