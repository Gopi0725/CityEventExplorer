import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  I18nManager,
  TouchableOpacity,
  Linking,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import CommonHeader from "../components/CommonHeader";

const DetailScreen = ({ route, navigation }: any) => {
  const { t, i18n } = useTranslation();
  const [isRTL] = useState(I18nManager.isRTL);
  const { routeData1 } = route.params;

  const ImageURL = routeData1.images[0].url;

  const getCurrentDate = () => {
    const date = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    return `${date}-${month}-${year}`; // format: d-m-y
  };

  const onClickFav = () => {
    navigation.navigate("Fav");
  };

  const openInMaps = () => {
    const venue = routeData1._embedded?.venues?.[0];
    if (!venue?.location?.latitude || !venue?.location?.longitude) {
      Alert.alert("Location not available");
      return;
    }

    const lat = parseFloat(venue.location.latitude);
    const lng = parseFloat(venue.location.longitude);
    const label = routeData1.name;

    const url =
      Platform.OS === "ios"
        ? `http://maps.apple.com/?ll=${lat},${lng}&q=${encodeURIComponent(
            label
          )}`
        : `geo:${lat},${lng}?q=${encodeURIComponent(label)}`;

    Linking.openURL(url).catch(() =>
      Alert.alert("Error", "Could not open map app")
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Details"
        onBackPress={() => navigation.goBack()}
        onProfilePress={() =>
          Alert.alert("Profile Icon", "Go to profile settings")
        }
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
        <Image source={{ uri: ImageURL }} style={{ width: 200, height: 200 }} />
      </View>

      <TouchableOpacity style={styles.mapButton} onPress={openInMaps}>
        <Text style={styles.buttonText}>{t("Location")}</Text>
      </TouchableOpacity>

    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#dfdfbaff",
    paddingTop: 0,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 20,
    marginTop: 20,
  },
  key: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: "#555",
    flex: 2,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    textAlign: "center",
    fontSize: 18,
  },
  mapButton: {
    backgroundColor: "#3d69c0ff",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 35,
    width: "60%",
    alignSelf: "center",
  },
});
