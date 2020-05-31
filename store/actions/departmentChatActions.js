import * as actionTypes from "./actionsType";

const getCompanyChats = (companyId) => ({
  type: actionTypes.GET_COMPANY_CHATS,
  companyId,
});

export const getCompanyChatsAction = (companyId) => async (dispatch) => {
  dispatch(getCompanyChats(companyId));
};
