import { combineReducers } from "redux";
import { RESET_STATE, SET_USER } from "../actions/auth";


const appReducer = (state: any = { app: { user: {}, employees: { data: [], detail: {} }, upload: [] } }, action: any) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, ...{ user: (action?.value || {}) } };
    case RESET_STATE:
      return {};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
