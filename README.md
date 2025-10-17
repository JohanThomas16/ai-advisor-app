# AI Product Advisor 🤖

A comprehensive React Native app that helps users discover, compare, and get personalized recommendations for AI products and tools. Built with Expo, featuring a conversational AI advisor, product catalog, comparison tools, and user profiles.


## ✨ Features

### 🏠 **Home Screen**
- Beautiful gradient header with personalized greeting
- Smart search functionality for AI products
- Category navigation (AI Assistants, AI Art, Productivity, Development)
- Featured products carousel with ratings and pricing
- Quick actions for AI advice and product comparison

### 📱 **Products Screen**
- Complete product catalog with advanced filtering
- Category-based filtering tabs
- Product cards with ratings, features, and pricing
- Search functionality with recent searches
- Favorites management

### 🤖 **AI Advisor Screen**
- Interactive chat interface with simulated AI responses
- Intent detection and contextual recommendations
- Suggested questions for quick start
- Typing indicators and smooth animations
- Product recommendations based on user queries
- Conversation history persistence

### 📊 **Product Detail Screen**
- Comprehensive product information and reviews
- Feature lists with checkmarks
- Pros and cons analysis
- User ratings and testimonials
- Favorites toggle and website links
- Compare functionality

### ⚖️ **Compare Screen**
- Side-by-side comparison for up to 3 products
- Add/remove products dynamically
- Feature matrix with detailed comparisons
- Horizontal scrolling optimized for mobile
- Save comparison history

### 👤 **Profile Screen**
- User profile with avatar and statistics
- Favorites management with easy removal
- App preferences (notifications, dark mode, email updates)
- Settings menu and account actions
- Data management tools

## 🛠 Tech Stack

- **React Native 0.72+** - Cross-platform mobile development
- **Expo SDK 49** - Development platform and tools
- **React Navigation v6** - Navigation library
- **AsyncStorage** - Local data persistence
- **Linear Gradient** - Beautiful gradient effects
- **Vector Icons** - Comprehensive icon library
- **JavaScript** - Primary programming language

## 📁 Project Structure

