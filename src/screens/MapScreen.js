import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Switch
} from 'react-native';
import { HistoricalMap } from '../components/HistoricalMap';
import { ATTRACTIONS, ROUTES } from '../constants/data';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export const MapScreen = ({ route, navigation }) => {
  const { selectedAttractions, selectedRoute } = route.params || {};
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [showRoute, setShowRoute] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const { theme } = useTheme();
  const { t } = useTranslation();

  // Определяем, какие достопримечательности показывать
  useEffect(() => {
    let attractionsToShow = [];
    
    if (selectedRoute) {
      // Если выбран маршрут, получаем все его достопримечательности
      const routeData = ROUTES.find(r => r.id === selectedRoute);
      if (routeData) {
        attractionsToShow = routeData.attractions
          .map(id => ATTRACTIONS.find(a => a.id === id))
          .filter(Boolean);
        // Автоматически включаем отображение маршрута
        setShowRoute(true);
      }
    } else if (selectedAttractions && selectedAttractions.length > 0) {
      attractionsToShow = ATTRACTIONS.filter(a => selectedAttractions.includes(a.id));
    } else {
      attractionsToShow = ATTRACTIONS;
    }
    
    setAttractions(attractionsToShow);
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [selectedAttractions, selectedRoute]);

  const handleMarkerPress = (attraction) => {
    setSelectedMarker(attraction);
  };

  const handleDetailsPress = (attraction) => {
    navigation.navigate('AttractionDetail', { attraction });
  };

  const renderAttractionPanel = () => {
    if (!selectedMarker) return null;

    return (
      <View style={[styles.attractionPanel, { backgroundColor: theme.colors.cardBackground }]}>
        <Text style={[styles.attractionName, { color: theme.colors.text }]}>
          {selectedMarker.name}
        </Text>
        <Text style={[styles.attractionLocation, { color: theme.colors.textSecondary }]}>
          {selectedMarker.location}
        </Text>
        
        <TouchableOpacity 
          style={[styles.detailsButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => handleDetailsPress(selectedMarker)}
        >
          <Text style={styles.detailsButtonText}>{t('screens.attractionDetail.title')}</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={[styles.loadingText, { color: theme.colors.text }]}>
          {t('common.loadingMap')}
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {attractions.length > 1 && (
        <View style={[styles.routeToggle, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.routeToggleText, { color: theme.colors.text }]}>
            Показать маршрут
          </Text>
          <Switch
            value={showRoute}
            onValueChange={setShowRoute}
            trackColor={{ false: "#767577", true: theme.colors.primary + "80" }}
            thumbColor={showRoute ? theme.colors.primary : "#f4f3f4"}
          />
        </View>
      )}
      
      <HistoricalMap 
        attractions={attractions}
        onMarkerPress={handleMarkerPress}
        showRoute={showRoute}
      />
      
      {renderAttractionPanel()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  routeToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  routeToggleText: {
    marginRight: 8,
    fontSize: 14,
  },
  attractionPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  attractionName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  attractionLocation: {
    fontSize: 14,
    marginBottom: 12,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  detailsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  }
}); 