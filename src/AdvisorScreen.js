import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';
import ProductCard from './components/ProductCard';
import { productCatalog } from './catalog';
// import { GoogleGenerativeAI } from '@google/generative-ai';

export default function AdvisorScreen() {
  const [query, setQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // For demo purposes, we'll simulate AI recommendations
  // In production, replace this with actual Gemini API integration
  const simulateAIRecommendations = async (userQuery) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simple keyword matching for demo
    const keywords = userQuery.toLowerCase();
    let matchedProducts = [];

    // Define recommendation logic based on keywords
    if (keywords.includes('laptop') || keywords.includes('computer')) {
      if (keywords.includes('gaming') || keywords.includes('game')) {
        matchedProducts = productCatalog.filter(p => p.id === 3);
      } else if (keywords.includes('lightweight') || keywords.includes('travel') || keywords.includes('portable')) {
        matchedProducts = productCatalog.filter(p => [1, 2, 4].includes(p.id));
      } else if (keywords.includes('business') || keywords.includes('work')) {
        matchedProducts = productCatalog.filter(p => [2, 4].includes(p.id));
      } else {
        matchedProducts = productCatalog.filter(p => p.category === 'Laptops').slice(0, 3);
      }
    } else if (keywords.includes('phone') || keywords.includes('smartphone')) {
      if (keywords.includes('camera') || keywords.includes('photo')) {
        matchedProducts = productCatalog.filter(p => [9, 10].includes(p.id));
      } else if (keywords.includes('android')) {
        matchedProducts = productCatalog.filter(p => [10, 11].includes(p.id));
      } else {
        matchedProducts = productCatalog.filter(p => p.category === 'Smartphones').slice(0, 3);
      }
    } else if (keywords.includes('tablet') || keywords.includes('ipad')) {
      matchedProducts = productCatalog.filter(p => p.category === 'Tablets');
    } else if (keywords.includes('headphones') || keywords.includes('earbuds') || keywords.includes('audio')) {
      if (keywords.includes('travel') || keywords.includes('noise')) {
        matchedProducts = productCatalog.filter(p => p.id === 7);
      } else if (keywords.includes('workout') || keywords.includes('gym')) {
        matchedProducts = productCatalog.filter(p => p.id === 8);
      } else {
        matchedProducts = productCatalog.filter(p => p.category === 'Headphones');
      }
    } else {
      // Default to top 3 products across categories
      matchedProducts = productCatalog.slice(0, 3);
    }

    // Add AI reasoning for each recommendation
    return matchedProducts.slice(0, 3).map(product => ({
      ...product,
      aiReasoning: generateAIReasoning(product, userQuery)
    }));
  };

  const generateAIReasoning = (product, query) => {
    const reasons = [];
    const queryLower = query.toLowerCase();

    if (queryLower.includes('lightweight') && parseFloat(product.weight) < 3) {
      reasons.push(`At ${product.weight}, this is exceptionally lightweight for travel`);
    }

    if (queryLower.includes('battery') && product.battery_life.includes('hour')) {
      reasons.push(`Excellent ${product.battery_life} battery life meets your needs`);
    }

    if (queryLower.includes('work') || queryLower.includes('business')) {
      const businessFeatures = product.features.filter(f => 
        f.includes('Pro') || f.includes('i7') || f.includes('RAM')
      );
      if (businessFeatures.length > 0) {
        reasons.push('Professional-grade specs ideal for business use');
      }
    }

    if (queryLower.includes('gaming') && product.features.some(f => f.includes('RTX'))) {
      reasons.push('Powerful graphics capabilities perfect for gaming');
    }

    if (reasons.length === 0) {
      reasons.push(`Strong match for your "${query}" requirements based on features and specifications`);
    }

    return reasons.join('. ') + '.';
  };

  // Real Gemini API integration (commented for demo)
  /*
  const getAIRecommendations = async (userQuery) => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      const prompt = `You are an expert product advisor. Based on the user's query: "${userQuery}"

      Analyze these products and recommend the 3 most suitable ones:
      ${JSON.stringify(productCatalog)}

      For each recommended product, explain why it matches the user's needs.
      Respond with a JSON array containing objects with:
      - All original product fields
      - aiReasoning: string explaining why this product was recommended

      Focus on matching the user's specific requirements like use case, budget, features, etc.`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      // Parse the AI response
      const recommendations = JSON.parse(response);
      return recommendations;
    } catch (error) {
      console.error('AI API Error:', error);
      throw error;
    }
  };
  */

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert('Please enter your product needs', 'Describe what you're looking for in the text area above.');
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      // Use simulated AI for demo - replace with real API call
      const aiRecommendations = await simulateAIRecommendations(query);
      // const aiRecommendations = await getAIRecommendations(query); // Real API

      setRecommendations(aiRecommendations);
    } catch (error) {
      Alert.alert(
        'Error Getting Recommendations', 
        'Sorry, we couldn't process your request right now. Please try again.'
      );
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setRecommendations([]);
    setHasSearched(false);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>AI Product Advisor</Text>
          <Text style={styles.subtitle}>
            Describe your needs in plain English and get intelligent product recommendations
          </Text>
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>What are you looking for?</Text>
          <TextInput
            style={styles.textInput}
            value={query}
            onChangeText={setQuery}
            placeholder="e.g., I need a lightweight laptop for travel with long battery life..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.searchButton, loading && styles.searchButtonDisabled]}
              onPress={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator color="#fff" size="small" />
                  <Text style={styles.searchButtonText}>Processing...</Text>
                </View>
              ) : (
                <Text style={styles.searchButtonText}>Get Recommendations</Text>
              )}
            </TouchableOpacity>

            {hasSearched && (
              <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
                <Text style={styles.clearButtonText}>Clear Results</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Results Section */}
        {hasSearched && (
          <View style={styles.resultsSection}>
            {loading ? (
              <View style={styles.loadingSection}>
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text style={styles.loadingText}>Analyzing your needs...</Text>
                <Text style={styles.loadingSubtext}>Our AI is finding the perfect products for you</Text>
              </View>
            ) : recommendations.length > 0 ? (
              <>
                <Text style={styles.resultsTitle}>Recommended for You</Text>
                <Text style={styles.resultsSubtitle}>
                  Based on your query: "{query}"
                </Text>
                {recommendations.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </>
            ) : (
              <View style={styles.noResults}>
                <Text style={styles.noResultsText}>No recommendations found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try describing your needs differently or being more specific
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  inputSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
    minHeight: 100,
    marginBottom: 16,
  },
  buttonContainer: {
    gap: 12,
  },
  searchButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  resultsSection: {
    padding: 16,
  },
  loadingSection: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
    textAlign: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    paddingHorizontal: 8,
    fontStyle: 'italic',
  },
  noResults: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 8,
  },
  noResultsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  noResultsSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
