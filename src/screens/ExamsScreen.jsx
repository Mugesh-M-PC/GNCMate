import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { radius } from '../theme';

import Header from '../components/Header';
import { ClockIcon, CheckCircleIcon } from '../components/Icons';
import { useThemeStore } from '../store/ThemeStore';

const ExamCard = ({ day, month, code, subject, session }) => {
    const { colors } = useThemeStore();

    return (
        <View style={[styles.examCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <View style={[styles.examDateBox, { backgroundColor: colors.brandSoft }]}>
                <Text style={[styles.examDateDay, { color: colors.brand }]}>{day}</Text>
                <Text style={[styles.examDateMon, { color: colors.brand }]}>{month}</Text>
            </View>
            <View style={styles.examInfo}>
                <Text style={[styles.examCode, { color: colors.text3 }]}>{code}</Text>
                <Text style={[styles.examSubject, { color: colors.text }]}>{subject}</Text>
                <View style={[styles.sessionTag, { backgroundColor: colors.brandSoft }]}>
                    <ClockIcon color={colors.brand} size={9} />
                    <Text style={[styles.sessionText, { color: colors.brand }]}>{session}</Text>
                </View>
            </View>
        </View>
    );
};

const ExamsScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="IA Schedule" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>MID SEMESTER EXAM</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <ExamCard day="02" month="Feb" code="20UISM322P" subject="PHP Programming – Practical" session="Forenoon" />
                <ExamCard day="03" month="Feb" code="20UISM320" subject="Elements of Cost Accounting" session="Forenoon" />
                <ExamCard day="04" month="Feb" code="20UCOM323" subject="Human Resource Management" session="Forenoon" />
                <ExamCard day="05" month="Feb" code="20UISM321" subject="PHP Programming" session="Forenoon" />

                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>MODEL EXAMINATION</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>

                <View style={[styles.emptyState, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                    <CheckCircleIcon color={colors.text3} size={32} />
                    <Text style={[styles.emptyText, { color: colors.text3 }]}>No records found</Text>
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
    examCard: {
        marginHorizontal: 16,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: radius.md,
        paddingVertical: 14,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    examDateBox: {
        minWidth: 46,
        alignItems: 'center',
        borderRadius: radius.sm,
        paddingVertical: 8,
        paddingHorizontal: 6,
    },
    examDateDay: {
        fontSize: 22,
        fontWeight: '800',
        lineHeight: 24,
    },
    examDateMon: {
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    examInfo: {
        flex: 1,
    },
    examCode: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: 3,
    },
    examSubject: {
        fontSize: 13.5,
        fontWeight: '700',
        marginBottom: 5,
    },
    sessionTag: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        borderRadius: 6,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },
    sessionText: {
        fontSize: 10,
        fontWeight: '700',
    },
    emptyState: {
        marginHorizontal: 16,
        borderWidth: 1,
        borderRadius: radius.md,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    emptyText: {
        fontSize: 13,
    },
});

export default ExamsScreen;
