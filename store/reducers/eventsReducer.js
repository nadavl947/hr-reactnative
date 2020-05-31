import * as actionsType from "../actions/actionsType";
import { EVENTS } from "../../data/eventsData";
import Event from "../../models/eventModel";

const initialState = {
  eventsList: EVENTS,
};

const handleGetEvents = (state, action) => {
  let newArray = [...state.eventsList];
  newArray = newArray.filter(
    (item) =>
      item.companyId === action.data.companyId &&
      item.participantsId.includes(action.data.userId)
  );

  return {
    ...state,
    eventsList: newArray,
  };
};

const createNewEventState = (state, action) => {
  const { data } = action;
  const newEvent = new Event(
    new Date().toString(),
    data.companyId,
    data.userId,
    data.invitedUsers,
    data.selectedMonth,
    data.selectedDay,
    data.selectedHour,
    data.eventLocation,
    data.eventTitle
  );
  return {
    ...state,
    eventsList: state.eventsList.concat(newEvent)
  };
};

const deleteEventState = (state, action) => {
  const { eventId } = action;
  let newArray = [...state.eventsList].filter(item => item.id !== eventId);
  return {
    ...state,
    eventsList: newArray
  }
}

const eventsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsType.GET_EVENTS:
      return handleGetEvents(state, action);
    case actionsType.CREATE_NEW_EVENT:
      return createNewEventState(state, action);
    case actionsType.DELETE_EVENT:
      return deleteEventState(state, action)
    default:
      return state;
  }
};

export default eventsReducer;
