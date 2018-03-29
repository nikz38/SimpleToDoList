import React from 'react';
import { ActivityIndicator, Text, Button, View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import * as firebase from 'firebase';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { connect } from 'react-redux';
import { addListItemRequest } from '../redux/actions/listActions';
import List from '../screens/ListScreen'
import { loginRequest, loginSuccess, logoutRequest, registerRequest } from '../redux/actions/authActions';


const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'List'})
    ]
});

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (!this.props.authReducer.user) {
                    this.props.loginSuccessAction(user);
                }
                this.props.navigation.dispatch(resetAction);

            }

        });
    }

    renderButtonOrLoading() {
        return (
            <View>
                {!this.props.authReducer.user &&
                <Button onPress={() => this.props.loginAction(this.state.email, this.state.password)} title='Login'/>}
                {!this.props.authReducer.user &&
                <Button onPress={() => this.props.registerAction(this.state.email, this.state.password)}
                        title='Sign Up'/>}
                {this.props.authReducer.user && <Button onPress={() => this.props.logOutAction()} title='Logout'/>}
            </View>
        )
    }

    render() {
        {
            if (this.props.authReducer.isFetching) {
                return (
                    <View style={[styles.containerLoader, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
            } else {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                    autoCapitalize='none'
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
                    {this.props.authReducer.error}
                </FormValidationMessage>
                {this.renderButtonOrLoading()}
                {this.props.authReducer.user &&
                <Text>
                    {this.props.authReducer.user.uid}
                </Text>}
            </View>
        )
            }

        }

    }
}

function mapStateToProps(state) {
    const {authReducer} = state;
    return {
        authReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginAction: (email, password) => {
            dispatch(loginRequest({email: email, password: password}))
        },
        loginSuccessAction: (user) => {
            dispatch(loginSuccess(user))
        },
        logOutAction: () => {
            dispatch(logoutRequest())
        },
        registerAction: (email, password) => {
            dispatch(registerRequest({email: email, password: password}))
        },
    }
}

const styles = StyleSheet.create({
    containerLoader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginScreen)