import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const InterestSelector = ({ interests, selectedInterest, onSelect }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Выберите интересы</Text>
    <FlatList
      horizontal
      data={interests}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={[
            styles.button,
            selectedInterest?.id === item.id && styles.buttonSelected
          ]}
          onPress={() => onSelect(item)}
        >
          <Ionicons 
            name={item.icon} 
            size={24} 
            color={selectedInterest?.id === item.id ? '#FFFFFF' : '#333'} 
          />
          <Text style={[
            styles.buttonText,
            selectedInterest?.id === item.id && styles.buttonTextSelected
          ]}>
            {item.name}
          </Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonSelected: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    marginLeft: 8,
    color: '#333',
    fontSize: 14,
  },
  buttonTextSelected: {
    color: '#FFFFFF',
  },
}); 