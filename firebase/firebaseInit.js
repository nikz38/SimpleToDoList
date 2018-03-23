import * as firebase from 'firebase'

firebase.initializeApp({
    apiKey: "AIzaSyAaZ0BZHEnpG0J8bKcEBilsXKkQtZdyNjc",
    authDomain: "simple-todo-list-996ef.firebaseapp.com",
    databaseURL: "https://simple-todo-list-996ef.firebaseio.com",
    projectId: "simple-todo-list-996ef",
    storageBucket: "simple-todo-list-996ef.appspot.com",
    messagingSenderId: "394433554678"
});

export const fbAuth = firebase.auth();
export const fbDatabase = firebase.database();