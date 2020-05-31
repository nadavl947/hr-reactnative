import React from "react";
import { View, Text, Modal, Button, StyleSheet, Alert, Dimensions } from "react-native";

const EventModal = (props) => {
  const {
    eventModalVisibel,
    data,
    closeModal,
    companyColor,
    selectedDate,
    companyUsers,
    userId,
    deleteEvent,
  } = props;

  let participants = [];

  if (data) {
    companyUsers.forEach((item) => {
      if (data.participantsId.includes(item.id)) {
        participants.push(`${item.name}, `);
      }
    });
  }

  const onDeleteClick = () => {
    Alert.alert(
      "Delte Event?",
      "Are you sure you want do delete this event to ALL participants?",
      [
        {
          text: "Yes, I'm sure",
          onPress: () => {
            deleteEvent(data.id);
            closeModal();
          },
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ]
    );
  };

  return (
    <Modal visible={eventModalVisibel} transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.deteilsContainer}>
          <View style={styles.eventHeader}>
            <Button
              title="Delete"
              onPress={() => onDeleteClick()}
              color="red"
              disabled={userId !== data.createdById}
            />
            <Text style={styles.eventTitle}>{data.eventName}</Text>
            <Button title="Close" onPress={closeModal} />
          </View>
          <View style={styles.eventContent}>
            <View style={styles.eventContentRow}>
              <Text style={{ ...styles.rowTitle, ...{ color: companyColor } }}>
                When:
              </Text>
              <Text
                style={styles.rowText}
              >{`${selectedDate}, ${data.hourName}`}</Text>
            </View>
            <View style={styles.eventContentRow}>
              <Text style={{ ...styles.rowTitle, ...{ color: companyColor } }}>
                At:
              </Text>
              <Text style={styles.rowText}>{data.location}</Text>
            </View>
            <View style={styles.eventContentRow}>
              <Text style={{ ...styles.rowTitle, ...{ color: companyColor } }}>
                With:
              </Text>
              <Text
                style={styles.rowText}
                lineBreakMode="tail"
                numberOfLines={1}
              >
                {participants.map((item) => item)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  deteilsContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    borderRadius: 10,
    width: "90%",
    padding: 10,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  eventTitle: {
    fontFamily: "open-sans-bold",
    color: "#404040",
    fontSize: 22,
  },
  eventContent: {
    margin: Dimensions.get("window").width > 600 ? 20 : 10,
  },
  eventContentRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowTitle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 16,
    width: Dimensions.get("window").width > 600 ? "15%" : "20%",
  },
  rowText: {
    fontFamily: "open-sans",
    color: "#404040",
    fontSize: Dimensions.get("window").width > 600 ? 18 : 16,
    width: Dimensions.get("window").width > 600 ? "85%" : "80%",
  },
});

export default EventModal;
