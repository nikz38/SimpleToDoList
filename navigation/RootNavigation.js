import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import LoginScreen from '../screens/LoginScreen';
import ListScreen from '../screens/ListScreen';
import EditListScreen from "../screens/EditListScreen";
import ListItemsScreen from "../screens/ListItemsScreen";


const RootStackNavigator = StackNavigator(
    {
        Login: {
            screen: LoginScreen
        },
        List: {
            screen: ListScreen
        },
        ListItems: {
            screen: ListItemsScreen
        },
        EditList: {
          screen: EditListScreen
        }

    },
    {
        navigationOptions: () => ({
            headerTitleStyle: {
                fontWeight: 'normal',
            },
        }),
    }
);

export default class RootNavigator extends React.Component {
    componentDidMount() {
        this._notificationSubscription = this._registerForPushNotifications();
    }

    componentWillUnmount() {
        this._notificationSubscription && this._notificationSubscription.remove();
    }

    render() {
        return <RootStackNavigator/>;
    }

    _registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = ({origin, data}) => {
        console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
    };
}
