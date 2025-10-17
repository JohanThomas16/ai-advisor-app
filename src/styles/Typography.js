import { Platform } from 'react-native';
import { Colors } from './Colors';

// Font Families
const FontFamilies = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto-Medium',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto-Bold',
    web: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  }),
};

// Typography Scale
export const Typography = {
  // Display Styles
  displayLarge: {
    fontFamily: FontFamilies.bold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: Platform.select({ ios: '700', android: 'bold', web: '700' }),
    color: Colors.textPrimary,
  },
  displayMedium: {
    fontFamily: FontFamilies.bold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: Platform.select({ ios: '700', android: 'bold', web: '700' }),
    color: Colors.textPrimary,
  },
  displaySmall: {
    fontFamily: FontFamilies.bold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: Platform.select({ ios: '700', android: 'bold', web: '700' }),
    color: Colors.textPrimary,
  },

  // Heading Styles
  headingLarge: {
    fontFamily: FontFamilies.bold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.textPrimary,
  },
  headingMedium: {
    fontFamily: FontFamilies.medium,
    fontSize: 20,
    lineHeight: 26,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.textPrimary,
  },
  headingSmall: {
    fontFamily: FontFamilies.medium,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.textPrimary,
  },

  // Body Styles
  bodyLarge: {
    fontFamily: FontFamilies.regular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: Platform.select({ ios: '400', android: 'normal', web: '400' }),
    color: Colors.textPrimary,
  },
  bodyMedium: {
    fontFamily: FontFamilies.regular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: Platform.select({ ios: '400', android: 'normal', web: '400' }),
    color: Colors.textPrimary,
  },
  bodySmall: {
    fontFamily: FontFamilies.regular,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: Platform.select({ ios: '400', android: 'normal', web: '400' }),
    color: Colors.textSecondary,
  },

  // Caption Styles
  caption: {
    fontFamily: FontFamilies.regular,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: Platform.select({ ios: '400', android: 'normal', web: '400' }),
    color: Colors.textTertiary,
  },
  captionMedium: {
    fontFamily: FontFamilies.medium,
    fontSize: 11,
    lineHeight: 14,
    fontWeight: Platform.select({ ios: '500', android: 'bold', web: '500' }),
    color: Colors.textSecondary,
  },

  // Button Styles
  buttonLarge: {
    fontFamily: FontFamilies.medium,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.white,
  },
  buttonMedium: {
    fontFamily: FontFamilies.medium,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.white,
  },
  buttonSmall: {
    fontFamily: FontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: Platform.select({ ios: '600', android: 'bold', web: '600' }),
    color: Colors.white,
  },

  // Label Styles
  labelLarge: {
    fontFamily: FontFamilies.medium,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: Platform.select({ ios: '500', android: 'bold', web: '500' }),
    color: Colors.textPrimary,
  },
  labelMedium: {
    fontFamily: FontFamilies.medium,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: Platform.select({ ios: '500', android: 'bold', web: '500' }),
    color: Colors.textPrimary,
  },
  labelSmall: {
    fontFamily: FontFamilies.medium,
    fontSize: 10,
    lineHeight: 14,
    fontWeight: Platform.select({ ios: '500', android: 'bold', web: '500' }),
    color: Colors.textSecondary,
  },
};

// Text Variants with Colors
export const TextVariants = {
  primary: { color: Colors.textPrimary },
  secondary: { color: Colors.textSecondary },
  tertiary: { color: Colors.textTertiary },
  inverse: { color: Colors.textInverse },
  success: { color: Colors.success },
  warning: { color: Colors.warning },
  error: { color: Colors.error },
  info: { color: Colors.info },
  accent: { color: Colors.accent },
};

export default Typography;
