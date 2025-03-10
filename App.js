import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { AttractionDetailScreen } from './src/screens/AttractionDetailScreen';
import { HistoricalFactsScreen } from './src/screens/HistoricalFactsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { RegionInfoScreen } from './src/screens/RegionInfoScreen';
import { MapScreen } from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AttractionDetail" 
          component={AttractionDetailScreen}
          options={{ title: 'Подробнее' }}
        />
        <Stack.Screen 
          name="HistoricalFacts" 
          component={HistoricalFactsScreen}
          options={{ title: 'Исторические факты' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Настройки' }}
        />
        <Stack.Screen 
          name="RegionInfo" 
          component={RegionInfoScreen}
          options={{ title: 'О регионе' }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={{ title: 'Карта' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
