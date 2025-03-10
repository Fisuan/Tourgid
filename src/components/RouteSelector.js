import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  Modal,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ROUTES, ATTRACTIONS } from '../constants/data';

export const RouteSelector = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

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

  const renderRouteItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.routeCard}
      onPress={() => handleRouteSelect(item)}
    >
      <View style={styles.routeHeader}>
        <Text style={styles.routeName}>{item.name}</Text>
        <View style={styles.routeInfo}>
          <Ionicons name="time" size={16} color="#666" />
          <Text style={styles.routeInfoText}>{item.duration}</Text>
          <Ionicons name="trending-up" size={16} color="#666" style={styles.infoIcon} />
          <Text style={styles.routeInfoText}>{item.difficulty}</Text>
        </View>
      </View>
      <Text style={styles.routeDescription}>{item.description}</Text>
      <View style={styles.attractionsContainer}>
        <Text style={styles.attractionsTitle}>Места: </Text>
        {item.attractions.map((attrId, index) => {
          const attraction = ATTRACTIONS.find(a => a.id === attrId);
          return (
            <Text key={attrId} style={styles.attractionName}>
              {attraction?.name}
              {index < item.attractions.length - 1 ? ', ' : ''}
            </Text>
          );
        })}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Популярные маршруты</Text>
      
      <FlatList
        data={ROUTES}
        renderItem={renderRouteItem}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.routesList}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            {selectedRoute && (
              <ScrollView>
                <Text style={styles.modalTitle}>{selectedRoute.name}</Text>
                <Text style={styles.modalDescription}>{selectedRoute.description}</Text>
                
                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={20} color="#2196F3" />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Продолжительность</Text>
                      <Text style={styles.detailValue}>{selectedRoute.duration}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="trending-up" size={20} color="#2196F3" />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Сложность</Text>
                      <Text style={styles.detailValue}>{selectedRoute.difficulty}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Ionicons name="car" size={20} color="#2196F3" />
                    <View style={styles.detailTextContainer}>
                      <Text style={styles.detailLabel}>Рекомендуемый транспорт</Text>
                      <Text style={styles.detailValue}>{selectedRoute.recommendedTransport}</Text>
                    </View>
                  </View>
                </View>
                
                <Text style={styles.sectionTitle}>Места для посещения</Text>
                {selectedRoute.attractions.map(attrId => {
                  const attraction = ATTRACTIONS.find(a => a.id === attrId);
                  return attraction ? (
                    <View key={attrId} style={styles.attractionItem}>
                      <Text style={styles.attractionItemName}>{attraction.name}</Text>
                      <Text style={styles.attractionItemLocation}>{attraction.location}</Text>
                    </View>
                  ) : null;
                })}
                
                <Text style={styles.sectionTitle}>Советы</Text>
                {selectedRoute.tips.map((tip, index) => (
                  <View key={index} style={styles.tipItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    <Text style={styles.tipText}>{tip}</Text>
                  </View>
                ))}
                
                <TouchableOpacity 
                  style={styles.startButton}
                  onPress={startRoute}
                >
                  <Ionicons name="navigate" size={20} color="#FFFFFF" />
                  <Text style={styles.startButtonText}>Начать маршрут</Text>
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
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  routesList: {
    paddingHorizontal: 10,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 5,
    width: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  routeHeader: {
    marginBottom: 10,
  },
  routeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  routeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeInfoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  infoIcon: {
    marginLeft: 15,
  },
  routeDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  attractionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  attractionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  attractionName: {
    fontSize: 14,
    color: '#2196F3',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    lineHeight: 24,
  },
  detailsContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailTextContainer: {
    marginLeft: 15,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  attractionItem: {
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  attractionItemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  attractionItemLocation: {
    fontSize: 14,
    color: '#666',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    flex: 1,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
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