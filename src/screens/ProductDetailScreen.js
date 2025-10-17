// AI Product Advisor - Product Detail Screen
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import styles and data
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { MOCK_REVIEWS } from '../data/mockData';
import { ROUTES } from '../utils/constants';
import storageService from '../services/storage';

const ProductDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    loadProductData();
  }, []);

  const loadProductData = async () => {
    // Check if product is in favorites
    const favStatus = await storageService.isFavorite(product.id);
    setIsFavorite(favStatus);
    
    // Load reviews
    const productReviews = MOCK_REVIEWS[product.id] || [];
    setReviews(productReviews);
  };

  const toggleFavorite = async () => {
    await storageService.toggleFavorite(product.id);
    setIsFavorite(!isFavorite);
  };

  const handleWebsitePress = () => {
    Linking.openURL(product.website).catch(() => {
      Alert.alert('Error', 'Could not open website');
    });
  };

  const handleComparePress = () => {
    navigation.navigate(ROUTES.COMPARE, { 
      initialProduct: product 
    });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={Colors.warning} />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color={Colors.warning} />
      );
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color={Colors.gray300} />
      );
    }
    
    return stars;
  };

  const renderOverviewTab = () => (
    <View style={styles.tabContent}>
      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        {product.features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Pros and Cons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pros & Cons</Text>
        
        <View style={styles.prosConsContainer}>
          <View style={styles.prosContainer}>
            <Text style={styles.prosConsTitle}>Pros</Text>
            {product.pros.map((pro, index) => (
              <View key={index} style={styles.prosConsItem}>
                <Ionicons name="add-circle" size={16} color={Colors.success} />
                <Text style={styles.prosConsText}>{pro}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.consContainer}>
            <Text style={styles.prosConsTitle}>Cons</Text>
            {product.cons.map((con, index) => (
              <View key={index} style={styles.prosConsItem}>
                <Ionicons name="remove-circle" size={16} color={Colors.error} />
                <Text style={styles.prosConsText}>{con}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Use Cases */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use Cases</Text>
        <View style={styles.useCasesContainer}>
          {product.useCases.map((useCase, index) => (
            <View key={index} style={styles.useCaseTag}>
              <Text style={styles.useCaseText}>{useCase}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  const renderReviewsTab = () => (
    <View style={styles.tabContent}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <View key={review.id} style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{review.userAvatar}</Text>
                </View>
                <View>
                  <Text style={styles.userName}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                  </View>
                </View>
              </View>
              <Text style={styles.reviewDate}>{review.date}</Text>
            </View>
            
            <Text style={styles.reviewTitle}>{review.title}</Text>
            <Text style={styles.reviewComment}>{review.comment}</Text>
            
            <View style={styles.reviewFooter}>
              <TouchableOpacity style={styles.helpfulButton}>
                <Ionicons name="thumbs-up-outline" size={16} color={Colors.gray400} />
                <Text style={styles.helpfulText}>Helpful ({review.helpful})</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noReviews}>
          <Ionicons name="chatbubbles-outline" size={48} color={Colors.gray300} />
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient
            colors={Gradients.primary}
            style={styles.productImageLarge}
          >
            <Text style={styles.productImageTextLarge}>
              {product.name.substring(0, 2).toUpperCase()}
            </Text>
          </LinearGradient>
          
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDescription}>{product.description}</Text>
            
            <View style={styles.productMeta}>
              <View style={styles.rating}>
                {renderStars(product.rating)}
                <Text style={styles.ratingText}>{product.rating}</Text>
                <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
              </View>
              
              <View style={styles.pricing}>
                <Text style={styles.priceText}>
                  {product.pricing.free ? 'Free' : `$${product.pricing.startingPrice}`}
                </Text>
                {!product.pricing.free && (
                  <Text style={styles.pricePeriod}>/{product.pricing.period}</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={24}
              color={isFavorite ? Colors.error : Colors.gray400}
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleWebsitePress}
            activeOpacity={0.8}
          >
            <LinearGradient colors={Gradients.primary} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>Visit Website</Text>
              <Ionicons name="open-outline" size={20} color={Colors.white} />
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.compareButton}
            onPress={handleComparePress}
            activeOpacity={0.8}
          >
            <Ionicons name="git-compare-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'overview' && styles.tabActive]}
            onPress={() => setSelectedTab('overview')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'overview' && styles.tabTextActive
            ]}>
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'reviews' && styles.tabActive]}
            onPress={() => setSelectedTab('reviews')}
          >
            <Text style={[
              styles.tabText,
              selectedTab === 'reviews' && styles.tabTextActive
            ]}>
              Reviews ({reviews.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'overview' ? renderOverviewTab() : renderReviewsTab()}
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
    padding: Layout.screenPadding,
    alignItems: 'center',
  },
  productImageLarge: {
    width: 120,
    height: 120,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  productImageTextLarge: {
    ...Typography.displaySmall,
    color: Colors.white,
    fontWeight: 'bold',
  },
  productInfo: {
    alignItems: 'center',
  },
  productName: {
    ...Typography.headingLarge,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  productDescription: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  productMeta: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  ratingText: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
    marginLeft: Spacing.xs,
  },
  reviewCount: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  pricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceText: {
    ...Typography.headingMedium,
    color: Colors.primary,
    fontWeight: '600',
  },
  pricePeriod: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    flex: 1,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 24,
    gap: Spacing.sm,
  },
  buttonText: {
    ...Typography.buttonLarge,
    color: Colors.white,
  },
  compareButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
  tabActive: {
    borderBottomColor: Colors.primary,
  },
  tabText: {
    ...Typography.labelLarge,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  tabContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Spacing['2xl'],
  },
  section: {
    marginBottom: Spacing['2xl'],
  },
  sectionTitle: {
    ...Typography.headingMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.lg,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  featureText: {
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    marginLeft: Spacing.sm,
    flex: 1,
  },
  prosConsContainer: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  prosContainer: {
    flex: 1,
  },
  consContainer: {
    flex: 1,
  },
  prosConsTitle: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  prosConsItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  prosConsText: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
    flex: 1,
    lineHeight: 18,
  },
  useCasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  useCaseTag: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
  },
  useCaseText: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },
  reviewCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  userAvatarText: {
    ...Typography.labelMedium,
    color: Colors.white,
    fontWeight: '600',
  },
  userName: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  reviewRating: {
    flexDirection: 'row',
  },
  reviewDate: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  reviewTitle: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  reviewComment: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.sm,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  helpfulButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  helpfulText: {
    ...Typography.caption,
    color: Colors.textTertiary,
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  noReviewsText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginTop: Spacing.lg,
  },
});

export default ProductDetailScreen;
