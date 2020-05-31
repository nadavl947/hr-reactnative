import * as actionsType from "./actionsType";
import { getCurrentUser, userLogIn, logOut } from "../../helpers/db";
import { USERS } from "../../data/userData";

const getUser = (data) => ({ type: actionsType.GET_CURRENT_USER, data });
const userLogingIn = (data) => ({ type: actionsType.USER_LOGININ, data });
const userLogOut = () => ({ type: actionsType.USER_LOGOUT });

export const checkIfLogInAction = () => async (dispatch) => {
  try {
    const response = await getCurrentUser();

    dispatch(getUser(response));
  } catch (error) {
    console.log(error);
  }
};

export const logInAction = (password, email) => async (dispatch) => {
  const userEmail = USERS.find((item) => item.email === email);
  const userPassword = USERS.find((item) => item.password === password);

  if (userEmail.id !== userPassword.id) {
    return;
  }

  try {
    const response = await userLogIn(userEmail.id, password, email);
    dispatch(userLogingIn(response));
  } catch (err) {
    console.log(err);
  }
};

export const logOutAction = () => async (dispatch) => {
  try {
    await logOut();
    dispatch(userLogOut());
  } catch (error) {
    console.log(error);
  }
};
