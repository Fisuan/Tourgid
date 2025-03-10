import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export const HistoricalMap = ({ location }) => {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 52.3,
        longitude: 76.95,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      customMapStyle={historicalMapStyle}
    >
      <Marker
        coordinate={{
          latitude: 52.3,
          longitude: 76.95
        }}
        title="Исторический объект"
      />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: width,
    height: height * 0.3,
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
  }
  // Тут можно добавить еще стилей
]; 