import React, { useState, useCallback } from 'react';
import { 
  View, 
  TextInput, 
  FlatList, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity,
  Platform,
  StatusBar,
  Animated,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AttractionCard } from '../components/AttractionCard';
import { InterestSelector } from '../components/InterestSelector';
import { Header } from '../components/Header';
import { ATTRACTIONS, INTERESTS } from '../constants/data';
import { RouteSelector } from '../components/RouteSelector';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const { width } = Dimensions.get('window');

export const HomeScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredAttractions, setFilteredAttractions] = useState(ATTRACTIONS);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuAnim] = useState(new Animated.Value(-width));

  const toggleMenu = useCallback((show) => {
    Animated.timing(menuAnim, {
      toValue: show ? 0 : -width,
      duration: 300,
      useNativeDriver: true
    }).start();
    setIsMenuOpen(show);
  }, [menuAnim]);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    setShowItinerary(false);
    const filtered = ATTRACTIONS.filter(attraction => 
      attraction.name.toLowerCase().includes(text.toLowerCase()) ||
      attraction.location.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAttractions(filtered);
  }, []);

  const handleInterestSelect = useCallback((interest) => {
    setSelectedInterest(interest);
    setShowItinerary(true);
    const filtered = ATTRACTIONS.filter(attraction => 
      attraction.categories.includes(interest.id)
    );
    setFilteredAttractions(filtered);
  }, []);

  const handleMenuItemPress = (screenName) => {
    toggleMenu(false);
    if (screenName) {
      navigation.navigate(screenName);
    }
  };

  const renderItinerary = () => {
    if (!showItinerary || !selectedInterest) return null;
    
    return (
      <View style={styles.itineraryContainer}>
        <View style={styles.itineraryHeader}>
          <Text style={styles.itineraryTitle}>
            Маршрут по теме "{selectedInterest.name}"
          </Text>
          <TouchableOpacity 
            style={styles.startButton}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>Начать</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.itinerarySubtitle}>
          Рекомендуемые места для посещения:
        </Text>
      </View>
    );
  };

  const renderSideMenu = () => (
    <Animated.View 
      style={[
        styles.sideMenu,
        { transform: [{ translateX: menuAnim }] }
      ]}
    >
      <View style={styles.menuHeader}>
        <Text style={styles.menuTitle}>Меню</Text>
        <TouchableOpacity 
          onPress={() => toggleMenu(false)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => handleMenuItemPress('Home')}
      >
        <Ionicons name="home" size={24} color="#333" style={styles.menuIcon} />
        <Text style={styles.menuText}>Главная</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => handleMenuItemPress('HistoricalFacts')}
      >
        <Ionicons name="book" size={24} color="#333" style={styles.menuIcon} />
        <Text style={styles.menuText}>Исторические факты</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => handleMenuItemPress('RegionInfo')}
      >
        <Ionicons name="information-circle" size={24} color="#333" style={styles.menuIcon} />
        <Text style={styles.menuText}>О регионе</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.menuItem}
        activeOpacity={0.7}
        onPress={() => handleMenuItemPress('Settings')}
      >
        <Ionicons name="settings" size={24} color="#333" style={styles.menuIcon} />
        <Text style={styles.menuText}>Настройки</Text>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Header 
        title="TourGid" 
        onMenuPress={() => toggleMenu(true)} 
        onMapPress={() => navigation.navigate('Map')}
      />
      {renderSideMenu()}
      {isMenuOpen && (
        <TouchableWithoutFeedback onPress={() => toggleMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Поиск достопримечательностей..."
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>

        <InterestSelector
          interests={INTERESTS}
          selectedInterest={selectedInterest}
          onSelect={handleInterestSelect}
        />

        {renderItinerary()}
        
        <RouteSelector navigation={navigation} />

        <FlatList
          data={filteredAttractions}
          renderItem={({ item }) => (
            <AttractionCard item={item} interests={INTERESTS} />
          )}
          keyExtractor={item => item.id}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>
              Ничего не найдено
            </Text>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'android' ? STATUSBAR_HEIGHT : 0
  },
  content: {
    flex: 1,
    paddingHorizontal: 15
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
    height: 46,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  searchIcon: {
    marginRight: 10
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
    padding: 0
  },
  itineraryContainer: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  itineraryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5
  },
  itineraryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1
  },
  startButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20
  },
  startButtonText: {
    color: '#FFFFFF',
    fontWeight: '600'
  },
  itinerarySubtitle: {
    fontSize: 14,
    color: '#666',
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#888',
    fontSize: 16
  },
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '80%',
    backgroundColor: '#FFFFFF',
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
    padding: 20
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 99
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0'
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  menuIcon: {
    marginRight: 15
  },
  menuText: {
    fontSize: 16,
    color: '#333'
  },
  listContent: {
    paddingBottom: 20
  }
}); 