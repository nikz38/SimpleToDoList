import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, logoutRequest, registerRequest } from '../redux/actions/authActions';
import { addListRequest, getListsRequest, deleteListRequest } from '../redux/actions/listActions';
import { FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';

class EditListScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit list',
    };

    constructor(props) {
        super(props);
        this.state = {title: ''};
    }

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        this.setState({title})
    }

    componentDidUpdate() {
console.log('did update');
    }

    render() {
        const {listId} = this.props.navigation.state.params;
        return (
            <ScrollView>
                <Text></Text>
                <FormLabel>Change list title</FormLabel>
                <FormInput
                    autoCapitalize='none'
                    value={this.state.title}
                    onChangeText={title => this.setState({title})}/>
                {/*<Button onPress={() => this.props.addListAction(this.props.authReducer.user.uid, this.state.listTitle)} title='Add new list'/>*/}
                <View  style={styles.buttonWrapper}>
                    <Button onPress={() => console.log('dasdadas')} icon={{name: 'save'}}
                            title='Save'/>
                    <Button onPress={() => this.props.deleteListAction(this.props.authReducer.user.uid, listId)} color={'red'} icon={{name: 'delete'}}
                            title='Delete list'/>
                </View>
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
            dispatch(getListsRequest({uid: uid}))
        },
        deleteListAction: (uid, listId) => {
            dispatch(deleteListRequest({uid: uid, listId: listId}))
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

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditListScreen)