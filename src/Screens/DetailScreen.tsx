import React from "react";
import { View, Text, Image, StyleSheet, Alert, I18nManager, TouchableOpacity } from 'react-native';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import CommonHeader from '../components/CommonHeader';
import MapView, { Marker } from 'react-native-maps';

const DetailScreen = ({ route, navigation }) => {

    const { t, i18n } = useTranslation();
    const [isRTL, setIsRTL] = useState(I18nManager.isRTL);
    const { routeData1 } = route.params;
    console.log(JSON.stringify({ routeData1 }));
    const ImageURL = routeData1.images[0].url;
    const getCurrentDate = () => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        return date + '-' + month + '-' + year;//format: d-m-y;
    }
    const onClickFav = () => {
        navigation.navigate('Fav');
    }
    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // useEffect(() => {
    //     // You can get the user's current location here if needed using Geolocation API
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             setLocation({
    //                 ...location,
    //                 latitude: position.coords.latitude,
    //                 longitude: position.coords.longitude,
    //             });
    //         },
    //         (error) => console.log(error),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );
    // }, []);

    return (

        <View style={styles.container}>
            <CommonHeader
                title="Details"
                onBackPress={() => navigation.goBack()}
                onProfilePress={() => Alert.alert('Profile Icon', 'Go to profile settings')}
            />

            <View style={styles.itemContainer}>
                <Text style={styles.key}>Name:</Text>
                <Text style={styles.value}>{routeData1.name}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.key}>Type:</Text>
                <Text style={styles.value}>{routeData1.type}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.key}>ID:</Text>
                <Text style={styles.value}>{routeData1.id}</Text>
            </View>

            <View style={styles.itemContainer}>
                <Text style={styles.key}>Event URL:</Text>
                <Text style={styles.value}>{routeData1.url}</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.key}>Event Date:</Text>
                <Text style={styles.value}>{getCurrentDate()}</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: ImageURL }}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={onClickFav}>
                <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            {/* <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}>
                    <Marker
                        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                        title={'Marker Title'}
                        description={'Marker Description'}
                    />
                </MapView>
            </View> */}

        </View>
    );
};

export default DetailScreen;

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#e32828',
        paddingVertical: 15,
        borderRadius: 8,
        position: 'absolute',
        bottom: 20,
        width: '90%',
        alignSelf: 'center',
        display: 'none'

    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 18,

    },

    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#dfdfbaff',
        paddingTop: 20
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        paddingLeft: 20,
        marginTop: 20
    },
    key: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    value: {
        fontSize: 16,
        color: '#555',
        flex: 2,
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop: 30
    },
    containerMap: {
        width: '100%',
        height: 50
    },
    map: {
        width: '100%',
        height: '100%',
    },

});

