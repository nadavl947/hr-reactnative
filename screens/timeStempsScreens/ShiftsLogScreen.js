import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MONTHS } from "../../data/monthsData";
import * as allActions from "../../store/actions/actions";

import MonthButton from "../../components/eventsComponents/MonthButton";
import ShiftsTableTitle from "../../components/timeComponents/ShiftsTableTitle";
import ShiftItem from "../../components/timeComponents/ShiftItem";
import MonthShiftsData from "../../components/timeComponents/MonthShiftsData";

const ShiftsLogScreen = (props) => {
  const { navigation } = props;
  const [currentMonth, setCurrentMonth] = useState(
    moment().format("M").toString()
  );
  const userShifts = useSelector((state) => state.shiftsReducer.shiftsList);
  const companyColor = navigation.getParam("companyColor");
  const monthShifts = userShifts.filter(
    (item) => item.shiftMonth === Number(currentMonth)
  );

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.monthsContainer}>
        {MONTHS.map((item) => {
          return (
            <MonthButton
              data={item}
              key={item.id}
              currentMonth={currentMonth}
              changeMonth={() => setCurrentMonth(item.id.toString())}
            />
          );
        })}
      </View>
      <View style={styles.monthTitleContainer}>
        <View style={styles.monthTitleSection}>
          {MONTHS.map((item) => {
            if (item.id.toString() === currentMonth) {
              return (
                <Text key={item.id} style={styles.monthTitle}>
                  {item.fullName}
                </Text>
              );
            }
          })}
        </View>
        <View style={styles.monthDataSection}>
          <MonthShiftsData color={companyColor} shifts={monthShifts} />
        </View>
      </View>
      {monthShifts.length ? (
        <View style={styles.tableContainer}>
          <View style={styles.tableTitle}>
            <ShiftsTableTitle />
          </View>
          <ScrollView>
            <View style={styles.shiftsList}>
              {monthShifts.map((item) => {
                return (
                  <ShiftItem
                    data={item}
                    key={item.id}
                    companyColor={companyColor}
                    deleteShift={() =>
                      dispatch(allActions.deleteShiftAction(item.id))
                    }
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.noImageContainer}>
          <Image
            source={{
              uri:
                "https://cdn.business2community.com/wp-content/uploads/2015/01/QuestionMark.png.png",
            }}
            style={styles.noImage}
          />
          <Text style={styles.noImageTitle}>No Data was found...</Text>
        </View>
      )}
    </View>
  );
};

ShiftsLogScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "My Work Log",
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
  monthsContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  monthTitleContainer: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  monthTitleSection: {
    width: "20%",
  },
  monthDataSection: {
    width: "80%",
  },
  monthTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 36 : 24,
    color: "#404040",
  },
  noImageContainer: {
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  noImage: {
    height: "20%",
    width: "20%",
  },
  noImageTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 26 : 18,
    color: "#404040",
    marginVertical: 10,
  },
});

export default ShiftsLogScreen;
