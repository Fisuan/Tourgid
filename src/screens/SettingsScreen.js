import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Switch, 
  TouchableOpacity, 
  ScrollView,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const SettingsScreen = ({ navigation }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [language, setLanguage] = useState('Русский');
  
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleOfflineMode = () => setOfflineMode(previousState => !previousState);
  
  const showLanguageOptions = () => {
    Alert.alert(
      "Выбор языка",
      "Выберите предпочитаемый язык",
      [
        { text: "Русский", onPress: () => setLanguage('Русский') },
        { text: "Қазақша", onPress: () => setLanguage('Қазақша') },
        { text: "English", onPress: () => setLanguage('English') },
        { text: "Отмена", style: "cancel" }
      ]
    );
  };
  
  const clearCache = () => {
    Alert.alert(
      "Очистить кэш",
      "Вы уверены, что хотите очистить кэш приложения?",
      [
        { text: "Отмена", style: "cancel" },
        { text: "Очистить", onPress: () => Alert.alert("Готово", "Кэш успешно очищен") }
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Внешний вид</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="moon" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Темная тема</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={darkMode ? "#2196F3" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleDarkMode}
          value={darkMode}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Уведомления</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="notifications" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Уведомления</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={notifications ? "#2196F3" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleNotifications}
          value={notifications}
        />
      </View>
      
      <Text style={styles.sectionTitle}>Данные</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="cloud-offline" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Оффлайн режим</Text>
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={offlineMode ? "#2196F3" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleOfflineMode}
          value={offlineMode}
        />
      </View>
      
      <TouchableOpacity style={styles.settingItem} onPress={clearCache}>
        <View style={styles.settingInfo}>
          <Ionicons name="trash-bin" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Очистить кэш</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>Язык</Text>
      <TouchableOpacity style={styles.settingItem} onPress={showLanguageOptions}>
        <View style={styles.settingInfo}>
          <Ionicons name="language" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Язык приложения</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.valueText}>{language}</Text>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </View>
      </TouchableOpacity>
      
      <Text style={styles.sectionTitle}>О приложении</Text>
      <View style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="information-circle" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Версия</Text>
        </View>
        <Text style={styles.valueText}>1.0.0</Text>
      </View>
      
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="document-text" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Политика конфиденциальности</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.settingItem}>
        <View style={styles.settingInfo}>
          <Ionicons name="help-circle" size={24} color="#555" style={styles.icon} />
          <Text style={styles.settingText}>Помощь</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#999" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#999',
    marginRight: 5,
  },
}); 