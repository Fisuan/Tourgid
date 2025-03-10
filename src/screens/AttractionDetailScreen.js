import React from 'react';
import { 
  ScrollView, 
  View, 
  Text, 
  Image, 
  StyleSheet,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AttractionDetailScreen = ({ route, navigation }) => {
  const { attraction } = route.params;

  const openMap = () => {
    navigation.navigate('Map', { selectedAttractions: [attraction.id] });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={attraction.image} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={styles.title}>{attraction.name}</Text>
        <Text style={styles.location}>{attraction.location}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Историческая справка</Text>
          <Text style={styles.description}>
            {attraction.description}
            {/* Здесь будет расширенное историческое описание */}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Время работы</Text>
          <Text style={styles.info}>
            Будни: {attraction.workingHours?.weekdays}
          </Text>
          <Text style={styles.info}>
            Выходные: {attraction.workingHours?.weekend}
          </Text>
          {attraction.workingHours?.dayOff && (
            <Text style={styles.info}>
              Выходной: {attraction.workingHours.dayOff}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Контакты</Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL(`tel:${attraction.contacts?.phone}`)}
          >
            <Text style={styles.contactInfo}>
              <Ionicons name="call" size={16} color="#2196F3" />
              {' '}{attraction.contacts?.phone}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL(`https://${attraction.contacts?.website}`)}
          >
            <Text style={styles.contactInfo}>
              <Ionicons name="globe" size={16} color="#2196F3" />
              {' '}{attraction.contacts?.website}
            </Text>
          </TouchableOpacity>
          <Text style={styles.contactInfo}>
            <Ionicons name="location" size={16} color="#2196F3" />
            {' '}{attraction.contacts?.address}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.mapButton}
          onPress={openMap}
        >
          <Ionicons name="map" size={20} color="#FFFFFF" />
          <Text style={styles.mapButtonText}>Показать на карте</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    color: '#444',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    color: '#2196F3',
    marginBottom: 8,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 