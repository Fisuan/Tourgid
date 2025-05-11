import { StyleSheet } from 'react-native';

export const ATTRACTIONS = [
  {
    id: '1',
    name: 'Павлодарский историко-краеведческий музей',
    description: 'Музей с богатой историей региона',
    location: 'г. Павлодар',
    image: require('../assets/pavlodar-museum.jpg'),
    categories: ['history', 'culture', 'art'],
    workingHours: {
      weekdays: '10:00 - 18:00',
      weekend: '10:00 - 17:00',
      dayOff: 'Понедельник'
    },
    contacts: {
      phone: '+7 (7182) 32-22-33',
      website: 'www.pavlodartourism.kz',
      address: 'ул. Ленина, 147'
    },
    coordinates: {
      latitude: 52.2873,
      longitude: 76.9674
    }
  },
  {
    id: '2', 
    name: 'Национальный природный парк Баянаул',
    description: 'Живописный горный парк с уникальной природой',
    location: 'Баянаульский район',
    image: require('../assets/bayanaul-park.jpg'),
    categories: ['nature', 'outdoor', 'adventure'],
    workingHours: {
      weekdays: 'Круглосуточно',
      weekend: 'Круглосуточно',
      dayOff: null
    },
    contacts: {
      phone: '+7 (71840) 9-13-47',
      website: 'bayanaul.kz',
      address: 'Баянаульский район, пос. Баянаул'
    },
    coordinates: {
      latitude: 50.8000,
      longitude: 75.7000
    }
  },
  {
    id: '3',
    name: 'Мавзолей Токтамыс-баба',
    description: 'Исторический памятник архитектуры',
    location: 'Аккулинский район',
    image: require('../assets/toktamys-mausoleum.jpg'),
    categories: ['history', 'architecture', 'culture'],
    coordinates: {
      latitude: 52.1500,
      longitude: 77.1000
    }
  },
  {
    id: '4',
    name: 'Концертный зал "Достык"',
    description: 'Современный концертный зал для музыкальных мероприятий',
    location: 'г. Павлодар',
    image: require('../assets/dostyk-hall.jpg'),
    categories: ['music', 'culture', 'entertainment'],
    coordinates: {
      latitude: 52.2950,
      longitude: 76.9500
    }
  },
  {
    id: '5',
    name: 'Музыкальный колледж имени Каденова',
    description: 'Известное музыкальное учебное заведение с богатой историей',
    location: 'г. Павлодар',
    image: require('../assets/music-college.jpg'),
    categories: ['music', 'education', 'culture'],
    coordinates: {
      latitude: 52.2800,
      longitude: 76.9600
    }
  }
];

export const INTERESTS = [
  { id: 'music', name: 'Музыка', icon: 'musical-notes' },
  { id: 'history', name: 'История', icon: 'book' },
  { id: 'nature', name: 'Природа', icon: 'leaf' },
  { id: 'culture', name: 'Культура', icon: 'color-palette' },
  { id: 'architecture', name: 'Архитектура', icon: 'business' }
];

export const ROUTES = [
  {
    id: '1',
    name: 'Исторический маршрут',
    description: 'Познакомьтесь с богатой историей Павлодарского региона',
    duration: '1 день',
    difficulty: 'Лёгкий',
    attractions: ['1', '3'], 
    recommendedTransport: 'Автобус/Такси',
    tips: [
      'Возьмите с собой воду',
      'Удобная обувь обязательна',
      'Рекомендуется начать маршрут с утра'
    ],
    image: require('../assets/pavlodar-museum.jpg'),
  },
  {
    id: '2',
    name: 'Культурное наследие',
    description: 'Погрузитесь в культурную жизнь города',
    duration: '2 дня',
    difficulty: 'Средний',
    attractions: ['1', '4', '5'],
    recommendedTransport: 'Пешком/Такси',
    tips: [
      'Проверьте расписание концертов заранее',
      'Забронируйте билеты онлайн',
      'Посетите местные кафе между экскурсиями'
    ]
  },
  {
    id: '3',
    name: 'Природные красоты',
    description: 'Откройте для себя уникальную природу региона',
    duration: '3 дня',
    difficulty: 'Сложный',
    attractions: ['2'],
    recommendedTransport: 'Автомобиль',
    tips: [
      'Возьмите палатку и спальный мешок',
      'Запаситесь продуктами',
      'Проверьте прогноз погоды',
      'Заранее забронируйте место в кемпинге'
    ]
  }
];

const historicalTheme = {
  colors: {
    primary: '#8B4513', // коричневый
    secondary: '#DAA520', // золотой
    background: '#FFF8DC', // кремовый
    text: '#463E3F', // тёмно-серый
    accent: '#800000' // бордовый
  }
};

const typography = {
  headings: {
    fontFamily: 'Playfair Display', 
    fontSize: {
      h1: 32,
      h2: 24,
      h3: 20
    }
  },
  body: {
    fontFamily: 'Lora', 
    fontSize: 16,
    lineHeight: 24
  }
};

const historicalStyles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#8B4513',
    backgroundColor: '#FFF8DC',
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  oldPaper: {
    backgroundColor: '#FFF8DC',
    borderRadius: 0,
    borderWidth: 2,
    borderColor: '#8B4513',
    padding: 20,
    margin: 10
  }
}); 