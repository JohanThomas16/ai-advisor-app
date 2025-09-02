import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProductCard({ product }) {
  const formatPrice = (price) => {
    return `$${price.toLocaleString()}`;
  };

  const getProductImage = (productName) => {
    // Placeholder images - in production, use actual product images
    const imageMap = {
      'MacBook Air M2': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=MacBook+Air',
      'Dell XPS 13': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Dell+XPS+13',
      'Gaming Laptop ROG Strix': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=ROG+Strix',
      'Lenovo ThinkPad X1 Carbon': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=ThinkPad',
      'iPad Pro 12.9-inch': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=iPad+Pro',
      'Samsung Galaxy Tab S9': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Galaxy+Tab',
      'Sony WH-1000XM5': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Sony+WH1000XM5',
      'Apple AirPods Pro 2': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=AirPods+Pro',
      'iPhone 15 Pro': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=iPhone+15+Pro',
      'Samsung Galaxy S24 Ultra': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Galaxy+S24',
      'Google Pixel 8': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Pixel+8',
      'Monitor 4K 27-inch': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=4K+Monitor',
      'Mechanical Keyboard RGB': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=RGB+Keyboard',
      'Wireless Mouse Pro': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Pro+Mouse',
      'Webcam 4K Ultra': 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=4K+Webcam',
    };

    return imageMap[productName] || 'https://via.placeholder.com/200x150/E5E7EB/6B7280?text=Product';
  };

  return (
    <View style={styles.card}>
      {/* Product Image */}
      <Image 
        source={{ uri: getProductImage(product.name) }} 
        style={styles.image}
        resizeMode="cover"
      />

      {/* Product Info */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>{product.description}</Text>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featuresList}>
            {product.features.slice(0, 4).map((feature, index) => (
              <Text key={index} style={styles.feature}>• {feature}</Text>
            ))}
          </View>
        </View>

        {/* Specifications */}
        <View style={styles.specsContainer}>
          {product.weight && product.weight !== 'N/A' && (
            <View style={styles.spec}>
              <Text style={styles.specLabel}>Weight:</Text>
              <Text style={styles.specValue}>{product.weight}</Text>
            </View>
          )}
          {product.battery_life && product.battery_life !== 'N/A' && (
            <View style={styles.spec}>
              <Text style={styles.specLabel}>Battery:</Text>
              <Text style={styles.specValue}>{product.battery_life}</Text>
            </View>
          )}
        </View>

        {/* AI Recommendation Reasoning */}
        {product.aiReasoning && (
          <View style={styles.aiSection}>
            <Text style={styles.aiTitle}>🤖 Why we recommend this</Text>
            <Text style={styles.aiReasoning}>{product.aiReasoning}</Text>
          </View>
        )}

        {/* Category Badge */}
        <View style={styles.footer}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  brand: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
  },
  description: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  featuresList: {
    gap: 4,
  },
  feature: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 18,
  },
  specsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  spec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  specLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  specValue: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  aiSection: {
    backgroundColor: '#EFF6FF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E40AF',
    marginBottom: 6,
  },
  aiReasoning: {
    fontSize: 13,
    color: '#1F2937',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  categoryBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
