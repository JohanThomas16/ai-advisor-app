// AI Product Advisor - Color Palette
export const Colors = {
  // Primary Colors
  primary: '#6366F1', // Indigo
  primaryLight: '#818CF8',
  primaryDark: '#4F46E5',
  
  // Secondary Colors
  secondary: '#EC4899', // Pink
  secondaryLight: '#F472B6',
  secondaryDark: '#DB2777',
  
  // Accent Colors
  accent: '#10B981', // Emerald
  accentLight: '#34D399',
  accentDark: '#059669',
  
  // Neutral Colors
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  // Status Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background Colors
  background: '#FFFFFF',
  backgroundSecondary: '#F9FAFB',
  surface: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  
  // Text Colors
  textPrimary: '#111827',
  textSecondary: '#6B7280',
  textTertiary: '#9CA3AF',
  textInverse: '#FFFFFF',
  
  // Border Colors
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  borderDark: '#D1D5DB',
  
  // AI-specific Colors
  aiBlue: '#3B82F6',
  aiPurple: '#8B5CF6',
  aiTeal: '#14B8A6',
  aiOrange: '#F97316',
};

// Gradient Definitions
export const Gradients = {
  primary: ['#6366F1', '#8B5CF6'],
  secondary: ['#EC4899', '#F97316'],
  accent: ['#10B981', '#14B8A6'],
  hero: ['#6366F1', '#EC4899', '#F97316'],
  ai: ['#3B82F6', '#8B5CF6'],
  success: ['#10B981', '#34D399'],
  warm: ['#F97316', '#EC4899'],
  cool: ['#3B82F6', '#14B8A6'],
  dark: ['#1F2937', '#374151'],
  light: ['#F9FAFB', '#FFFFFF'],
};

// Shadow Definitions
export const Shadows = {
  small: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  large: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export default Colors;
