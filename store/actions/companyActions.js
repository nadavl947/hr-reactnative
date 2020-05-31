import * as actionsType from './actionsType';

const getCompany = companyId => ({ type: actionsType.GET_COMPANY, companyId })

export const getCompanyAction = (companyId) => async dispatch => {
   dispatch(getCompany(companyId))
}