import { USERS } from "../../data/userData";
import * as actionsType from "../actions/actionsType";
import User from "../../models/usersModel";

const initialState = {
  usersList: USERS,
};

const getCompanyUsers = (state, action) => {
  const { companyId } = action;
  const companyUsersList = USERS.filter((item) => item.companyId === companyId);
  return {
    ...state,
    usersList: companyUsersList,
  };
};

const changeUserImage = (state, action) => {
  const { data } = action;
  let newArray = [...state.usersList];
  const userIndex = newArray.findIndex((item) => item.id === data.userId);

  newArray[userIndex].imageUri = data.imageUri;

  return {
    ...state,
    usersList: newArray,
  };
};

const editProfileState = (state, action) => {
  const { data } = action;
  let newArray = [...state.usersList];
  const userIndex = newArray.findIndex((item) => item.id === data.id);

  newArray[userIndex].department = data.department;
  newArray[userIndex].position = data.position;
  newArray[userIndex].description = data.description;
  newArray[userIndex].homeAddress = data.homeAddress;

  return {
    ...state,
    usersList: newArray,
  };
};

const createNewUser = (state, action) => {
  const { data } = action;
  const newUser = new User(
    new Date().toString(),
    data.name,
    data.companyId,
    data.department,
    data.birthDay,
    data.position,
    data.description,
    data.imageUri,
    data.startDate,
    data.homeAddress,
    data.email,
    data.password,
    data.userType
  );
  return {
    ...state,
    usersList: state.usersList.concat(newUser),
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.GET_USERES:
      return getCompanyUsers(state, action);
    case actionsType.CHANGE_IMAGE:
      return changeUserImage(state, action);
    case actionsType.EDIT_PROFILE_DATA:
      return editProfileState(state, action);
    case actionsType.CREATE_NEW_USER:
      return createNewUser(state, action);
    default:
      return state;
  }
};

export default usersReducer;
