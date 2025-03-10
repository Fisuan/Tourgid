import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const Header = ({ title, onMenuPress, onMapPress }) => (
  <View style={styles.header}>
    <TouchableOpacity 
      onPress={onMenuPress} 
      style={styles.menuButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
    >
      <Ionicons name="menu" size={28} color="#333" />
    </TouchableOpacity>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity 
      style={styles.rightButton}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
      onPress={onMapPress}
    >
      <Ionicons name="map" size={24} color="#333" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: Platform.OS === 'ios' ? 44 : 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    color: '#333',
  },
  rightButton: {
    padding: 8,
  },
}); 