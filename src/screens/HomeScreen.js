// AI Product Advisor - Home Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import styles and data
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { PRODUCTS } from '../data/products';
import { MOCK_CATEGORIES } from '../data/mockData';
import { ROUTES, TAB_ROUTES } from '../utils/constants';
import storageService from '../services/storage';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userName, setUserName] = useState('User');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadUserData();
    loadFeaturedProducts();
  }, []);

  const loadUserData = async () => {
    // In a real app, this would come from user authentication
    setUserName('Johan');
  };

  const loadFeaturedProducts = () => {
    const featured = PRODUCTS.filter(product => product.featured);
    setFeaturedProducts(featured);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      storageService.addRecentSearch(searchQuery);
      navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
        screen: ROUTES.PRODUCTS,
        params: { searchQuery: searchQuery.trim() }
      });
    }
  };

  const handleCategoryPress = (category) => {
    navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
      screen: ROUTES.PRODUCTS,
      params: { category: category.id }
    });
  };

  const handleProductPress = (product) => {
    navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
      screen: ROUTES.PRODUCT_DETAIL,
      params: { product }
    });
  };

  const handleAIAdvisorPress = () => {
    navigation.navigate(TAB_ROUTES.AI_ADVISOR_TAB);
  };

  const handleComparePress = () => {
    navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
      screen: ROUTES.COMPARE
    });
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={[item.color + '20', item.color + '10']}
        style={styles.categoryGradient}
      >
        <View style={[styles.categoryIcon, { backgroundColor: item.color }]}>
          <Ionicons name={item.icon} size={24} color={Colors.white} />
        </View>
        <Text style={styles.categoryName}>{item.name}</Text>
        <Text style={styles.categoryCount}>{item.productCount} tools</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderFeaturedProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.productImage}>
        <LinearGradient
          colors={Gradients.primary}
          style={styles.productImageGradient}
        >
          <Text style={styles.productImageText}>
            {item.name.substring(0, 2).toUpperCase()}
          </Text>
        </LinearGradient>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>
          {item.shortDescription}
        </Text>
        <View style={styles.productMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color={Colors.warning} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.productPrice}>
            {item.pricing.free ? 'Free' : `$${item.pricing.startingPrice}/${item.pricing.period}`}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with Gradient */}
        <LinearGradient colors={Gradients.hero} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Good morning, {userName}! 👋</Text>
            <Text style={styles.subtitle}>
              Discover the perfect AI tools for your needs
            </Text>
          </View>
        </LinearGradient>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.gray400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search AI products..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color={Colors.gray400} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={MOCK_CATEGORIES}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.categoriesGrid}
          />
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Products</Text>
            <TouchableOpacity onPress={() => navigation.navigate(TAB_ROUTES.PRODUCTS_TAB)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={featuredProducts}
            renderItem={renderFeaturedProduct}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsCarousel}
          />
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleAIAdvisorPress}
              activeOpacity={0.8}
            >
              <LinearGradient colors={Gradients.ai} style={styles.actionGradient}>
                <Ionicons name="chatbubbles" size={24} color={Colors.white} />
                <Text style={styles.actionText}>Get AI Advice</Text>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleComparePress}
              activeOpacity={0.8}
            >
              <LinearGradient colors={Gradients.secondary} style={styles.actionGradient}>
                <Ionicons name="git-compare" size={24} color={Colors.white} />
                <Text style={styles.actionText}>Compare Tools</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
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
  },
  headerContent: {
    alignItems: 'center',
  },
  greeting: {
    ...Typography.headingLarge,
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.white,
    textAlign: 'center',
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: Layout.screenPadding,
    marginTop: -Spacing.lg,
    marginBottom: Spacing.xl,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
  },
  section: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    ...Typography.headingMedium,
    color: Colors.textPrimary,
  },
  seeAllText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
  categoriesGrid: {
    gap: Spacing.md,
  },
  categoryCard: {
    flex: 1,
    marginHorizontal: Spacing.xs,
    marginVertical: Spacing.xs,
  },
  categoryGradient: {
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  categoryName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  categoryCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  productsCarousel: {
    paddingRight: Layout.screenPadding,
  },
  productCard: {
    width: 200,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginRight: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productImage: {
    height: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  productImageGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageText: {
    ...Typography.headingMedium,
    color: Colors.white,
    fontWeight: 'bold',
  },
  productInfo: {
    padding: Spacing.lg,
  },
  productName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  productDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 18,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.labelSmall,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  productPrice: {
    ...Typography.labelMedium,
    color: Colors.primary,
    fontWeight: '600',
  },
  quickActions: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  actionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
  },
  actionText: {
    ...Typography.buttonMedium,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
});

export default HomeScreen;
