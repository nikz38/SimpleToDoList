import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { ExpoLinksView } from '@expo/samples';
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, logoutRequest, registerRequest } from '../redux/actions/authActions';
import { addListRequest, getListsRequest } from '../redux/actions/listActions';
import { FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]

});

class ListScreen extends React.Component {
    static navigationOptions = {
        title: 'ToDo Lists',
    };

    constructor(props) {
        super(props);
        this.state = {listTitle: ''};
        this.longPressOptions = this.longPressOptions.bind(this);

    }

    componentDidMount() {
        this.props.getListsAction(this.props.authReducer.user.uid)
    }

    componentDidUpdate() {
        if (!this.props.authReducer.user) {
            this.props.navigation.dispatch(resetAction);
        }
    }

    renderLists() {
        const {lists} = this.props.listReducer;
        return Object.keys(lists).map( (list, index) => {
            return <ListItem key={index} onLongPress={this.longPressOptions.bind(this,Object.keys(lists)[index], lists[list].title)} title={lists[list].title}></ListItem>
        })
    }

    longPressOptions(listId, title) {
        this.props.navigation.navigate('EditList', {listId, title});
    }

    render() {
        return (
            <ScrollView>
                <FormLabel>Add new list</FormLabel>
                <FormInput
                    autoCapitalize='none'
                    value={this.state.listTitle}
                    placeholder='grocery list'
                    onChangeText={listTitle => this.setState({listTitle})}/>
                <Button onPress={() => this.props.addListAction(this.props.authReducer.user.uid, this.state.listTitle)} title='Add new list'/>
                {/*<Button onPress={() => this.props.getListsAction(this.props.authReducer.user.uid)} title='Console log list'/>*/}

                <View>
                    {this.props.authReducer.user && <Button onPress={() => this.props.logOutAction()} title='Logout'/>}
                </View>
                <List>
                    {this.props.listReducer.lists && this.renderLists()}
                </List>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const {authReducer, listReducer} = state;
    console.log(state);
    return {
        authReducer,
        listReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addListAction: (uid, title) => {
            dispatch(addListRequest({uid: uid, title: title}))
        },
        getListsAction: (uid) => {
            dispatch(getListsRequest({uid: uid }))
        },
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListScreen)