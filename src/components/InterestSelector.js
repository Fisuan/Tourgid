import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const InterestSelector = ({ interests, onSelect, selectedInterest }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  return (
    <View style={styles.container}>
      <FlatList
        data={interests}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isSelected = selectedInterest && selectedInterest.id === item.id;
          
          return (
            <TouchableOpacity
              style={[
                styles.interestItem,
                { backgroundColor: theme.isDark ? '#333333' : '#F0F8FF' },
                isSelected && { backgroundColor: theme.colors.primary }
              ]}
              onPress={() => onSelect(item)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={item.icon} 
                size={24} 
                color={isSelected ? '#FFFFFF' : theme.colors.primary} 
              />
              <Text 
                style={[
                  styles.interestText,
                  { color: isSelected ? '#FFFFFF' : theme.colors.primary },
                ]}
              >
                {t(`interests.${item.id}`)}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  interestText: {
    marginLeft: 8,
    fontWeight: '500',
  }
}); 