import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  StyleSheet,
  TextInput,
  Platform,
  Picker,
  Switch,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { MONTHS } from "../../data/monthsData";
import { HOURS } from "../../data/dayHoursData";
import { Ionicons } from "@expo/vector-icons";
import moment from "moment";

const CreateModal = (props) => {
  const {
    isVisibale,
    closeModal,
    companyColor,
    monthList,
    companyUsers,
    companyDepartments,
    createNewEvent,
    companyId,
    userId,
  } = props;

  const [filterDepartments, setFilterDepartments] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [selectedHour, setSelectedHour] = useState(2);
  const [selectedMonth, setSelectedMonth] = useState(
    Number(moment().format("M"))
  );
  const [selectedDay, setSelectedDay] = useState(Number(moment().format("D")));
  const daysOfTheMonth = monthList.filter((item) => item.isThisMonth);

  const createPickerItems = (item, type) => {
    if (type === "month") {
      return (
        <Picker.Item label={item.fullName} value={item.id} key={item.id} />
      );
    } else if (type === "hour") {
      return <Picker.Item label={item.name} value={item.id} key={item.id} />;
    } else {
      return <Picker.Item label={item.day} value={item.id} key={item.id} />;
    }
  };

  const handleParticipantClick = (userId) => {
    let newArray = [...invitedUsers];
    if (newArray.includes(userId)) {
      newArray = newArray.filter((item) => item !== userId);
    } else {
      newArray.push(userId);
    }
    setInvitedUsers(newArray);
  };

  const createParticipant = (item) => {
    return (
      <TouchableOpacity onPress={() => handleParticipantClick(item.id)}>
        <View style={styles.participantItem}>
          <View style={styles.participantImageContainer}>
            <Image
              source={{ uri: item.imageUri }}
              style={styles.participantImage}
            />
          </View>
          <View style={styles.participantNameContainer}>
            <Text style={styles.participantName}>{item.name}</Text>
          </View>
          <View style={styles.participantIconContainer}>
            <Ionicons
              name={
                Platform.OS === "android"
                  ? "md-checkmark-circle-outline"
                  : "ios-checkmark-circle-outline"
              }
              size={Dimensions.get("window").width > 600 ? 25 : 20}
              color={invitedUsers.includes(item.id) ? companyColor : "#ccc"}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onToggleClick = (itemId) => {
    let newArray = [...filterDepartments];
    let newArray2 = [...invitedUsers];
    if (newArray.includes(itemId)) {
      newArray = newArray.filter((item) => item !== itemId);
    } else {
      newArray.push(itemId);
    }

    companyUsers.forEach((item) => {
      if (newArray.includes(item.department)) {
        newArray2.push(item.id);
      } else {
        newArray2 = newArray2.filter((userId) => userId !== item.id);
      }
    });

    setFilterDepartments(newArray);
    setInvitedUsers(newArray2);
  };

  const createDepartments = (item) => {
    return (
      <View style={styles.switcherItem}>
        <Text style={styles.switcherItemName}>{item.name}</Text>
        <Switch
          value={filterDepartments.includes(item.id)}
          trackColor={{ false: null, true: companyColor }}
          onValueChange={() => onToggleClick(item.id)}
        />
      </View>
    );
  };

  const onCreateClick = () => {
    const data = {
      companyId,
      userId,
      invitedUsers,
      selectedMonth,
      selectedDay,
      selectedHour,
      eventLocation,
      eventTitle,
    };
    createNewEvent(data);
    closeModal();
  };

  return (
    <Modal visible={isVisibale} animated="slid" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.createEventHeader}>
            <Button title="Cancel" onPress={closeModal} color="red" />
            <Text style={styles.createEventTitle}>New Event</Text>
            <Button title="Create" onPress={() => onCreateClick()} />
          </View>
          <View style={styles.titleAndLocation}>
            <View
              style={{
                ...styles.inputItem,
                ...{ borderBottomColor: "#ccc", borderBottomWidth: 1 },
              }}
            >
              <Text
                style={{ ...styles.inputLabel, ...{ color: companyColor } }}
              >
                Title:
              </Text>
              <TextInput
                placeholder="Name your event"
                style={styles.input}
                value={eventTitle}
                onChangeText={(newValue) => setEventTitle(newValue)}
              />
            </View>
            <View style={styles.inputItem}>
              <Text
                style={{ ...styles.inputLabel, ...{ color: companyColor } }}
              >
                Location:
              </Text>
              <TextInput
                placeholder="Set your meeting location"
                style={styles.input}
                value={eventLocation}
                onChangeText={(newValue) => setEventLocation(newValue)}
              />
            </View>
          </View>
          <View style={styles.timeAndDate}>
            <View style={styles.timeAndDateIcon}>
              <Ionicons
                name={
                  Platform.OS === "android" ? "md-calendar" : "ios-calendar"
                }
                size={Dimensions.get("window").width > 600 ? 30 : 20}
                color={companyColor}
              />
            </View>
            <View style={styles.timeAndDatePicker}>
              <Picker
                itemStyle={styles.pickerItem}
                selectedValue={selectedMonth}
                style={styles.pickerStyle}
                onValueChange={(newValue) => setSelectedMonth(newValue)}
              >
                {MONTHS.map((item) => {
                  return createPickerItems(item, "month");
                })}
              </Picker>
              <Picker
                itemStyle={styles.pickerItem}
                selectedValue={selectedDay}
                style={styles.pickerStyle}
                onValueChange={(newValue) => setSelectedDay(newValue)}
              >
                {daysOfTheMonth.map((item) => {
                  return createPickerItems(item, "day");
                })}
              </Picker>
              <Picker
                itemStyle={styles.pickerItem}
                selectedValue={selectedHour}
                style={styles.pickerStyle}
                onValueChange={(newValue) => setSelectedHour(newValue)}
              >
                {HOURS.map((item) => {
                  return createPickerItems(item, "hour");
                })}
              </Picker>
            </View>
            <View style={styles.eventParticipants}>
              <View style={styles.timeAndDateIcon}>
                <Ionicons
                  name={Platform.OS === "android" ? "md-people" : "ios-people"}
                  size={Dimensions.get("window").width > 600 ? 30 : 20}
                  color={companyColor}
                />
              </View>
              <View style={styles.eventParticipantsContainer}>
                <View style={styles.participantsSwithers}>
                  <Text style={styles.swithersTitle}>Show Departments</Text>
                  <FlatList
                    data={companyDepartments}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => createDepartments(itemData.item)}
                  />
                </View>
                <View style={styles.participantsList}>
                  <FlatList
                    data={companyUsers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={(itemData) => createParticipant(itemData.item)}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    height: Dimensions.get("window").width > 600 ? "85%" : "90%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: Dimensions.get("window").width > 600 ? 20 : 10,
  },
  createEventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  createEventTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 28 : 20,
    color: "#404040",
  },
  titleAndLocation: {
    marginVertical: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: Dimensions.get("window").width > 600 ? 15 : 10,
    borderRadius: 10,
  },
  inputItem: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },
  inputLabel: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("window").width > 600 ? 20 : 18,
    width: Dimensions.get("window").width > 600 ? "15%" : "25%",
  },
  input: {
    fontFamily: "open-sans",
    fontSize: Dimensions.get("window").width > 600 ? 20 : 18,
    width: Dimensions.get("window").width > 600 ? "85%" : "75%",
  },
  timeAndDate: {
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
  },
  timeAndDateIcon: {
    alignItems: "center",
  },
  timeAndDatePicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  pickerStyle: {
    width: "30%",
    overflow: "hidden",
  },
  pickerItem: {
    height: 150,
  },
  eventParticipantsContainer: {
    flexDirection: "row",
    justifyContent:
      Dimensions.get("window").width > 600 ? "space-around" : "space-between",
    marginVertical: Dimensions.get("window").width > 600 ? 20 : 10,
    padding: Dimensions.get("window").width > 600 ? 15 : 5,
  },
  participantsSwithers: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: Dimensions.get("window").width > 600 ? 15 : 5,
    width: Dimensions.get("window").width > 600 ? "40%" : "48%",
    height: Dimensions.get("window").width > 600 ? "80%" : "75%",
  },
  swithersTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
  },
  switcherItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  switcherItemName: {
    fontFamily: "open-sans-bold",
    color: "#404040",
  },
  participantsList: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: Dimensions.get("window").width > 600 ? 15 : 5,
    width: Dimensions.get("window").width > 600 ? "40%" : "48%",
    height: Dimensions.get("window").width > 600 ? "80%" : "75%",
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    marginVertical: 5,
  },
  participantImageContainer: {
    width: Dimensions.get("window").width > 600 ? "15%" : "20%",
    backgroundColor: "white",
    borderRadius: 40,
  },
  participantImage: {
    overflow: "hidden",
    borderRadius: 40,
    width: "100%",
    height: "100%",
  },
  participantNameContainer: {
    width: Dimensions.get("window").width > 600 ? "65%" : "55%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: Dimensions.get("window").width > 600 ? 5 : null,
    marginHorizontal: "5%",
  },
  participantName: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 16 : 12,
  },
  participantIconContainer: {
    width: Dimensions.get("window").width > 600 ? "15%" : "20%",
  },
});

export default CreateModal;
