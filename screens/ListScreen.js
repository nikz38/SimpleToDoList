import React from 'react';
import { ScrollView, View, Share, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { logoutRequest } from '../redux/actions/authActions';
import { addListRequest, getListsRequest } from '../redux/actions/listActions';
import { FormInput, List, ListItem, Button } from 'react-native-elements';


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
                <View style={styles.listItemWrapper} key={index}>
                    <ListItem
                        hideChevron={true}
                        titleContainerStyle={styles.listItemText}
                        containerStyle={styles.listItem}
                        onPress={this.listItemsScreen.bind(this, Object.keys(lists)[index], lists[list].items)}
                        title={lists[list].title}></ListItem>
                    <Button
                        buttonStyle={styles.shareButton}
                        textStyle={styles.buttonTextStyle}
                        onPress={() => this.shareList(lists[list])} title='Share'/>
                    <Button
                        buttonStyle={styles.shareButton}
                        textStyle={styles.buttonTextStyle}
                        onPress={this.longPressOptions.bind(this, Object.keys(lists)[index], lists[list].title)} title='Edit'/>
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
        {
            if (this.props.listReducer.isFetching) {
                return (
                    <View style={[styles.containerLoader, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
            } else {
                return (
                    <ScrollView style={styles.container}>
                        <View style={styles.addListWrapper}>
                            <View style={styles.formWrapper}>
                                <FormInput
                                    inputStyle={styles.formInput}
                                    containerStyle={styles.form}
                                    autoCapitalize='none'
                                    value={this.state.listTitle}
                                    placeholder='add new list'
                                    onChangeText={listTitle => this.setState({listTitle})}/>
                            </View>
                            <Button disabled={!this.state.listTitle} buttonStyle={styles.addButton}
                                    onPress={() => this.addNewList()} title='Add new list'/>
                        </View>
                        <List containerStyle={styles.list}>
                            <View style={styles.listRow}>
                                {this.props.listReducer.lists && this.renderLists()}
                            </View>
                        </List>
                        <View>
                            {this.props.authReducer.user &&
                            <Button buttonStyle={styles.logoutButton} onPress={() => this.props.logOutAction()}
                                    title='Logout'/>}
                        </View>
                    </ScrollView>
                );
            }

        }

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
    container: {
        backgroundColor: '#fff'
    },
    containerLoader: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    addListWrapper: {
        flexDirection: 'row',
    },
    formWrapper: {
        marginTop: 20,
        flex: 1,
    },
    form: {},
    formInput: {},
    addButton: {
        marginTop: 14,
        backgroundColor: '#51a5e3'
    },
    list: {
        flex: 1,
        marginTop: 50,
        marginBottom: 50,
        borderTopWidth: 0
    },
    listItemText: {
        marginTop: 15

    },
    listRow: {
        flex: 1,
    },
    listItemWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    listItem: {
        marginLeft: 17,
        flex: 1
    },
    shareButton: {
        flex: 1,
        marginTop: 14,
        width: 70,
        backgroundColor: '#8ac24a'
    },
    logoutButton: {
        backgroundColor: '#ff5723'
    },
    buttonTextStyle: {
        fontSize: 12
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListScreen)