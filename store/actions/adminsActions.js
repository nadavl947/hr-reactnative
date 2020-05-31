import * as actionTypes from "./actionsType";

const createNewUser = (data) => ({ type: actionTypes.CREATE_NEW_USER, data });

export const createNewUserAction = (data) => async (dispatch) => {
  dispatch(createNewUser(data));
};
