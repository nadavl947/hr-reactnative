import { COMPANY } from "../../data/companyData";
import * as actionTypes from "../actions/actionsType";

const initialState = {
  id: null,
  name: "",
  logo: "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
  defaultColor: "",
  description: "",
  departments: "",
  establishData: "",
  companyAddress: "",
};

const getCurrentCompany = (state, action) => {
  const { companyId } = action;
  const currentCompany = COMPANY.find((item) => item.id === companyId);

  return {
    ...state,
    id: currentCompany.id,
    name: currentCompany. name,
    logo: currentCompany.logo,
    defaultColor: currentCompany.defaultColor,
    description: currentCompany.description,
    departments: currentCompany.departments,
    userTypes: currentCompany.userTypes,
    establishData: currentCompany.establishData,
    companyAddress: currentCompany.companyAddress,
  };
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANY:
      return getCurrentCompany(state, action);
    default:
      return state;
  }
};

export default companyReducer;
