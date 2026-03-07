import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, spacing, fontSize, fontWeight } from '../theme';
import { Table, Row, Rows } from 'react-native-table-component';
import dayjs from 'dayjs';

import Header from '../components/Header';
import Card from '../components/Card';
import SubjectAttendanceItem from '../components/SubjectAttendanceItem';
import { useThemeStore } from '../store/ThemeStore';
import { Calendar, ChevronDown, Check } from 'lucide-react-native';

const AttendanceScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isPickerVisible, setIsPickerVisible] = useState(false);

    // Generate months from June 2023 to current month
    const availableMonths = useMemo(() => {
        const start = dayjs('2023-06-01');
        const end = dayjs();
        const months = [];
        let current = end;

        while (current.isAfter(start) || current.isSame(start, 'month')) {
            months.push(current);
            current = current.subtract(1, 'month');
        }
        return months;
    }, []);

    // Simulated data generator for the table
    const generateTableData = (date) => {
        const daysInMonth = date.daysInMonth();
        const data = [];
        const monthStr = date.format('MMM').toUpperCase();

        for (let i = 1; i <= daysInMonth; i++) {
            const currentDay = date.date(i);
            const isSunday = currentDay.day() === 0;
            const day = i < 10 ? `0${i}` : i;

            if (isSunday) {
                data.push([`${day} ${monthStr}`, '-', '-', '-', '-', '-']);
            } else {
                data.push([
                    `${day} ${monthStr}`,
                    Math.random() > 0.1 ? 'P' : 'A',
                    Math.random() > 0.1 ? 'P' : 'A',
                    Math.random() > 0.1 ? 'P' : 'A',
                    Math.random() > 0.1 ? 'P' : 'A',
                    Math.random() > 0.1 ? 'P' : 'A',
                ]);
            }
        }
        return data;
    };

    const tableHead = ['DATE', 'P1', 'P2', 'P3', 'P4', 'P5'];
    const tableData = useMemo(() => generateTableData(selectedDate), [selectedDate]);

    const renderAttendanceCell = (val) => {
        if (val.length > 2) return <Text style={[styles.tdDate, { color: colors.text }]}>{val}</Text>;
        
        const isPresent = val === 'P';
        const isAbsent = val === 'A';
        const isNeutral = val === '-';

        let bgColor = colors.surface2;
        let textColor = colors.text3;

        if (isPresent) {
            bgColor = colors.greenSoft;
            textColor = colors.green;
        } else if (isAbsent) {
            bgColor = colors.redSoft;
            textColor = colors.red;
        }

        return (
            <View style={styles.tdCenter}>
                <View style={[
                    styles.attBadge, 
                    { backgroundColor: bgColor }
                ]}>
                    <Text style={[
                        styles.attBadgeText, 
                        { color: textColor }
                    ]}>{val}</Text>
                </View>
            </View>
        );
    };

    const formattedTableData = tableData.map(row => row.map(cell => renderAttendanceCell(cell)));

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

                {/* Monthly selector */}
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>DAY WISE ATTENDANCE</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={styles.section}>
                    <Card style={{ padding: 0 }}>
                        <TouchableOpacity 
                            style={[styles.pickerTrigger, { borderBottomColor: colors.border2 }]}
                            onPress={() => setIsPickerVisible(true)}
                        >
                            <View style={styles.pickerLabelRow}>
                                <Calendar size={18} color={colors.brand} style={{ marginRight: 10 }} />
                                <Text style={[styles.pickerValue, { color: colors.text }]}>
                                    {selectedDate.format('MMMM YYYY')}
                                </Text>
                            </View>
                            <ChevronDown size={20} color={colors.text3} />
                        </TouchableOpacity>

                        <View style={styles.tablePadding}>
                            <Table borderStyle={{ borderWidth: 0 }}>
                                <Row 
                                    data={tableHead} 
                                    style={[styles.head, { backgroundColor: colors.surface2 }]} 
                                    textStyle={[styles.headText, { color: colors.text3 }]} 
                                    flexArr={[2, 1, 1, 1, 1, 1]}
                                />
                                <Rows 
                                    data={formattedTableData} 
                                    style={[styles.row, { borderBottomColor: colors.border2 }]}
                                    flexArr={[2, 1, 1, 1, 1, 1]}
                                />
                            </Table>
                        </View>
                    </Card>
                </View>
            </ScrollView>

            {/* Month Picker Modal */}
            <Modal
                visible={isPickerVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsPickerVisible(false)}
            >
                <TouchableOpacity 
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setIsPickerVisible(false)}
                >
                    <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
                        <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Month</Text>
                        </View>
                        <FlatList
                            data={availableMonths}
                            keyExtractor={(item) => item.format('YYYY-MM')}
                            renderItem={({ item }) => {
                                const isSelected = item.isSame(selectedDate, 'month');
                                return (
                                    <TouchableOpacity 
                                        style={[
                                            styles.monthItem,
                                            isSelected && { backgroundColor: colors.brand + '10' }
                                        ]}
                                        onPress={() => {
                                            setSelectedDate(item);
                                            setIsPickerVisible(false);
                                        }}
                                    >
                                        <Text style={[
                                            styles.monthItemText, 
                                            { color: isSelected ? colors.brand : colors.text }
                                        ]}>
                                            {item.format('MMMM YYYY')}
                                        </Text>
                                        {isSelected && <Check size={18} color={colors.brand} />}
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    </View>
                </TouchableOpacity>
            </Modal>
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
    pickerTrigger: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
    },
    pickerLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pickerValue: {
        fontSize: 15,
        fontWeight: fontWeight.semiBold,
    },
    tablePadding: {
        padding: 10,
    },
    head: { 
        height: 44, 
        borderTopLeftRadius: radius.sm,
        borderTopRightRadius: radius.sm,
    },
    headText: { 
        textAlign: 'center', 
        fontSize: 10, 
        fontWeight: '800', 
        letterSpacing: 0.5 
    },
    row: { 
        height: 52, 
        borderBottomWidth: 1,
    },
    tdDate: {
        paddingLeft: 12,
        fontSize: 12,
        fontWeight: '700',
    },
    tdCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    attBadge: {
        width: 26,
        height: 26,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
    },
    attBadgeText: {
        fontSize: 11,
        fontWeight: '800',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '70%',
        paddingBottom: 40,
    },
    modalHeader: {
        padding: 20,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: fontWeight.bold,
    },
    monthItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    monthItemText: {
        fontSize: 16,
        fontWeight: fontWeight.medium,
    },
});

export default AttendanceScreen;
