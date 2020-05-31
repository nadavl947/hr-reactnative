import React from "react";
import { Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import DrawerComponent from "../components/DrawerComponent";

import MainLogScreen from "../screens/mainLogScreens/MainLogScreen";
import PostScreen from "../screens/mainLogScreens/PostScreen";
import UserScreen from "../screens/mainLogScreens/UserScreen";
import CompanyScreen from "../screens/mainLogScreens/CompanyScreen";
import LogInScreen from "../screens/mainLogScreens/LogInScreen";

import EventsScreen from "../screens/eventScreens/EventsScreen";

import ProfileScreen from "../screens/profileScreens/ProfileScreen";

import TimeStampScreen from "../screens/timeStempsScreens/TimeStampScreen";
import ShiftPunchScreen from "../screens/timeStempsScreens/ShiftPunchScreen";
import ShiftsLogScreen from "../screens/timeStempsScreens/ShiftsLogScreen";
import ReportsScreen from "../screens/timeStempsScreens/ReportsScreen";
import TimeStampAdmin from '../screens/timeStempsScreens/TimeStampAdmin';

import SettingsScreen from "../screens/settingsScreeens/SettingsScreen";

import DepartmentScreen from "../screens/mainLogScreens/DepartmentScreen";

import MainAdminScreen from "../screens/adminScreens/MainAdminScreen";
import AdminUsers from "../screens/adminScreens/AdminUsers";
import AdminDepartments from "../screens/adminScreens/AdminDepartments";

const tabBarIconFunc = (iconName) => {
  return (
    <Ionicons
      name={Platform.OS === "android" ? `md-${iconName}` : `ios-${iconName}`}
      color="#ccc"
      size={Dimensions.get("window").width > 600 ? 25 : 20}
    />
  );
};

const defaultStackStyle = {
  headerStyle: {
    height: 100,
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 22 : 18,
  },
};

const defaultAdminStyle = {
  headerStyle: {
    height: 100,
    backgroundColor: "red",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
    fontSize: Dimensions.get("window").width > 600 ? 22 : 18,
  },
};

const mainLogStack = createStackNavigator(
  {
    MainLogScreen: MainLogScreen,
    PostScreen: PostScreen,
    UserScreen: UserScreen,
    CompanyScreen: CompanyScreen,
    LogInScreen: LogInScreen,
    DrawerComponent: DrawerComponent,
    DepartmentScreen: DepartmentScreen,
  },
  {
    defaultNavigationOptions: defaultStackStyle,
  }
);

const evantsStack = createStackNavigator(
  {
    EventsScreen: EventsScreen,
  },
  {
    defaultNavigationOptions: defaultStackStyle,
  }
);

const profileStack = createStackNavigator(
  {
    ProfileScreen: ProfileScreen,
  },
  {
    defaultNavigationOptions: defaultStackStyle,
  }
);

const timeStampStack = createStackNavigator(
  {
    TimeStampScreen: TimeStampScreen,
    ShiftPunchScreen: ShiftPunchScreen,
    ShiftsLogScreen: ShiftsLogScreen,
    ReportsScreen: ReportsScreen,
    TimeStampAdmin: TimeStampAdmin
  },
  {
    defaultNavigationOptions: defaultStackStyle,
  }
);

const settingsStack = createStackNavigator(
  {
    SettingsScreen: SettingsScreen,
  },
  {
    defaultNavigationOptions: defaultStackStyle,
  }
);

const logInScreen = createStackNavigator({
  LogInScreen: LogInScreen,
});

const adminCompanyStack = createStackNavigator(
  {
    MainAdminScreen: MainAdminScreen,
  },
  {
    defaultNavigationOptions: defaultAdminStyle,
  }
);

const adminUsersStack = createStackNavigator(
  {
    AdminUsers: AdminUsers,
  },
  {
    defaultNavigationOptions: defaultAdminStyle,
  }
);

const adminDepartmentsStack = createStackNavigator(
  {
    AdminDepartments: AdminDepartments,
  },
  {
    defaultNavigationOptions: defaultAdminStyle,
  }
);

const adminBottomTabs = createBottomTabNavigator(
  {
    MainAdminScreen: {
      screen: adminCompanyStack,
      navigationOptions: {
        tabBarLabel: "Company",
        tabBarIcon: tabBarIconFunc("briefcase"),
      },
    },
    AdminUsers: {
      screen: adminUsersStack,
      navigationOptions: {
        tabBarLabel: "Users",
        tabBarIcon: tabBarIconFunc("people"),
      },
    },
    AdminDepartments: {
      screen: adminDepartmentsStack,
      navigationOptions: {
        tabBarLabel: "Departments",
        tabBarIcon: tabBarIconFunc("keypad"),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#4bb0dd",
      labelPosition: "below-icon",
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: Dimensions.get("window").width > 600 ? 15 : 10,
      },
      style: {
        height: 60,
      },
    },
  }
);

const mainBottomTabs = createBottomTabNavigator(
  {
    MainLog: {
      screen: mainLogStack,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: tabBarIconFunc("home"),
      },
    },
    UserProfile: {
      screen: profileStack,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: tabBarIconFunc("person"),
      },
    },
    Events: {
      screen: evantsStack,
      navigationOptions: {
        tabBarLabel: "Events",
        tabBarIcon: tabBarIconFunc("calendar"),
      },
    },
    TimeStamp: {
      screen: timeStampStack,
      navigationOptions: {
        tabBarLabel: "Punch Time",
        tabBarIcon: tabBarIconFunc("clock"),
      },
    },
    Settings: {
      screen: settingsStack,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: tabBarIconFunc("list"),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "#4bb0dd",
      labelPosition: "below-icon",
      labelStyle: {
        fontFamily: "open-sans-bold",
        fontSize: Dimensions.get("window").width > 600 ? 15 : 12,
      },
      style: {
        height: 60,
      },
    },
  }
);

const drawerNavigation = createDrawerNavigator(
  {
    mainScreen: mainBottomTabs,
    loginScreen: logInScreen,
    adminScreen: adminBottomTabs,
  },
  {
    contentComponent: (props) => <DrawerComponent {...props} />,
  }
);

export default createAppContainer(drawerNavigation);
