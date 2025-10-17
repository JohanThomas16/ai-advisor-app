// AI Product Advisor - Mock Data for Reviews, Categories, and User Data

// Mock Reviews Data
export const MOCK_REVIEWS = {
  '1': [ // ChatGPT reviews
    {
      id: 'r1',
      userId: 'u1',
      userName: 'Sarah Chen',
      userAvatar: 'SC',
      rating: 5,
      title: 'Game-changing AI assistant',
      comment: 'ChatGPT has revolutionized how I approach writing and coding. The responses are incredibly accurate and helpful.',
      date: '2024-09-15',
      helpful: 24,
    },
    {
      id: 'r2',
      userId: 'u2',
      userName: 'Mike Johnson',
      userAvatar: 'MJ',
      rating: 4,
      title: 'Great but can be expensive',
      comment: 'Excellent AI capabilities but the pricing can add up quickly with heavy usage. Still worth it for professional work.',
      date: '2024-09-10',
      helpful: 18,
    },
    {
      id: 'r3',
      userId: 'u3',
      userName: 'Emily Rodriguez',
      userAvatar: 'ER',
      rating: 5,
      title: 'Perfect for content creation',
      comment: 'As a content creator, ChatGPT has become indispensable. It helps with ideation, writing, and editing.',
      date: '2024-09-08',
      helpful: 31,
    },
  ],
  '2': [ // Claude reviews
    {
      id: 'r4',
      userId: 'u4',
      userName: 'David Kim',
      userAvatar: 'DK',
      rating: 5,
      title: 'Most ethical AI assistant',
      comment: 'Claude\'s focus on safety and honesty makes it my go-to for sensitive topics and research.',
      date: '2024-09-12',
      helpful: 19,
    },
    {
      id: 'r5',
      userId: 'u5',
      userName: 'Lisa Wang',
      userAvatar: 'LW',
      rating: 4,
      title: 'Great for analysis',
      comment: 'Excellent analytical capabilities, though sometimes too conservative in responses.',
      date: '2024-09-07',
      helpful: 15,
    },
  ],
  '3': [ // Midjourney reviews
    {
      id: 'r6',
      userId: 'u6',
      userName: 'Alex Thompson',
      userAvatar: 'AT',
      rating: 5,
      title: 'Stunning image quality',
      comment: 'The artistic quality of Midjourney images is unmatched. Perfect for creative projects.',
      date: '2024-09-14',
      helpful: 28,
    },
    {
      id: 'r7',
      userId: 'u7',
      userName: 'Maria Garcia',
      userAvatar: 'MG',
      rating: 4,
      title: 'Great but Discord-only is limiting',
      comment: 'Love the results but wish there was a web interface instead of Discord only.',
      date: '2024-09-09',
      helpful: 22,
    },
  ],
};

// Mock Categories with Icons
export const MOCK_CATEGORIES = [
  {
    id: 'ai-assistants',
    name: 'AI Assistants',
    icon: 'robot',
    color: '#6366F1',
    description: 'Conversational AI tools for various tasks',
    productCount: 12,
  },
  {
    id: 'ai-art',
    name: 'AI Art',
    icon: 'palette',
    color: '#EC4899',
    description: 'Image and art generation tools',
    productCount: 8,
  },
  {
    id: 'productivity',
    name: 'Productivity',
    icon: 'trending-up',
    color: '#10B981',
    description: 'AI tools to boost productivity',
    productCount: 15,
  },
  {
    id: 'development',
    name: 'Development',
    icon: 'code',
    color: '#F97316',
    description: 'AI tools for developers',
    productCount: 10,
  },
];

// Mock User Data
export const MOCK_USER = {
  id: 'user123',
  name: 'Johan Thomas',
  email: 'johan.thomas@example.com',
  avatar: 'JT',
  joinDate: '2025-01-15',
  stats: {
    productsViewed: 47,
    favoritesCount: 8,
    reviewsWritten: 3,
    comparisonsCreated: 12,
  },
  preferences: {
    notifications: true,
    darkMode: false,
    emailUpdates: true,
    language: 'en',
    currency: 'USD',
  },
};

