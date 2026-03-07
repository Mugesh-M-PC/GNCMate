import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';
import { useThemeStore } from '../store/ThemeStore';
import { CalendarRange, CreditCard, Home, LogOut, Table2 } from 'lucide-react-native';

const DrawerContent = ({ navigation, state }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    const getActiveRouteName = () => {
        return state.routeNames[state.index];
    };

    const activeRoute = getActiveRouteName();

    const handleNav = (route, params) => {
        navigation.navigate(route, params);
    };

    const DrawerItem = ({ icon: Icon, label, route, badge, active }) => (
        <TouchableOpacity
            style={[
                styles.drawerItem,
                active && { backgroundColor: colors.brandSoft },
            ]}
            onPress={() => handleNav(route)}
            activeOpacity={0.7}
        >
            <Icon color={active ? colors.brand : colors.text2} size={18} />
            <Text style={[styles.itemText, { color: active ? colors.brand : colors.text2 }]}>{label}</Text>
            {badge && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{badge}</Text>
                </View>
            )}
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container, { backgroundColor: colors.drawerBg }]}>
            <LinearGradient
                colors={[colors.headerGradStart, colors.headerGradEnd]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[styles.headerWrap, { paddingTop: insets.top || 20 }]}
            >
                {/* Decorators */}
                <View style={styles.decoBox1} />
                <View style={styles.decoBox2} />

                <View style={styles.profile}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>SM</Text>
                    </View>
                    <Text style={styles.name}>SUMI M V</Text>
                    <Text style={styles.roll}>Roll No: 2313141044056</Text>
                    <Text style={styles.college}>Guru Nanak College (Autonomous), Chennai</Text>
                </View>
            </LinearGradient>

            <ScrollView style={styles.nav} showsVerticalScrollIndicator={false}>
                <Text style={[styles.sectionLabel, { color: colors.text3 }]}>Main</Text>
                <DrawerItem icon={Home} label="Dashboard" route="MainTabs" active={activeRoute === 'MainTabs'} />

                <Text style={[styles.sectionLabel, { color: colors.text3 }]}>Academic</Text>
                <DrawerItem icon={Table2} label="IA Mark View" route="Marks" active={activeRoute === 'Marks'} />
                <DrawerItem icon={CalendarRange} label="College Almanac" route="Almanac" active={activeRoute === 'Almanac'} />

                <Text style={[styles.sectionLabel, { color: colors.text3 }]}>Finance</Text>
                <DrawerItem icon={CreditCard} label="Fee Details" route="Fee" active={activeRoute === 'Fee'} />

                <Text style={[styles.sectionLabel, { color: colors.text3 }]}>Updates</Text>
            </ScrollView>

            <View style={[styles.footer, { borderTopColor: colors.border, paddingBottom: insets.bottom || 12 }]}>
                <TouchableOpacity style={styles.logoutRow} activeOpacity={0.7}>
                    <LogOut color={colors.red} size={18} />
                    <Text style={[styles.logoutText, { color: colors.red }]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    headerWrap: {
        paddingHorizontal: 22,
        paddingBottom: 24,
        position: 'relative',
        overflow: 'hidden',
    },
    decoBox1: {
        position: 'absolute',
        top: -30,
        right: -30,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    decoBox2: {
        position: 'absolute',
        bottom: -20,
        left: 20,
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.05)',
    },
    profile: { zIndex: 1, marginTop: 10 },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        borderWidth: 2.5,
        borderColor: 'rgba(255,255,255,0.35)',
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
    },
    name: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 3 },
    roll: { color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 0.3 },
    college: { color: 'rgba(255,255,255,0.55)', fontSize: 11, marginTop: 4 },

    nav: { flex: 1, padding: 12 },
    sectionLabel: {
        fontSize: 10,
        fontWeight: 800,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        paddingHorizontal: 10,
        paddingTop: 12,
        paddingBottom: 6,
    },
    drawerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 11,
        paddingHorizontal: 12,
        borderRadius: radius.sm,
        marginBottom: 1,
    },
    itemText: { fontSize: 13.5, fontWeight: '500' },
    badge: {
        marginLeft: 'auto',
        backgroundColor: '#f97316',
        borderRadius: 10,
        paddingVertical: 1,
        paddingHorizontal: 7,
    },
    badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

    footer: { padding: 12, borderTopWidth: 1 },
    logoutRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 11,
        paddingHorizontal: 12,
        borderRadius: radius.sm,
    },
    logoutText: { fontSize: 13.5, fontWeight: 900 },
});

export default DrawerContent;
