import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import { TrendingDownIcon, ClockIcon, CreditCardIcon, ArchiveIcon } from '../components/Icons';
import { useThemeStore } from '../store/ThemeStore';

const NotifItem = ({ title, sub, icon: Icon, type, unread = false, isLast = false }) => {
    const { colors } = useThemeStore();

    let accentColor, softColor;
    switch (type) {
        case 'brand':
            accentColor = colors.brand;
            softColor = colors.brandSoft;
            break;
        case 'green':
            accentColor = colors.green;
            softColor = colors.greenSoft;
            break;
        case 'amber':
            accentColor = colors.amber;
            softColor = colors.amberSoft;
            break;
        case 'purple':
            accentColor = colors.brand2;
            softColor = 'rgba(124,92,252,0.1)';
            break;
        default:
            accentColor = colors.brand;
            softColor = colors.brandSoft;
    }

    return (
        <View style={[styles.notifItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border2 }]}>
            <View style={[styles.iconWrap, { backgroundColor: softColor }]}>
                <Icon color={accentColor} size={16} />
            </View>
            <View style={styles.content}>
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                <Text style={[styles.sub, { color: colors.text2 }]}>{sub}</Text>
            </View>
            {unread && <View style={[styles.unreadDot, { backgroundColor: colors.brand }]} />}
        </View>
    );
};

const NotificationsScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="Notifications" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>NOTIFICATIONS</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={styles.section}>
                    <Card>
                        <NotifItem
                            title="Attendance at 78.37% — Below the 80% minimum threshold"
                            sub="Attendance update · Today"
                            icon={TrendingDownIcon}
                            type="amber"
                            unread={true}
                        />
                        <NotifItem
                            title="Mid Semester Exam scheduled for Feb 2–5, 2026"
                            sub="Academic · Exam schedule"
                            icon={ClockIcon}
                            type="brand"
                            unread={true}
                        />
                        <NotifItem
                            title="Model Examination has been scheduled"
                            sub="Academic"
                            icon={ClockIcon}
                            type="purple"
                            unread={true}
                        />
                        <NotifItem
                            title="Last fee payment: ₹70,000 on 18-06-2025"
                            sub="Finance · Year III payment"
                            icon={CreditCardIcon}
                            type="green"
                        />
                        <NotifItem
                            title="Hall Ticket available for download"
                            sub="Examinations"
                            icon={ArchiveIcon}
                            type="amber"
                            isLast={true}
                        />
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollArea: { flex: 1 },
    groupLabelWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    groupLabel: {
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1.2,
    },
    groupLabelLine: {
        flex: 1,
        height: 1,
    },
    section: {
        paddingHorizontal: 16,
    },
    notifItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 12,
        position: 'relative',
    },
    iconWrap: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        paddingRight: 10, // make room for unread dot
    },
    title: {
        fontSize: 13,
        fontWeight: '600',
        marginBottom: 3,
        lineHeight: 18,
    },
    sub: {
        fontSize: 11,
    },
    unreadDot: {
        position: 'absolute',
        right: 16,
        top: '50%',
        marginTop: -3.5,
        width: 7,
        height: 7,
        borderRadius: 3.5,
    },
});

export default NotificationsScreen;
