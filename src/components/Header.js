import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export const Header = ({ title, onMenuPress, onMapPress }) => {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.header, { 
      backgroundColor: theme.colors.cardBackground, 
      borderBottomColor: theme.colors.border 
    }]}>
      <TouchableOpacity 
        onPress={onMenuPress} 
        style={styles.menuButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="menu" size={28} color={theme.colors.text} />
      </TouchableOpacity>
      
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      
      <TouchableOpacity 
        style={styles.rightButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPress={onMapPress}
      >
        <Ionicons name="map" size={24} color={theme.colors.text} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 44 : 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: Platform.OS === 'ios' ? '600' : 'bold',
  },
  rightButton: {
    padding: 8,
  },
}); 