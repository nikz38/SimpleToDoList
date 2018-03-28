import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addListItemRequest, getListItemsRequest, editListItemRequest, searchTextRequest } from '../redux/actions/listItemActions';
import { FormLabel, FormInput, List, ListItem, Button } from 'react-native-elements';

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

    // componentDidMount() {
    //     this.props.getListsAction(this.props.authReducer.user.uid)
    //
    // }

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
        filteredObjectToArray.map(([key, val]) => ([key, val])).reduce((obj, [k, v]) => Object.assign(filteredObject, { [k]: v }), {})

        return Object.keys(filteredObject).map((item, index) => {
            return (
                <View style={styles.itemRow} key={index}>
                    <View style={styles.listItem}>
                        <ListItem
                            hideChevron={true}
                            titleStyle={this.itemStyle(filteredObject[item].isChecked)}
                            onLongPress={this.longPressOptions.bind(this, this.state.listId, Object.keys(filteredObject)[index], filteredObject[item].title)}
                            title={filteredObject[item].title}>
                        </ListItem>
                    </View>
                    <Button buttonStyle={styles.checkButton}
                            onPress={() => this.checkItem(Object.keys(filteredObject)[index], filteredObject[item].isChecked)}
                            title={filteredObject[item].isChecked ? 'uncheck' : 'check'}/>
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
        }
    }

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <FormLabel>Add new item</FormLabel>
                <View style={styles.formWrapper}>
                    <View style={styles.form}>
                    <FormInput
                        autoCapitalize='none'
                        value={this.state.newItem}
                        placeholder='grocery list'
                        onChangeText={newItem => this.setState({newItem})}/>
                    </View>
                    <Button style={styles.addButton} onPress={() => this.addNewListItem()} title='Add'/>
                    <View style={styles.form}>
                    <FormInput
                        autoCapitalize='none'
                        value={this.props.listItemReducer.searchText}
                        onChangeText={searchText => this.props.searchTextAction(searchText)}/>
                    </View>
                    {/*<Button style={styles.addButton} onPress={() => this.filterItems()} title='filter'/>*/}
                </View>
                <List style={styles.list}>
                    {this.props.listItemReducer.items && this.renderList()}
                </List>
            </ScrollView>
        );
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
    formWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 1,
    },
    form: {
        flex: 1,
    },
    addButton: {
        flex: 1,
        width: 100
    },
    itemRow: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: '#f0f0f5'
    },
    list: {
        flex: 1,
    },
    listItem: {
        flex: 1,
        justifyContent: 'space-between',
    },
    checkButton: {
        width: 100
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItemsScreen)