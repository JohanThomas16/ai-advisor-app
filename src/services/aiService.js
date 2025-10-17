// AI Product Advisor - AI Service for Intent Detection and Recommendations
import { PRODUCTS } from '../data/products';
import { MOCK_CHAT_RESPONSES } from '../data/mockData';
import { CATEGORIES } from '../utils/constants';
import storageService from './storage';

class AIService {
  constructor() {
    this.conversationContext = [];
    this.userPreferences = {};
  }

  // Initialize service with user preferences
  async initialize() {
    this.userPreferences = await storageService.getUserPreferences();
  }

  // Intent detection based on user input
  detectIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Greeting intents
    if (this.matchesKeywords(lowerMessage, ['hello', 'hi', 'hey', 'start', 'help'])) {
      return 'greeting';
    }
    
    // Comparison intents
    if (this.matchesKeywords(lowerMessage, ['compare', 'vs', 'versus', 'difference', 'better'])) {
      return 'comparison';
    }
    
    // Category-specific intents
    if (this.matchesKeywords(lowerMessage, ['productivity', 'productive', 'work', 'organize'])) {
      return 'productivity';
    }
    
    if (this.matchesKeywords(lowerMessage, ['art', 'image', 'picture', 'draw', 'create', 'generate'])) {
      return 'ai_art';
    }
    
    if (this.matchesKeywords(lowerMessage, ['code', 'coding', 'programming', 'developer', 'development'])) {
      return 'development';
    }
    
    if (this.matchesKeywords(lowerMessage, ['assistant', 'chat', 'conversation', 'talk'])) {
      return 'ai_assistants';
    }
    
    // Free tools intent
    if (this.matchesKeywords(lowerMessage, ['free', 'cost', 'price', 'cheap', 'budget'])) {
      return 'free';
    }
    
    // Recommendation intent
    if (this.matchesKeywords(lowerMessage, ['recommend', 'suggest', 'best', 'top', 'good'])) {
      return 'recommendation';
    }
    
