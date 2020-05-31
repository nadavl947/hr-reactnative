import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import moment from 'moment';

const PostItem = (props) => {
  const { postData, usersList, currentUser, onLikeClick, commentsList, defaultColor } = props;
  const postEditor = usersList.find((item) => item.id === postData.userId);
  const postComments = commentsList.filter(item => item.postId === postData.id)

  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: postEditor.imageUri }} style={styles.image} />
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.editorName}>{postEditor.name}</Text>
          <Text style={styles.postDate}>{moment(postData.createDate).format('MMMM Do YYYY, h:mm')}</Text>
        </View>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postText}>{postData.content}</Text>
      </View>
      <View style={styles.postDataNumbers}>
        {postData.likedBy.length ? (
          <View style={styles.numberView}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-thumbs-up" : "ios-thumbs-up"
              }
              size={15}
              color={defaultColor}
            />
            <Text style={styles.numberText}>{postData.likedBy.length}</Text>
          </View>
        ) : null}
        {postComments.length ? (
          <View style={styles.numberView}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
              }
              size={15}
              color={defaultColor}
            />
            <Text style={styles.numberText}>{postComments.length}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.btnItem} onPress={onLikeClick}>
          <View style={styles.btnView}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-thumbs-up" : "ios-thumbs-up"
              }
              size={20}
              color={postData.likedBy.includes(currentUser.id) ? defaultColor : '#ccc'}
            />
            <Text style={styles.btnText}>Like</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnItem}>
          <View style={styles.btnView}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-chatboxes" : "ios-chatboxes"
              }
              size={20}
              color="#ccc"
            />
            <Text style={styles.btnText}>Comment</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnItem}>
          <View style={styles.btnView}>
            <Ionicons
              name={
                Platform.OS === "android" ? "md-share-alt" : "ios-share-alt"
              }
              size={20}
              color="#ccc"
            />
            <Text style={styles.btnText}>Share</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginTop: 10,
    paddingTop: 20,
    backgroundColor: "white",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  image: {
    borderRadius: 100,
    overflow: "hidden",
    width: 60,
    height: 60,
  },
  editorName: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  postDate: {
    fontFamily: "open-sans",
  },
  postContent: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  postText: {
    fontFamily: "open-sans",
    fontSize: 16,
  },
  postDataNumbers: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberView: {
    marginHorizontal: 20,
    marginVertical: 10,
    flexDirection: 'row'
  },
  numberText: {
    marginHorizontal: 5
  },
  btnsContainer: {
    flexDirection: "row",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  btnItem: {
    flex: 1,
  },
  btnView: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  btnText: {
    marginHorizontal: 10,
    fontFamily: "open-sans",
    fontSize: 16,
  },
});

export default PostItem;
