import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import { useThemeStore } from '../store/ThemeStore';

const MarkCard = ({ subject, result, marks }) => {
    const { colors } = useThemeStore();

    const isPass = result.toLowerCase() === 'pass';
    const resultBg = isPass ? colors.greenSoft : colors.redSoft;
    const resultText = isPass ? colors.green : colors.red;

    return (
        <View style={[styles.markCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.head, { borderBottomColor: colors.border }]}>
                <Text style={[styles.subject, { color: colors.text }]}>{subject}</Text>
                <View style={[styles.resultTag, { backgroundColor: resultBg }]}>
                    <Text style={[styles.resultText, { color: resultText }]}>{result}</Text>
                </View>
            </View>
            <View style={styles.body}>
                {marks.map((m, i) => (
                    <View key={i} style={[styles.row, i < marks.length - 1 && { borderBottomColor: colors.border2, borderBottomWidth: 1 }]}>
                        <Text style={[styles.key, { color: colors.text2 }]}>{m.label}</Text>
                        <Text style={[
                            styles.val,
                            { color: m.value === '—' ? colors.text3 : colors.text },
                            m.value === '—' && styles.dash
                        ]}>
                            {m.value}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const MarksScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    const sampleMarks = [
        { label: 'Mid Sem Exam', value: '39' },
        { label: 'Model Exam', value: '—' },
        { label: 'Activity Mark', value: '—' },
        { label: 'Attendance', value: '4.00' },
        { label: 'Assignments', value: '—' },
        { label: 'Total', value: '0' },
    ];

    const sampleMarksPass = [
        { label: 'Mid Sem Exam', value: '45' },
        ...sampleMarks.slice(1)
    ];

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="IA Mark View" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>IA MARK VIEW · SEMESTER 6</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={styles.section}>
                    <MarkCard subject="Elements of Cost Accounting" result="Fail" marks={sampleMarks} />
                    <MarkCard subject="PHP Programming" result="Fail" marks={sampleMarksPass} />
                    <MarkCard subject="PHP Programming – Practical" result="Fail" marks={sampleMarksPass} />
                    <MarkCard subject="Human Resource Management" result="Fail" marks={sampleMarksPass} />
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
    markCard: {
        borderWidth: 1,
        borderRadius: radius.md,
        marginBottom: 10,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    head: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subject: {
        fontSize: 14,
        fontWeight: '700',
    },
    resultTag: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        borderRadius: 6,
    },
    resultText: {
        fontSize: 11,
        fontWeight: '700',
    },
    body: {
        paddingVertical: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        paddingHorizontal: 16,
    },
    key: {
        fontSize: 12,
        fontWeight: '500',
    },
    val: {
        fontSize: 15,
        fontWeight: '700',
    },
    dash: {
        fontSize: 14,
        fontWeight: '400',
    },
});

export default MarksScreen;
