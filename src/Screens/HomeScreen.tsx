import React from 'react';
import { View, Text, Alert, TextInput, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppHeader from '../components/Header';


const HomeScreen = ({navigation}:any) => {
  const { t } = useTranslation();

  const [city, setCity] = useState('Dubai');
  const [getUser, setGetUser] = useState('Guest');
  const [data, setData] = useState([]);
  const [filteredData, setFilterData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentUser = await AsyncStorage.getItem('currentUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        setGetUser(user.userName);
      }
    };
    fetchData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const responseData = await fetch('https://app.ticketmaster.com/discovery/v2/events.json?apikey=2MAfbSvEQdNjDxqGTOFGD2JzYTGw0H1i&keyword=music&city=' + city);//Dubai
      const responseJson = await responseData.json();
      setData(responseJson._embedded.events);//responseJson
      setFilterData(responseJson._embedded.events);
    } catch (e) {
      console.error('Error fetching more data', e);
    } finally {
    }
  }

  useEffect(() => {
    fetchMoreData();
    loadFavorites();
  }, []);

  const onSearchText = () => {
    console.log("onSearchText:::" + city);
    if (city) {
      fetchMoreData();
      const filterList = data.filter(item => item.name.toLowerCase().startsWith(city.toLowerCase()));
      setFilterData(filterList);
    } else {
      setFilterData(data);
    }
    setCity(city);
  }
  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    return date + '-' + month + '-' + year;
  }

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };
  const toggleFavorite = (itemId) => {
    const updatedItems = filteredData.map((item) => {
      if (item.id === itemId) {
        item.isFavorite = !item.isFavorite;
      }
      return item;
    });

    setFilterData(updatedItems);

    const updatedFavorites = updatedItems.filter((item) => item.isFavorite);
    setFavorites(updatedFavorites);

    saveFavorites(updatedFavorites);
  };


  const renderItem = ({ item, index }) => (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Details", { routeData1: item })}>
        <View style={styles.itemDisplay}>
          {/* //<Image source={{ uri: item.photo }} style={styles.image} /> */}
          <Text style={styles.itemText}>{index + 1}.</Text>
          <Text style={styles.itemCountryText}>{item.name}</Text>
          <Text style={styles.itemCountryText1}>{item.type}</Text>
          <Text style={styles.itemCountryText3}>{item.id}</Text>
          <Text style={styles.itemCountryText2}>{getCurrentDate()}</Text>

          <TouchableOpacity
            style={[styles.button, item.isFavorite ? styles.favButton : styles.nonFavButton]}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={styles.buttonText}>
              {item.isFavorite ? 'Remove' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>

      </TouchableOpacity>


    </View>
  );

  const onClickLogOut = () => {
    navigation.navigate('Login');
  }

  const onClickProfile = () => {
    navigation.navigate('Profile');
    // Alert.alert("Profile",getUser)
  }

  return (

    <View style={styles.container}>
      <AppHeader title="Dashboard" onLogout={onClickLogOut} onProfile={onClickProfile} />
      <View style={styles.viewSearch}>
        <TextInput
          style={styles.input}
          placeholder="Search by city"
          keyboardType="default"
          autoCapitalize="none"
          value={city}
          onChangeText={setCity}
          textContentType="addressCity"
        />
        <TouchableOpacity onPress={onSearchText}>
          <View style={styles.searchBtn}>
            <Text style={styles.btnSearchTxt}>Click Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}

        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No results found</Text>
          </View>
        )}
      />
      <Text style={styles.favText}>Favorites:</Text>

      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfdfbaff',
    paddingTop: 20
  },
  btnSearchTxt: {
    color: "#fff",
    fontWeight: 'bold'
  },
  headerContainer: {

    height: 40,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  headertext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  logoutlogo: {
    position: 'absolute',
    right: 16,
    top: 0,
    width: 50,
    height: 50
  },
  viewSearch: {
    width: '100%',
   flexDirection: 'row',
   justifyContent: 'space-evenly'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '60%',
    alignSelf:'center',
    marginLeft:20
  },
  searchBtn: {
    backgroundColor: "red",
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    paddingVertical: 10,
    marginTop:18
  },

  itemDisplay: {
    padding: 20,

    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 0,
    flex: 1,
    flexWrap: 'wrap',
    maxWidth: '80%',
    textAlign: 'left',
    fontWeight: '500',

  },
  itemCountryText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    maxWidth: '80%',
    textAlign: 'left',
    fontWeight: '500',

    fontFamily: 'roboto-medium',
    position: 'absolute',
    left: 30,
  },

  itemCountryText1: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    maxWidth: '80%',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'roboto-medium',
    position: 'absolute',
    right: 120,
    top: 25
  },
  itemCountryText2: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    maxWidth: '80%',
    textAlign: 'left',
    fontWeight: '500',
    fontFamily: 'roboto-medium',
    position: 'absolute',
    right: 20,
    bottom: 0
  },
  itemCountryText3: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    maxWidth: '80%',
    textAlign: 'left',
    fontWeight: '500',
    bottom: 0,
    fontFamily: 'roboto-medium',
    position: 'absolute',
    left: 30,

  },
  image: {
    width: 60,
    height: 60,
  },

  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },

  button: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: 80,
    marginLeft: 20,
  },
  favButton: {
    backgroundColor: '#ff6347',
  },
  nonFavButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    alignSelf: 'center'

  },
  favText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#343a40',
    marginLeft: 20
  }

});

export default HomeScreen;