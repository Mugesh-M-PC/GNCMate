import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius, spacing, fontSize, fontWeight } from '../theme';
import { Calendar } from 'react-native-calendars';
import dayjs from 'dayjs';

import Header from '../components/Header';
import Card from '../components/Card';
import { useThemeStore } from '../store/ThemeStore';
import { Info, CalendarDays } from 'lucide-react-native';

const AlmanacScreen = ({ navigation }) => {
    const { colors, isDark } = useThemeStore();
    const insets = useSafeAreaInsets();
    
    const today = dayjs().format('YYYY-MM-DD');
    const [selectedDate, setSelectedDate] = useState(today);

    // Simulated Almanac Data for March 2026
    const almanacEvents = useMemo(() => {
        const events = {};
        const startOfMonth = dayjs().startOf('month');
        const daysInMonth = startOfMonth.daysInMonth();
        
        let dayOrderCount = 0;
        
        for (let i = 1; i <= daysInMonth; i++) {
            const current = startOfMonth.date(i);
            const dateStr = current.format('YYYY-MM-DD');
            const isSunday = current.day() === 0;

            if (isSunday) {
                events[dateStr] = { type: 'holiday', title: 'Sunday', order: null };
            } else {
                dayOrderCount = (dayOrderCount % 6) + 1;
                events[dateStr] = { 
                    type: 'working', 
                    title: 'Regular Class Day', 
                    order: dayOrderCount 
                };
            }
        }
        
        // Add some specific events/holidays
        const specialDates = {
            '2026-03-15': { type: 'holiday', title: 'College Foundation Day', order: null },
            '2026-03-25': { type: 'event', title: 'Cultural Fest - GNC Fusion', order: 3 },
            '2026-03-28': { type: 'holiday', title: 'Special Holiday', order: null },
        };

        return { ...events, ...specialDates };
    }, []);

    const selectedInfo = almanacEvents[selectedDate] || { title: 'No data available', order: null };

    const markedDates = useMemo(() => {
        const marked = {};
        Object.keys(almanacEvents).forEach(date => {
            const event = almanacEvents[date];
            if (date === selectedDate) {
                marked[date] = { 
                    selected: true, 
                    selectedColor: colors.brand,
                    selectedTextColor: '#fff'
                };
            } else if (event.type === 'holiday') {
                marked[date] = { 
                    dotColor: colors.red, 
                    marked: true 
                };
            } else if (event.type === 'event') {
                marked[date] = { 
                    dotColor: colors.amber, 
                    marked: true 
                };
            }
        });
        return marked;
    }, [selectedDate, almanacEvents, colors]);
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
                    <Card style={{ padding: 0, overflow: 'hidden' }}>
                        <Calendar
                            current={today}
                            onDayPress={day => setSelectedDate(day.dateString)}
                            markedDates={markedDates}
                            hideArrows={true}
                            disableMonthChange={true}
                            enableSwipeMonths={false}
                            theme={{
                                backgroundColor: 'transparent',
                                calendarBackground: 'transparent',
                                textSectionTitleColor: colors.text2,
                                selectedDayBackgroundColor: colors.brand,
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: colors.brand,
                                dayTextColor: colors.text,
                                textDisabledColor: colors.text3 + '40',
                                dotColor: colors.brand,
                                selectedDotColor: '#ffffff',
                                monthTextColor: colors.text,
                                indicatorColor: colors.brand,
                                textDayFontWeight: '600',
                                textMonthFontWeight: '800',
                                textDayHeaderFontWeight: '700',
                                textDayFontSize: 14,
                                textMonthFontSize: 16,
                                textDayHeaderFontSize: 12,
                            }}
                        />
                    </Card>
                </View>

                {/* Status Section */}
                <View style={styles.section}>
                    <Card style={styles.detailsCard}>
                        <View style={styles.detailsHeader}>
                            <CalendarDays size={18} color={colors.brand} />
                            <Text style={[styles.detailsTitle, { color: colors.text }]}>
                                {dayjs(selectedDate).format('DD MMMM YYYY')}
                            </Text>
                        </View>
                        
                        <View style={[styles.infoRow, { backgroundColor: colors.bg2 }]}>
                            <View style={styles.infoCol}>
                                <Text style={[styles.infoLabel, { color: colors.text3 }]}>Day Order</Text>
                                <Text style={[styles.infoValue, { color: selectedInfo.order ? colors.brand : colors.text3 }]}>
                                    {selectedInfo.order ? `D${selectedInfo.order}` : '-'}
                                </Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={[styles.infoCol, { flex: 2 }]}>
                                <Text style={[styles.infoLabel, { color: colors.text3 }]}>Description</Text>
                                <Text style={[styles.infoValue, { color: colors.text }]}>
                                    {selectedInfo.title}
                                </Text>
                            </View>
                        </View>
                    </Card>
                </View>

                <View style={styles.section}>
                    <Card style={styles.legendCard}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: colors.brand }]} />
                            <Text style={[styles.legendText, { color: colors.text2 }]}>Selected</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: colors.red }]} />
                            <Text style={[styles.legendText, { color: colors.text2 }]}>Holiday</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendBox, { backgroundColor: colors.amber }]} />
                            <Text style={[styles.legendText, { color: colors.text2 }]}>Event</Text>
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
        paddingBottom: 12,
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
        marginBottom: 16,
    },
    detailsCard: {
        padding: 20,
    },
    detailsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },
    detailsTitle: {
        fontSize: 16,
        fontWeight: fontWeight.bold,
    },
    infoRow: {
        flexDirection: 'row',
        borderRadius: radius.md,
        padding: 16,
        alignItems: 'center',
    },
    infoCol: {
        flex: 1,
    },
    divider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(0,0,0,0.1)',
        marginHorizontal: 16,
    },
    infoLabel: {
        fontSize: 10,
        fontWeight: fontWeight.bold,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: fontWeight.bold,
    },
    legendCard: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 16,
        padding: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    legendBox: {
        width: 12,
        height: 12,
        borderRadius: 3,
    },
    legendText: {
        fontSize: 11,
        fontWeight: fontWeight.medium,
    },
});

export default AlmanacScreen;
