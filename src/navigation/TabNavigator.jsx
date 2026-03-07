import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme, radius, spacing, fontWeight, iconSize } from '../theme';
import { HomeIcon, BookOpenIcon, ClockIcon, BellIcon } from '../components/Icons';

import HomeScreen from '../screens/HomeScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import ExamsScreen from '../screens/ExamsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import Ionicons from '@react-native-vector-icons/ionicons';
import { CalendarDays, ClipboardPenLine, House, Megaphone } from 'lucide-react-native';
import { useThemeStore } from '../store/ThemeStore';

const Tab = createBottomTabNavigator();

const tabs = [
    {
        name: 'Dashboard',
        component: HomeScreen,
        label: 'Home',
        icon: House,
    },
    {
        name: 'Attendance',
        component: AttendanceScreen,
        label: 'Attendance',
        icon: CalendarDays,
    },
    {
        name: 'Exams',
        component: ExamsScreen,
        label: 'Exams',
        icon: ClipboardPenLine,
    },
    // {
    //     name: 'Alerts',
    //     component: NotificationsScreen,
    //     label: 'Alerts',
    //     icon: Megaphone,
    //     badge: 5,
    // },
];

const TabNavigator = () => {
    const { colors, isDark } = useThemeStore();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    height: 72,
                    borderTopWidth: 1,
                    elevation: 0,
                    paddingTop: 10,
                    paddingBottom: 10,
                    backgroundColor: isDark ? 'rgba(22,27,46,0.95)' : 'rgba(255,255,255,0.92)',
                    borderTopColor: colors.border
                },
                tabBarShowLabel: false,
            })}
        >
            {tabs.map((tab) => (
                <Tab.Screen
                    key={tab.name}
                    name={tab.name}
                    component={tab.component}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <TabItem
                                focused={focused}
                                icon={tab.icon}
                                label={tab.label}
                                colors={colors}
                                badge={tab.badge}
                            />
                        ),
                    }}
                />
            ))}
        </Tab.Navigator>
    );
};

const TabItem = ({ focused, icon: Icon, label, colors, badge }) => {
    return (
        <View style={styles.tabItem}>
            <View style={[styles.tabIcon, focused && { backgroundColor: colors.gncBlue }]}>
                <Icon
                    size={focused ? iconSize.medium : 20}
                    color={focused ? colors.primary : colors.text3}
                />
            </View>
            <Text style={[styles.tabLabel, focused ? { color: colors.primary, fontWeight: fontWeight.extraBold } : { color: colors.text3, fontWeight: fontWeight.semiBold, }]}>
                {label}
            </Text>
            {badge && (
                <View style={[styles.badge, { backgroundColor: '#f97316', borderColor: colors.surface }]}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    tabBarStyle: {

    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        // gap: 2,
        paddingVertical: 8,
        position: 'relative',
        width: 60,
    },
    tabIcon: {
        width: 40,
        height: 32,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: 10,
        letterSpacing: 0.2,
    },
    badge: {
        position: 'absolute',
        top: 6,
        right: 4,
        minWidth: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 9,
        fontWeight: '700',
    },
});

export default TabNavigator;
