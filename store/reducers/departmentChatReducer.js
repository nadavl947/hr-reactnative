import { CHATS } from "../../data/departmentChatData";
import * as actionTypes from "../actions/actionsType";

const initialState = {
  chatsList: CHATS,
};

const setCompanyChats = (state, action) => {
  const { companyId } = action;
  let newArray = [...state.chatsList];

  newArray = newArray.filter((item) => item.companyId === companyId);
  return {
    ...state,
    chatsList: newArray,
  };
};

const departmentChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY_CHATS:
      return setCompanyChats(state, action);
    default:
      return state;
  }
};

export default departmentChatReducer;
