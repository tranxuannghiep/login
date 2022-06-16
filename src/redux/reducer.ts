import { combineReducers } from "redux";
import authReducer from "../modules/auth/redux/authReducer";
import intlReducer from "./../modules/intl/redux/intlReducer";
import todoReducer from "./../modules/todos/redux/todoReducer";
const rootReducer = combineReducers({
  authReducer,
  intlReducer,
  todoReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
