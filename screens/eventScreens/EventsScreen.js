import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { MONTHS } from "../../data/monthsData";
import { DAYS } from "../../data/daysOfTheWeekData";
import moment from "moment";
import * as allActions from "../../store/actions/actions";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";

import MonthButton from "../../components/eventsComponents/MonthButton";
import DayBox from "../../components/eventsComponents/DayBox";
import DayModal from "../../components/eventsComponents/DayModal";
import CreateModal from "../../components/eventsComponents/CreateModal";

const EventsScreen = (props) => {
  const { navigation } = props;

  const [currentMonth, setCurrentMonth] = useState(
    moment().format("M").toString()
  );
  const [focusDay, setFocusDay] = useState(moment().format("D"));
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setCreateShowModal] = useState(false);

  const companyData = useSelector((state) => state.companyReducer);
  const userId = useSelector((state) => state.currentUserReducer.currentUserId);
  const userEvents = useSelector((state) => state.eventsReducer.eventsList);
  const companyUsers = useSelector((state) => state.usersReducer.usersList);

  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setParams({
      companyName: companyData.name,
      companyColor: companyData.defaultColor,
      openCreateModal: () => setCreateShowModal(true)
    });
    dispatch(allActions.getEventAction(companyData.id, userId));
  }, [dispatch]);

  let monthList = [];

  for (
    var i = 1;
    i <= MONTHS.find((item) => item.id.toString() === currentMonth).days;
    i++
  ) {
    monthList.push({ day: i.toString(), id: i, isThisMonth: true });
  }

  for (
    var j = 0;
    j <=
    Number(
      moment(
        new Date(2020, currentMonth - 1, monthList[0].day).toISOString()
      ).format("d")
    );
    j++
  ) {
    monthList.unshift({
      day: "0",
      id: j + currentMonth - 1,
      isThisMonth: false,
    });
  }

  return (
    <View style={styles.screen}>
      <DayModal
        userId={userId}
        companyUsers={companyUsers}
        companyColor={companyData.defaultColor}
        isVisibel={showModal}
        closeModal={() => setShowModal(false)}
        selectedDate={moment(
          new Date(2020, currentMonth - 1, Number(focusDay))
        ).format("dddd MMM Do YY")}
        dailyEvents={userEvents.filter(
          (item) =>
            item.monthId.toString() === currentMonth &&
            item.dayId.toString() === focusDay
        )}
      />
      <CreateModal
        isVisibale={showCreateModal}
        closeModal={() => setCreateShowModal(false)}
        companyUsers={companyUsers}
        companyColor={companyData.defaultColor}
        monthList={monthList}
        companyDepartments={companyData.departments}
        companyId={companyData.id}
        userId={userId}
        createNewEvent={(data) => dispatch(allActions.createNewEvent(data))}
      />
      <View style={styles.monthListContainer}>
        {MONTHS.map((item) => {
          return (
            <MonthButton
              data={item}
              key={item.id}
              color={companyData.defaultColor}
              currentMonth={currentMonth}
              changeMonth={() => setCurrentMonth(item.id.toString())}
            />
          );
        })}
      </View>
      <View style={styles.monthTitleContainer}>
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
      <View style={styles.calenderContainer}>
        <FlatList
          data={DAYS}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <View style={styles.dayNameContainer}>
              <Text style={styles.dayNameText}>{itemData.item.name}</Text>
            </View>
          )}
          numColumns={7}
          columnWrapperStyle={styles.calenderListStyle}
        />
        <FlatList
          data={monthList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData) => (
            <DayBox
              data={itemData.item}
              focusDay={focusDay}
              color={companyData.defaultColor}
              onDayClick={() => {
                setFocusDay(itemData.item.day);
                setShowModal(true);
              }}
              dailyEvents={userEvents.filter(
                (item) =>
                  item.monthId.toString() === currentMonth &&
                  item.dayId.toString() === itemData.item.day
              )}
            />
          )}
          numColumns={7}
          columnWrapperStyle={styles.calenderListStyle}
        />
      </View>
    </View>
  );
};

EventsScreen.navigationOptions = (navData) => {
  const openCreateModal = navData.navigation.getParam("openCreateModal")
  return {
    headerTitle: Dimensions.get("window").width > 600 ? navData.navigation.getParam("companyName") : null,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: navData.navigation.getParam("companyColor"),
      height: 100,
    },
    headerLeft: () => (
      <Text
        style={{
          fontFamily: "open-sans",
          fontSize: Dimensions.get("window").width > 600 ? 24 : 18,
          color: "white",
          marginHorizontal: Dimensions.get("window").width > 600 ? 10 : 5,
        }}
      >
        {moment().format("MMM Do YY")}
      </Text>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="create"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={openCreateModal}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 10,
  },
  monthListContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  monthTitleContainer: {
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
  },
  monthTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 36 : 24,
    color: "#404040",
  },
  calenderContainer: {
    alignItems: "center",
  },
  calenderListStyle: {
    flexDirection: "row",
  },
  dayNameContainer: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderTopWidth: 0,
    backgroundColor: "white",
    width: Dimensions.get("window").width / 7 - 4,
    alignItems: "center",
    paddingVertical: 10,
  },
  dayNameText: {
    fontFamily: "open-sans-bold",
    color: "#404040",
  },
});

export default EventsScreen;
