import * as actionsType from "../actions/actionsType";
import { USERS } from "../../data/userData";

const initialState = {
  isLogIn: null,
  currentUserId: null,
  currentUserEmail: "",
  currentUserName: "",
  currentCompantId: null,
};

const handleUserLogIn = (state, action) => {
  const { data } = action;

  if (data.rows.length === 0) {
    return {
      ...state,
      isLogIn: false,
    };
  } else {
    return {
      ...state,
      isLogIn: true,
      currentUserId: data.rows._array[0].userId,
      currentUserEmail: data.rows._array[0].email,
      currentUserName: data.rows._array[0].userName,
      currentCompantId: USERS.find(
        (item) => item.id === data.rows._array[0].userId
      ).companyId,
    };
  }
};

const handleLogOut = (state) => {
  return {
    ...state,
  };
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.GET_CURRENT_USER:
      return handleUserLogIn(state, action);
    case actionsType.USER_LOGOUT:
      return handleLogOut(state);
    default:
      return state;
  }
};

export default currentUserReducer;
