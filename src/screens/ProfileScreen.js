// AI Product Advisor - Profile Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import styles and data
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { PRODUCTS } from '../data/products';
import { MOCK_USER } from '../data/mockData';
import { TAB_ROUTES, ROUTES, APP_CONFIG } from '../utils/constants';
import storageService from '../services/storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  
  const [user, setUser] = useState(MOCK_USER);
  const [preferences, setPreferences] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      // Load preferences
      const userPrefs = await storageService.getUserPreferences();
      setPreferences(userPrefs);
      
      // Load favorites
      const favs = await storageService.getFavorites();
      setFavorites(favs);
      
      // Get favorite products
      const favProducts = PRODUCTS.filter(product => favs.includes(product.id));
      setFavoriteProducts(favProducts);
      
      // Calculate stats
      const comparisonHistory = await storageService.getComparisonHistory();
      const chatHistory = await storageService.getChatHistory();
      
      setStats({
        favoritesCount: favs.length,
        comparisonsCreated: comparisonHistory.length,
        chatMessages: chatHistory.length,
        productsViewed: Math.floor(Math.random() * 50) + 20, // Mock data
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const updatePreference = async (key, value) => {
    const updatedPrefs = { ...preferences, [key]: value };
    setPreferences(updatedPrefs);
    await storageService.setUserPreferences(updatedPrefs);
  };

  const removeFavorite = async (productId) => {
    await storageService.removeFromFavorites(productId);
    loadUserData();
  };

  const clearAllData = () => {
    Alert.alert(
      'Clear All Data',
      'This will remove all your favorites, chat history, and preferences. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            await storageService.clear();
            loadUserData();
            Alert.alert('Success', 'All data has been cleared.');
          },
        },
      ]
    );
  };

  const handleProductPress = (product) => {
    navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
      screen: ROUTES.PRODUCT_DETAIL,
      params: { product }
    });
  };

  const renderStatCard = (icon, label, value, color) => (
    <View style={styles.statCard}>
      <View style={[styles.statIcon, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const renderPreferenceItem = (icon, label, value, onToggle, description) => (
    <View style={styles.preferenceItem}>
      <View style={styles.preferenceLeft}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
        <View style={styles.preferenceText}>
          <Text style={styles.preferenceLabel}>{label}</Text>
          {description && (
            <Text style={styles.preferenceDescription}>{description}</Text>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.gray300, true: Colors.primary + '40' }}
        thumbColor={value ? Colors.primary : Colors.gray400}
      />
    </View>
  );

  const renderFavoriteProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.favoriteCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={Gradients.primary}
        style={styles.favoriteImage}
      >
        <Text style={styles.favoriteImageText}>
          {item.name.substring(0, 2).toUpperCase()}
        </Text>
      </LinearGradient>
      
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.favoriteDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <View style={styles.favoriteMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={12} color={Colors.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.favoritePrice}>
            {item.pricing.free ? 'Free' : `$${item.pricing.startingPrice}`}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeFavoriteButton}
        onPress={() => removeFavorite(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons name="heart" size={16} color={Colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={Gradients.primary} style={styles.header}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.joinDate}>
              Member since {new Date(user.joinDate).toLocaleDateString()}
            </Text>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statsGrid}>
            {renderStatCard('heart', 'Favorites', stats.favoritesCount || 0, Colors.error)}
            {renderStatCard('eye', 'Viewed', stats.productsViewed || 0, Colors.info)}
            {renderStatCard('git-compare', 'Compared', stats.comparisonsCreated || 0, Colors.accent)}
            {renderStatCard('chatbubbles', 'Messages', stats.chatMessages || 0, Colors.secondary)}
          </View>
        </View>

        {/* Favorites */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorite Products</Text>
            <Text style={styles.sectionCount}>({favoriteProducts.length})</Text>
          </View>
          
          {favoriteProducts.length > 0 ? (
            <View style={styles.favoritesGrid}>
              {favoriteProducts.map((product) => (
                <View key={product.id}>
                  {renderFavoriteProduct({ item: product })}
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={48} color={Colors.gray300} />
              <Text style={styles.emptyStateText}>No favorites yet</Text>
              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => navigation.navigate(TAB_ROUTES.PRODUCTS_TAB)}
              >
                <Text style={styles.exploreButtonText}>Explore Products</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.preferencesContainer}>
            {renderPreferenceItem(
              'notifications',
              'Push Notifications',
              preferences.notifications || false,
              (value) => updatePreference('notifications', value),
              'Get notified about new AI tools and updates'
            )}
            
            {renderPreferenceItem(
              'moon',
              'Dark Mode',
              preferences.darkMode || false,
              (value) => updatePreference('darkMode', value),
              'Switch to dark theme (coming soon)'
            )}
            
            {renderPreferenceItem(
              'mail',
              'Email Updates',
              preferences.emailUpdates || false,
              (value) => updatePreference('emailUpdates', value),
              'Receive weekly newsletter with AI tool recommendations'
            )}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>{APP_CONFIG.VERSION}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>{APP_CONFIG.BUILD_NUMBER}</Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.actionButton} onPress={clearAllData}>
            <Ionicons name="trash-outline" size={20} color={Colors.error} />
            <Text style={styles.actionButtonText}>Clear All Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: Spacing.xl,
    paddingBottom: Spacing['2xl'],
    paddingHorizontal: Layout.screenPadding,
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.white + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  avatarText: {
    ...Typography.displaySmall,
    color: Colors.white,
    fontWeight: 'bold',
  },
  userName: {
    ...Typography.headingLarge,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  userEmail: {
    ...Typography.bodyMedium,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: Spacing.xs,
  },
  joinDate: {
    ...Typography.bodySmall,
    color: Colors.white,
    opacity: 0.8,
  },
  statsContainer: {
    paddingHorizontal: Layout.screenPadding,
    marginTop: -Spacing.xl,
    marginBottom: Spacing.xl,
  },
  statsGrid: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  statValue: {
    ...Typography.headingMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.headingMedium,
    color: Colors.textPrimary,
  },
  sectionCount: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
  favoritesGrid: {
    gap: Spacing.sm,
  },
  favoriteCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
  },
  favoriteImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  favoriteImageText: {
    ...Typography.labelMedium,
    color: Colors.white,
    fontWeight: 'bold',
  },
  favoriteInfo: {
    flex: 1,
  },
  favoriteName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  favoriteDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
    marginBottom: Spacing.xs,
  },
  favoriteMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  favoritePrice: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  removeFavoriteButton: {
    padding: Spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['2xl'],
  },
  emptyStateText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  exploreButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  exploreButtonText: {
    ...Typography.buttonMedium,
    color: Colors.white,
  },
  preferencesContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceText: {
    marginLeft: Spacing.sm,
    flex: 1,
  },
  preferenceLabel: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  preferenceDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 16,
  },
  infoContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  infoLabel: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
  },
  infoValue: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.error + '20',
  },
  actionButtonText: {
    ...Typography.labelMedium,
    color: Colors.error,
    marginLeft: Spacing.sm,
  },
});

export default ProfileScreen;
