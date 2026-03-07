import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
    ActivityIndicator,
    Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useAuthStore } from '../store/AuthStore';
import { useThemeStore } from '../store/ThemeStore';
import { User, Lock, ArrowRight, AlertCircle, UserRound, LockKeyhole, Eye, EyeOff } from 'lucide-react-native';
import { radius, spacing, fontSize, fontWeight } from '../theme';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const LoginScreen = () => {
    const { colors, isDark } = useThemeStore();
    const { login } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    const onLogin = async (data) => {
        setLoading(true);
        setError('');

        try {
            await login({ name: data.username, password: data.password });
            setLoading(false);
        } catch (err) {
            setError('Login failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, { backgroundColor: colors.bg }]}
        >
            <View style={styles.content}>
                {/* Header Section */}
                <View style={styles.header}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    <Text style={[styles.welcomeText, { color: colors.text }]}>Welcome to GNCMate</Text>
                    <Text style={[styles.subText, { color: colors.text2 }]}>Sign in to continue</Text>
                </View>

                {/* Form Section */}
                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.text2 }]}>Student Name / ID</Text>
                        <Controller
                            control={control}
                            name="username"
                            rules={{
                                required: 'Username is required',
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={[
                                    styles.inputWrapper,
                                    { backgroundColor: colors.surface, borderColor: errors.username ? colors.red : colors.border }
                                ]}>
                                    <UserRound size={20} color={errors.username ? colors.red : colors.text3} style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Enter your name"
                                        placeholderTextColor={colors.text3}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        autoCapitalize="none"
                                    />
                                </View>
                            )}
                        />
                        {errors.username && (
                            <View style={styles.errorRow}>
                                <AlertCircle size={14} color={colors.red} />
                                <Text style={styles.errorTextSmall}>{errors.username.message}</Text>
                            </View>
                        )}
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: colors.text2 }]}>Password</Text>
                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 4,
                                    message: 'Password must be at least 4 characters',
                                },
                            }}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <View style={[
                                    styles.inputWrapper,
                                    { backgroundColor: colors.surface, borderColor: errors.password ? colors.red : colors.border }
                                ]}>
                                    <LockKeyhole size={20} color={errors.password ? colors.red : colors.text3} style={styles.inputIcon} />
                                    <TextInput
                                        style={[styles.input, { color: colors.text }]}
                                        placeholder="Enter your password"
                                        placeholderTextColor={colors.text3}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        secureTextEntry={!showPassword}
                                    />
                                    <TouchableOpacity
                                        onPress={() => setShowPassword(!showPassword)}
                                        activeOpacity={0.7}
                                        style={styles.eyeIcon}
                                    >
                                        {showPassword ? (
                                            <Eye size={20} color={colors.text3} />
                                        ) : (
                                            <EyeOff size={20} color={colors.text3} />
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                        {errors.password && (
                            <View style={styles.errorRow}>
                                <AlertCircle size={14} color={colors.red} />
                                <Text style={styles.errorTextSmall}>{errors.password.message}</Text>
                            </View>
                        )}
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        onPress={handleSubmit(onLogin)}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        <LinearGradient
                            colors={[colors.headerGradStart, colors.headerGradEnd]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.loginButton}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.loginButtonText}>Login</Text>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Footer Section (Decorative) */}
                <View style={styles.footer}>
                    <Text style={[styles.footerText, { color: colors.text3 }]}>
                        Guru Nanak College (Autonomous)
                    </Text>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 90,
        height: 90,
        marginBottom: 25,
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: fontWeight.bold,
        marginBottom: 8,
    },
    subText: {
        fontSize: 16,
        fontWeight: fontWeight.medium,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: fontWeight.semiBold,
        marginBottom: 8,
        marginLeft: 4,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 58,
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: 16,
    },
    inputIcon: {
        marginRight: 12,
    },
    eyeIcon: {
        marginLeft: 12,
        padding: 4,
    },
    input: {
        flex: 1,
        fontSize: 16,
        height: '100%',
    },
    errorRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 6,
        marginLeft: 4,
    },
    errorTextSmall: {
        color: '#ef4444',
        fontSize: 12,
        fontWeight: fontWeight.medium,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: fontWeight.medium,
    },
    loginButton: {
        height: 58,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        gap: 10,
        elevation: 4,
        shadowColor: '#5b7fff',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: fontWeight.bold,
    },
    footer: {
        marginTop: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        fontWeight: fontWeight.medium,
    },
});

export default LoginScreen;
