import React from 'react';
import { View, StyleSheet } from 'react-native';
import { radius } from '../theme';
import { useThemeStore } from '../store/ThemeStore';

const Card = ({ children, style }) => {
    const { colors } = useThemeStore();

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    shadowColor: '#000', // RN uses black for shadow color which is then adjusted via opacity
                },
                style,
            ]}
        >
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.md,
        borderWidth: 1,
        overflow: 'hidden',
        marginBottom: 10,
        // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 16,
        // Android elevation (approximate for shadow)
        elevation: 3,
    },
});

export default Card;
