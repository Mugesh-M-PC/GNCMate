import { create } from 'zustand';
import { Appearance } from 'react-native';
import { lightColors, darkColors } from '../theme/colors';

const systemTheme = Appearance.getColorScheme() === 'dark';

export const useThemeStore = create((set) => ({
    isDark: systemTheme,
    colors: systemTheme ? darkColors : lightColors,

    toggleTheme: () =>
        set((state) => {
            const newDark = !state.isDark;

            return {
                isDark: newDark,
                colors: newDark ? darkColors : lightColors,
            };
        }),

    setTheme: (value) =>
        set({
            isDark: value,
            colors: value ? darkColors : lightColors,
        }),
}));