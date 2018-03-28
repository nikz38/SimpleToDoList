import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Alert, Picker } from 'react-native';
import { connect } from 'react-redux';
import { deleteListRequest, editListRequest, resetDeleteListProperty } from '../redux/actions/listActions';
import {
    editListItemRequest,
    deleteListItemRequest,
    resetDeleteListItemProperty, searchTextRequest
} from '../redux/actions/listItemActions';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';

class EditListScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit list',
    };

    constructor(props) {
        super(props);
        this.state = {title: '', selectedReducer: '', contacts: null, selectedContact: null};

    }

    componentDidMount() {
        const {title} = this.props.navigation.state.params;
        this.setState({title});
        if (this.props.navigation.state.params.listItemId) {
            this.state.selectedReducer = this.props.listItemReducer;
        } else {
            this.state.selectedReducer = this.props.authReducer;
        }
    }

    componentDidUpdate() {
        if (this.props.listItemReducer.deleteListItemSuccess || this.props.listReducer.deleteListSuccess) {
            this.props.navigation.dispatch(NavigationActions.back())
            this.props.resetDeletePropertyAction()
        }
    }

    async showFirstContactAsync() {
        const permission = await Expo.Permissions.askAsync(Expo.Permissions.CONTACTS);
        if (permission.status !== 'granted') {
            return;
        }
        const contacts = await Expo.Contacts.getContactsAsync({
            fields: [
                Expo.Contacts.PHONE_NUMBERS,
            ],
            pageSize: 50,
            pageOffset: 0,
        });
        if (contacts.total > 0) {
            this.setState({contacts})
        }
    }

    renderPicker() {
        return (
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={this.state.selectedContact}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedContact: itemValue})}>
                    {this.state.contacts.data.map((contact, index) => {
                        return <Picker.Item key={index} label={contact.name} value={contact.name}/>
                    })}
                </Picker>
                {this.state.selectedContact && <Button onPress={() => this.mergeContactWithTitle()} title='Add for who is this item list'/>}
            </View>
        )
    }

    mergeContactWithTitle() {
        const {title, selectedContact} = this.state;
        const {listId, listItemId} = this.props.navigation.state.params;
        const newTitle = `${title} for ${selectedContact}`;
        debugger;
        this.props.editListItemAction(this.props.authReducer.user.uid, listId, listItemId, newTitle);
    }

    renderButtons() {
        const {listId, listItemId} = this.props.navigation.state.params;
        if (this.props.navigation.state.params.listItemId) {
            return (
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={() => this.props.editListItemAction(this.props.authReducer.user.uid, listId, listItemId, this.state.title)}
                        icon={{name: 'save'}}
                        title='Save'/>
                    <Button
                        onPress={() => this.props.deleteListItemAction(this.props.authReducer.user.uid, listId, listItemId)}
                        color={'red'} icon={{name: 'delete'}}
                        title='Delete item'/>

                </View>
            )
        } else {
            return (
                <View style={styles.buttonWrapper}>
                    <Button
                        onPress={() => this.props.editListAction(this.props.authReducer.user.uid, listId, this.state.title)}
                        icon={{name: 'save'}}
                        title='Save'/>
                    <Button onPress={() => this.props.deleteListAction(this.props.authReducer.user.uid, listId)}
                            color={'red'} icon={{name: 'delete'}}
                            title='Delete list'/>
                    {/*<Button onPress={() => this.showFirstContactAsync} 'contacts'/>*/}
                </View>
            )
        }
    }

    render() {
        return (
            <ScrollView>
                <Text></Text>
                <FormLabel>Change title</FormLabel>
                <FormInput
                    autoCapitalize='none'
                    value={this.state.title}
                    onChangeText={title => this.setState({title})}/>
                {!this.state.contacts && this.props.navigation.state.params.listItemId &&
                <Button onPress={() => this.showFirstContactAsync()} title='open contacts'/>}
                {this.state.contacts && this.props.navigation.state.params.listItemId &&
                <Button onPress={() => this.setState({contacts: null})} title='close contacts'/>}

                {this.state.contacts && this.renderPicker()}

                {this.renderButtons()}
            </ScrollView>
        );
    }
}

function mapStateToProps(state) {
    const {authReducer, listReducer, listItemReducer} = state;
    console.log(state);
    return {
        authReducer,
        listReducer,
        listItemReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {

        deleteListAction: (uid, listId) => {
            dispatch(deleteListRequest({uid, listId}))
        },
        editListAction: (uid, listId, title) => {
            dispatch(editListRequest({uid, listId, title}))
        },
        deleteListItemAction: (uid, listId, listItemId) => {
            dispatch(deleteListItemRequest({uid, listId, listItemId}))
        },
        editListItemAction: (uid, listId, listItemId, title) => {
            const updateProps = {title}
            dispatch(editListItemRequest({uid, listId, listItemId, updateProps}))
        },
        resetDeletePropertyAction: () => {
            dispatch(resetDeleteListItemProperty())
        }
    }
}

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    pickerWrapper: {
        flex: 1
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditListScreen)