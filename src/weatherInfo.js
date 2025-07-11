import { View, Text, SafeAreaView, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import WeatherSearch from './search';

const WeatherInfo = ({ weatherData, fetchWeatherData }) => {
  const {
    name,
    visibility,
    weather: [{ icon, description }],
    main: { temp, humidity, feels_like },
    wind: { speed },
    sys: { sunrise, sunset },
  } = weatherData;

  const toCelsius = (k) => (k - 273.15).toFixed(1);
  const formatTime = (timestamp) =>
    new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <SafeAreaView style={styles.container}>
      <WeatherSearch fetchWeatherData={fetchWeatherData} />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.title}>{name}</Text>
        </View>

        <View style={styles.logo}>
          <Image
            style={styles.largeIcon}
            source={{ uri: `http://openweathermap.org/img/wn/${icon}.png` }}
          />
          <Text style={styles.currentTemp}>{toCelsius(temp)}°C</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/temp.png')} />
            <Text style={styles.infoText}>{toCelsius(feels_like)}°C</Text>
            <Text style={styles.infoText}>Feels Like</Text>
          </View>

          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/dew.png')} />
            <Text style={styles.infoText}>{humidity}%</Text>
            <Text style={styles.infoText}>Humidity</Text>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/visibility.png')} />
            <Text style={styles.infoText}>{(visibility / 1000).toFixed(1)} km</Text>
            <Text style={styles.infoText}>Visibility</Text>
          </View>

          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/wind.png')} />
            <Text style={styles.infoText}>{speed} m/s</Text>
            <Text style={styles.infoText}>Wind Speed</Text>
          </View>
        </View>

        <View style={styles.extraInfo}>
          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/sunrise.png')} />
            <Text style={styles.infoText}>{formatTime(sunrise)}</Text>
            <Text style={styles.infoText}>Sunrise</Text>
          </View>

          <View style={styles.info}>
            <Image style={styles.smallIcon} source={require('./Images/sunset.png')} />
            <Text style={styles.infoText}>{formatTime(sunset)}</Text>
            <Text style={styles.infoText}>Sunset</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
  },
  title: {
    width: '100%',
    fontSize: 21,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e96e50',
    marginTop: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  largeIcon: {
    width: 150,
    height: 150,
  },
  currentTemp: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  extraInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 7,
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: '#D0EAFA',
    padding: 10,
    justifyContent: 'center',
    borderRadius: 15,
  },
  smallIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 5,
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
  },
});
