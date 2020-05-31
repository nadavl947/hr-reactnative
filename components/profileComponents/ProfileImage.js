import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileImage = (props) => {
  const { profileImage, color, openImageModal } = props;
  return (
    <View style={styles.profileImageContainer}>
      <ImageBackground style={styles.bgImage} source={{ uri: profileImage }}>
        <View style={styles.imageButton}>
          <TouchableOpacity onPress={openImageModal}>
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={32}
              color={color}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  profileImageContainer: {
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").width / 3,
    marginVertical: 20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").width / 3,
  },
  bgImage: {
    overflow: "hidden",
    borderRadius: Dimensions.get("window").width / 3,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  imageButton: {
    
  },
});

export default ProfileImage;
