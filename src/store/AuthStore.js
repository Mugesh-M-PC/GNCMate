import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const AUTH_KEY = '@user_auth';

export const useAuthStore = create((set) => ({
    user: null,
    isLoggedIn: false,
    isLoading: true,

    login: async (userData) => {
        try {
            await AsyncStorage.setItem(
                AUTH_KEY,
                JSON.stringify(userData)
            );

            set({
                user: userData,
                isLoggedIn: true,
            });
        } catch (error) {
            console.error('Error during login:', error);
        }
    },

    logout: async () => {
        try {
            await AsyncStorage.removeItem(AUTH_KEY);
            set({
                user: null,
                isLoggedIn: false,
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    },

    getUser: async () => {
        try {
            const authData = await AsyncStorage.getItem(AUTH_KEY);
            if (authData) {
                const user = JSON.parse(authData);
                set({ user, isLoggedIn: true, isLoading: false });
                return user;
            }
            set({ isLoading: false });
            return null;
        } catch (error) {
            console.error('Error getting user:', error);
            set({ isLoading: false });
            return null;
        }
    },
}));