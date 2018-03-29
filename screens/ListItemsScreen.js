import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import {
    addListItemRequest,
    getListItemsRequest,
    editListItemRequest,
    searchTextRequest
} from '../redux/actions/listItemActions';
import { FormInput, List, ListItem, Button } from 'react-native-elements';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'Login'})
    ]
});

class ListItemsScreen extends React.Component {
    static navigationOptions = {
        title: 'List Items',
    };

    constructor(props) {
        super(props);
        this.state = {newItem: '', listId: '', searchText: ''};
        this.itemStyle = this.itemStyle.bind(this)
    }

    componentDidMount() {
        const {listId} = this.props.navigation.state.params;
        this.setState({listId})
        this.props.getListItemsAction(this.props.authReducer.user.uid, listId)
    }

    componentDidUpdate() {
        if (!this.props.authReducer.user) {
            this.props.navigation.dispatch(resetAction);
        }
    }

    renderList() {
        const {items, searchText} = this.props.listItemReducer;
        let filteredObject = {}
        const filteredObjectToArray = Object.entries(items).filter((item) => item[1].title.startsWith(searchText));
        console.log(filteredObjectToArray);

        filteredObjectToArray.map(([key, val]) => ([key, val])).reduce((obj, [k, v]) => Object.assign(filteredObject, {[k]: v}), {})

        return Object.keys(filteredObject).map((item, index) => {
            return (
                <View style={styles.itemRow} key={index}>
                    <View style={styles.listItemWrapper}>
                        {filteredObject[item].image ?
                            <ListItem
                                roundAvatar
                                avatar={{uri: filteredObject[item].image}}
                                hideChevron={true}
                                titleContainerStyle={styles.listItemText}
                                containerStyle={styles.listItem}
                                titleStyle={this.itemStyle(filteredObject[item].isChecked)}
                                title={filteredObject[item].title}>
                            </ListItem>
                            :
                            <ListItem
                                hideChevron={true}
                                titleContainerStyle={styles.listItemText}
                                containerStyle={styles.listItem}
                                titleStyle={this.itemStyle(filteredObject[item].isChecked)}
                                title={filteredObject[item].title}>
                            </ListItem>
                        }

                    </View>
                    <Button buttonStyle={styles.checkButton}
                            textStyle={styles.checkButtonText}
                            onPress={() => this.checkItem(Object.keys(filteredObject)[index], filteredObject[item].isChecked)}
                            title={filteredObject[item].isChecked ? 'uncheck' : 'check'}/>
                    <Button buttonStyle={styles.checkButton}
                            textStyle={styles.checkButtonText}
                            onPress={this.longPressOptions.bind(this, this.state.listId, Object.keys(filteredObject)[index], filteredObject[item].title)}
                            title='edit'/>
                </View>
            )
        })
    }

    checkItem(listItemId, isChecked) {
        this.props.editListItemAction(this.props.authReducer.user.uid, this.state.listId, listItemId, !isChecked)
    }

    longPressOptions(listId, listItemId, title) {
        this.props.navigation.navigate('EditList', {listId, listItemId, title});
    }

    addNewListItem() {
        this.props.addListItemAction(this.props.authReducer.user.uid, this.state.listId, this.state.newItem)
        this.setState({newItem: ''})
    }

    itemStyle(isChecked) {
        if (isChecked) {
            return {
                // backgroundColor: 'grey',
                textDecorationLine: 'line-through',
                textDecorationStyle: "solid",
                textDecorationColor: "#000",
            }
        } else {

        }
    }

    render() {
        {
            if (this.props.listItemReducer.isFetching) {
                return (
                    <View style={[styles.containerLoader, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
            } else {
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.addListWrapper}>
                    <View style={styles.formWrapper}>
                        <FormInput
                            inputStyle={styles.formInput}
                            containerStyle={styles.form}
                            autoCapitalize='none'
                            value={this.state.newItem}
                            placeholder='add new item to the list'
                            onChangeText={newItem => this.setState({newItem})}/>
                    </View>
                    <Button disabled={!this.state.newItem} buttonStyle={styles.addButton}
                            onPress={() => this.addNewListItem()} title='Add'/>
                </View>
                <View style={styles.form}>
                    <FormInput
                        containerStyle={styles.filterStyle}
                        autoCapitalize='none'
                        placeholder='filter list'
                        value={this.props.listItemReducer.searchText}
                        onChangeText={searchText => this.props.searchTextAction(searchText)}/>
                </View>

                <List containerStyle={styles.list}>
                    {this.props.listItemReducer.items && this.renderList()}
                </List>
            </ScrollView>
        );
            }

        }

    }
}

function mapStateToProps(state) {
    const {authReducer, listReducer, listItemReducer} = state;
    console.log(listItemReducer)
    return {
        authReducer,
        listReducer,
        listItemReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addListItemAction: (uid, listId, title) => {
            dispatch(addListItemRequest({uid, listId, title}))
        },
        getListItemsAction: (uid, listId) => {
            dispatch(getListItemsRequest({uid, listId}))
        },
        editListItemAction: (uid, listId, listItemId, isChecked) => {
            const updateProps = {isChecked}
            dispatch(editListItemRequest({uid, listId, listItemId, updateProps}))
        },
        searchTextAction: (text) => {
            dispatch(searchTextRequest({text}))
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    addListWrapper: {
        flexDirection: 'row',
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
    formWrapper: {
        marginTop: 20,
        flex: 1,
    },
    addButton: {
        marginTop: 14,
        backgroundColor: '#51a5e3'
    },

    filterStyle: {
        marginTop: 15,
        marginBottom: 15
    },

    list: {
        flex: 1,
        marginTop: 10,
        borderTopWidth: 0
    },

    listItemWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    listItem: {
        marginLeft: 17,
        flex: 1,
        width: 500
    },
    listItemText: {
        height: 20,
        marginTop: 10
    },
    form: {
        flex: 1,
    },

    itemRow: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f0f0f5'
    },
    checkButton: {
        marginTop: 5,
        width: 80,
        backgroundColor: '#8ac24a'
    },
    checkButtonText: {
        fontSize: 12
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItemsScreen)