import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { AttractionDetailScreen } from './src/screens/AttractionDetailScreen';
import { HistoricalFactsScreen } from './src/screens/HistoricalFactsScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { RegionInfoScreen } from './src/screens/RegionInfoScreen';
import { MapScreen } from './src/screens/MapScreen';
import { ThemeProvider } from './src/context/ThemeContext';
import { LanguageProvider } from './src/context/LanguageContext';
import './src/i18n';
import { useTranslation } from 'react-i18next';
import { RoutesScreen } from './src/screens/RoutesScreen';
import { RouteDetailScreen } from './src/screens/RouteDetailScreen';

const Stack = createNativeStackNavigator();

function AppContent() {
  const { t } = useTranslation();
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          headerBackTitle: '',
        })}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AttractionDetail" 
          component={AttractionDetailScreen}
          options={({ route }) => ({ 
            title: route.params?.attraction?.name || t('screens.attractionDetail.title')
          })}
        />
        <Stack.Screen 
          name="HistoricalFacts" 
          component={HistoricalFactsScreen}
          options={{ title: t('screens.historicalFacts.title') }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: t('screens.settings.title') }}
        />
        <Stack.Screen 
          name="RegionInfo" 
          component={RegionInfoScreen}
          options={{ title: t('screens.regionInfo.title') }}
        />
        <Stack.Screen 
          name="Map" 
          component={MapScreen}
          options={{ title: t('screens.map.title') }}
        />
        <Stack.Screen 
          name="Routes" 
          component={RoutesScreen}
          options={{ title: t('menuItems.routes') }}
        />
        <Stack.Screen 
          name="RouteDetail" 
          component={RouteDetailScreen}
          options={{ title: t('Маршруты') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
