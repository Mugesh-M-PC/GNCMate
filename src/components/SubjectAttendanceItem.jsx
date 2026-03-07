import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useThemeStore } from '../store/ThemeStore';

const SubjectAttendanceItem = ({ subject, percentage, meta, isLast = false }) => {
    const { colors } = useThemeStore();

    let statusType = 'g'; // good
    if (percentage < 80 && percentage >= 75) statusType = 'a'; // average/attention
    if (percentage < 75) statusType = 'r'; // poor/red

    const getStatusColor = () => {
        switch (statusType) {
            case 'g': return colors.green;
            case 'a': return colors.amber;
            case 'r': return colors.red;
            default: return colors.green;
        }
    };

    const getGradientColors = () => {
        switch (statusType) {
            case 'g': return [colors.green, '#4ade80'];
            case 'a': return [colors.amber, '#fbbf24'];
            case 'r': return [colors.red, '#f87171'];
            default: return [colors.green, '#4ade80'];
        }
    };

    return (
        <View style={[styles.item, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border2 }]}>
            <View style={styles.row}>
                <Text style={[styles.subject, { color: colors.text }]} numberOfLines={1}>{subject}</Text>
                <Text style={[styles.pct, { color: getStatusColor() }]}>{percentage}%</Text>
            </View>

            <View style={[styles.barTrack, { backgroundColor: colors.bg2 }]}>
                <LinearGradient
                    colors={getGradientColors()}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.barFill, { width: `${percentage}%` }]}
                />
            </View>

            {meta && (
                <View style={styles.metaRow}>
                    <Text style={[styles.metaItem, { color: colors.text2 }]}>Present: <Text style={[styles.metaStrong, { color: colors.text }]}>{meta.present}</Text></Text>
                    <Text style={[styles.metaItem, { color: colors.text2 }]}>OD: <Text style={[styles.metaStrong, { color: colors.text }]}>{meta.od}</Text></Text>
                    <Text style={[styles.metaItem, { color: colors.text2 }]}>Absent: <Text style={[styles.metaStrong, { color: colors.text }]}>{meta.absent}</Text></Text>
                    <Text style={[styles.metaItem, { color: colors.text2 }]}>Total: <Text style={[styles.metaStrong, { color: colors.text }]}>{meta.total}</Text></Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    subject: {
        fontSize: 13,
        fontWeight: '600',
        flex: 1,
        marginRight: 8,
    },
    pct: {
        fontSize: 15,
        fontWeight: '700',
    },
    barTrack: {
        height: 5,
        borderRadius: 3,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        borderRadius: 3,
    },
    metaRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 2,
    },
    metaItem: {
        fontSize: 11,
    },
    metaStrong: {
        fontWeight: '600',
    },
});

export default SubjectAttendanceItem;
