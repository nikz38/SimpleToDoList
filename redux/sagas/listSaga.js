import React from 'react';
import { take, put, fork, call } from 'redux-saga/effects'
import { NavigationActions } from 'react-navigation';
import * as types from '../types';
import {
    getListsRequest,
    addListSuccess,
    addListFailure,
    getListsSuccess,
    getListsFailure, deleteListSuccess, deleteListFailure
} from '../actions/listActions'
import { fbDatabase } from '../../firebase/firebaseInit'

function* watchCreateListRequest() {
    while (true) {
        const action = yield take(types.ADD_LIST_REQUEST);
        const {uid, title} = action.payload;
        const listsRef = fbDatabase.ref(`lists/${uid}`).push();

        function connect() {
            return new Promise(resolve => {
                listsRef.set({title: title}, resolve);
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

function* watchDeleteListRequest() {
    while (true) {
        const action = yield take(types.DELETE_LIST_REQUEST);
        const {uid, listId} = action.payload;
        const listsRef = fbDatabase.ref(`lists/${uid}/${listId}`);

        try {
            yield call([listsRef, listsRef.remove])
            yield put(getListsRequest({uid}));
            yield put(deleteListSuccess());

        } catch (error) {
            yield put(deleteListFailure(error));
        }
    }
}

function* watchEditListRequest() {
    while (true) {
        const action = yield take(types.EDIT_LIST_REQUEST);
        const {uid, listId, title} = action.payload;
        const listsRef = fbDatabase.ref(`lists/${uid}/${listId}`);
        try {
            yield call([listsRef, listsRef.update], {title})
            yield put(getListsRequest({uid}));
            yield put(deleteListSuccess());

        } catch (error) {
            yield put(deleteListFailure(error));
        }
    }
}

export default function* root() {
    yield fork(watchCreateListRequest)
    yield fork(watchGetListsRequest)
    yield fork(watchDeleteListRequest)
    yield fork(watchEditListRequest)
}