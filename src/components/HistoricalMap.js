import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, View, Text } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

export const HistoricalMap = ({ attractions = [], onMarkerPress, showRoute = false }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const { t } = useTranslation();

  const initialRegion = {
    latitude: 52.3,
    longitude: 76.95,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (attractions.length === 1) {
    const attraction = attractions[0];
    if (attraction.coordinates) {
      initialRegion.latitude = attraction.coordinates.latitude;
      initialRegion.longitude = attraction.coordinates.longitude;
      initialRegion.latitudeDelta = 0.01;
      initialRegion.longitudeDelta = 0.01;
    }
  }

  const getRouteCoordinates = () => {
    if (attractions.length < 2) return [];
    
    return attractions
      .filter(attraction => attraction.coordinates)
      .map(attraction => ({
        latitude: attraction.coordinates.latitude,
        longitude: attraction.coordinates.longitude
      }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

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

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.errorText, { color: theme.colors.text }]}>
          Ошибка загрузки карты: {error}
        </Text>
      </View>
    );
  }

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      customMapStyle={historicalMapStyle}
      onError={(e) => setError(e.nativeEvent.error)}
    >
      {attractions.map((attraction) => (
        attraction.coordinates && (
          <Marker
            key={attraction.id}
            coordinate={{
              latitude: attraction.coordinates.latitude,
              longitude: attraction.coordinates.longitude
            }}
            title={attraction.name}
            description={attraction.location}
            onPress={() => onMarkerPress && onMarkerPress(attraction)}
          />
        )
      ))}
      
      {showRoute && (
        <Polyline
          coordinates={getRouteCoordinates()}
          strokeColor={theme.colors.primary}
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  }
});

// Стиль карты под старину
const historicalMapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  }
]; 