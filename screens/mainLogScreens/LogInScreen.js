import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as logInActions from "../../store/actions/actions";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  Button,
} from "react-native";

const LogInScreen = (props) => {
  const { navigation } = props;
  const [email, setemail] = useState("");
  const [passWord, setPassWord] = useState("");

  const dispatch = useDispatch();

  navigation.addListener("willFocus", () => {
    setPassWord("");
    setemail("");
  });

  const handleLogin = () => {
    dispatch(logInActions.logInAction(passWord.toLowerCase(), email.toLowerCase()));
    navigation.navigate("MainLog");
  };

  return (
    <ImageBackground
      style={styles.bgImg}
      source={{
        uri:
          "https://images.unsplash.com/photo-1504297050568-910d24c426d3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
      }}
    >
      <View style={styles.logInContainer}>
        <View style={styles.logInBox}>
          <Text style={styles.title}>Welcome!</Text>
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              value={email}
              onChangeText={setemail}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.label}>Password</Text>
            <TextInput
              value={passWord}
              onChangeText={setPassWord}
              style={styles.input}
            />
          </View>
          <Button title="Submit" onPress={() => handleLogin()} />
        </View>
      </View>
    </ImageBackground>
  );
};

LogInScreen.navigationOptions = (navData) => {
  return {
    headerShown: false,
    tabBarVisible: false,
  };
};

const styles = StyleSheet.create({
  logInContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
  },
  logInBox: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 20,
    width: "60%",
    padding: 20,
  },
  title: {
    textAlign: "center",
    fontFamily: "open-sans-bold",
    fontSize: 26,
    marginBottom: 20,
  },
  label: {
    fontFamily: "open-sans",
    fontSize: 18,
  },
  input: {
    backgroundColor: "#ccc",
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
  },
});

export default LogInScreen;
