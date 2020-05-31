import * as actionsType from "./actionsType";

const handleGetEvents = (companyId, userId) => ({
  type: actionsType.GET_EVENTS,
  data: { companyId, userId },
});

const newEventCallback = data => ({ type: actionsType.CREATE_NEW_EVENT, data })
const deleteEventCallback = eventId => ({ type: actionsType.DELETE_EVENT, eventId })

export const getEventAction = (companyId, userId) => async dispatch => {
    dispatch(handleGetEvents(companyId, userId))
}

export const createNewEvent = data => async dispatch => {
  dispatch(newEventCallback(data))
}

export const deleteEventAction = eventId => async dispatch => {
  dispatch(deleteEventCallback(eventId))
}