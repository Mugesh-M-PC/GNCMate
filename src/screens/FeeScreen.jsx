import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import { DownloadIcon } from '../components/Icons';
import { useThemeStore } from '../store/ThemeStore';

const FeeRow = ({ yearBadge, date, amount, isLast = false }) => {
    const { colors } = useThemeStore();

    return (
        <View style={[styles.feeRow, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border2 }]}>
            <View style={[styles.yearBadge, { backgroundColor: colors.brandSoft }]}>
                <Text style={[styles.yearBadgeText, { color: colors.brand }]}>{yearBadge}</Text>
            </View>
            <View style={styles.feeInfo}>
                <Text style={[styles.feeDate, { color: colors.text2 }]}>{date}</Text>
                <Text style={[styles.feeAmt, { color: colors.text }]}>{amount}</Text>
            </View>
            <TouchableOpacity
                style={[styles.dlBtn, { backgroundColor: colors.brandSoft }]}
                activeOpacity={0.7}
            >
                <DownloadIcon color={colors.brand} size={15} />
            </TouchableOpacity>
        </View>
    );
};

const FeeScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="Fee Details" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <LinearGradient
                    colors={[colors.headerGradStart, colors.headerGradEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.feeSummary}
                >
                    <View style={styles.feeDeco} />
                    <Text style={styles.feeLbl}>Total Fees Paid</Text>
                    <Text style={styles.feeAmount}>₹2,15,200</Text>
                    <Text style={styles.feeSub}>3 instalments · All cleared ✓</Text>
                </LinearGradient>

                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>PAYMENT HISTORY</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={styles.section}>
                    <Card>
                        <FeeRow yearBadge="I" date="14 Jun 2023" amount="₹75,200" />
                        <FeeRow yearBadge="II" date="08 Jul 2024" amount="₹70,000" />
                        <FeeRow yearBadge="III" date="18 Jun 2025" amount="₹70,000" isLast={true} />
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollArea: { flex: 1 },
    feeSummary: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: radius.lg,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    feeDeco: {
        position: 'absolute',
        top: -25,
        right: -25,
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    feeLbl: { color: '#fff', fontSize: 11, fontWeight: '600', opacity: 0.75, marginBottom: 6 },
    feeAmount: { color: '#fff', fontSize: 34, fontWeight: '800', lineHeight: 38 },
    feeSub: { color: '#fff', fontSize: 12, opacity: 0.7, marginTop: 4 },

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
    feeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    yearBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yearBadgeText: {
        fontSize: 14,
        fontWeight: '800',
    },
    feeInfo: {
        flex: 1,
    },
    feeDate: {
        fontSize: 11,
    },
    feeAmt: {
        fontSize: 16,
        fontWeight: '700',
    },
    dlBtn: {
        width: 34,
        height: 34,
        borderRadius: radius.sm,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default FeeScreen;
