import React from 'react';
import { take, put, fork, call } from 'redux-saga/effects'
import * as types from '../types';
import {
    getListItemsRequest,
    addListItemSuccess,
    addListItemFailure,
    getListItemsSuccess,
    getListItemsFailure,
    deleteListItemSuccess,
    deleteListItemFailure
} from '../actions/listItemActions'
import { fbDatabase } from '../../firebase/firebaseInit'

function* watchCreateListItemRequest() {
    while (true) {
        const action = yield take(types.ADD_LIST_ITEM_REQUEST);
        const {uid, listId, title} = action.payload;
        const listItemRef = fbDatabase.ref(`lists/${uid}/${listId}/items/`);

        try {
            yield call([listItemRef, listItemRef.push], {title, isChecked: false})

            yield put(getListItemsRequest({uid, listId}));
        } catch (error) {
            yield put(addListItemFailure(error));
        }
    }
}

function* watchGetListItemsRequest() {
    while (true) {
        const action = yield take(types.GET_LIST_ITEMS_REQUEST);
        const {uid, listId} = action.payload;
        const listItemRef = fbDatabase.ref(`lists/${uid}/${listId}/items/`);

        function connect() {
            return new Promise(resolve => {
                listItemRef.on('value', resolve);
            });
        }

        try {
            const snapshot = yield call(connect);
            yield put(getListItemsSuccess(snapshot.val()));

        } catch (error) {
            yield put(getListItemsFailure(error));
        }
    }
}

function* watchDeleteListItemRequest() {
    while (true) {
        const action = yield take(types.DELETE_LIST_ITEM_REQUEST);
        const {uid, listId, listItemId} = action.payload;
        const listItemRef = fbDatabase.ref(`lists/${uid}/${listId}/items/${listItemId}`);

        try {
            yield call([listItemRef, listItemRef.remove])
            yield put(getListItemsRequest({uid, listId}));

        } catch (error) {
            yield put(deleteListItemFailure(error));
        }
    }
}

function* watchEditListItemRequest() {
    while (true) {
        const action = yield take(types.EDIT_LIST_ITEM_REQUEST);
        const {uid, listId, listItemId, title, isChecked} = action.payload;
        const listItemRef = fbDatabase.ref(`lists/${uid}/${listId}/items/${listItemId}`);

        try {
            title ? yield call([listItemRef, listItemRef.update], {title}):
            yield call([listItemRef, listItemRef.update], {isChecked})
            yield put(getListItemsRequest({uid, listId}));

        } catch (error) {
            yield put(deleteListItemFailure(error));
        }
    }
}

export default function* root() {
    yield fork(watchCreateListItemRequest)
    yield fork(watchGetListItemsRequest)
    yield fork(watchDeleteListItemRequest)
    yield fork(watchEditListItemRequest)
}