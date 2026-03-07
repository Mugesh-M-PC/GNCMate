import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import { useThemeStore } from '../store/ThemeStore';

const AlmanacScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();
    const [selectedMonth, setSelectedMonth] = useState('jul23');

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Data mirroring the HTML algorithm
    const almanacData = [
        { d: 1, w: 'Sat', o: null }, { d: 2, w: 'Sun', o: null }, { d: 3, w: 'Mon', o: 4 }, { d: 4, w: 'Tue', o: 5 },
        { d: 5, w: 'Wed', o: 6 }, { d: 6, w: 'Thu', o: 1 }, { d: 7, w: 'Fri', o: 2 },
        { d: 8, w: 'Sat', o: null }, { d: 9, w: 'Sun', o: null }, { d: 10, w: 'Mon', o: 3 }, { d: 11, w: 'Tue', o: 4 },
        { d: 12, w: 'Wed', o: 5 }, { d: 13, w: 'Thu', o: 6 }, { d: 14, w: 'Fri', o: 1 },
        { d: 15, w: 'Sat', o: null }, { d: 16, w: 'Sun', o: null }, { d: 17, w: 'Mon', o: 2 }, { d: 18, w: 'Tue', o: 3 },
        { d: 19, w: 'Wed', o: 4 }, { d: 20, w: 'Thu', o: 5 }, { d: 21, w: 'Fri', o: 6 },
        { d: 22, w: 'Sat', o: null }, { d: 23, w: 'Sun', o: null }, { d: 24, w: 'Mon', o: 1 }, { d: 25, w: 'Tue', o: 2 },
        { d: 26, w: 'Wed', o: 3 }, { d: 27, w: 'Thu', o: 4 }, { d: 28, w: 'Fri', o: 5 },
        { d: 29, w: 'Sat', o: null }, { d: 30, w: 'Sun', o: null }, { d: 31, w: 'Mon', o: 6 },
    ];

    // Prepend empty cells since July 2023 started on a Saturday (index 6, implying 6 empty cells)
    const renderCell = (cell, index) => {
        if (!cell) {
            return <View key={`empty-${index}`} style={styles.calCell} />;
        }

        const isWeekend = cell.w === 'Sat' || cell.w === 'Sun';

        return (
            <View key={cell.d} style={[styles.calCell, isWeekend && styles.calCellWeekend]}>
                <Text style={[styles.cellDate, { color: isWeekend ? colors.text3 : colors.text }]}>{cell.d}</Text>
                {!isWeekend && cell.o && (
                    <Text style={[styles.cellOrder, { color: colors.text3 }]}>D{cell.o}</Text>
                )}
            </View>
        );
    };

    const gridCells = [null, null, null, null, null, null, ...almanacData];

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="College Almanac" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>COLLEGE ALMANAC</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={styles.section}>
                    <Card style={{ padding: 14 }}>
                        <View style={styles.monthTabs}>
                            <TouchableOpacity
                                style={[styles.monthTab, selectedMonth === 'jul23' && { backgroundColor: colors.surface2, borderColor: colors.border }]}
                                onPress={() => setSelectedMonth('jul23')}
                            >
                                <Text style={[styles.monthTabText, { color: selectedMonth === 'jul23' ? colors.text : colors.text2 }]}>July 2023</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.monthTab, selectedMonth === 'aug23' && { backgroundColor: colors.surface2, borderColor: colors.border }]}
                                onPress={() => setSelectedMonth('aug23')}
                            >
                                <Text style={[styles.monthTabText, { color: selectedMonth === 'aug23' ? colors.text : colors.text2 }]}>August 2023</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>

                <View style={styles.section}>
                    <Card>
                        <View style={styles.calHeader}>
                            {days.map(d => (
                                <Text key={d} style={[styles.calHeaderDay, { color: colors.text3 }]}>{d}</Text>
                            ))}
                        </View>
                        <View style={styles.calGrid}>
                            {gridCells.map((cell, index) => renderCell(cell, index))}
                        </View>
                    </Card>
                </View>

                {/* Legend */}
                <View style={styles.section}>
                    <Card style={styles.legendCard}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.legendText, { color: colors.text2 }]}>Today / Active</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: colors.bg2 }]} />
                            <Text style={[styles.legendText, { color: colors.text2 }]}>Weekend</Text>
                        </View>
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
        paddingBottom: 10,
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
    calHeader: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        paddingTop: 10,
        paddingBottom: 4,
    },
    calHeaderDay: {
        flex: 1,
        textAlign: 'center',
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    calGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 8,
        paddingBottom: 12,
    },
    calCell: {
        width: '14.28%', // 100/7
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    calCellWeekend: {
        // We handle text color via props, but can add styles here
    },
    cellDate: {
        fontSize: 12.5,
        fontWeight: '500',
    },
    cellOrder: {
        fontSize: 8,
        marginTop: 1,
    },
    legendCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 12,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendBox: {
        width: 14,
        height: 14,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 11,
    },
});

export default AlmanacScreen;
