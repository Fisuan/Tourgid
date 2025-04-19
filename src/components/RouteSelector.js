import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Modal,
  ScrollView,
  Image,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES, ATTRACTIONS } from '../constants/data';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export const RouteSelector = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  
  const themeContext = useTheme();
  const theme = themeContext?.theme || { 
    colors: { 
      background: '#FFFFFF', 
      text: '#333333', 
      primary: '#333333', 
      cardBackground: '#FFFFFF',
      textSecondary: '#666666'
    },
    isDark: false
  };
  
  const languageContext = useLanguage();
  const t = (key) => languageContext?.t?.(key) || key;

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setModalVisible(true);
  };

  const startRoute = () => {
    setModalVisible(false);
    navigation.navigate('Map', { 
      selectedAttractions: selectedRoute.attractions 
    });
  };

  const getAttractionById = (id) => {
    return ATTRACTIONS.find(attr => attr.id === id);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>{t('popularRoutes')}</Text>
      
      <FlatList
        data={ROUTES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.routesList}
        renderItem={({ item }) => {
          const firstAttraction = getAttractionById(item.attractions[0]);
          
          return (
            <TouchableOpacity 
              style={[styles.routeCard, { backgroundColor: theme.colors.cardBackground }]}
              onPress={() => handleRouteSelect(item)}
              activeOpacity={0.8}
            >
              {firstAttraction && (
                <Image 
                  source={firstAttraction.image} 
                  style={styles.routeImage}
                />
              )}
              <View style={styles.routeOverlay} />
              <View style={styles.routeContent}>
                <Text style={styles.routeName}>{item.name}</Text>
                <View style={styles.routeInfo}>
                  <Ionicons name="time" size={14} color="#FFF" />
                  <Text style={styles.routeInfoText}>{item.duration}</Text>
                  <Ionicons name="trending-up" size={14} color="#FFF" style={styles.infoIcon} />
                  <Text style={styles.routeInfoText}>{item.difficulty}</Text>
                </View>
                <Text style={styles.routeAttractions}>
                  {item.attractions.length} {item.attractions.length === 1 ? 'место' : 
                    item.attractions.length < 5 ? 'места' : 'мест'}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.cardBackground }]}>
            <TouchableOpacity 
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            
            {selectedRoute && (
              <ScrollView>
                <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                  {selectedRoute.name}
                </Text>
                
                <View style={styles.modalInfoRow}>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="time" size={20} color={theme.colors.primary} />
                    <Text style={[styles.modalInfoText, { color: theme.colors.textSecondary }]}>
                      {selectedRoute.duration}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="trending-up" size={20} color={theme.colors.primary} />
                    <Text style={[styles.modalInfoText, { color: theme.colors.textSecondary }]}>
                      {selectedRoute.difficulty}
                    </Text>
                  </View>
                  <View style={styles.modalInfoItem}>
                    <Ionicons name="car" size={20} color={theme.colors.primary} />
                    <Text style={[styles.modalInfoText, { color: theme.colors.textSecondary }]}>
                      {selectedRoute.recommendedTransport}
                    </Text>
                  </View>
                </View>
                
                <Text style={[styles.modalDescription, { color: theme.colors.text }]}>
                  {selectedRoute.description}
                </Text>
                
                <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>
                  {t('attractions')}
                </Text>
                
                {selectedRoute.attractions.map(attrId => {
                  const attraction = getAttractionById(attrId);
                  return attraction ? (
                    <View key={attrId} style={[styles.attractionItem, { backgroundColor: theme.isDark ? '#333333' : '#F5F5F5' }]}>
                      <Image source={attraction.image} style={styles.attractionImage} />
                      <View style={styles.attractionDetails}>
                        <Text style={[styles.attractionItemName, { color: theme.colors.text }]}>
                          {attraction.name}
                        </Text>
                        <Text style={[styles.attractionItemLocation, { color: theme.colors.textSecondary }]}>
                          {attraction.location}
                        </Text>
                      </View>
                    </View>
                  ) : null;
                })}
                
                <Text style={[styles.modalSectionTitle, { color: theme.colors.text }]}>
                  {t('tips')}
                </Text>
                
                {selectedRoute.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={20} color={theme.colors.primary} />
                    <Text style={[styles.tipText, { color: theme.colors.textSecondary }]}>
                      {tip}
                    </Text>
                  </View>
                ))}
                
                <TouchableOpacity 
                  style={[styles.startButton, { backgroundColor: theme.colors.primary }]}
                  onPress={startRoute}
                >
                  <Ionicons name="navigate" size={20} color="#FFFFFF" />
                  <Text style={styles.startButtonText}>{t('startRoute')}</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  routesList: {
    paddingHorizontal: 15,
  },
  routeCard: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginRight: 15,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  routeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  routeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  routeContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  routeName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  routeInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
    marginRight: 10,
  },
  infoIcon: {
    marginLeft: 5,
  },
  routeAttractions: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '90%',
    borderRadius: 10,
    padding: 20,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalInfoText: {
    fontSize: 14,
    marginLeft: 5,
  },
  modalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  attractionItem: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  attractionImage: {
    width: 80,
    height: 80,
  },
  attractionDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  attractionItemName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  attractionItemLocation: {
    fontSize: 14,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
}); 