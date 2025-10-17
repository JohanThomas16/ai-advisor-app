// AI Product Advisor - Products Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import styles and data
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { PRODUCTS } from '../data/products';
import { CATEGORIES, CATEGORY_LABELS, ROUTES } from '../utils/constants';
import storageService from '../services/storage';

const ProductsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES.ALL);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
    
    // Handle navigation params
    if (route.params?.searchQuery) {
      setSearchQuery(route.params.searchQuery);
      filterProducts(route.params.searchQuery, selectedCategory);
    }
    
    if (route.params?.category) {
      setSelectedCategory(route.params.category);
      filterProducts(searchQuery, route.params.category);
    }
  }, [route.params]);

  useEffect(() => {
    filterProducts(searchQuery, selectedCategory);
  }, [searchQuery, selectedCategory]);

  const loadFavorites = async () => {
    const favs = await storageService.getFavorites();
    setFavorites(favs);
  };

  const filterProducts = (query, category) => {
    let filtered = products;

    // Filter by category
    if (category !== CATEGORIES.ALL) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    if (query.trim()) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        product.features.some(feature => 
          feature.toLowerCase().includes(lowerQuery)
        )
      );
    }

    setFilteredProducts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      storageService.addRecentSearch(query.trim());
    }
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
  };

  const handleProductPress = (product) => {
    navigation.navigate(ROUTES.PRODUCT_DETAIL, { product });
  };

  const toggleFavorite = async (productId) => {
    await storageService.toggleFavorite(productId);
    loadFavorites();
  };

  const renderCategoryTab = (category, label) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        selectedCategory === category && styles.categoryTabActive
      ]}
      onPress={() => handleCategoryPress(category)}
      activeOpacity={0.7}
    >
      <Text style={[
        styles.categoryTabText,
        selectedCategory === category && styles.categoryTabTextActive
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.8}
      >
        <View style={styles.productHeader}>
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
          
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={() => toggleFavorite(item.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={20}
              color={isFavorite ? Colors.error : Colors.gray400}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.productContent}>
          <Text style={styles.productName} numberOfLines={1}>
            {item.name}
          </Text>
          
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.shortDescription}
          </Text>

          <View style={styles.productFeatures}>
            {item.features.slice(0, 2).map((feature, index) => (
              <View key={index} style={styles.featureTag}>
                <Text style={styles.featureText} numberOfLines={1}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.productFooter}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color={Colors.warning} />
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewCount}>({item.reviewCount})</Text>
            </View>
            
            <View style={styles.pricing}>
              <Text style={styles.priceText}>
                {item.pricing.free ? 'Free' : `$${item.pricing.startingPrice}`}
              </Text>
              {!item.pricing.free && (
                <Text style={styles.pricePeriod}>/{item.pricing.period}</Text>
              )}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={Gradients.primary} style={styles.header}>
        <Text style={styles.headerTitle}>AI Products</Text>
        <Text style={styles.headerSubtitle}>
          {filteredProducts.length} products found
        </Text>
      </LinearGradient>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.gray400} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={Colors.gray400} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        {renderCategoryTab(CATEGORIES.ALL, 'All')}
        {renderCategoryTab(CATEGORIES.AI_ASSISTANTS, CATEGORY_LABELS[CATEGORIES.AI_ASSISTANTS])}
        {renderCategoryTab(CATEGORIES.AI_ART, CATEGORY_LABELS[CATEGORIES.AI_ART])}
        {renderCategoryTab(CATEGORIES.PRODUCTIVITY, CATEGORY_LABELS[CATEGORIES.PRODUCTIVITY])}
        {renderCategoryTab(CATEGORIES.DEVELOPMENT, CATEGORY_LABELS[CATEGORIES.DEVELOPMENT])}
      </ScrollView>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
        numColumns={1}
      />
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
    paddingBottom: Spacing.xl,
    paddingHorizontal: Layout.screenPadding,
    alignItems: 'center',
  },
  headerTitle: {
    ...Typography.headingLarge,
    color: Colors.white,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    ...Typography.bodyMedium,
    color: Colors.white,
    opacity: 0.9,
  },
  searchContainer: {
    paddingHorizontal: Layout.screenPadding,
    marginTop: -Spacing.lg,
    marginBottom: Spacing.lg,
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
  categoryTabs: {
    marginBottom: Spacing.lg,
  },
  categoryTabsContent: {
    paddingHorizontal: Layout.screenPadding,
    gap: Spacing.sm,
  },
  categoryTab: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.gray100,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
  },
  categoryTabText: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
  },
  categoryTabTextActive: {
    color: Colors.white,
  },
  productsList: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing['2xl'],
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: Spacing.lg,
    paddingBottom: 0,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    overflow: 'hidden',
  },
  productImageGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImageText: {
    ...Typography.labelLarge,
    color: Colors.white,
    fontWeight: 'bold',
  },
  favoriteButton: {
    padding: Spacing.sm,
  },
  productContent: {
    padding: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  productName: {
    ...Typography.headingSmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  productDescription: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    lineHeight: 20,
  },
  productFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  featureTag: {
    backgroundColor: Colors.gray100,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 6,
    maxWidth: '48%',
  },
  featureText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
    marginLeft: Spacing.xs,
  },
  reviewCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    ...Typography.labelLarge,
    color: Colors.primary,
    fontWeight: '600',
  },
  pricePeriod: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});

export default ProductsScreen;
