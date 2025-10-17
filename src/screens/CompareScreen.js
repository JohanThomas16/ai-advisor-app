// AI Product Advisor - Compare Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import styles and data
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { PRODUCTS } from '../data/products';
import { APP_CONFIG } from '../utils/constants';
import storageService from '../services/storage';

const CompareScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [compareProducts, setCompareProducts] = useState([]);
  const [availableProducts, setAvailableProducts] = useState(PRODUCTS);

  useEffect(() => {
    initializeComparison();
  }, []);

  const initializeComparison = () => {
    let initialProducts = [];
    
    // Check if we have an initial product from navigation
    if (route.params?.initialProduct) {
      initialProducts = [route.params.initialProduct];
    }
    
    setCompareProducts(initialProducts);
  };

  const addProductToComparison = (product) => {
    if (compareProducts.length >= APP_CONFIG.MAX_COMPARISON_ITEMS) {
      Alert.alert(
        'Maximum Reached',
        `You can compare up to ${APP_CONFIG.MAX_COMPARISON_ITEMS} products at once.`
      );
      return;
    }
    
    if (compareProducts.find(p => p.id === product.id)) {
      Alert.alert('Already Added', 'This product is already in your comparison.');
      return;
    }
    
    setCompareProducts([...compareProducts, product]);
  };

  const removeProductFromComparison = (productId) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  const saveComparison = async () => {
    if (compareProducts.length < 2) {
      Alert.alert('Not Enough Products', 'Please add at least 2 products to save comparison.');
      return;
    }
    
    const comparison = {
      products: compareProducts.map(p => p.id),
      title: compareProducts.map(p => p.name).join(' vs '),
    };
    
    await storageService.addComparisonHistory(comparison);
    Alert.alert('Saved', 'Comparison saved to your history!');
  };

  const renderProductSelector = () => (
    <View style={styles.selectorContainer}>
      <Text style={styles.selectorTitle}>Add Products to Compare</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {availableProducts
          .filter(product => !compareProducts.find(p => p.id === product.id))
          .map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.selectorCard}
              onPress={() => addProductToComparison(product)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={Gradients.primary}
                style={styles.selectorImage}
              >
                <Text style={styles.selectorImageText}>
                  {product.name.substring(0, 2).toUpperCase()}
                </Text>
              </LinearGradient>
              <Text style={styles.selectorName} numberOfLines={1}>
                {product.name}
              </Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );

  const renderComparisonHeader = () => (
    <View style={styles.comparisonHeader}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.featureColumn}>
            <Text style={styles.headerTitle}>Features</Text>
          </View>
          {compareProducts.map((product) => (
            <View key={product.id} style={styles.productColumn}>
              <View style={styles.productHeaderCard}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeProductFromComparison(product.id)}
                >
                  <Ionicons name="close" size={16} color={Colors.gray400} />
                </TouchableOpacity>
                
                <LinearGradient
                  colors={Gradients.primary}
                  style={styles.productHeaderImage}
                >
                  <Text style={styles.productHeaderImageText}>
                    {product.name.substring(0, 2).toUpperCase()}
                  </Text>
                </LinearGradient>
                
                <Text style={styles.productHeaderName} numberOfLines={2}>
                  {product.name}
                </Text>
                
                <View style={styles.productHeaderRating}>
                  <Ionicons name="star" size={14} color={Colors.warning} />
                  <Text style={styles.productHeaderRatingText}>
                    {product.rating}
                  </Text>
                </View>
                
                <Text style={styles.productHeaderPrice}>
                  {product.pricing.free ? 'Free' : `$${product.pricing.startingPrice}`}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderComparisonTable = () => {
    if (compareProducts.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="git-compare-outline" size={64} color={Colors.gray300} />
          <Text style={styles.emptyStateTitle}>No Products to Compare</Text>
          <Text style={styles.emptyStateText}>
            Add products from the list above to start comparing
          </Text>
        </View>
      );
    }

    const comparisonRows = [
      { key: 'rating', label: 'Rating', getValue: (p) => `${p.rating}/5` },
      { key: 'reviews', label: 'Reviews', getValue: (p) => p.reviewCount.toLocaleString() },
      { key: 'pricing', label: 'Pricing', getValue: (p) => p.pricing.free ? 'Free' : `$${p.pricing.startingPrice}/${p.pricing.period}` },
      { key: 'category', label: 'Category', getValue: (p) => p.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) },
    ];

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.comparisonTable}>
          {comparisonRows.map((row) => (
            <View key={row.key} style={styles.comparisonRow}>
              <View style={styles.featureColumn}>
                <Text style={styles.featureLabel}>{row.label}</Text>
              </View>
              {compareProducts.map((product) => (
                <View key={product.id} style={styles.productColumn}>
                  <Text style={styles.featureValue}>
                    {row.getValue(product)}
                  </Text>
                </View>
              ))}
            </View>
          ))}
          
          {/* Features Comparison */}
          <View style={styles.featuresSection}>
            <View style={styles.featureColumn}>
              <Text style={styles.featureSectionTitle}>Key Features</Text>
            </View>
            {compareProducts.map((product) => (
              <View key={product.id} style={styles.productColumn}>
                <View style={styles.featuresList}>
                  {product.features.slice(0, 5).map((feature, index) => (
                    <View key={index} style={styles.featureItem}>
                      <Ionicons name="checkmark" size={14} color={Colors.success} />
                      <Text style={styles.featureItemText} numberOfLines={2}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={Gradients.primary} style={styles.header}>
        <Text style={styles.headerTitle}>Compare Products</Text>
        <Text style={styles.headerSubtitle}>
          {compareProducts.length} of {APP_CONFIG.MAX_COMPARISON_ITEMS} products selected
        </Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Selector */}
        {renderProductSelector()}

        {/* Comparison Header */}
        {compareProducts.length > 0 && renderComparisonHeader()}

        {/* Comparison Table */}
        <View style={styles.tableContainer}>
          {renderComparisonTable()}
        </View>

        {/* Action Buttons */}
        {compareProducts.length >= 2 && (
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveComparison}
              activeOpacity={0.8}
            >
              <LinearGradient colors={Gradients.accent} style={styles.buttonGradient}>
                <Ionicons name="bookmark-outline" size={20} color={Colors.white} />
                <Text style={styles.buttonText}>Save Comparison</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
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
  selectorContainer: {
    padding: Layout.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  selectorTitle: {
    ...Typography.headingSmall,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  selectorCard: {
    alignItems: 'center',
    marginRight: Spacing.lg,
    width: 80,
  },
  selectorImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  selectorImageText: {
    ...Typography.labelMedium,
    color: Colors.white,
    fontWeight: 'bold',
  },
  selectorName: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  comparisonHeader: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.lg,
  },
  featureColumn: {
    width: 120,
    paddingHorizontal: Spacing.sm,
    justifyContent: 'center',
  },
  productColumn: {
    width: 150,
    paddingHorizontal: Spacing.sm,
  },
  productHeaderCard: {
    alignItems: 'center',
    position: 'relative',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: 5,
    zIndex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.xs,
  },
  productHeaderImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  productHeaderImageText: {
    ...Typography.labelSmall,
    color: Colors.white,
    fontWeight: 'bold',
  },
  productHeaderName: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.xs,
  },
  productHeaderRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  productHeaderRatingText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  productHeaderPrice: {
    ...Typography.labelMedium,
    color: Colors.primary,
    fontWeight: '600',
  },
  tableContainer: {
    backgroundColor: Colors.white,
  },
  comparisonTable: {
    paddingVertical: Spacing.lg,
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray100,
  },
  featureLabel: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
  },
  featureValue: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  featuresSection: {
    flexDirection: 'row',
    paddingTop: Spacing.lg,
    borderTopWidth: 2,
    borderTopColor: Colors.gray200,
  },
  featureSectionTitle: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  featuresList: {
    gap: Spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  featureItemText: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
    flex: 1,
    lineHeight: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
    paddingHorizontal: Layout.screenPadding,
  },
  emptyStateTitle: {
    ...Typography.headingMedium,
    color: Colors.textPrimary,
    marginTop: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  emptyStateText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  actionButtons: {
    padding: Layout.screenPadding,
  },
  saveButton: {
    width: '100%',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    gap: Spacing.sm,
  },
  buttonText: {
    ...Typography.buttonMedium,
    color: Colors.white,
  },
});

export default CompareScreen;
