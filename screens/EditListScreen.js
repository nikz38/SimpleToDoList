import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button, ActivityIndicator, Picker } from 'react-native';
import { connect } from 'react-redux';
import { deleteListRequest, editListRequest } from '../redux/actions/listActions';
import {
    editListItemRequest,
    deleteListItemRequest,
    resetDeleteListItemProperty
} from '../redux/actions/listItemActions';
import { NavigationActions } from 'react-navigation';
import { FormLabel, FormInput } from 'react-native-elements';
import { ImagePicker } from 'expo';
import { connectActionSheet } from '@expo/react-native-action-sheet';

const cameraLibraryOptions = {
    allowsEditing: true,
    aspect: [1, 1],
    base64: true,
    quality: 0
}

@connectActionSheet
class EditListScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit list',
    };

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

    constructor(props) {
        super(props);
        this.state = {title: '', selectedReducer: '', contacts: null, selectedContact: null, image: null};
    }

    onOpenActionSheet = () => {
        let options = ['Take Photo...', 'Choose from Library', 'Cancel'];
        let cancelButtonIndex = 2;
        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.launchCamera()
                }
                else if (buttonIndex === 1) {
                    this.openLibrary();
                }
            }
        );
    };

    openLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync(cameraLibraryOptions);
        if (!result.cancelled) {
            let sourceBase64 = 'data:image/jpeg;base64,' + result.base64;
            // this.setState({image: result.uri});
            this.addImage(sourceBase64);
            console.log(sourceBase64);
        }
    };

    launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync(cameraLibraryOptions);
        if (!result.cancelled) {
            let sourceBase64 = 'data:image/jpeg;base64,' + result.base64;
            // this.setState({image: result.uri});
            this.addImage(sourceBase64);

            console.log(sourceBase64);
        }
    };

    addImage(image) {
        const {listId, listItemId} = this.props.navigation.state.params;
        this.props.addImageToListItemAction(this.props.authReducer.user.uid, listId, listItemId, image)
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
                {this.state.selectedContact &&
                <Button onPress={() => this.mergeContactWithTitle()} title='Select contact'/>}
            </View>
        )
    }

    mergeContactWithTitle() {
        const {title, selectedContact} = this.state;
        const {listId, listItemId} = this.props.navigation.state.params;
        const newTitle = `${title} for ${selectedContact}`;
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
                </View>
            )
        }
    }

    render() {
        {
            if (this.props.listReducer.isFetching || this.props.listItemReducer.isFetching) {
                return (
                    <View style={[styles.containerLoader, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                )
            } else {
                return (
                    <ScrollView>
                        <Text></Text>
                        <FormLabel>Change title</FormLabel>
                        <FormInput
                            autoCapitalize='none'
                            value={this.state.title}
                            onChangeText={title => this.setState({title})}/>

                        {!this.state.contacts && this.props.navigation.state.params.listItemId &&
                        <Button onPress={() => this.showFirstContactAsync()}
                                title='Add from contacts for who is this item'/>}

                        {this.state.contacts && this.props.navigation.state.params.listItemId &&
                        <Button onPress={() => this.setState({contacts: null})} title='close contacts'/>}

                        {this.props.navigation.state.params.listItemId &&
                        <Button onPress={() => this.onOpenActionSheet()} title='add image'/>}

                        {this.state.contacts && this.renderPicker()}

                        {this.renderButtons()}
                    </ScrollView>
                );
            }

        }

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
        addImageToListItemAction: (uid, listId, listItemId, image) => {
            const updateProps = {image}
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