import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";
import * as allActions from "../../store/actions/actions";
import moment from "moment";
import MainSectionButton from "../../components/timeComponents/MainSectionButton";

const TimeStampScreen = (props) => {
  const { navigation } = props;
  const companyData = useSelector((state) => state.companyReducer);
  const userId = useSelector((state) => state.currentUserReducer.currentUserId);
  const userShifts = useSelector((state) => state.shiftsReducer.shiftsList);
  const userList = useSelector((state) => state.usersReducer.usersList);

  const userData = userList.find((item) => item.id === userId);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      companyColor: companyData.defaultColor,
      companyName: companyData.name,
    });
    dispatch(allActions.getShiftsAction(userId));
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <View style={styles.buttonsSection}>
        <MainSectionButton
          color={companyData.defaultColor}
          iconName="clock"
          buttonTitle="Punch Time"
          onButtonPress={() =>
            navigation.navigate("ShiftPunchScreen", {
              companyColor: companyData.defaultColor,
              companyId: companyData.id,
              userId: userId,
            })
          }
        >
          <View style={styles.timePunchChildren}>
            <Text style={styles.timePunchChildrenText}>
              {`Last TimePunch - ${moment(
                userShifts[userShifts.length - 1].shiftStartTime
              ).fromNow()}`}
            </Text>
          </View>
        </MainSectionButton>
        <MainSectionButton
          color={companyData.defaultColor}
          iconName="list"
          buttonTitle="My Work Log"
          onButtonPress={() =>
            navigation.navigate("ShiftsLogScreen", {
              companyColor: companyData.defaultColor,
            })
          }
        >
          <View style={styles.timePunchChildren}>
            <Text style={styles.timePunchChildrenText}>
              See your work log...
            </Text>
          </View>
        </MainSectionButton>
        <MainSectionButton
          color={companyData.defaultColor}
          iconName="attach"
          buttonTitle="My Reportes"
          onButtonPress={() =>
            navigation.navigate("ReportsScreen", {
              companyColor: companyData.defaultColor,
            })
          }
        >
          <View style={styles.timePunchChildren}>
            <Text style={styles.timePunchChildrenText}>
              Sick leave, absence and more...
            </Text>
          </View>
        </MainSectionButton>
        {userData.userType === 2 || userData.userType === 3 ? (
          <MainSectionButton
            color="red"
            iconName="folder"
            buttonTitle="Company Data - Admin"
            onButtonPress={() => navigation.navigate("TimeStampAdmin")}
          >
            <View style={styles.timePunchChildren}>
              <Text style={styles.timePunchChildrenText}>
                Permission granted for accessing company data
              </Text>
            </View>
          </MainSectionButton>
        ) : null}
      </View>
    </View>
  );
};

TimeStampScreen.navigationOptions = (navData) => {
  const companyColor = navData.navigation.getParam("companyColor");
  const companyName = navData.navigation.getParam("companyName");
  return {
    headerTitle: `${companyName} Employee Space`,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: companyColor,
      height: 100,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: Dimensions.get("window").width > 600 ? 30 : 15,
    backgroundColor: "white",
  },
  timePunchChildren: {
    marginTop: 10,
  },
  timePunchChildrenText: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 16,
    color: "#404040",
  },
});

export default TimeStampScreen;
