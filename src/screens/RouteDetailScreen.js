import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';
import { ATTRACTIONS } from '../constants/data.js'; 

export const RouteDetailScreen = ({ route, navigation }) => {
  const { route: routeData } = route.params;
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Получаем достопримечательности по их ID
  const getAttractions = () => {
    return routeData.attractions.map(attractionId => 
      ATTRACTIONS.find(attraction => attraction.id === attractionId)
    ).filter(Boolean); // Убираем undefined
  };

  const attractions = getAttractions();

  return (
    <View style={[styles.modalContainer, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
      <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {routeData.name}
          </Text>

          <View style={styles.typeContainer}>
            <View style={styles.typeItem}>
              <Icon name="time-outline" size={20} color="#3B82F6" />
              <Text style={styles.typeText}>{routeData.duration}</Text>
            </View>
            <View style={styles.typeItem}>
              <Icon name="footsteps-outline" size={20} color="#3B82F6" />
              <Text style={styles.typeText}>{routeData.difficulty}</Text>
            </View>
            <View style={styles.typeItem}>
              <Icon name="car-outline" size={20} color="#3B82F6" />
              <Text style={styles.typeText}>{routeData.recommendedTransport}</Text>
            </View>
          </View>

          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {routeData.description}
          </Text>

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Достопримечательности
          </Text>

          {attractions.map((attraction, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.attractionItem}
              onPress={() => navigation.navigate('AttractionDetail', { attraction })}
            >
              {attraction.image && (
                <Image 
                  source={attraction.image} 
                  style={styles.attractionImage} 
                />
              )}
              <View style={styles.attractionInfo}>
                <Text style={[styles.attractionName, { color: theme.colors.text }]}>
                  {attraction.name}
                </Text>
                <Text style={[styles.attractionLocation, { color: theme.colors.textSecondary }]}>
                  {attraction.location}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Советы
          </Text>

          {routeData.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Icon name="checkmark-circle" size={20} color="#10B981" style={styles.tipIcon} />
              <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>{tip}</Text>
            </View>
          ))}

          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => {
              navigation.navigate('Map', { selectedAttractions: routeData.attractions });
            }}
          >
            <Icon name="paper-plane" size={20} color="#FFFFFF" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>Начать маршрут</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 15,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  closeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#888',
  },
  scrollContent: {
    padding: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  typeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  typeText: {
    marginLeft: 5,
    color: '#3B82F6',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 10,
  },
  attractionItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  attractionImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  attractionInfo: {
    flex: 1,
    padding: 10,
  },
  attractionName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  attractionLocation: {
    fontSize: 12,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#3B82F6',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  }
});