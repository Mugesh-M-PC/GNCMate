import React from 'react';
import Svg, { Path, Circle, Rect, Polyline } from 'react-native-svg';

export const HamburgerIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.2} width={size} height={size}>
        <Path d="M3 6h18M3 12h12M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const BellIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const SunIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Circle cx="12" cy="12" r="5" />
        <Path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const MoonIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const TrendingDownIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5}>
        <Path d="M12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const BookOpenIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M9 11l3 3L22 4" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const CreditCardIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Rect x="2" y="5" width="20" height="14" rx="2" />
        <Path d="M2 10h20" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const ClockIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const FileTextIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Rect x="3" y="3" width="18" height="18" rx="2" />
        <Path d="M3 9h18M9 21V9" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const CalendarIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Rect x="3" y="4" width="18" height="18" rx="2" />
        <Path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const DownloadIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const CheckCircleIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={1.5} width={size} height={size}>
        <Circle cx="12" cy="12" r="10" />
        <Path d="M12 8v4M12 16h.01" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const ArchiveIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
        <Polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const LogOutIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

export const HomeIcon = ({ color = 'currentColor', size = 24 }) => (
    <Svg fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2} width={size} height={size}>
        <Path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);
