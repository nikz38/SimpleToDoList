import React from 'react';
import { ScrollView, View, Button } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, logoutRequest, registerRequest } from '../redux/actions/authActions';
import { addListRequest, getListsRequest } from '../redux/actions/listActions';
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements';

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
        this.listItemsScreen = this.listItemsScreen.bind(this);

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
            return <ListItem
                key={index}
                onPress={this.listItemsScreen.bind(this,Object.keys(lists)[index], lists[list].items)}
                onLongPress={this.longPressOptions.bind(this,Object.keys(lists)[index], lists[list].title)}
                title={lists[list].title}></ListItem>
        })
    }

    longPressOptions(listId, title) {
        this.props.navigation.navigate('EditList', {listId, title});
    }

    listItemsScreen(listId, items) {
        this.props.navigation.navigate('ListItems', {listId, items});
    }

    addNewList() {
        this.props.addListAction(this.props.authReducer.user.uid, this.state.listTitle)
        this.setState({listTitle: ''})
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
                <Button onPress={() => this.addNewList()} title='Add new list'/>
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
        logOutAction: () => {
            dispatch(logoutRequest())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListScreen)