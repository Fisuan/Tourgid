import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const AttractionCard = ({ item, interests }) => {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('AttractionDetail', { attraction: item })}
    >
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.categories}>
          {item.categories.map((category, index) => (
            <Text key={index} style={styles.tag}>
              {interests.find(i => i.id === category)?.name}
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
    backgroundColor: '#FFFFFF',
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
    color: '#333'
  },
  location: {
    color: '#888',
    marginVertical: 5
  },
  description: {
    color: '#555'
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  tag: {
    backgroundColor: '#E8E8E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginTop: 6,
    fontSize: 12,
    color: '#666'
  }
}); 