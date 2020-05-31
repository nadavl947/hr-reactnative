import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useDispatch } from 'react-redux';
import * as allActions from '../../store/actions/actions';
import { HOURS } from "../../data/dayHoursData";
import EventModal from "./EventModal";

const DayModal = (props) => {
  const {
    isVisibel,
    closeModal,
    selectedDate,
    dailyEvents,
    companyColor,
    companyUsers,
    userId
  } = props;
  const [eventVisibel, setEventVisibel] = useState(false);
  const [eventDeteils, setEventDeteils] = useState(false);

  const dispatch = useDispatch();

  const singalHourRow = (hour) => {
    return (
      <View style={styles.hourItemContainer}>
        <Text style={styles.hourItemName}>{hour.name}</Text>
        {dailyEvents.map((item) => {
          if (item.timeId === hour.id) {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setEventVisibel(true);
                  setEventDeteils({ ...item, hourName: hour.name });
                }}
              >
                <Text style={styles.hourItemEvent}>{item.eventName}</Text>
              </TouchableOpacity>
            );
          }
        })}
      </View>
    );
  };

  return (
    <Modal visible={isVisibel} animated="slide" transparent={true}>
      <EventModal
        eventModalVisibel={eventVisibel}
        data={eventDeteils}
        closeModal={() => setEventVisibel(false)}
        companyColor={companyColor}
        selectedDate={selectedDate}
        companyUsers={companyUsers}
        userId={userId}
        deleteEvent={(eventId) => dispatch(allActions.deleteEventAction(eventId))}
      />
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.headerDate}>{selectedDate}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
          <View style={styles.hoursContainer}>
            <FlatList
              data={HOURS}
              keyExtractor={(item) => item.id.toString()}
              renderItem={(itemData) => singalHourRow(itemData.item)}
            />
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
    height: "80%",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 30,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerDate: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 26 : 22,
    color: "#404040",
  },
  hoursContainer: {
    marginVertical: 20,
  },
  hourItemContainer: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 40,
    alignItems: "flex-end",
  },
  hourItemName: {
    width: Dimensions.get("window").width > 600 ? "10%" : '20%',
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#404040",
  },
  hourItemEvent: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "blue",
  },
});

export default DayModal;
