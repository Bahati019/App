import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {EvilIcons} from '@expo/vector-icons';

const WeatherSearch = ({fetchWeatherData}) => {
    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput placeholder='Search City' value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            <EvilIcons name='search' size={28} color='black'
                onPress={() => fetchWeatherData(cityName)}
            />
        </View>
    )
}

export default WeatherSearch

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width -15,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray'
    }
})