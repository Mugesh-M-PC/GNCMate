import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { iconSize, radius } from '../theme';
import { HamburgerIcon, BellIcon, SunIcon, MoonIcon } from './Icons';
import { useThemeStore } from '../store/ThemeStore';
import { Bell, Menu, Moon, Sun } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title = 'Dashboard', onMenuPress, }) => {
    const { colors, isDark, toggleTheme } = useThemeStore();
    const navigation = useNavigation();

    return (
        <View style={[styles.topbar, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
            <View style={styles.left}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: colors.surface2, borderColor: colors.border }]}
                    onPress={onMenuPress}
                    activeOpacity={0.7}
                >
                    <Menu color={colors.text2} size={iconSize.medium} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            </View>

            <View style={styles.right}>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: colors.surface2, borderColor: colors.border }]}
                    onPress={() => navigation.navigate('Alerts')}
                    activeOpacity={0.7}
                >
                    <Bell color={colors.text2} size={17} />
                    <View style={[styles.notifDot, { borderColor: colors.surface }]} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.btn, { backgroundColor: colors.surface2, borderColor: colors.border }]}
                    onPress={toggleTheme}
                    activeOpacity={0.7}
                >
                    {isDark ? (
                        <Sun color={colors.text2} size={17} />
                    ) : (
                        <Moon color={colors.text2} size={17} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    topbar: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        zIndex: 30,
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: -0.3,
    },
    right: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    btn: {
        width: 38,
        height: 38,
        borderRadius: radius.sm,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notifDot: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 10,
        height: 10,
        backgroundColor: '#f97316',
        borderRadius: 50,
        borderWidth: 1.5,
    },
});

export default Header;
