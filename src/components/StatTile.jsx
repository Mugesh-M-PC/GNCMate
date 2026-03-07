import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { radius } from '../theme';
import { useThemeStore } from '../store/ThemeStore';

// Type mapping for colors and icons
// type: 'blue' | 'green' | 'amber' | 'purple'
const StatTile = ({ type, title, value, tag, icon: IconComponent }) => {
    const { colors } = useThemeStore();

    let accentColor, softColor;
    switch (type) {
        case 'blue':
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
            softColor = 'rgba(124,92,252,0.12)';
            break;
        default:
            accentColor = colors.brand;
            softColor = colors.brandSoft;
    }

    return (
        <View style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {/* Decorative circle */}
            <View style={[styles.decoCircle, { backgroundColor: accentColor }]} />

            <View style={[styles.iconWrap, { backgroundColor: softColor }]}>
                <IconComponent color={accentColor} size={20} />
            </View>

            <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
            <Text style={[styles.title, { color: colors.text2 }]}>{title}</Text>

            <View style={[styles.chip, { backgroundColor: softColor }]}>
                <Text style={[styles.chipText, { color: accentColor }]}>{tag}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: '48%',
        borderWidth: 1,
        borderRadius: radius.md,
        padding: 16,
        marginBottom: 18,
        overflow: 'hidden',
        position: 'relative',
        // shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
        elevation: 2,
    },
    decoCircle: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.08,
    },
    iconWrap: {
        width: 32,
        height: 32,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    value: {
        fontSize: 26,
        fontWeight: '800',
        lineHeight: 30,
        marginBottom: 3,
    },
    title: {
        fontSize: 11,
        fontWeight: '500',
    },
    chip: {
        alignSelf: 'flex-start',
        borderRadius: 20,
        paddingVertical: 3,
        paddingHorizontal: 8,
        marginTop: 6,
    },
    chipText: {
        fontSize: 10,
        fontWeight: '700',
    },
});

export default StatTile;
