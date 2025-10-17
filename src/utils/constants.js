// AI Product Advisor - Constants

// Navigation Routes
export const ROUTES = {
  HOME: 'Home',
  PRODUCTS: 'Products',
  AI_ADVISOR: 'AIAdvisor',
  PROFILE: 'Profile',
  PRODUCT_DETAIL: 'ProductDetail',
  COMPARE: 'Compare',
};

// Tab Navigation
export const TAB_ROUTES = {
  HOME_TAB: 'HomeTab',
  PRODUCTS_TAB: 'ProductsTab',
  AI_ADVISOR_TAB: 'AIAdvisorTab',
  PROFILE_TAB: 'ProfileTab',
};

// Product Categories
export const CATEGORIES = {
  AI_ASSISTANTS: 'ai-assistants',
  AI_ART: 'ai-art',
  PRODUCTIVITY: 'productivity',
  DEVELOPMENT: 'development',
  ALL: 'all',
};

export const CATEGORY_LABELS = {
  [CATEGORIES.AI_ASSISTANTS]: 'AI Assistants',
  [CATEGORIES.AI_ART]: 'AI Art',
  [CATEGORIES.PRODUCTIVITY]: 'Productivity',
  [CATEGORIES.DEVELOPMENT]: 'Development',
  [CATEGORIES.ALL]: 'All Products',
};

// Product Pricing Types
export const PRICING_TYPES = {
  FREE: 'free',
  FREEMIUM: 'freemium',
  PAID: 'paid',
  SUBSCRIPTION: 'subscription',
};

// User Preferences Keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'user_preferences',
  FAVORITES: 'favorites',
  RECENT_SEARCHES: 'recent_searches',
  COMPARISON_HISTORY: 'comparison_history',
  CHAT_HISTORY: 'chat_history',
  ONBOARDING_COMPLETED: 'onboarding_completed',
};

// Default User Preferences
export const DEFAULT_PREFERENCES = {
  notifications: true,
  darkMode: false,
  emailUpdates: true,
  language: 'en',
  currency: 'USD',
};

// Validation Patterns
export const VALIDATION = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
  SEARCH_MIN_LENGTH: 2,
  SEARCH_MAX_LENGTH: 100,
};

// API Endpoints (Mock)
export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  CATEGORIES: '/api/categories',
  REVIEWS: '/api/reviews',
  RECOMMENDATIONS: '/api/recommendations',
  USER_PROFILE: '/api/user/profile',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  NOT_FOUND: 'The requested item was not found.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  SEARCH_ERROR: 'Search failed. Please try again.',
  FAVORITES_ERROR: 'Failed to update favorites. Please try again.',
  STORAGE_ERROR: 'Failed to save data. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  FAVORITE_ADDED: 'Added to favorites!',
  FAVORITE_REMOVED: 'Removed from favorites!',
  PREFERENCES_SAVED: 'Preferences saved successfully!',
  SEARCH_COMPLETED: 'Search completed!',
  COMPARISON_UPDATED: 'Comparison updated!',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: true,
  ENABLE_ANALYTICS: false,
  ENABLE_CRASH_REPORTING: false,
  ENABLE_BETA_FEATURES: false,
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'AI Product Advisor',
  VERSION: '1.0.0',
  BUILD_NUMBER: '1',
  SUPPORT_EMAIL: 'support@aiproductadvisor.com',
  PRIVACY_POLICY_URL: 'https://aiproductadvisor.com/privacy',
  TERMS_OF_SERVICE_URL: 'https://aiproductadvisor.com/terms',
  MAX_COMPARISON_ITEMS: 3,
  MAX_RECENT_SEARCHES: 10,
  CHAT_MESSAGE_LIMIT: 100,
};

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 250,
  SLOW: 350,
  TYPING_DELAY: 1000,
  FADE_DURATION: 200,
  SLIDE_DURATION: 300,
};

// Dimensions
export const DIMENSIONS = {
  SCREEN_PADDING: 16,
  CARD_MARGIN: 8,
  BUTTON_HEIGHT: 44,
  INPUT_HEIGHT: 44,
  HEADER_HEIGHT: 60,
  TAB_BAR_HEIGHT: 80,
  PRODUCT_CARD_HEIGHT: 200,
  CATEGORY_CARD_HEIGHT: 120,
};

// Rating Configuration
export const RATING_CONFIG = {
  MAX_STARS: 5,
  STAR_SIZE: 16,
  SHOW_HALF_STARS: true,
  DEFAULT_RATING: 0,
};

// Chat Configuration
export const CHAT_CONFIG = {
  MAX_MESSAGE_LENGTH: 500,
  TYPING_INDICATOR_DELAY: 1000,
  AUTO_SCROLL_DELAY: 100,
  SUGGESTED_QUESTIONS: [
    "What's the best AI assistant for productivity?",
    "Compare ChatGPT vs Claude",
    "Show me free AI art tools",
    "What AI tools are good for developers?",
    "Recommend AI tools for small business",
  ],
};

export default {
  ROUTES,
  TAB_ROUTES,
  CATEGORIES,
  CATEGORY_LABELS,
  PRICING_TYPES,
  STORAGE_KEYS,
  DEFAULT_PREFERENCES,
  VALIDATION,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS,
  APP_CONFIG,
  ANIMATIONS,
  DIMENSIONS,
  RATING_CONFIG,
  CHAT_CONFIG,
};
