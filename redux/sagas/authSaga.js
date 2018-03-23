import React from 'react'
import { NavigationActions } from 'react-navigation'
import { take, put, fork, call } from 'redux-saga/effects'
import * as firebase from 'firebase'
import * as types from '../types'
import { StackNavigator } from 'react-navigation'
import List from '../../screens/ListScreen'

import { fbAuth } from '../../firebase/firebaseInit'

import {
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    registerSuccess,
    registerFailure
} from '../actions/authActions'

function *watchLoginRequest() {
    while(true) {
        const action = yield take(types.LOGIN_REQUEST);
        const { email, password } = action.payload;
        try {
            // const fbAuth = firebase.auth();
            const data = yield call([fbAuth, fbAuth.signInWithEmailAndPassword],email, password);
            yield put(loginSuccess(data));
            // yield put(NavigationActions.navigate({  routeName: 'List' })) // ne radi iz nekog razloga
        } catch (error) {
            yield put(loginFailure(error));
        }
    }
}

function *watchLogoutRequest() {
    while(true) {
        yield take(types.LOGOUT_REQUEST);
        try {
            // const fbAuth = firebase.auth();
            yield call([fbAuth, fbAuth.signOut]);
            yield put(logoutSuccess());
        } catch (error) {
            yield put(logoutFailure(error));
        }
    }
}

function *watchRegisterRequest() {
    while(true) {
        const action = yield take(types.REGISTER_REQUEST);
        const { email, password } = action.payload;
        try {
            // const fbAuth = firebase.auth();
            const data = yield call([fbAuth, fbAuth.createUserWithEmailAndPassword],email, password);
            yield put(registerSuccess(data));
            yield put(NavigationActions.navigate({  routeName: 'Main' }))
        } catch (error) {
            yield put(registerFailure(error));
        }
    }
}

export default function* root() {
    yield fork(watchLoginRequest)
    yield fork(watchLogoutRequest)
    yield fork(watchRegisterRequest)
}