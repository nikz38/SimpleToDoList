import React from 'react';
import { ScrollView, StyleSheet, View, Button, Text } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux';
import { addListItemRequest, getListItemsRequest, editListItemRequest } from '../redux/actions/listItemActions';
import { FormLabel, FormInput, List, ListItem } from 'react-native-elements';

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
        this.state = {newItem: '', listId: ''};
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
        const {items} = this.props.listItemReducer;
        return Object.keys(items).map((item, index) => {
            return (
                <View style={styles.itemRow} key={index}>
                    <View style={styles.listItem}>
                        <ListItem
                            onLongPress={this.longPressOptions.bind(this, this.state.listId, Object.keys(items)[index], items[item].title)}
                            title={items[item].title}>
                        </ListItem>
                    </View>
                    <Button style={styles.checkButton} onPress={() => this.checkItem(Object.keys(items)[index], items[item].isChecked)} title={items[item].isChecked ? 'uncheck' : 'check'}/>
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

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <FormLabel>Add new item</FormLabel>
                <FormInput
                    autoCapitalize='none'
                    value={this.state.newItem}
                    placeholder='grocery list'
                    onChangeText={newItem => this.setState({newItem})}/>
                <Button onPress={() => this.addNewListItem()} title='Add new list item'/>
                <List style={styles.list}>
                    {this.props.listItemReducer.items && this.renderList()}
                </List>
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const {authReducer, listReducer, listItemReducer} = state;
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
            dispatch(editListItemRequest({uid, listId, listItemId, isChecked}))
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    itemRow: {
        flexDirection: 'row',
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listItem: {
        flex: 1,
    },
    checkButton: {
        flex: 1,
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListItemsScreen)