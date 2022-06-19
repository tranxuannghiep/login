import { combineReducers } from "redux";
import authReducer from "../modules/auth/redux/authReducer";
import intlReducer from "./../modules/intl/redux/intlReducer";
import todoReducer from "./../modules/todos/redux/todoReducer";
import dataTableReducer from "./../modules/dataTable/redux/dataTableReducer";
const rootReducer = combineReducers({
  authReducer,
  intlReducer,
  todoReducer,
  dataTableReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
