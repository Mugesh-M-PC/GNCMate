import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DrawerContent from './DrawerContent';
import TabNavigator from './TabNavigator';

import MarksScreen from '../screens/MarksScreen';
import FeeScreen from '../screens/FeeScreen';
import AlmanacScreen from '../screens/AlmanacScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: 290,
                },
            }}
        >
            <Drawer.Screen name="MainTabs" component={TabNavigator} />
            <Drawer.Screen name="Alerts" component={NotificationsScreen} />
            <Drawer.Screen name="Marks" component={MarksScreen} />
            <Drawer.Screen name="Fee" component={FeeScreen} />
            <Drawer.Screen name="Almanac" component={AlmanacScreen} />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
