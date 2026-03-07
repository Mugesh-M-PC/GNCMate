import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { radius } from '../theme';

import Header from '../components/Header';
import Card from '../components/Card';
import StatTile from '../components/StatTile';
import QuickTile from '../components/QuickTile';
import SubjectAttendanceItem from '../components/SubjectAttendanceItem';
import { BookOpenIcon, ClockIcon, CreditCardIcon, FileTextIcon, CalendarIcon, BellIcon, TrendingDownIcon } from '../components/Icons';
import { useThemeStore } from '../store/ThemeStore';
import { BookText, ClipboardClock, Landmark, Megaphone, TriangleAlert } from 'lucide-react-native';

const CircularProgress = ({ colors, percentage }) => {
    const size = 110;
    const strokeWidth = 9;
    const r = (size - strokeWidth) / 2;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = r * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.ringWrap}>
            <View style={styles.ringOuter}>
                <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }] }}>
                    <Defs>
                        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0" stopColor={colors.brand} stopOpacity="1" />
                            <Stop offset="1" stopColor={colors.brand2} stopOpacity="1" />
                        </SvgLinearGradient>
                    </Defs>
                    <Circle
                        cx={cx} cy={cy} r={r}
                        stroke={colors.bg2}
                        strokeWidth={strokeWidth}
                        fill="none"
                    />
                    <Circle
                        cx={cx} cy={cy} r={r}
                        stroke="url(#grad)"
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </Svg>
                <View style={styles.ringLabel}>
                    <Text style={[styles.ringPct, { color: colors.text }]}>{percentage}%</Text>
                    <Text style={[styles.ringSub, { color: colors.text2 }]}>overall</Text>
                </View>
            </View>
        </View>
    );
};

const HomeScreen = ({ navigation }) => {
    const { colors } = useThemeStore();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { backgroundColor: colors.bg }]}>
            <Header title="Dashboard" onMenuPress={() => navigation.openDrawer()} />

            <ScrollView
                style={styles.scrollArea}
                contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Hero */}
                <LinearGradient
                    colors={[colors.headerGradStart, colors.headerGradEnd]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroCard}
                >
                    <View style={styles.heroDeco1} />
                    <View style={styles.heroDeco2} />
                    <Text style={styles.heroLabel}>Overall Attendance</Text>
                    <View style={styles.heroValueRow}>
                        <Text style={styles.heroValue}>78.37</Text>
                        <Text style={styles.heroValuePct}>%</Text>
                    </View>
                    <Text style={styles.heroSub}>Semester 6 · 5 Subjects enrolled</Text>
                    <View style={styles.heroChip}>
                        <TriangleAlert color="yellow" size={18} />
                        <Text style={styles.heroChipText}>Below 80% threshold - Needs attention</Text>
                    </View>
                </LinearGradient>

                {/* Stats Row */}
                <View style={styles.statsRow}>
                    <StatTile type="blue" title="Subjects" value="5" tag="SEM 6" icon={BookText} />
                    <StatTile type="green" title="Total Fees" value="₹2.15L" tag="All Paid" icon={Landmark} />
                    <StatTile type="amber" title="IA Exams" value="4" tag="Scheduled" icon={ClipboardClock} />
                    <StatTile type="purple" title="Updates" value="5" tag="New" icon={Megaphone} />
                </View>

                {/* Quick Access */}
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>QUICK ACCESS</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>
                <View style={styles.quickGrid}>
                    <QuickTile label="Attendance" icon={BookOpenIcon} type="brand" onPress={() => navigation.navigate('Attendance')} />
                    <QuickTile label="IA Schedule" icon={ClockIcon} type="green" onPress={() => navigation.navigate('Exams')} />
                    <QuickTile label="Fee Details" icon={CreditCardIcon} type="amber" onPress={() => navigation.navigate('Fee')} />
                    <QuickTile label="IA Marks" icon={FileTextIcon} type="purple" onPress={() => navigation.navigate('Marks')} />
                    <QuickTile label="Almanac" icon={CalendarIcon} type="red" onPress={() => navigation.navigate('Almanac')} />
                    <QuickTile label="Alerts" icon={BellIcon} type="brand" onPress={() => navigation.navigate('Alerts')} />
                </View>

                {/* Subject Overview */}
                <View style={styles.groupLabelWrap}>
                    <Text style={[styles.groupLabel, { color: colors.text3 }]}>SUBJECT OVERVIEW</Text>
                    <View style={[styles.groupLabelLine, { backgroundColor: colors.border }]} />
                </View>
                <View style={styles.section}>
                    <Card>
                        <CircularProgress colors={colors} percentage={78} />
                        <SubjectAttendanceItem subject="PHP Programming - Practical" percentage={81.54} />
                        <SubjectAttendanceItem subject="Human Resource Mgmt" percentage={80} />
                        <SubjectAttendanceItem subject="Elements of Cost Accounting" percentage={76.92} />
                        <SubjectAttendanceItem subject="Project" percentage={77.97} />
                        <SubjectAttendanceItem subject="PHP Programming" percentage={75.38} isLast={true} />
                    </Card>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollArea: { flex: 1 },
    heroCard: {
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: radius.lg,
        padding: 20,
        position: 'relative',
        overflow: 'hidden',
    },
    heroDeco1: {
        position: 'absolute',
        top: -20,
        right: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    heroDeco2: {
        position: 'absolute',
        bottom: -30,
        right: 30,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },
    heroLabel: { color: '#fff', fontSize: 11, fontWeight: '600', letterSpacing: 0.5, opacity: 0.75, marginBottom: 4 },
    heroValueRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
    heroValue: { color: '#fff', fontSize: 38, fontWeight: '800', lineHeight: 40 },
    heroValuePct: { color: '#fff', fontSize: 22, fontWeight: '500', opacity: 0.7 },
    heroSub: { color: '#fff', fontSize: 12, opacity: 0.75 },
    heroChip: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: 'rgba(255,255,255,0.18)',
        borderRadius: 20,
        paddingVertical: 6,
        paddingHorizontal: 12,
        marginTop: 10,
    },
    heroChipText: { color: '#fff', fontSize: 10, fontWeight: '600' },
    statsRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // gap: 10,
        marginHorizontal: 16,
        marginTop: 16,
        justifyContent: 'space-between',
    },
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
    quickGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
        gap: 10,
        justifyContent: 'space-between',
    },
    // Ensure we fit 3 per row (with 2 gaps = 20px, total width = 100% - 20, each ~31%)
    // For QuickTile children to size properly we can add a wrapper or let them flex if we use flex.
    // We'll update quick grid to use a row with wrap. But QuickTile needs specific width if wrapped.
    // Wait, I designed QuickTile to just be a tile. Let's add style to elements. In HTML it was grid template columns 1fr 1fr 1fr.
    // In React Native, we can just set width: '31%'. Let's override quick grid in QuickTile or just wrap it. 
    // For simplicity, we can do it via a wrapper per tile or applying a style prop.
    // Let me update QuickTile to have a width constraint or handle flatlist.
    section: {
        paddingHorizontal: 16,
    },
    ringWrap: {
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
    },
    ringOuter: {
        position: 'relative',
    },
    ringLabel: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ringPct: {
        fontSize: 26,
        fontWeight: '800',
    },
    ringSub: {
        fontSize: 11,
        marginTop: -2,
    },
});

export default HomeScreen;
