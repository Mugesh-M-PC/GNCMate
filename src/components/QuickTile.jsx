import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { radius } from '../theme';
import { useThemeStore } from '../store/ThemeStore';

const QuickTile = ({ label, icon: IconComponent, type = 'brand', onPress }) => {
    const { colors } = useThemeStore();

    let accentColor, softColor;
    switch (type) {
        case 'brand':
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
        case 'red':
            accentColor = colors.red;
            softColor = colors.redSoft;
            break;
        default:
            accentColor = colors.brand;
            softColor = colors.brandSoft;
    }

    return (
        <TouchableOpacity
            style={[styles.tile, { backgroundColor: colors.surface, borderColor: colors.border }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconWrap, { backgroundColor: softColor }]}>
                <IconComponent color={accentColor} size={20} />
            </View>
            <Text style={[styles.label, { color: colors.text2 }]} numberOfLines={2}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    tile: {
        width: '31%', // Fits 3 in a row with gap
        borderWidth: 1,
        borderRadius: radius.md,
        paddingVertical: 14,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
        marginBottom: 10,
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    label: {
        fontSize: 11,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 14,
    },
});

export default QuickTile;
