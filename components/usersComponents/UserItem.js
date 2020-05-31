import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const UserItem = (props) => {
  const { data, onItemPress, type } = props;
  let imageToRender = type === "company" ? data.logo : data.imageUri;
  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageToRender }} style={styles.image} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 40,
    width: Dimensions.get("window").width > 600 ? 80 : 60,
    height: Dimensions.get("window").width > 600 ? 80 : 60,
    marginHorizontal: 10,
  },
  image: {
    overflow: "hidden",
    borderRadius: 40,
    width: "100%",
    height: "100%",
  },
});

export default UserItem;
