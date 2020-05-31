import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import * as allActions from "../../store/actions/actions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";

import ProfileImage from "../../components/profileComponents/ProfileImage";
import ImageModal from "../../components/profileComponents/ImageModal";
import UserDataComponent from "../../components/profileComponents/UserDataComponent";
import EditDataModal from "../../components/profileComponents/EditDataModal";

const ProfileScreen = (props) => {
  const { navigation } = props;
  const companyData = useSelector((state) => state.companyReducer);
  const usersList = useSelector((state) => state.usersReducer.usersList);
  const currentUserId = useSelector(
    (state) => state.currentUserReducer.currentUserId
  );
  const userData = usersList.find((item) => item.id === currentUserId);

  const [imageModalVisibal, setImageModalVisibal] = useState(false);
  const [profileImage, setProfileImage] = useState(userData.imageUri);
  const [editModeVisible, setEditModeVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      comapnyColor: companyData.defaultColor,
      companyName: companyData.name,
    });
  }, []);

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView>
        <View style={styles.screen}>
          <ImageModal
            isVisible={imageModalVisibal}
            closeModal={() => setImageModalVisibal(false)}
            profileImage={profileImage}
            setNewImage={(newImage) => setProfileImage(newImage)}
            saveImage={() => {
              dispatch(
                allActions.editProfileImageAction(userData.id, profileImage)
              );
              setImageModalVisibal(false);
            }}
          />
          <EditDataModal
            isVisible={editModeVisible}
            closeModal={() => setEditModeVisible(false)}
            userData={userData}
            companyName={companyData.name}
            color={companyData.defaultColor}
            departments={companyData.departments}
            saveEdit={(data) =>
              dispatch(allActions.editProfileDataAction(data))
            }
          />
          <View style={styles.imageContainer}>
            <ProfileImage
              profileImage={userData.imageUri}
              color={companyData.defaultColor}
              openImageModal={() => setImageModalVisibal(true)}
            />
          </View>
          <UserDataComponent
            userData={userData}
            color={companyData.defaultColor}
            departments={companyData.departments}
            openEditModal={() => setEditModeVisible(true)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("companyName"),
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: navData.navigation.getParam("comapnyColor"),
      height: 100,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          color="white"
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});

export default ProfileScreen;
