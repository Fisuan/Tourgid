import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export const SettingsScreen = () => {
  const { theme, isDark, toggleTheme } = useTheme();
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'kz', name: 'Қазақша', flag: '🇰🇿' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('screens.settings.languageSection')}
        </Text>
        
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.optionItem,
              { backgroundColor: language === lang.code ? theme.colors.primary + '20' : 'transparent' }
            ]}
            onPress={() => changeLanguage(lang.code)}
          >
            <Text style={styles.languageFlag}>{lang.flag}</Text>
            <Text style={[styles.optionText, { color: theme.colors.text }]}>{lang.name}</Text>
            {language === lang.code && (
              <Ionicons name="checkmark" size={20} color={theme.colors.primary} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {t('screens.settings.themeSection')}
        </Text>
        
        <View style={styles.optionItem}>
          <Ionicons 
            name={isDark ? "moon" : "sunny"} 
            size={24} 
            color={theme.colors.text} 
            style={styles.optionIcon}
          />
          <Text style={[styles.optionText, { color: theme.colors.text }]}>
            {t('screens.settings.darkMode')}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#767577", true: theme.colors.primary + "80" }}
            thumbColor={isDark ? theme.colors.primary : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  languageFlag: {
    fontSize: 20,
    marginRight: 12,
  },
}); 