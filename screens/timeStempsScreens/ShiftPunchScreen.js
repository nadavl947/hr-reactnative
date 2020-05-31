import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { connect } from "react-redux";
import * as allActions from "../../store/actions/actions";
import moment from "moment";

import MonthShiftsData from "../../components/timeComponents/MonthShiftsData";
import TodayShiftsTableTitle from "../../components/timeComponents/TodayShiftsTableTitle";
import TodayShiftItem from "../../components/timeComponents/TodayShiftItem";
import PunchButton from "../../components/timeComponents/PunchButton";

class ShiftPunchScreen extends Component {
  state = {
    initial: 0,
  };

  onStartShift = () => {
    const { createShift, navigation } = this.props;
    const userId = navigation.getParam("userId");
    const companyId = navigation.getParam("companyId");
    Alert.alert("Start New Shift?", "", [
      {
        text: "Yes",
        onPress: () =>
          createShift(
            userId,
            companyId,
            Number(moment().format("M")),
            Number(moment().format("D")),
            Number(moment().format("YYYY"))
          ),
      },
      {
        text: "Cancle",
      },
    ]);
  };

  onEndShift = (shiftId, shiftStart) => {
    const { closeShift } = this.props;
    const duration = moment.duration(moment().diff(shiftStart));

    Alert.alert("End Current Shift?", "", [
      {
        text: "Yes",
        onPress: () =>
          closeShift(
            shiftId,
            Math.floor(duration.asMinutes()),
            moment(shiftStart).fromNow("HH")
          ),
      },
      {
        text: "Cancle",
      },
    ]);
  };

  render() {
    const { shiftsList, navigation, deleteShift } = this.props;
    const companyColor = navigation.getParam("companyColor");
    const todayShifts = shiftsList.filter(
      (item) =>
        moment(item.shiftStartTime).format("DD/MM/YYYY") ===
        moment().format("DD/MM/YYYY")
    );

    return (
      <View style={styles.screen}>
        <View style={styles.headerDate}>
          <Text style={styles.DateTitle}>
            {moment().format("MMMM Do YYYY")}
          </Text>
          <Text style={styles.DateText}>{moment().format("HH:mm: A")}</Text>
        </View>
        <View style={styles.todayActivity}>
          <View style={styles.monthTitleContainer}>
            <View style={styles.monthTitleSection}>
              <Text style={styles.todayTitle}>Today Activity</Text>
            </View>
            <View style={styles.monthDataSection}>
              <MonthShiftsData color={companyColor} shifts={todayShifts} />
            </View>
          </View>
          <View style={styles.todayTable}>
            <TodayShiftsTableTitle />
            <ScrollView style={styles.shiftList}>
              {todayShifts.map((item) => {
                return (
                  <TodayShiftItem
                    data={item}
                    key={item.id}
                    deleteShift={() => deleteShift(item.id)}
                  />
                );
              })}
            </ScrollView>
          </View>
        </View>
        <View style={styles.punchButtonContainer}>
          <PunchButton
            isNewShift={
              todayShifts.length === 0 ||
              moment(todayShifts[todayShifts.length - 1].shiftEndTime).isValid()
            }
            startShift={() => this.onStartShift()}
            onEndShift={() =>
              this.onEndShift(
                todayShifts[todayShifts.length - 1].id,
                todayShifts[todayShifts.length - 1].shiftStartTime
              )
            }
          />
        </View>
      </View>
    );
  }
}

ShiftPunchScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Time Punch",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: navData.navigation.getParam("companyColor"),
      height: 100,
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "white",
    flex: 1,
    paddingHorizontal: Dimensions.get("window").width > 600 ? 30 : 15,
  },
  headerDate: {
    marginVertical: Dimensions.get("window").width > 600 ? 10 : 5,
    alignItems: "center",
  },
  DateTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 28 : 20,
    marginVertical: Dimensions.get("window").width > 600 ? 10 : 5,
  },
  DateText: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 24 : 18,
    marginVertical: Dimensions.get("window").width > 600 ? 10 : 5,
  },
  monthTitleContainer: {
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  monthTitleSection: {
    width: "30%",
  },
  monthDataSection: {
    width: "70%",
  },
  todayTable: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: Dimensions.get("window").width > 600 ? 10 : 5,
    borderRadius: 10,
  },
  todayTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 24 : 16,
  },
  shiftList: {
    height:
      Dimensions.get("window").width > 600
        ? Dimensions.get("window").width / 5
        : Dimensions.get("window").width / 3,
  },
  punchButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    shiftsList: state.shiftsReducer.shiftsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createShift: (userId, companyId, monthId, dayId, year) =>
      dispatch(
        allActions.startNewShiftAction(userId, companyId, monthId, dayId, year)
      ),
    closeShift: (shiftId, durationNumber, durationText) =>
      dispatch(
        allActions.endCurrentShiftAction(shiftId, durationNumber, durationText)
      ),
    deleteShift: (id) => dispatch(allActions.deleteShiftAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShiftPunchScreen);
