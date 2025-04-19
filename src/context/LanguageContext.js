import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

export const languages = {
  RU: 'ru',
  KZ: 'kz',
  EN: 'en'
};


const translations = {
  ru: {
    
    menu: 'Меню',
    search: 'Поиск достопримечательностей...',
    noResults: 'Ничего не найдено. Попробуйте изменить запрос.',
    close: 'Закрыть',
    
    // Навигация
    home: 'Главная',
    map: 'Карта',
    settings: 'Настройки',
    historicalFacts: 'Исторические факты',
    regionInfo: 'О регионе',
    
    // Категории интересов
    music: 'Музыка',
    history: 'История',
    nature: 'Природа',
    culture: 'Культура',
    architecture: 'Архитектура',
    
    // Детали достопримечательностей
    workingHours: 'Время работы',
    weekdays: 'Будни',
    weekend: 'Выходные',
    dayOff: 'Выходной',
    contacts: 'Контакты',
    showOnMap: 'Показать на карте',
    historicalReference: 'Историческая справка',
    
    // Маршруты
    popularRoutes: 'Популярные маршруты',
    duration: 'Продолжительность',
    difficulty: 'Сложность',
    attractions: 'Достопримечательности',
    tips: 'Советы',
    startRoute: 'Начать маршрут',
    
    // Карта
    loadingMap: 'Загрузка карты...',
    route: 'Маршрут',
    details: 'Подробнее',
    
    // Настройки
    language: 'Язык',
    darkTheme: 'Темная тема',
    notifications: 'Уведомления',
    clearCache: 'Очистить кэш',
    aboutApp: 'О приложении',
    
    // Исторические факты
    readMore: 'Подробнее',
    
    // Регион
    regionDescription: 'Описание региона',
    climate: 'Климат',
    population: 'Население',
    economy: 'Экономика'
  },
  
  kz: {
    // Общие
    menu: 'Мәзір',
    search: 'Көрікті жерлерді іздеу...',
    noResults: 'Ештеңе табылмады. Сұранысты өзгертіп көріңіз.',
    close: 'Жабу',
    
    // Навигация
    home: 'Басты бет',
    map: 'Карта',
    settings: 'Параметрлер',
    historicalFacts: 'Тарихи фактілер',
    regionInfo: 'Аймақ туралы',
    
    // Категории интересов
    music: 'Музыка',
    history: 'Тарих',
    nature: 'Табиғат',
    culture: 'Мәдениет',
    architecture: 'Сәулет',
    
    // Детали достопримечательностей
    workingHours: 'Жұмыс уақыты',
    weekdays: 'Жұмыс күндері',
    weekend: 'Демалыс күндері',
    dayOff: 'Демалыс күні',
    contacts: 'Байланыстар',
    showOnMap: 'Картада көрсету',
    historicalReference: 'Тарихи анықтама',
    
    // Маршруты
    popularRoutes: 'Танымал бағыттар',
    duration: 'Ұзақтығы',
    difficulty: 'Қиындық',
    attractions: 'Көрікті жерлер',
    tips: 'Кеңестер',
    startRoute: 'Бағытты бастау',
    
    // Карта
    loadingMap: 'Карта жүктелуде...',
    route: 'Бағыт',
    details: 'Толығырақ',
    
    // Настройки
    language: 'Тіл',
    darkTheme: 'Қараңғы тақырып',
    notifications: 'Хабарландырулар',
    clearCache: 'Кэшті тазалау',
    aboutApp: 'Қолданба туралы',
    
    // Исторические факты
    readMore: 'Толығырақ',
    
    // Регион
    regionDescription: 'Аймақ сипаттамасы',
    climate: 'Климат',
    population: 'Халық саны',
    economy: 'Экономика'
  },
  
  en: {
    // Общие
    menu: 'Menu',
    search: 'Search attractions...',
    noResults: 'Nothing found. Try changing your query.',
    close: 'Close',
    
    // Навигация
    home: 'Home',
    map: 'Map',
    settings: 'Settings',
    historicalFacts: 'Historical Facts',
    regionInfo: 'About Region',
    
    // Категории интересов
    music: 'Music',
    history: 'History',
    nature: 'Nature',
    culture: 'Culture',
    architecture: 'Architecture',
    
    // Детали достопримечательностей
    workingHours: 'Working Hours',
    weekdays: 'Weekdays',
    weekend: 'Weekend',
    dayOff: 'Day Off',
    contacts: 'Contacts',
    showOnMap: 'Show on Map',
    historicalReference: 'Historical Reference',
    
    // Маршруты
    popularRoutes: 'Popular Routes',
    duration: 'Duration',
    difficulty: 'Difficulty',
    attractions: 'Attractions',
    tips: 'Tips',
    startRoute: 'Start Route',
    
    // Карта
    loadingMap: 'Loading map...',
    route: 'Route',
    details: 'Details',
    
    // Настройки
    language: 'Language',
    darkTheme: 'Dark Theme',
    notifications: 'Notifications',
    clearCache: 'Clear Cache',
    aboutApp: 'About App',
    
    // Исторические факты
    readMore: 'Read More',
    
    // Регион
    regionDescription: 'Region Description',
    climate: 'Climate',
    population: 'Population',
    economy: 'Economy'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ru');

  // Load saved language
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage) {
          changeLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Failed to load language', error);
      }
    };
    
    loadLanguage();
  }, []);

  // Change language and save preference
  const changeLanguage = async (lang) => {
    try {
      await AsyncStorage.setItem('language', lang);
      i18n.changeLanguage(lang);
      setLanguage(lang);
    } catch (error) {
      console.error('Failed to save language', error);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext); 