// Mock Chat Responses for AI Advisor
export const MOCK_CHAT_RESPONSES = {
  greeting: [
    "Hello! I'm your AI Product Advisor. How can I help you find the perfect AI tool today?",
    "Hi there! I'm here to help you discover amazing AI products. What are you looking for?",
    "Welcome! I can help you find, compare, and choose the best AI tools for your needs. What's your question?",
  ],
  
  productivity: [
    "For productivity, I'd recommend checking out Notion AI for note-taking and organization, or Grammarly for writing assistance. What specific productivity challenges are you facing?",
    "Great question! Some top productivity AI tools include Notion AI for workspace organization, Grammarly for writing, and various AI scheduling assistants. What type of work do you do?",
  ],
  
  comparison: [
    "I'd be happy to help you compare AI tools! ChatGPT and Claude are both excellent AI assistants, but they have different strengths. ChatGPT is more versatile for general tasks, while Claude focuses on safety and analytical thinking. Would you like a detailed comparison?",
    "For AI art tools, Midjourney excels in artistic quality and style variety, while DALL-E 2 is better for realistic images and has easier prompt understanding. Stable Diffusion is free and open-source but requires more technical setup. Which aspect matters most to you?",
  ],
  
  free: [
    "Here are some excellent free AI tools: Stable Diffusion for image generation, ChatGPT (free tier), Claude (free tier), and various open-source alternatives. What type of AI functionality are you looking for?",
    "Looking for free options? You can start with the free tiers of ChatGPT and Claude, use Stable Diffusion for image generation, or explore open-source alternatives. What's your primary use case?",
  ],
  
  development: [
    "For developers, GitHub Copilot is excellent for code completion, ChatGPT and Claude are great for debugging and code review, and there are specialized tools for different programming languages. What type of development work do you do?",
    "Developer tools I'd recommend include GitHub Copilot for AI-powered coding assistance, ChatGPT for code generation and debugging, and various specialized AI tools for testing and documentation. What's your tech stack?",
  ],
  
  default: [
    "That's an interesting question! Based on your needs, I can recommend several AI tools. Could you tell me more about what you're trying to accomplish?",
    "I'd love to help you find the right AI tool! Can you provide more details about your specific requirements or use case?",
    "There are many great AI tools available depending on your needs. What type of tasks are you looking to improve or automate?",
  ],
};

// Mock Testimonials
export const MOCK_TESTIMONIALS = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Content Creator',
    avatar: 'SC',
    text: 'This app helped me discover AI tools that transformed my workflow. The recommendations are spot-on!',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Mike Johnson',
    role: 'Software Developer',
    avatar: 'MJ',
    text: 'The comparison feature saved me hours of research. Found the perfect AI coding assistant!',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    avatar: 'ER',
    text: 'Love how the AI advisor understands my needs and suggests relevant tools. Game changer!',
    rating: 5,
  },
];

// Mock Recent Searches
export const MOCK_RECENT_SEARCHES = [
  'AI writing tools',
  'free image generators',
  'ChatGPT alternatives',
  'productivity AI',
  'coding assistants',
];

// Mock Comparison History
export const MOCK_COMPARISON_HISTORY = [
  {
    id: 'comp1',
    date: '2024-09-15',
    products: ['1', '2'], // ChatGPT vs Claude
    title: 'ChatGPT vs Claude',
  },
  {
    id: 'comp2',
    date: '2024-09-12',
    products: ['3', '6'], // Midjourney vs DALL-E 2
    title: 'Midjourney vs DALL-E 2',
  },
  {
    id: 'comp3',
    date: '2024-09-10',
    products: ['4', '5'], // GitHub Copilot vs Notion AI
    title: 'GitHub Copilot vs Notion AI',
  },
];

export default {
  MOCK_REVIEWS,
  MOCK_CATEGORIES,
  MOCK_USER,
  MOCK_CHAT_RESPONSES,
  MOCK_TESTIMONIALS,
  MOCK_RECENT_SEARCHES,
  MOCK_COMPARISON_HISTORY,
};
