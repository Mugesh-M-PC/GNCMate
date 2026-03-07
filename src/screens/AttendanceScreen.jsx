import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import SubjectAttendanceItem from '../components/SubjectAttendanceItem';
import { useThemeStore } from '../store/ThemeStore';

const dayData = {
    jan: [
        { date: '02-01-2026', p: ['A', 'A', 'A', 'A', 'A'] },
        { date: '03-01-2026', p: ['P', 'P', 'P', 'P', 'P'] },
        { date: '05-01-2026', p: ['P', 'P', 'P', 'P', 'P'] },
        { date: '06-01-2026', p: ['P', 'P', 'P', 'P', 'P'] },
        { date: '07-01-2026', p: ['P', 'P', 'A', 'A', 'A'] },
        { date: '08-01-2026', p: ['P', 'P', 'P', 'P', 'P'] },
        { date: '09-01-2026', p: ['P', 'P', 'P', 'P', 'P'] },
    ],
    dec: [
        { date: '01-12-2025', p: ['P', 'P', 'P', 'P', 'P'] },
        { date: '02-12-2025', p: ['P', 'P', 'A', 'A', 'P'] },
    ]
};

const AttendanceScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();
    const [selectedMonth, setSelectedMonth] = useState('jan');

    const getAttBadgeColor = (val) => {
        if (val === 'P') return { bg: colors.greenSoft, text: colors.green };
        return { bg: colors.redSoft, text: colors.red };
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="Attendance" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Subject Wise */}
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>SUBJECT WISE ATTENDANCE</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>
                <View style={styles.section}>
                    <Card>
                        <SubjectAttendanceItem
                            subject="PHP Programming - Practical"
                            percentage={81.54}
                            meta={{ present: 53, od: 0, absent: 12, total: 65 }}
                        />
                        <SubjectAttendanceItem
                            subject="Project"
                            percentage={77.97}
                            meta={{ present: 44, od: 2, absent: 13, total: 59 }}
                        />
                        <SubjectAttendanceItem
                            subject="Human Resource Management"
                            percentage={80}
                            meta={{ present: 50, od: 2, absent: 13, total: 65 }}
                        />
                        <SubjectAttendanceItem
                            subject="PHP Programming"
                            percentage={75.38}
                            meta={{ present: 46, od: 3, absent: 16, total: 65 }}
                        />
                        <SubjectAttendanceItem
                            subject="Elements of Cost Accounting"
                            percentage={76.92}
                            meta={{ present: 48, od: 2, absent: 15, total: 65 }}
                            isLast={true}
                        />
                    </Card>
                </View>

                {/* Day Wise */}
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>DAY WISE ATTENDANCE</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>
                <View style={styles.section}>
                    <Card>
                        <View style={[styles.selectWrapper, { borderBottomColor: colors.border }]}>
                            {/* Simple custom select using a row of buttons for demonstration since standard React NativePicker requires adding a package. */}
                            <View style={styles.monthTabs}>
                                <TouchableOpacity
                                    style={[styles.monthTab, selectedMonth === 'jan' && { backgroundColor: colors.surface2, borderColor: colors.border }]}
                                    onPress={() => setSelectedMonth('jan')}
                                >
                                    <Text style={[styles.monthTabText, { color: selectedMonth === 'jan' ? colors.text : colors.text2 }]}>January 2026</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.monthTab, selectedMonth === 'dec' && { backgroundColor: colors.surface2, borderColor: colors.border }]}
                                    onPress={() => setSelectedMonth('dec')}
                                >
                                    <Text style={[styles.monthTabText, { color: selectedMonth === 'dec' ? colors.text : colors.text2 }]}>December 2025</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.table}>
                                {/* Header Row */}
                                <View style={[styles.tableHeader, { backgroundColor: colors.surface2, borderBottomColor: colors.border }]}>
                                    <Text style={[styles.th, styles.thFirst, { color: colors.text3 }]}>DATE</Text>
                                    {['P1', 'P2', 'P3', 'P4', 'P5'].map(p => (
                                        <Text key={p} style={[styles.th, { color: colors.text3 }]}>{p}</Text>
                                    ))}
                                </View>
                                {/* Body Rows */}
                                {(dayData[selectedMonth] || []).map((row, i) => (
                                    <View key={i} style={[styles.tableRow, { borderBottomColor: colors.border2 }]}>
                                        <Text style={[styles.tdDate, { color: colors.text }]}>{row.date}</Text>
                                        {row.p.map((val, idx) => {
                                            const badgeColors = getAttBadgeColor(val);
                                            return (
                                                <View key={idx} style={styles.tdCenter}>
                                                    <View style={[styles.attBadge, { backgroundColor: badgeColors.bg }]}>
                                                        <Text style={[styles.attBadgeText, { color: badgeColors.text }]}>{val}</Text>
                                                    </View>
                                                </View>
                                            )
                                        })}
                                    </View>
                                ))}
                            </View>
                        </ScrollView>
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
    selectWrapper: {
        padding: 14,
        borderBottomWidth: 1,
    },
    monthTabs: {
        flexDirection: 'row',
        gap: 8,
    },
    monthTab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: radius.sm,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    monthTabText: {
        fontSize: 13,
        fontWeight: '600',
    },
    table: {
        minWidth: 320,
        paddingBottom: 10,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 10,
    },
    th: {
        flex: 1,
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    thFirst: {
        flex: 2,
        textAlign: 'left',
        paddingLeft: 16,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        paddingVertical: 11,
        alignItems: 'center',
    },
    tdDate: {
        flex: 2,
        paddingLeft: 16,
        fontSize: 12.5,
        fontWeight: '600',
    },
    tdCenter: {
        flex: 1,
        alignItems: 'center',
    },
    attBadge: {
        width: 24,
        height: 24,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    attBadgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
});

export default AttendanceScreen;
