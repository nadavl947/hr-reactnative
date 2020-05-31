import { SHIFTS } from "../../data/shiftsList";
import * as actionTypes from "../actions/actionsType";
import Shift from "../../models/shiftModal";

const initialState = {
  shiftsList: SHIFTS,
};

const getUserShifts = (state, action) => {
  let newArray = [...state.shiftsList];
  newArray = newArray.filter((item) => item.userId === action.userId);

  return {
    ...state,
    shiftsList: newArray,
  };
};

const deleteShift = (state, action) => {
  let newArray = [...state.shiftsList];
  newArray = newArray.filter((item) => item.id !== action.shiftId);
  return {
    ...state,
    shiftsList: newArray,
  };
};

const createNewShift = (state, action) => {
  const { data } = action;
  const newShift = new Shift(
    new Date().toString(),
    data.companyId,
    data.userId,
    data.monthId,
    data.dayId,
    data.year,
    new Date().toISOString(),
    null,
    null,
    ""
  );
  return {
    ...state,
    shiftsList: state.shiftsList.concat(newShift),
  };
};

const endShift = (state, action) => {
  const { data } = action;
  let newArray = [...state.shiftsList];
  const shift = newArray.findIndex((item) => item.id === data.shiftId);

  newArray[shift].shiftEndTime = new Date().toISOString();
  newArray[shift].shiftDurationNumber = data.durationNumber;
  newArray[shift].shiftDurationText = data.durationText;

  return {
    ...state,
    shiftsList: newArray,
  };
};

const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_SHIFTS:
      return getUserShifts(state, action);
    case actionTypes.DELETE_SHIFT:
      return deleteShift(state, action);
    case actionTypes.START_NEW_SHIFT:
      return createNewShift(state, action);
    case actionTypes.END_SHIFT:
      return endShift(state, action);
    default:
      return state;
  }
};

export default shiftsReducer;
