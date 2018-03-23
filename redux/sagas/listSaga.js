import React from 'react';
import { take, put, fork, call } from 'redux-saga/effects'
import * as types from '../types';
import {
    getListsRequest,
    addListSuccess,
    addListFailure,
    getListsSuccess,
    getListsFailure
} from '../actions/listActions'
import { fbDatabase } from '../../firebase/firebaseInit'

function* watchCreateListRequest() {
    while (true) {
        const action = yield take(types.ADD_LIST_REQUEST);
        const {uid, title} = action.payload;
        const listsRef = fbDatabase.ref(`lists/${uid}`).push();

        function connect() {
            return new Promise(resolve => {
                listsRef.set({title: title, items: ['item1']}, resolve);
            });
        }

        try {
            yield call(connect);
            yield put(getListsRequest({uid}));
        } catch (error) {
            yield put(addListFailure(error));
        }
    }
}

function* watchGetListsRequest() {
    while (true) {
        const action = yield take(types.GET_LISTS_REQUEST);
        const {uid} = action.payload;
        const listsRef = fbDatabase.ref(`lists/${uid}`);

        function connect() {
            return new Promise(resolve => {
                listsRef.on('value', resolve);
            });
        }

        try {
            const snapshot = yield call(connect);
            yield put(getListsSuccess(snapshot.val()));

        } catch (error) {
            yield put(getListsFailure(error));
        }
    }
}

export default function* root() {
    yield fork(watchCreateListRequest)
    yield fork(watchGetListsRequest)

}