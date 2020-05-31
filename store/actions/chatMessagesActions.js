import * as actionTypes from './actionsType';

const getCompanyMessages = companyId => ({ type: actionTypes.GET_COMPANY_MESSAGES, companyId })
const sendNewMessage = data => ({ type: actionTypes.SEND_NEW_MESSAGE, data })

export const getCompanyMessagesAction = companyId => async dispatch => {
    dispatch(getCompanyMessages(companyId))
}

export const sendNewMessageAction = data => async dispatch => {
    dispatch(sendNewMessage(data))
}