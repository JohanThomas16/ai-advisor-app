// AI Product Advisor - Main App Component
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Import screens
import HomeScreen from './src/screens/HomeScreen';
import ProductsScreen from './src/screens/ProductsScreen';
import AIAdvisorScreen from './src/screens/AIAdvisorScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import CompareScreen from './src/screens/CompareScreen';

// Import styles and constants
import { Colors } from './src/styles/Colors';
import { ROUTES, TAB_ROUTES } from './src/utils/constants';
import aiService from './src/services/aiService';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Products Stack Navigator
function ProductsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}
    >
      <Stack.Screen
        name={ROUTES.PRODUCTS}
        component={ProductsScreen}
        options={{ title: 'AI Products' }}
      />
      <Stack.Screen
        name={ROUTES.PRODUCT_DETAIL}
        component={ProductDetailScreen}
        options={{ title: 'Product Details' }}
      />
      <Stack.Screen
        name={ROUTES.COMPARE}
        component={CompareScreen}
        options={{ title: 'Compare Products' }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === TAB_ROUTES.HOME_TAB) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === TAB_ROUTES.PRODUCTS_TAB) {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === TAB_ROUTES.AI_ADVISOR_TAB) {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === TAB_ROUTES.PROFILE_TAB) {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray500,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: Platform.OS === 'ios' ? 20 : 5,
          paddingTop: 5,
          height: Platform.OS === 'ios' ? 85 : 65,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name={TAB_ROUTES.HOME_TAB}
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.PRODUCTS_TAB}
        component={ProductsStack}
        options={{ tabBarLabel: 'Products' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.AI_ADVISOR_TAB}
        component={AIAdvisorScreen}
        options={{ tabBarLabel: 'AI Advisor' }}
      />
      <Tab.Screen
        name={TAB_ROUTES.PROFILE_TAB}
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  useEffect(() => {
    // Initialize AI service
    aiService.initialize();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor={Colors.primary} />
      <TabNavigator />
    </NavigationContainer>
  );
}
