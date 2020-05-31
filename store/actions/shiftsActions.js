import * as actionTypes from "./actionsType";

const getShifts = (userId) => ({ type: actionTypes.GET_USER_SHIFTS, userId });
const deleteShift = (shiftId) => ({ type: actionTypes.DELETE_SHIFT, shiftId });
const startNewShift = (data) => ({ type: actionTypes.START_NEW_SHIFT, data });
const endCurrentShift = (data) => ({ type: actionTypes.END_SHIFT, data });

export const getShiftsAction = (userId) => async (dispatch) => {
  dispatch(getShifts(userId));
};

export const deleteShiftAction = (shiftId) => async (dispatch) => {
  dispatch(deleteShift(shiftId));
};

export const startNewShiftAction = (
  userId,
  companyId,
  monthId,
  dayId,
  year
) => async (dispatch) => {
  const data = { userId, companyId, monthId, dayId, year };
  dispatch(startNewShift(data));
};

export const endCurrentShiftAction = (
  shiftId,
  durationNumber,
  durationText
) => async (dispatch) => {
  const data = { shiftId, durationNumber, durationText };
  dispatch(endCurrentShift(data));
};
