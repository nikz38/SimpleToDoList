import React from 'react';
import { ScrollView, View, Share, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { loginRequest, loginSuccess, logoutRequest, registerRequest } from '../redux/actions/authActions';
import { addListRequest, getListsRequest } from '../redux/actions/listActions';
import { FormLabel, FormInput, List, ListItem, Button } from 'react-native-elements';

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
        return Object.keys(lists).map((list, index) => {
            return (
             <View style={styles.listItem} key={index}>
                <ListItem
                    titleStyle={styles.listText}
                onPress={this.listItemsScreen.bind(this, Object.keys(lists)[index], lists[list].items)}
                onLongPress={this.longPressOptions.bind(this, Object.keys(lists)[index], lists[list].title)}
                title={lists[list].title}></ListItem>
                 <Button
                     buttonStyle={styles.shareButton}
                     onPress={() => this.shareList(lists[list])} title='Share'/>
             </View>
            )
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

    shareList(list) {
        const itemsArray = Object.entries(list.items).map(item => item[1].title);
        const itemsArrayString = itemsArray.toString()
        Share.share({
            message: `List items: ${itemsArrayString}`,
            title: list.title
        })
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
                        <View style={styles.listRow}>

                        {this.props.listReducer.lists && this.renderLists()}
                        </View>
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
            dispatch(getListsRequest({uid: uid}))
        },
        logOutAction: () => {
            dispatch(logoutRequest())
        }
    }
}

const styles = StyleSheet.create({
    listText: {
        flex: 1,
        width: 300
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    shareButton: {
        width: 100
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListScreen)