import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AuthToken, IUser } from "./../../../configs/user";
export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
}
export const setAuthorization = createCustomAction(
  "auth/setAuthorization",
  (data: AuthToken) => ({
    data,
  })
);

export const setUserInfo = createCustomAction(
  "auth/setUserInfo",
  (data: IUser) => ({
    data,
  })
);

export const clearUserInfo = createCustomAction("auth/clearUserInfo");

const actions = { setAuthorization, setUserInfo, clearUserInfo };
type Action = ActionType<typeof actions>;

export default function authReducer(state: AuthState = {}, action: Action) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(clearUserInfo):
      return {};
    default:
      return state;
  }
}
