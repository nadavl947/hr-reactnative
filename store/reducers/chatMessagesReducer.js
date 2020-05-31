import { MESSAGES } from "../../data/chatMessageData";
import * as actionTypes from "../actions/actionsType";
import Message from "../../models/chatMessageModel";

const initialState = {
  messagesList: MESSAGES,
};

const setCompanyMessages = (state, action) => {
  const { companyId } = action;
  let newArray = [...state.messagesList];

  newArray = newArray.filter((item) => item.companyId === companyId);
  return {
    ...state,
    messagesList: newArray,
  };
};

const addNewMassage = (state, action) => {
  const { data } = action;
  const newMessage = new Message(
    new Date().toString(),
    data.companyId,
    data.userId,
    data.chatId,
    data.timeAndData,
    data.contant,
    data.readById
  );
  return {
    ...state,
    messagesList: state.messagesList.concat(newMessage),
  };
};

const chatMessagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY_MESSAGES:
      return setCompanyMessages(state, action);
    case actionTypes.SEND_NEW_MESSAGE:
      return addNewMassage(state, action);
    default:
      return state;
  }
};

export default chatMessagesReducer;
