import { combineReducers } from "redux";
import authReducer from "../modules/auth/redux/authReducer";
import intlReducer from "./../modules/intl/redux/intlReducer";
const rootReducer = combineReducers({
  authReducer,
  intlReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
