import React from 'react';
import { take, put, fork } from 'redux-saga/effects'
import * as types from '../types';
import {
    addListItemSuccess,
    addListItemFailure
} from '../actions/listActions'

function *watchAddListRequest() {
    while(true) {
        const { email, password } = yield take(types.ADD_LIST_ITEM_REQUEST);
        try {
            // yield put(testRequest(Math.random()));
            yield put(addListItemSuccess(Math.random()));
        } catch (err) {
            yield put(addListItemFailure(Math.random()));

            console.log(error)
        }
    }
}

export default function* root() {
    yield fork(watchAddListRequest)
}