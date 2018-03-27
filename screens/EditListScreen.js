import React from 'react';
import { ScrollView, StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { deleteListRequest, editListRequest } from '../redux/actions/listActions';
import { editListItemRequest, deleteListItemRequest } from '../redux/actions/listItemActions';
import { FormLabel, FormInput, FormValidationMessage, List, ListItem } from 'react-native-elements';

class EditListScreen extends React.Component {

    static navigationOptions = {
        title: 'Edit list',
    };

    constructor(props) {
        super(props);
        this.state = {title: '', selectedReducer: ''};
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
console.log('did update');
    }

    renderButtons() {
        const {listId, listItemId} = this.props.navigation.state.params;
        if (this.props.navigation.state.params.listItemId) {
            return (
                <View  style={styles.buttonWrapper}>
                    <Button onPress={() => this.props.editListItemAction(this.props.authReducer.user.uid, listId, listItemId, this.state.title)} icon={{name: 'save'}}
                            title='Save'/>
                    <Button onPress={() => this.props.deleteListItemAction(this.props.authReducer.user.uid, listId, listItemId)} color={'red'} icon={{name: 'delete'}}
                            title='Delete item'/>
                </View>
            )
        } else {
            return (
                <View  style={styles.buttonWrapper}>
                    <Button onPress={() => this.props.editListAction(this.props.authReducer.user.uid, listId, this.state.title)} icon={{name: 'save'}}
                            title='Save'/>
                    <Button onPress={() => this.props.deleteListAction(this.props.authReducer.user.uid, listId)} color={'red'} icon={{name: 'delete'}}
                            title='Delete list'/>
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
            dispatch(editListItemRequest({uid, listId, listItemId, title}))
        }
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