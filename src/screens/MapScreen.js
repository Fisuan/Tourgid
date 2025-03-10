import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  Dimensions,
  Platform,
  Linking
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { ATTRACTIONS } from '../constants/data';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_API_KEY = 'AIzaSyDs42whH2dBmdmuNLIL2dN-i8C9VzxPVnU';

export const MapScreen = ({ route, navigation }) => {
  const { selectedAttractions = [] } = route.params || {};
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [attractions, setAttractions] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  
  // Начальный регион (Павлодар)
  const initialRegion = {
    latitude: 52.2873,
    longitude: 76.9674,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  useEffect(() => {
    // Если переданы конкретные достопримечательности, используем их
    // Иначе показываем все достопримечательности
    if (selectedAttractions.length > 0) {
      const selected = ATTRACTIONS.filter(attr => 
        selectedAttractions.includes(attr.id)
      );
      setAttractions(selected);
    } else {
      setAttractions(ATTRACTIONS);
    }
    
    (async () => {
      // Запрашиваем разрешение на использование геолокации
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Разрешение на доступ к местоположению отклонено');
        setIsLoading(false);
        return;
      }

      try {
        // Получаем текущее местоположение
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        setLocation(location);
        
        // Если есть выбранные достопримечательности, центрируем карту на них
        if (selectedAttractions.length > 0 && mapRef.current) {
          const selected = ATTRACTIONS.find(attr => attr.id === selectedAttractions[0]);
          if (selected && selected.coordinates) {
            setSelectedMarker(selected);
            mapRef.current.animateToRegion({
              latitude: selected.coordinates.latitude,
              longitude: selected.coordinates.longitude,
              latitudeDelta: LATITUDE_DELTA / 2,
              longitudeDelta: LONGITUDE_DELTA / 2,
            });
          }
        }
      } catch (error) {
        setErrorMsg('Не удалось определить местоположение');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedAttractions]);

  // Обработчик нажатия на маркер
  const handleMarkerPress = (attraction) => {
    setSelectedMarker(attraction);
    setShowDirections(false);
  };

  // Обработчик нажатия на кнопку "Проложить маршрут"
  const handleRoutePress = () => {
    if (!location || !selectedMarker || !selectedMarker.coordinates) {
      Alert.alert('Ошибка', 'Не удалось определить координаты');
      return;
    }
    
    setShowDirections(true);
    
    // Для открытия в Google Maps
    const openInGoogleMaps = () => {
      const { latitude, longitude } = selectedMarker.coordinates;
      const url = Platform.select({
        ios: `maps://app?saddr=${location.coords.latitude},${location.coords.longitude}&daddr=${latitude},${longitude}`,
        android: `google.navigation:q=${latitude},${longitude}`
      });
      
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          const browserUrl = `https://www.google.com/maps/dir/?api=1&origin=${location.coords.latitude},${location.coords.longitude}&destination=${latitude},${longitude}`;
          Linking.openURL(browserUrl);
        }
      });
    };
    
    // Показываем диалог с выбором
    Alert.alert(
      "Построение маршрута",
      "Выберите способ построения маршрута",
      [
        {
          text: "В приложении",
          onPress: () => setShowDirections(true)
        },
        {
          text: "Google Maps",
          onPress: openInGoogleMaps
        },
        {
          text: "Отмена",
          style: "cancel"
        }
      ]
    );
  };

  // Обработчик нажатия на кнопку "Подробнее"
  const handleDetailsPress = () => {
    if (selectedMarker) {
      navigation.navigate('AttractionDetail', { attraction: selectedMarker });
    }
  };

  // Обработчик нажатия на кнопку "Моё местоположение"
  const goToMyLocation = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA / 4,
        longitudeDelta: LONGITUDE_DELTA / 4,
      });
    } else {
      Alert.alert('Ошибка', 'Не удалось определить ваше местоположение');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
        <Text style={styles.loadingText}>Загрузка карты...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.loadingContainer}>
        <Ionicons name="alert-circle" size={50} color="#FF6B6B" />
        <Text style={[styles.loadingText, { color: '#FF6B6B' }]}>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={false}
      >
        {attractions.map((attraction) => (
          <Marker
            key={attraction.id}
            coordinate={{
              latitude: attraction.coordinates.latitude,
              longitude: attraction.coordinates.longitude
            }}
            title={attraction.name}
            description={attraction.description}
            onPress={() => handleMarkerPress(attraction)}
          />
        ))}
        
        {showDirections && location && selectedMarker && (
          <MapViewDirections
            origin={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            }}
            destination={{
              latitude: selectedMarker.coordinates.latitude,
              longitude: selectedMarker.coordinates.longitude
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#2196F3"
            onReady={result => {
              setDistance(result.distance);
              setDuration(result.duration);
              
              // Подстраиваем карту под маршрут
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              });
            }}
            onError={(errorMessage) => {
              console.error('Directions API Error:', errorMessage);
              Alert.alert('Ошибка', 'Не удалось построить маршрут');
              setShowDirections(false);
            }}
          />
        )}
      </MapView>
      
      <TouchableOpacity 
        style={styles.myLocationButton}
        onPress={goToMyLocation}
      >
        <Ionicons name="locate" size={24} color="#FFFFFF" />
      </TouchableOpacity>
      
      {selectedMarker && (
        <View style={styles.markerInfoContainer}>
          <View style={styles.markerInfo}>
            <Text style={styles.markerTitle}>{selectedMarker.name}</Text>
            <Text style={styles.markerDescription}>{selectedMarker.description}</Text>
            
            {showDirections && distance && duration && (
              <View style={styles.routeInfo}>
                <Text style={styles.routeInfoText}>
                  <Ionicons name="navigate" size={14} color="#666" /> {distance.toFixed(1)} км
                </Text>
                <Text style={styles.routeInfoText}>
                  <Ionicons name="time" size={14} color="#666" /> {Math.ceil(duration)} мин
                </Text>
              </View>
            )}
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.routeButton}
                onPress={handleRoutePress}
              >
                <Ionicons name="navigate" size={16} color="#FFFFFF" />
                <Text style={styles.buttonText}>Маршрут</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.detailsButton}
                onPress={handleDetailsPress}
              >
                <Ionicons name="information-circle" size={16} color="#FFFFFF" />
                <Text style={styles.buttonText}>Подробнее</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => {
              setSelectedMarker(null);
              setShowDirections(false);
            }}
          >
            <Ionicons name="close" size={24} color="#999" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
  myLocationButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#2196F3',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  markerInfoContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  markerInfo: {
    flex: 1,
  },
  markerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  markerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  routeInfo: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  routeInfoText: {
    fontSize: 14,
    color: '#666',
    marginRight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  routeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 8,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '500',
  },
  closeButton: {
    padding: 5,
  },
}); 