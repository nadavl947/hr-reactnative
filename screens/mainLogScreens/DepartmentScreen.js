import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  Platform,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import * as allActions from "../../store/actions/actions";

import HeaderButtonFunc from "../../components/HeaderButton";
import TopButtonsComponent from "../../components/departmentComponents/TopButtonsComponent";
import MembersModal from "../../components/departmentComponents/MembersModal";
import OptionsModal from "../../components/departmentComponents/OptionsModal";
import MessageItem from "../../components/departmentComponents/MessageItem";
import ChatInput from "../../components/departmentComponents/ChatInput";

const DepartmentScreen = (props) => {
  const { navigation } = props;
  const [membersVisible, setMembersVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);
  const chatsList = useSelector(
    (state) => state.departmentChatReducer.chatsList
  );
  const messagesList = useSelector(
    (state) => state.chatMessagesReducer.messagesList
  );
  const usersList = useSelector((state) => state.usersReducer.usersList);

  const currentChatData = navigation.getParam("departmentData");
  const currentUserId = navigation.getParam("userId");
  const companyData = navigation.getParam("companyData");
  const chatData = chatsList.find(
    (item) => item.departmentId === currentChatData.id
  );
  const chatMessages = messagesList.filter(
    (item) => item.chatId === currentChatData.id
  );

  const dispatch = useDispatch();

  const sendNewMessage = (messageContent) => {
    const data = {
      companyId: companyData.id,
      userId: currentUserId,
      chatId: currentChatData.id,
      timeAndData: new Date(),
      contant: messageContent,
      readById: [],
    };
    dispatch(allActions.sendNewMessageAction(data));
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "android" ? "padding" : "position"}
    //   keyboardVerticalOffset={30}
    // >
      <View style={styles.screen}>
        <MembersModal
          isVisible={membersVisible}
          closeModal={() => setMembersVisible(false)}
          departmentName={currentChatData.name}
          members={usersList.filter((item) =>
            chatData.membersId.includes(item.id)
          )}
          admins={chatData.adminId}
        />
        <OptionsModal
          isVisible={optionsVisible}
          closeModal={() => setOptionsVisible(false)}
        />
        <View style={styles.topBtsContainer}>
          <TopButtonsComponent
            onMembersPress={() => setMembersVisible(true)}
            onOptionPress={() => setOptionsVisible(true)}
            isChatBlock={!chatData.membersId.includes(currentUserId)}
          />
        </View>
        <View style={styles.chatboxContainer}>
          <ImageBackground
            source={{
              uri:
                "https://i.pinimg.com/564x/18/bb/03/18bb03bcc7736a2ab2ee20ef12bb1253.jpg",
            }}
            style={styles.bgImage}
          >
            {chatData.membersId.includes(currentUserId) ? (
              <View style={styles.chatScreen}>
                <ScrollView>
                  <View style={styles.messagesSection}>
                    {chatMessages.map((messageItem) => {
                      return (
                        <MessageItem
                          data={messageItem}
                          userData={usersList.find(
                            (item) => item.id === messageItem.userId
                          )}
                          currentUserId={currentUserId}
                          key={messageItem.id}
                        />
                      );
                    })}
                  </View>
                </ScrollView>
                <View style={styles.inputSection}>
                  <ChatInput
                    color={companyData.defaultColor}
                    sendNewMessage={(value) => {
                      sendNewMessage(value);
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={styles.emptyScreen}>
                <Text style={styles.emptyTitle}>Opps...</Text>
                <Text style={styles.emptyText}>
                  Your not a member in this chat...
                </Text>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    // </KeyboardAvoidingView>
  );
};

DepartmentScreen.navigationOptions = (navData) => {
  const companyData = navData.navigation.getParam("companyData");
  const departmentData = navData.navigation.getParam("departmentData");
  return {
    headerTitle: departmentData.name,
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: companyData.defaultColor,
      height: 100,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtonFunc}>
        <Item
          title="menu"
          iconName={
            Platform.OS === "android"
              ? "md-arrow-round-back"
              : "ios-arrow-round-back"
          }
          onPress={() => navData.navigation.goBack()}
          color="white"
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  chatboxContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.26,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: "white",
    flex: 1,
    borderRadius: 10,
  },
  bgImage: {
    width: "100%",
    height: "100%",
  },
  emptyScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontFamily: "open-sans-bold",
    fontSize: 26,
    color: "#404040",
  },
  emptyText: {
    fontFamily: "open-sans",
    fontSize: 22,
    color: "#404040",
  },
  chatScreen: {
    flex: 1,
  },
  messagesSection: {
    flex: 1,
    backgroundColor: "rgba(250, 250, 250, 0.3)",
  },
  inputSection: {
    backgroundColor: "#ccc",
    padding: 10,
    height: 50,
  },
});

export default DepartmentScreen;
