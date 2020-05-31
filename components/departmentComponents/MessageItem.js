import React from "react";
import { View, Text, StyleSheet } from "react-native";
import moment from "moment";

const MessageItem = (props) => {
  const { data, userData, currentUserId } = props;
  return (
    <View
      style={{
        ...styles.messageContainer,
        ...{
          alignItems: data.userId === currentUserId ? "flex-end" : "flex-start",
        },
      }}
    >
      <View
        style={{
          ...styles.messageItem,
          ...{
            backgroundColor:
              data.userId === currentUserId ? "#7FFFD4" : "white",
            alignItems:
              data.userId === currentUserId ? "flex-end" : "flex-start",
          },
        }}
      >
        <Text style={styles.messageName}>{userData.name}</Text>
        <Text style={styles.messageText} lineBreakMode={true}>
          {data.contant}
        </Text>
        <Text style={styles.messageDate}>
          {moment(data.timeAndData).format("HH:mm")}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    margin: 10,
  },
  messageItem: {
    padding: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    borderRadius: 10,
    elevation: 20,
    width: "50%",
  },
  messageName: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: "#404040",
  },
  messageText: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#404040",
    marginVertical: 10
  },
  messageDate: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: "#404040",
  },
});

export default MessageItem;
