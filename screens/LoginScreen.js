import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Button,
    View,
} from 'react-native';

import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


firebase.initializeApp({
    apiKey: "AIzaSyAaZ0BZHEnpG0J8bKcEBilsXKkQtZdyNjc",
    authDomain: "simple-todo-list-996ef.firebaseapp.com",
    databaseURL: "https://simple-todo-list-996ef.firebaseio.com",
    projectId: "simple-todo-list-996ef",
    storageBucket: "simple-todo-list-996ef.appspot.com",
    messagingSenderId: "394433554678"
});


export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', error: '', isLogged: false, loading: false};

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isLogged: true});

            } else {
                this.setState({isLogged: false});
            }
        });
    }

    logIn() {
        this.setState({error: '', loading: true});
        const {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.setState({error: '', loading: false});
                    // this.props.navigation.navigate('Main');
                }
            )
            .catch(
                (error) => {
                    this.setState({error: error.message, loading: false});
                }
            )
    }

    signUp() {
        this.setState({error: '', loading: true});
        const {email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                () => {
                    this.setState({error: '', loading: false});
                    this.props.navigation.navigate('Main');
                }
            )
            .catch(
                (error) => {
                    this.setState({error: error.message, loading: false});
                }
            )
    }

    logOut() {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }, function(error) {
            // An error happened.
        });
    }

    renderButtonOrLoading() {
        if (this.state.loading) {
            return <Text>Loading...</Text>
        }

        return (
            <View>
                <Button onPress={this.logIn.bind(this)} title='Login'/>
                <Button onPress={this.signUp.bind(this)} title='Sign Up'/>
                <Button onPress={this.logOut.bind(this)} title='Logout'/>
            </View>
        )
    }

        render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                    value={this.state.email}
                    placeholder='john@doe.com'
                    onChangeText={email => this.setState({email})}/>
                <FormLabel>Password</FormLabel>
                <FormInput
                    value={this.state.password}
                    secureTextEntry
                    placeholder='******'
                    onChangeText={password => this.setState({password})}/>
                <FormValidationMessage>
                    {this.state.error}
                </FormValidationMessage>
                <Text>
                    {this.state.isLogged ? 'logged' : 'not logged'}
                </Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}