    return 'default';
  }

  // Helper method to match keywords
  matchesKeywords(message, keywords) {
    return keywords.some(keyword => message.includes(keyword));
  }

  // Generate response based on intent and context
  async generateResponse(message, intent = null) {
    if (!intent) {
      intent = this.detectIntent(message);
    }

    // Add user message to context
    this.addToContext('user', message);

    let response;
    let suggestions = [];
    let recommendedProducts = [];

    switch (intent) {
      case 'greeting':
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.greeting);
        suggestions = [
          "What's the best AI assistant for productivity?",
          "Show me free AI art tools",
          "Compare ChatGPT vs Claude",
          "Recommend AI tools for developers",
        ];
        break;

      case 'comparison':
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.comparison);
        recommendedProducts = this.getComparisonProducts(message);
        suggestions = [
          "Show detailed comparison",
          "What are the pricing differences?",
          "Which one is better for beginners?",
        ];
        break;

      case 'productivity':
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.productivity);
        recommendedProducts = this.getProductsByCategory(CATEGORIES.PRODUCTIVITY);
        suggestions = [
          "Show me writing assistants",
          "What about project management AI?",
          "Compare productivity tools",
        ];
        break;

      case 'ai_art':
        response = "For AI art creation, I'd recommend Midjourney for artistic quality, DALL-E 2 for realistic images, or Stable Diffusion if you want a free, open-source option. What type of images are you looking to create?";
        recommendedProducts = this.getProductsByCategory(CATEGORIES.AI_ART);
        suggestions = [
          "Compare image generators",
          "Show me free art tools",
          "What's best for beginners?",
        ];
        break;

      case 'development':
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.development);
        recommendedProducts = this.getProductsByCategory(CATEGORIES.DEVELOPMENT);
        suggestions = [
          "Show coding assistants",
          "What about debugging tools?",
          "Compare developer AI tools",
        ];
        break;

      case 'ai_assistants':
        response = "For AI assistants, ChatGPT is versatile and great for general tasks, while Claude focuses on safety and analytical thinking. Both have free tiers to get started. What would you primarily use an AI assistant for?";
        recommendedProducts = this.getProductsByCategory(CATEGORIES.AI_ASSISTANTS);
        suggestions = [
          "Compare AI assistants",
          "Show me free options",
          "What's best for writing?",
        ];
        break;

      case 'free':
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.free);
        recommendedProducts = this.getFreeProducts();
        suggestions = [
          "Show all free tools",
          "What about freemium options?",
          "Compare free vs paid features",
        ];
        break;

      case 'recommendation':
        response = this.generatePersonalizedRecommendation(message);
        recommendedProducts = this.getTopRatedProducts();
        suggestions = [
          "Tell me more about these tools",
          "Show me alternatives",
          "What's trending now?",
        ];
        break;

      default:
        response = this.getRandomResponse(MOCK_CHAT_RESPONSES.default);
        recommendedProducts = this.getFeaturedProducts();
        suggestions = [
          "Show me popular AI tools",
          "What's new in AI?",
          "Help me find the right tool",
        ];
        break;
    }

    // Add AI response to context
    this.addToContext('assistant', response);

    // Save conversation to storage
    await this.saveConversation();

    return {
      message: response,
      intent,
      suggestions,
      recommendedProducts: recommendedProducts.slice(0, 3), // Limit to 3 recommendations
      timestamp: new Date().toISOString(),
    };
  }

  // Get random response from array
  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Get products by category
  getProductsByCategory(category) {
    return PRODUCTS.filter(product => product.category === category);
  }

  // Get free products
  getFreeProducts() {
    return PRODUCTS.filter(product => 
      product.pricing.free || product.pricing.type === 'free'
    );
  }

  // Get featured products
  getFeaturedProducts() {
    return PRODUCTS.filter(product => product.featured);
  }

  // Get top rated products
  getTopRatedProducts() {
    return PRODUCTS
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5);
  }

  // Get products for comparison based on message
  getComparisonProducts(message) {
    const lowerMessage = message.toLowerCase();
    
    // Look for specific product names
    const mentionedProducts = PRODUCTS.filter(product =>
      lowerMessage.includes(product.name.toLowerCase())
    );
    
    if (mentionedProducts.length >= 2) {
      return mentionedProducts.slice(0, 3);
    }
    
    // Default to top products if no specific mentions
    return this.getTopRatedProducts().slice(0, 3);
  }

  // Generate personalized recommendation
  generatePersonalizedRecommendation(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('beginner')) {
      return "For beginners, I'd recommend starting with ChatGPT or Claude for AI assistance, and DALL-E 2 for image generation. They have user-friendly interfaces and good documentation.";
    }
    
    if (lowerMessage.includes('business') || lowerMessage.includes('professional')) {
      return "For business use, consider ChatGPT Plus for versatile AI assistance, Grammarly for professional writing, and GitHub Copilot if you have developers on your team.";
    }
    
    if (lowerMessage.includes('creative') || lowerMessage.includes('artist')) {
      return "For creative work, Midjourney excels at artistic image generation, while ChatGPT can help with creative writing and brainstorming. What type of creative projects are you working on?";
    }
    
    return "Based on your needs, I can recommend several AI tools. Could you tell me more about your specific use case or industry?";
  }

  // Add message to conversation context
  addToContext(role, message) {
    this.conversationContext.push({
      role,
      message,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 20 messages for context
    if (this.conversationContext.length > 20) {
      this.conversationContext = this.conversationContext.slice(-20);
    }
  }

  // Save conversation to storage
  async saveConversation() {
    try {
      const lastMessage = this.conversationContext[this.conversationContext.length - 1];
      if (lastMessage) {
        await storageService.addChatMessage(lastMessage);
      }
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  }

  // Get conversation history
  getConversationContext() {
    return this.conversationContext;
  }

  // Clear conversation context
  clearContext() {
    this.conversationContext = [];
  }

  // Get follow-up questions based on context
  getFollowUpQuestions(intent) {
    const followUps = {
      greeting: [
        "What type of AI tool are you looking for?",
        "Are you new to AI tools?",
        "What's your primary use case?",
      ],
      comparison: [
        "Would you like to see a detailed comparison?",
        "What features matter most to you?",
        "Are you looking for free or paid options?",
      ],
      productivity: [
        "What kind of work do you do?",
        "Are you looking for writing assistance?",
        "Do you need project management features?",
      ],
    };
    
    return followUps[intent] || [
      "Would you like more specific recommendations?",
      "Do you have any other questions?",
      "Is there anything else I can help you with?",
    ];
  }
}

// Create and export singleton instance
const aiService = new AIService();
export default aiService;
