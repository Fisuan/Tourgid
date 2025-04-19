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
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export const AttractionDetailScreen = ({ route, navigation }) => {
  const { attraction } = route.params;
  const { theme } = useTheme();
  const { t } = useTranslation();

  const openMap = () => {
    navigation.navigate('Map', { selectedAttractions: [attraction.id] });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image source={attraction.image} style={styles.image} />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>{attraction.name}</Text>
        <Text style={[styles.location, { color: theme.colors.textSecondary }]}>{attraction.location}</Text>
        
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('screens.attractionDetail.historicalInfo')}
          </Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {attraction.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('screens.attractionDetail.workingHours')}
          </Text>
          <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
            {t('screens.attractionDetail.weekdays')}: {attraction.workingHours?.weekdays}
          </Text>
          <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
            {t('screens.attractionDetail.weekend')}: {attraction.workingHours?.weekend}
          </Text>
          {attraction.workingHours?.dayOff && (
            <Text style={[styles.info, { color: theme.colors.textSecondary }]}>
              {t('screens.attractionDetail.dayOff')}: {attraction.workingHours.dayOff}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            {t('screens.attractionDetail.contacts')}
          </Text>
          <TouchableOpacity 
            onPress={() => Linking.openURL(`tel:${attraction.contacts?.phone}`)}
          >
            <Text style={[styles.contactInfo, { color: theme.colors.primary }]}>
              <Ionicons name="call" size={16} color={theme.colors.primary} />
              {' '}{attraction.contacts?.phone}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => Linking.openURL(`https://${attraction.contacts?.website}`)}
          >
            <Text style={[styles.contactInfo, { color: theme.colors.primary }]}>
              <Ionicons name="globe" size={16} color={theme.colors.primary} />
              {' '}{attraction.contacts?.website}
            </Text>
          </TouchableOpacity>
          <Text style={[styles.contactInfo, { color: theme.colors.primary }]}>
            <Ionicons name="location" size={16} color={theme.colors.primary} />
            {' '}{attraction.contacts?.address}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.mapButton, { backgroundColor: theme.colors.primary }]}
          onPress={openMap}
        >
          <Ionicons name="map" size={20} color="#FFFFFF" />
          <Text style={styles.mapButtonText}>{t('common.showOnMap')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 5,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 16,
    marginBottom: 8,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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