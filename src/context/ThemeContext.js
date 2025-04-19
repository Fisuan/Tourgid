import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { historicalTheme } from '../theme';

export const themes = {
  light: {
    name: 'light',
    isDark: false,
    colors: {
      primary: '#333333',
      secondary: '#4CAF50',
      background: '#FFFFFF',
      card: '#FFFFFF', 
      text: '#333333',
      textSecondary: '#666666',
      border: '#E0E0E0',
      notification: '#FF9800',
      error: '#F44336',
      success: '#4CAF50',
      info: '#333333',
      warning: '#FF9800',
      disabled: '#BDBDBD',
      placeholder: '#999999',
      backdrop: 'rgba(0, 0, 0, 0.5)',
      shadow: '#000000',
      searchBackground: '#F5F5F5',
      cardBackground: '#FFFFFF'
    }
  },
  dark: {
    name: 'dark',
    isDark: true,
    colors: {
      primary: '#AAAAAA',
      secondary: '#A5D6A7',
      background: '#121212',
      card: '#1E1E1E',
      text: '#FFFFFF',
      textSecondary: '#AAAAAA', 
      border: '#333333',
      notification: '#FFB74D',
      error: '#EF9A9A',
      success: '#A5D6A7',
      info: '#AAAAAA',
      warning: '#FFB74D',
      disabled: '#757575',
      placeholder: '#AAAAAA',
      backdrop: 'rgba(0, 0, 0, 0.7)',
      shadow: '#000000',
      searchBackground: '#2C2C2C',
      cardBackground: '#1E1E1E'
    }
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
  const [theme, setTheme] = useState(themes.light);

  useEffect(() => {
    const loadThemeMode = async () => {
      try {
        const savedThemeMode = await AsyncStorage.getItem('themeMode');
        if (savedThemeMode) {
          setThemeMode(savedThemeMode);
          setTheme(savedThemeMode === 'dark' ? themes.dark : themes.light);
        } else {
          setTheme(systemColorScheme === 'dark' ? themes.dark : themes.light);
        }
      } catch (error) {
        console.error('Error loading theme mode:', error);
      }
    };
    
    loadThemeMode();
  }, [systemColorScheme]);

  const toggleTheme = async (isDark) => {
    try {
      const newThemeMode = isDark ? 'dark' : 'light';
      await AsyncStorage.setItem('themeMode', newThemeMode);
      setThemeMode(newThemeMode);
      setTheme(isDark ? themes.dark : themes.light);
    } catch (error) {
      console.error('Failed to save theme', error);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme.isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);