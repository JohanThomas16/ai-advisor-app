// AI Product Advisor - AsyncStorage Service
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, DEFAULT_PREFERENCES } from '../utils/constants';

class StorageService {
  // Generic storage methods
  async setItem(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  async getItem(key, defaultValue = null) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
    } catch (error) {
      console.error('Error reading data:', error);
      return defaultValue;
    }
  }

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  async clear() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing storage:', error);
      return false;
    }
  }

  // User Preferences
  async getUserPreferences() {
    return await this.getItem(STORAGE_KEYS.USER_PREFERENCES, DEFAULT_PREFERENCES);
  }

  async setUserPreferences(preferences) {
    const currentPrefs = await this.getUserPreferences();
    const updatedPrefs = { ...currentPrefs, ...preferences };
    return await this.setItem(STORAGE_KEYS.USER_PREFERENCES, updatedPrefs);
  }

  async updatePreference(key, value) {
    const preferences = await this.getUserPreferences();
    preferences[key] = value;
    return await this.setUserPreferences(preferences);
  }

  // Favorites Management
  async getFavorites() {
    return await this.getItem(STORAGE_KEYS.FAVORITES, []);
  }

  async addToFavorites(productId) {
    const favorites = await this.getFavorites();
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      return await this.setItem(STORAGE_KEYS.FAVORITES, favorites);
    }
    return true;
  }

  async removeFromFavorites(productId) {
    const favorites = await this.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== productId);
    return await this.setItem(STORAGE_KEYS.FAVORITES, updatedFavorites);
  }

  async isFavorite(productId) {
    const favorites = await this.getFavorites();
    return favorites.includes(productId);
  }

  async toggleFavorite(productId) {
    const isFav = await this.isFavorite(productId);
    if (isFav) {
      return await this.removeFromFavorites(productId);
    } else {
      return await this.addToFavorites(productId);
    }
  }

  // Recent Searches
  async getRecentSearches() {
    return await this.getItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  }

  async addRecentSearch(searchTerm) {
    if (!searchTerm || searchTerm.trim().length === 0) return false;
    
    const searches = await this.getRecentSearches();
    const trimmedTerm = searchTerm.trim().toLowerCase();
    
    // Remove if already exists
    const filteredSearches = searches.filter(term => term.toLowerCase() !== trimmedTerm);
    
    // Add to beginning
    filteredSearches.unshift(searchTerm.trim());
    
    // Keep only last 10 searches
    const limitedSearches = filteredSearches.slice(0, 10);
    
    return await this.setItem(STORAGE_KEYS.RECENT_SEARCHES, limitedSearches);
  }

  async clearRecentSearches() {
    return await this.setItem(STORAGE_KEYS.RECENT_SEARCHES, []);
  }

  // Comparison History
  async getComparisonHistory() {
    return await this.getItem(STORAGE_KEYS.COMPARISON_HISTORY, []);
  }

  async addComparisonHistory(comparison) {
    const history = await this.getComparisonHistory();
    
    // Add timestamp if not provided
    if (!comparison.date) {
      comparison.date = new Date().toISOString().split('T')[0];
    }
    
    // Add unique ID if not provided
    if (!comparison.id) {
      comparison.id = `comp_${Date.now()}`;
    }
    
    // Add to beginning
    history.unshift(comparison);
    
    // Keep only last 20 comparisons
    const limitedHistory = history.slice(0, 20);
    
    return await this.setItem(STORAGE_KEYS.COMPARISON_HISTORY, limitedHistory);
  }

  async clearComparisonHistory() {
    return await this.setItem(STORAGE_KEYS.COMPARISON_HISTORY, []);
  }

  // Chat History
  async getChatHistory() {
    return await this.getItem(STORAGE_KEYS.CHAT_HISTORY, []);
  }

  async addChatMessage(message) {
    const history = await this.getChatHistory();
    
    // Add timestamp if not provided
    if (!message.timestamp) {
      message.timestamp = new Date().toISOString();
    }
    
    // Add unique ID if not provided
    if (!message.id) {
      message.id = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    history.push(message);
    
    // Keep only last 100 messages
    const limitedHistory = history.slice(-100);
    
    return await this.setItem(STORAGE_KEYS.CHAT_HISTORY, limitedHistory);
  }

  async clearChatHistory() {
    return await this.setItem(STORAGE_KEYS.CHAT_HISTORY, []);
  }

  // Onboarding
  async isOnboardingCompleted() {
    return await this.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED, false);
  }

  async setOnboardingCompleted(completed = true) {
    return await this.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, completed);
  }

  // Utility methods
  async getStorageSize() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let totalSize = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
      
      return {
        keys: keys.length,
        sizeInBytes: totalSize,
        sizeInKB: Math.round(totalSize / 1024 * 100) / 100,
      };
    } catch (error) {
      console.error('Error calculating storage size:', error);
      return { keys: 0, sizeInBytes: 0, sizeInKB: 0 };
    }
  }

  async exportData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const data = {};
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          data[key] = JSON.parse(value);
        }
      }
      
      return {
        exportDate: new Date().toISOString(),
        data,
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }
}

// Create and export singleton instance
const storageService = new StorageService();
export default storageService;
