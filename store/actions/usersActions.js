import * as actionsType from './actionsType';

const getUsers = companyId => ({ type: actionsType.GET_USERES, companyId })
const changeProfileImage = data => ({ type: actionsType.CHANGE_IMAGE, data })
const editProfileData = data => ({ type: actionsType.EDIT_PROFILE_DATA, data })

export const getCompanyUsersAction = (companyId) => async dispatch => {
   dispatch(getUsers(companyId))
}

export const editProfileImageAction = (userId, imageUri) => async dispatch => {
   const data = { userId, imageUri }
   dispatch(changeProfileImage(data))
}

export const editProfileDataAction = data => async dispatch => {
   dispatch(editProfileData(data))
}