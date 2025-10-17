// AI Product Advisor - Spacing System

// Base spacing unit (4px)
const BASE_UNIT = 4;

// Spacing Scale
export const Spacing = {
  // Micro spacing
  xs: BASE_UNIT * 1,      // 4px
  sm: BASE_UNIT * 2,      // 8px
  md: BASE_UNIT * 3,      // 12px
  lg: BASE_UNIT * 4,      // 16px
  xl: BASE_UNIT * 5,      // 20px
  xxl: BASE_UNIT * 6,     // 24px
  
  // Macro spacing
  '2xl': BASE_UNIT * 8,   // 32px
  '3xl': BASE_UNIT * 10,  // 40px
  '4xl': BASE_UNIT * 12,  // 48px
  '5xl': BASE_UNIT * 16,  // 64px
  '6xl': BASE_UNIT * 20,  // 80px
  '7xl': BASE_UNIT * 24,  // 96px
};

// Border Radius Scale
export const BorderRadius = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 6,
  lg: 8,
  xl: 12,
  xxl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Layout Dimensions
export const Layout = {
  // Screen padding
  screenPadding: Spacing.lg,
  screenPaddingHorizontal: Spacing.lg,
  screenPaddingVertical: Spacing.xl,
  
  // Container widths
  containerMaxWidth: 1200,
  contentMaxWidth: 800,
  
  // Component dimensions
  buttonHeight: {
    small: 32,
    medium: 40,
    large: 48,
  },
  
  inputHeight: {
    small: 36,
    medium: 44,
    large: 52,
  },
  
  cardMinHeight: 120,
  headerHeight: 60,
  tabBarHeight: 80,
  
  // Touch targets
  minTouchTarget: 44,
  
  // Icon sizes
  iconSize: {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Avatar sizes
  avatarSize: {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
    xxl: 80,
  },
};

// Common margin/padding utilities
export const SpacingUtilities = {
  // Margin utilities
  m: (size) => ({ margin: Spacing[size] || size }),
  mt: (size) => ({ marginTop: Spacing[size] || size }),
  mr: (size) => ({ marginRight: Spacing[size] || size }),
  mb: (size) => ({ marginBottom: Spacing[size] || size }),
  ml: (size) => ({ marginLeft: Spacing[size] || size }),
  mx: (size) => ({ 
    marginLeft: Spacing[size] || size, 
    marginRight: Spacing[size] || size 
  }),
  my: (size) => ({ 
    marginTop: Spacing[size] || size, 
    marginBottom: Spacing[size] || size 
  }),
  
  // Padding utilities
  p: (size) => ({ padding: Spacing[size] || size }),
  pt: (size) => ({ paddingTop: Spacing[size] || size }),
  pr: (size) => ({ paddingRight: Spacing[size] || size }),
  pb: (size) => ({ paddingBottom: Spacing[size] || size }),
  pl: (size) => ({ paddingLeft: Spacing[size] || size }),
  px: (size) => ({ 
    paddingLeft: Spacing[size] || size, 
    paddingRight: Spacing[size] || size 
  }),
  py: (size) => ({ 
    paddingTop: Spacing[size] || size, 
    paddingBottom: Spacing[size] || size 
  }),
};

// Common layout styles
export const LayoutStyles = {
  // Flex utilities
  flex1: { flex: 1 },
  flexRow: { flexDirection: 'row' },
  flexColumn: { flexDirection: 'column' },
  flexWrap: { flexWrap: 'wrap' },
  
  // Alignment utilities
  center: { alignItems: 'center', justifyContent: 'center' },
  centerHorizontal: { alignItems: 'center' },
  centerVertical: { justifyContent: 'center' },
  spaceBetween: { justifyContent: 'space-between' },
  spaceAround: { justifyContent: 'space-around' },
  spaceEvenly: { justifyContent: 'space-evenly' },
  
  // Position utilities
  absolute: { position: 'absolute' },
  relative: { position: 'relative' },
  
  // Size utilities
  fullWidth: { width: '100%' },
  fullHeight: { height: '100%' },
  fullSize: { width: '100%', height: '100%' },
  
  // Border radius utilities
  rounded: { borderRadius: BorderRadius.md },
  roundedLg: { borderRadius: BorderRadius.lg },
  roundedXl: { borderRadius: BorderRadius.xl },
  roundedFull: { borderRadius: BorderRadius.full },
};

export default Spacing;