```
AI Product Advisor/
├── App.js                          # Main app component with navigation
├── index.js                        # Entry point
├── package.json                     # Dependencies and scripts
├── babel.config.js                  # Babel configuration
├── metro.config.js                  # Metro bundler configuration
├── README.md                        # Project documentation
├── assets/                          # Images and static assets
└── src/
    ├── screens/                     # Screen components
    │   ├── HomeScreen.js           # Home screen with categories and featured products
    │   ├── ProductsScreen.js       # Product catalog with filtering
    │   ├── ProductDetailScreen.js  # Detailed product information
    │   ├── CompareScreen.js        # Product comparison interface
    │   ├── AIAdvisorScreen.js      # Conversational AI interface
    │   └── ProfileScreen.js        # User profile and settings
    ├── styles/                      # Design system
    │   ├── Colors.js               # Color palette and gradients
    │   ├── Typography.js           # Text styles and font system
    │   └── Spacing.js              # Spacing scale and layout utilities
    ├── services/                    # Business logic and data services
    │   ├── storage.js              # AsyncStorage wrapper
    │   └── aiService.js            # AI conversation and recommendations
    ├── data/                        # Mock data and content
    │   ├── products.js             # Product catalog data
    │   └── mockData.js             # Reviews, categories, user data
    └── utils/                       # Utilities and constants
        └── constants.js            # App constants and configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-product-advisor
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

### Running on Different Platforms

#### 📱 **Mobile Device (Recommended)**
1. Install **Expo Go** app on your iOS/Android device
2. Scan the QR code from the terminal or browser
3. The app will load directly on your device

#### 🌐 **Web Browser**
```bash
npm run web
# or
npx expo start --web
```
Open http://localhost:19006 in your browser

#### 📱 **iOS Simulator** (macOS only)
```bash
npm run ios
# or
npx expo start --ios
```

#### 🤖 **Android Emulator**
```bash
npm run android
# or
npx expo start --android
```

## 📋 Available Scripts

- `npm start` - Start the Expo development server
- `npm run web` - Start web development server
- `npm run ios` - Start iOS simulator
- `npm run android` - Start Android emulator
- `npm run build` - Build the app for production
- `npm run build:web` - Build web version
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 🎨 Design System

### Colors
- **Primary**: Indigo (#6366F1)
- **Secondary**: Pink (#EC4899)
- **Accent**: Emerald (#10B981)
- **Gradients**: Hero, AI, Success, Warm, Cool

### Typography
- **Display**: Large headings and titles
- **Heading**: Section headers
- **Body**: Regular text content
- **Caption**: Small descriptive text
- **Button**: Action button text

### Spacing
- **Base unit**: 4px
- **Scale**: xs(4px) → sm(8px) → md(12px) → lg(16px) → xl(20px) → xxl(24px)

## 🔧 Configuration

### Environment Setup
The app uses mock data and local services, so no external API configuration is required.

### Customization
- **Colors**: Modify `src/styles/Colors.js`
- **Typography**: Update `src/styles/Typography.js`
- **Product Data**: Edit `src/data/products.js`
- **AI Responses**: Customize `src/data/mockData.js`

## 📱 Platform Support

- ✅ **iOS** (iPhone/iPad)
- ✅ **Android** (Phone/Tablet)
- ✅ **Web** (Desktop/Mobile browsers)

## 🧪 Testing

The app includes comprehensive mock data for testing all features:
- 8+ AI products with detailed information
- Mock reviews and ratings
- Simulated AI conversations
- User preferences and favorites
- Comparison history

## 🚀 Deployment

### Web Deployment (Vercel/Netlify)

1. **Build for web**
   ```bash
   npm run build:web
   ```

2. **Deploy to Vercel**
   ```bash
   npx vercel --prod
   ```

3. **Deploy to Netlify**
   - Upload the `web-build` folder to Netlify
   - Or connect your Git repository for automatic deployments

### Mobile App Deployment

1. **Build for app stores**
   ```bash
   npx expo build:ios
   npx expo build:android
   ```

2. **Submit to stores**
   ```bash
   npx expo submit:ios
   npx expo submit:android
   ```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **iOS simulator not opening**
   - Ensure Xcode is installed and updated
   - Check iOS Simulator is available

3. **Android emulator issues**
   - Verify Android Studio and AVD setup
   - Check emulator is running

4. **Web build errors**
   - Clear node_modules and reinstall
   - Check for conflicting dependencies

### Performance Tips

- Use React DevTools for debugging
- Monitor bundle size with `npx expo bundle-size`
- Optimize images and assets
- Use lazy loading for large lists

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Expo Team** - For the amazing development platform
- **React Navigation** - For seamless navigation
- **Ionicons** - For beautiful icons
- **AI Community** - For inspiration and product data

---

## 🔮 Next Steps for Customization

1. **Replace mock data with real AI product APIs**
2. **Integrate OpenAI/Anthropic for real recommendations**
3. **Add user authentication and account management**
4. **Implement push notifications for product updates**
5. **Add image uploads/screenshots, payments, admin panel, social sharing/reviews**
6. **Performance: lazy loading, response caching, image optimization, error boundaries/crash reporting**

---
### Screenshots

<img width="498" height="858" alt="Screenshot 2025-10-13 151247" src="https://github.com/user-attachments/assets/dd40a09e-c3b6-45ee-b92b-5698fcb78bf1" />
<img width="494" height="862" alt="Screenshot 2025-10-13 151322" src="https://github.com/user-attachments/assets/ad5ac0a9-73d9-423d-8a06-775420f23c99" />
<img width="496" height="859" alt="Screenshot 2025-10-13 151356" src="https://github.com/user-attachments/assets/c29c9c98-4908-4436-af68-49fe483b7d68" />
<img width="492" height="863" alt="Screenshot 2025-10-13 151415" src="https://github.com/user-attachments/assets/802a1911-d924-47db-b50a-1438858f9263" />


**Built By Johan Thomas Isaac **
