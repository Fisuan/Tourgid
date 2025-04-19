import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

export const RegionInfoScreen = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Image 
        source={require('../assets/pavlodar-region.jpg')} 
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Павлодарская область
        </Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              Расположена на северо-востоке Казахстана, на правом берегу реки Иртыш
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              Население: около 750 000 человек
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="cloud" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              Резко континентальный климат с жарким летом и холодной зимой
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={20} color={theme.colors.primary} />
            <Text style={[styles.infoText, { color: theme.colors.textSecondary }]}>
              Промышленный центр с развитой металлургией и энергетикой
            </Text>
          </View>
        </View>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Климат
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          Зима длится 5-6 месяцев с температурами до -40°C. Лето жаркое и сухое, температура достигает +35°C. Осадков выпадает мало - около 300 мм в год.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          История
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          Основан в 1720 году как форпост Коряковский. В 1861 переименован в Павлодар. Активное развитие началось в 1950-х с освоением целины и строительством промышленных предприятий.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          География
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          Территория преимущественно равнинная, часть Западно-Сибирской низменности. На востоке - отроги Алтайских гор. Главная река - Иртыш, протекает через всю область.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Культура
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          Богатое культурное наследие, включающее казахские традиции и влияние русской культуры. Известен литературными деятелями, среди которых Павел Васильев и Шафер Науам.
        </Text>
        
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Достопримечательности
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.textSecondary }]}>
          Мечеть Машхур Жусупа, Благовещенский собор, набережная реки Иртыш, дом-музей Павла Васильева, соленое озеро Маралды, Баянаульский национальный парк.
        </Text>
        
        <View style={styles.linksContainer}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
            Полезные ссылки
          </Text>
          
          <TouchableOpacity 
            style={[styles.linkButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => Linking.openURL('https://pavlodar.gov.kz/ru')}
          >
            <Ionicons name="globe" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>
              Официальный сайт
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.linkButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => Linking.openURL('https://kazakhstan.travel/ru/guide/regions/pavlodar')}
          >
            <Ionicons name="airplane" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>
              Туристический портал
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.linkButton, { backgroundColor: theme.colors.primary }]}
            onPress={() => Linking.openURL('https://2gis.kz/pavlodar')}
          >
            <Ionicons name="map" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>
              Карта города
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: width,
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoCard: {
    marginBottom: 25,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  linksContainer: {
    marginTop: 10,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: '#FFFFFF',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});