import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  TouchableOpacity,
  Image 
} from 'react-native';

const HISTORICAL_FACTS = [
  {
    id: '1',
    year: '1720',
    title: 'Основание Павлодара',
    description: 'История города началась с основания форпоста Коряковский...',
    image: require('../assets/historical/pavlodar-foundation.jpg')
  },
  // Добавьте больше исторических фактов
];

export const HistoricalFactsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={HISTORICAL_FACTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.factCard}>
            <Image source={item.image} style={styles.factImage} />
            <View style={styles.factContent}>
              <Text style={styles.year}>{item.year}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 15,
  },
  factCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  factImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  factContent: {
    padding: 15,
  },
  year: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
}); 