import { StyleSheet, View, Text, Alert, ActivityIndicator} from 'react-native';
import Constants from 'expo-constants';
import React, {useState, useEffect} from 'react';
import WeatherInfo from './weatherInfo';

const API_KEY = '7585b030c8803b9e89d288c053649ac2'

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setloaded] = useState(false);
    // const [cityName, setCityName] = useState('')

    const fetchWeatherData = async (cityName) => {
        try {
            setloaded(false);
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`);
            if (response.status == 200){
                const data = await response.json();
                console.log(data);
                setWeatherData(data);
            }
            else {
                setWeatherData(null);
            }
            setloaded(true);
        }catch(error) {
            Alert.alert(Error, error.message)
        } 
    }

    useEffect(() => {
        fetchWeatherData('Nairobi');
    }, []);
    if(!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="red"/>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Weather App</Text>
            </View>
            <WeatherInfo weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
        </View>
    );
}
export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FCF5BD',
      paddingTop: Constants.statusBarHeight
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#C5D2EF',
        height: 80,
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    }
  });