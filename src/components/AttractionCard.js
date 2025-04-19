import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const AttractionCard = ({ item, interests }) => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const { t } = useTranslation();
  
  const getCategoryName = (categoryId) => {
    const interest = interests.find(i => i.id === categoryId);
    return interest ? t(`interests.${interest.id}`) : categoryId;
  };
  
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: theme.colors.cardBackground }]}
      onPress={() => navigation.navigate('AttractionDetail', { attraction: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.name, { color: theme.colors.text }]}>{item.name}</Text>
        <Text style={[styles.location, { color: theme.colors.textSecondary }]}>{item.location}</Text>
        <Text 
          style={[styles.description, { color: theme.colors.textSecondary }]}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <View style={styles.categories}>
          {item.categories.map((category, index) => (
            <Text 
              key={index} 
              style={[
                styles.tag, 
                { 
                  backgroundColor: theme.isDark ? '#333333' : '#E8E8E8', 
                  color: theme.colors.textSecondary 
                }
              ]}
            >
              {getCategoryName(category)}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover'
  },
  details: {
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    marginVertical: 5
  },
  description: {
    fontSize: 14,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 6,
    fontSize: 12,
  }
}); 