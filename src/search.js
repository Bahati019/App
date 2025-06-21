import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Keyboard,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { EvilIcons } from '@expo/vector-icons';

const WeatherSearch = ({ fetchWeatherData }) => {
  const [cityName, setCityName] = useState('');
  const [recentCities, setRecentCities] = useState([]);

  const handleSearch = () => {
    const trimmed = cityName.trim();
    if (!trimmed) return;

    fetchWeatherData(trimmed);
    Keyboard.dismiss();

    // Update recent cities (no duplicates, max 5)
    setRecentCities((prev) => {
      const updated = [trimmed, ...prev.filter((c) => c.toLowerCase() !== trimmed.toLowerCase())];
      return updated.slice(0, 5); // keep only last 5
    });

    setCityName('');
  };

  const handleRecentSearch = (city) => {
    fetchWeatherData(city);
    setCityName('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Search City"
          value={cityName}
          onChangeText={setCityName}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <EvilIcons name="search" size={28} color="black" onPress={handleSearch} />
      </View>

      {recentCities.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentContainer}>
          {recentCities.map((city, index) => (
            <TouchableOpacity key={index} onPress={() => handleRecentSearch(city)} style={styles.chip}>
              <Text style={styles.chipText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default WeatherSearch;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width - 20,
    borderWidth: 1.5,
    paddingVertical: 10,
    borderRadius: 25,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    backgroundColor: '#F0F0F0',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  recentContainer: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  chip: {
    backgroundColor: '#D0EAFA',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
});
