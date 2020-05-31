import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as loginActions from "../../store/actions/actions";
import { View, Text, StyleSheet, Button } from "react-native";

const SettingsScreen = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUserReducer);

  return (
    <View style={styles.screen}>
      <Button
        title="log out"
        onPress={() => {
          dispatch(loginActions.logOutAction())
          navigation.navigate("loginScreen")
        }
        }
      />
    </View>
  );
};

SettingsScreen.navigationOptions = () => {
  return {
    headerTitle: "Settings",
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SettingsScreen;
