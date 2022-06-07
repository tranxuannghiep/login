import { combineReducers } from "redux";
import authReducer from "../modules/auth/redux/authReducer";
const rootReducer = combineReducers({
  authReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
