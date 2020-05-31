import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Platform,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButtonFunc from "../../components/HeaderButton";

import * as allActions from "../../store/actions/actions";

import UserItem from "../../components/usersComponents/UserItem";
import CreatePost from "../../components/postsComponents/CreatePost";
import PostItem from "../../components/postsComponents/PostItem";

class MainLogScreen extends Component {
  state = {
    companyData: {},
    usersList: [],
    postsList: [],
    commentsList: [],
    currentUserData: {},
    currentUser: {},
    loadingDone: false,
    isFocuse: "",
  };

  componentDidMount() {
    const { checkIfLogInAction } = this.props;
    checkIfLogInAction();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      companyData,
      usersList,
      currentUserData,
      getCompanyAction,
      getCompanyUsersAction,
      getCompanyPosts,
      getCompanyChatsAction,
      getCompanyMessagesAction,
      postsList,
      commentsList,
      navigation,
    } = this.props;

    const { isFocuse } = this.state;

    if (currentUserData.isLogIn === false) {
      return navigation.navigate("loginScreen");
    }

    if (
      currentUserData != prevProps.currentUserData &&
      currentUserData.isLogIn
    ) {
      getCompanyAction(currentUserData.currentCompantId);
      getCompanyUsersAction(currentUserData.currentCompantId);
      getCompanyPosts(currentUserData.currentCompantId);
      getCompanyChatsAction(currentUserData.currentCompantId);
      getCompanyMessagesAction(currentUserData.currentCompantId);
    }

    if (
      companyData != prevProps.companyData ||
      usersList != prevProps.usersList ||
      currentUserData != prevProps.currentUserData ||
      isFocuse != prevState.isFocuse
    ) {
      const currentUser = usersList.find(
        (item) => item.id === currentUserData.currentUserId
      );
      this.setState({
        companyData: companyData,
        usersList: usersList,
        currentUserData: currentUserData,
        postsList: postsList,
        commentsList: commentsList,
        currentUser: currentUser,
        loadingDone: true,
        companyData: companyData,
      });
      navigation.setParams({
        companyName: companyData.name,
        companyColor: companyData.defaultColor,
      });
    }
  }

  render() {
    const {
      navigation,
      handleLike,
      createPostAction,
      checkIfLogInAction,
    } = this.props;

    const {
      companyData,
      usersList,
      postsList,
      commentsList,
      currentUserData,
      currentUser,
      loadingDone,
      isFocuse,
    } = this.state;

    navigation.addListener("willFocus", () => {
      if (usersList.length > 0) {
        this.setState({ isFocuse: new Date().toString() });
      }
      if (!isFocuse) {
        checkIfLogInAction();
      }
    });

    return (
      <ScrollView>
        {!loadingDone ? (
          <View style={styles.indicator}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View style={styles.screen}>
            <View style={styles.headerSlidContainer}>
              <View style={styles.companyContainer}>
                <UserItem
                  data={companyData}
                  type="company"
                  onItemPress={() =>
                    navigation.navigate("CompanyScreen", {
                      companyId: companyData.id,
                    })
                  }
                />
              </View>
              <FlatList
                contentContainerStyle={styles.companyContainer}
                keyExtractor={(item) => item.id.toString()}
                data={usersList}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={(itemData) => (
                  <UserItem
                    data={itemData.item}
                    type="user"
                    onItemPress={() =>
                      navigation.navigate("UserScreen", {
                        userData: itemData.item,
                        companyData: companyData,
                        currentUserData: currentUserData,
                      })
                    }
                  />
                )}
              />
            </View>
            {currentUser !== undefined ? (
              <View style={styles.createPostContainer}>
                <CreatePost
                  data={currentUser}
                  createPostAction={(postContent) =>
                    createPostAction(currentUser, postContent)
                  }
                />
              </View>
            ) : null}
            {currentUser !== undefined ? (
              <View style={styles.postsContainer}>
                {postsList.map((item) => {
                  return (
                    <PostItem
                      key={item.id}
                      postData={item}
                      usersList={usersList}
                      commentsList={commentsList}
                      currentUser={currentUser}
                      onLikeClick={() => handleLike(item.id, currentUser.id)}
                      defaultColor={companyData.defaultColor}
                    />
                  );
                })}
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    );
  }
}

MainLogScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam("companyName"),
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: navData.navigation.getParam("companyColor"),
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
  headerSlidContainer: {
    flexDirection: "row",
    width: '100%',
    backgroundColor: "white",
  },
  companyContainer: {
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: Dimensions.get("window").width > 600 ? 10 : 5
  },
  createPostContainer: {
    backgroundColor: "white",
  },
  indicator: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state) => {
  return {
    companyData: state.companyReducer,
    usersList: state.usersReducer.usersList,
    postsList: state.postsReduer.postsList,
    currentUserData: state.currentUserReducer,
    commentsList: state.commentsReducer.commentsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLike: (postId, userId) =>
      dispatch(allActions.handleLikeAction(postId, userId)),
    createPostAction: (userData, postContent) =>
      dispatch(allActions.createPostAction(userData, postContent)),
    checkIfLogInAction: () => dispatch(allActions.checkIfLogInAction()),
    getCompanyAction: (id) => dispatch(allActions.getCompanyAction(id)),
    getCompanyUsersAction: (id) =>
      dispatch(allActions.getCompanyUsersAction(id)),
    getCompanyPosts: (id) => dispatch(allActions.getCompanyPosts(id)),
    getCompanyChatsAction: (id) =>
      dispatch(allActions.getCompanyChatsAction(id)),
    getCompanyMessagesAction: (id) =>
      dispatch(allActions.getCompanyMessagesAction(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLogScreen);
