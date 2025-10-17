// AI Product Advisor - AI Advisor Screen
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import styles and services
import { Colors, Gradients } from '../styles/Colors';
import { Typography } from '../styles/Typography';
import { Spacing, Layout } from '../styles/Spacing';
import { CHAT_CONFIG, ANIMATIONS, TAB_ROUTES, ROUTES } from '../utils/constants';
import aiService from '../services/aiService';

const AIAdvisorScreen = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(CHAT_CONFIG.SUGGESTED_QUESTIONS);

  useEffect(() => {
    initializeChat();
  }, []);

  const initializeChat = async () => {
    // Load chat history
    const history = aiService.getConversationContext();
    if (history.length === 0) {
      // Send initial greeting
      const greeting = await aiService.generateResponse('hello');
      const welcomeMessage = {
        id: 'welcome',
        text: greeting.message,
        isUser: false,
        timestamp: new Date().toISOString(),
        suggestions: greeting.suggestions,
        recommendedProducts: greeting.recommendedProducts,
      };
      setMessages([welcomeMessage]);
      setSuggestions(greeting.suggestions);
    } else {
      // Convert history to message format
      const chatMessages = history.map((msg, index) => ({
        id: `msg_${index}`,
        text: msg.message,
        isUser: msg.role === 'user',
        timestamp: msg.timestamp,
      }));
      setMessages(chatMessages);
    }
  };

  const sendMessage = async (messageText = inputText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      text: messageText.trim(),
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, ANIMATIONS.TYPING_DELAY));
      
      // Get AI response
      const response = await aiService.generateResponse(messageText.trim());
      
      const aiMessage = {
        id: `ai_${Date.now()}`,
        text: response.message,
        isUser: false,
        timestamp: response.timestamp,
        suggestions: response.suggestions,
        recommendedProducts: response.recommendedProducts,
      };

      setMessages(prev => [...prev, aiMessage]);
      setSuggestions(response.suggestions);
      setIsTyping(false);

      // Scroll to bottom
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    sendMessage(suggestion);
  };

  const handleProductPress = (product) => {
    navigation.navigate(TAB_ROUTES.PRODUCTS_TAB, {
      screen: ROUTES.PRODUCT_DETAIL,
      params: { product }
    });
  };

  const renderMessage = ({ item }) => (
    <View style={[
      styles.messageContainer,
      item.isUser ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      {!item.isUser && (
        <View style={styles.aiAvatar}>
          <LinearGradient colors={Gradients.ai} style={styles.avatarGradient}>
            <Ionicons name="sparkles" size={16} color={Colors.white} />
          </LinearGradient>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        item.isUser ? styles.userMessageBubble : styles.aiMessageBubble
      ]}>
        <Text style={[
          styles.messageText,
          item.isUser ? styles.userMessageText : styles.aiMessageText
        ]}>
          {item.text}
        </Text>
      </View>

      {item.isUser && (
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>You</Text>
        </View>
      )}

      {/* Recommended Products */}
      {!item.isUser && item.recommendedProducts && item.recommendedProducts.length > 0 && (
        <View style={styles.recommendationsContainer}>
          <Text style={styles.recommendationsTitle}>Recommended Products:</Text>
          {item.recommendedProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productRecommendation}
              onPress={() => handleProductPress(product)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={Gradients.primary}
                style={styles.productImage}
              >
                <Text style={styles.productImageText}>
                  {product.name.substring(0, 2).toUpperCase()}
                </Text>
              </LinearGradient>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={1}>
                  {product.name}
                </Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                  {product.shortDescription}
                </Text>
                <View style={styles.productMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={12} color={Colors.warning} />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                  <Text style={styles.productPrice}>
                    {product.pricing.free ? 'Free' : `$${product.pricing.startingPrice}`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={styles.typingContainer}>
      <View style={styles.aiAvatar}>
        <LinearGradient colors={Gradients.ai} style={styles.avatarGradient}>
          <Ionicons name="sparkles" size={16} color={Colors.white} />
        </LinearGradient>
      </View>
      <View style={styles.typingBubble}>
        <ActivityIndicator size="small" color={Colors.primary} />
        <Text style={styles.typingText}>AI is thinking...</Text>
      </View>
    </View>
  );

  const renderSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      <Text style={styles.suggestionsTitle}>Suggested Questions:</Text>
      <View style={styles.suggestionsGrid}>
        {suggestions.map((suggestion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.suggestionChip}
            onPress={() => handleSuggestionPress(suggestion)}
            activeOpacity={0.8}
          >
            <Text style={styles.suggestionText} numberOfLines={2}>
              {suggestion}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={Gradients.ai} style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="sparkles" size={24} color={Colors.white} />
          <Text style={styles.headerTitle}>AI Product Advisor</Text>
        </View>
        <Text style={styles.headerSubtitle}>
          Ask me anything about AI tools and products
        </Text>
      </LinearGradient>

      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Typing Indicator */}
        {isTyping && renderTypingIndicator()}

        {/* Suggestions */}
        {messages.length <= 1 && renderSuggestions()}

        {/* Input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Ask about AI products..."
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={CHAT_CONFIG.MAX_MESSAGE_LENGTH}
              returnKeyType="send"
              onSubmitEditing={() => sendMessage()}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                inputText.trim().length > 0 && styles.sendButtonActive
              ]}
              onPress={() => sendMessage()}
              disabled={!inputText.trim() || isTyping}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={inputText.trim().length > 0 ? Colors.white : Colors.gray400} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  headerTitle: {
    ...Typography.headingLarge,
    color: Colors.white,
    marginLeft: Spacing.sm,
  },
  headerSubtitle: {
    ...Typography.bodyMedium,
    color: Colors.white,
    opacity: 0.9,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Spacing.lg,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.lg,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: Spacing.sm,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  userAvatarText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: '600',
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 18,
  },
  userMessageBubble: {
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  aiMessageBubble: {
    backgroundColor: Colors.white,
    borderBottomLeftRadius: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  messageText: {
    ...Typography.bodyMedium,
    lineHeight: 20,
  },
  userMessageText: {
    color: Colors.white,
  },
  aiMessageText: {
    color: Colors.textPrimary,
  },
  recommendationsContainer: {
    marginTop: Spacing.sm,
    marginLeft: 44, // Account for avatar width + margin
    maxWidth: '75%',
  },
  recommendationsTitle: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  productRecommendation: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  productImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
  },
  productImageText: {
    ...Typography.caption,
    color: Colors.white,
    fontWeight: 'bold',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    ...Typography.labelMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  productDescription: {
    ...Typography.caption,
    color: Colors.textSecondary,
    lineHeight: 14,
    marginBottom: Spacing.xs,
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
    ...Typography.caption,
    color: Colors.textSecondary,
    marginLeft: Spacing.xs,
  },
  productPrice: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: '600',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.lg,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  typingText: {
    ...Typography.bodyMedium,
    color: Colors.textSecondary,
    marginLeft: Spacing.sm,
  },
  suggestionsContainer: {
    paddingHorizontal: Layout.screenPadding,
    marginBottom: Spacing.lg,
  },
  suggestionsTitle: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  suggestionChip: {
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 16,
    maxWidth: '48%',
  },
  suggestionText: {
    ...Typography.caption,
    color: Colors.primary,
    textAlign: 'center',
  },
  inputContainer: {
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: Colors.gray100,
    borderRadius: 20,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  textInput: {
    flex: 1,
    ...Typography.bodyMedium,
    color: Colors.textPrimary,
    maxHeight: 100,
    marginRight: Spacing.sm,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.gray300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
});

export default AIAdvisorScreen;
