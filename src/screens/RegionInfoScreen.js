import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const RegionInfoScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Image 
        source={require('../assets/pavlodar-region.jpg')} 
        style={styles.headerImage}
      />
      
      <View style={styles.content}>
        <Text style={styles.title}>Павлодарская область</Text>
        
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location" size={20} color="#2196F3" />
            <Text style={styles.infoText}>Северо-восток Казахстана</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="people" size={20} color="#2196F3" />
            <Text style={styles.infoText}>Население: около 750 000 человек</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="map" size={20} color="#2196F3" />
            <Text style={styles.infoText}>Площадь: 124 800 км²</Text>
          </View>
          <View style={styles.infoRow}>
            <Ionicons name="business" size={20} color="#2196F3" />
            <Text style={styles.infoText}>Административный центр: г. Павлодар</Text>
          </View>
        </View>
        
        <Text style={styles.sectionTitle}>История</Text>
        <Text style={styles.paragraph}>
          Павлодарская область была образована 15 января 1938 года. Регион имеет богатую историю, 
          начиная с древних поселений и кочевых народов, населявших эти земли. 
          Город Павлодар был основан в 1720 году как Коряковский форпост на Иртышской линии.
        </Text>
        <Text style={styles.paragraph}>
          В XIX веке Павлодар стал важным торговым центром на Иртыше. В советский период 
          область активно развивалась как промышленный регион с крупными предприятиями 
          энергетики, металлургии и химической промышленности.
        </Text>
        
        <Text style={styles.sectionTitle}>География и природа</Text>
        <Text style={styles.paragraph}>
          Область расположена в северо-восточной части Казахстана, в среднем течении реки Иртыш. 
          Территория региона представляет собой в основном равнину с отдельными возвышенностями. 
          На юго-западе области находится знаменитый Баянаульский национальный природный парк 
          с живописными горами, озерами и уникальной флорой и фауной.
        </Text>
        
        <Text style={styles.sectionTitle}>Культура и традиции</Text>
        <Text style={styles.paragraph}>
          Павлодарская область известна своим богатым культурным наследием, где переплетаются 
          казахские традиции и влияние различных народов, населяющих регион. Здесь проводятся 
          многочисленные фестивали, выставки и культурные мероприятия, сохраняющие и 
          популяризирующие местные традиции.
        </Text>
        
        <Text style={styles.sectionTitle}>Достопримечательности</Text>
        <Text style={styles.paragraph}>
          Среди главных достопримечательностей области: Баянаульский национальный парк, 
          Музей имени Бухар Жырау, Дом-музей Павла Васильева, Областной художественный музей, 
          Мавзолей Машхур Жусупа, Соборная мечеть и многие другие исторические и культурные объекты.
        </Text>
        
        <View style={styles.linksContainer}>
          <Text style={styles.sectionTitle}>Полезные ссылки</Text>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://pavlodar.gov.kz')}
          >
            <Ionicons name="globe" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>Официальный сайт области</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://visitkazakhstan.kz/ru/guide/regions/12/0/')}
          >
            <Ionicons name="airplane" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>Туристический портал</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={() => Linking.openURL('https://maps.google.com/?q=Павлодар')}
          >
            <Ionicons name="map" size={20} color="#FFFFFF" />
            <Text style={styles.linkText}>Карта региона</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 15,
  },
  infoCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 15,
  },
  linksContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
}); 