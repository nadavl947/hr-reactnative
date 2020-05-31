import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { HeaderButton } from "react-navigation-header-buttons";

const headerButtonFun = (props) => {
  return <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} />;
};

export default headerButtonFun;
