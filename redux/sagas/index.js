import { fork } from 'redux-saga/effects'

import listItemsSaga from './listItemsSaga'
import listSaga from './listSaga'
import authSaga from './authSaga'

// Consider using takeEvery
export default function* root() {
    yield fork(listSaga)
    yield fork(listItemsSaga)
    yield fork(authSaga)

}