import { ActionType, createCustomAction, getType } from "typesafe-actions";
import { AuthToken, IUser } from "./../../../configs/user";
export interface AuthState {
  auth?: AuthToken;
  user?: IUser;
  loading?: boolean;
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

export const setUserLoading = createCustomAction(
  "auth/setUserLoading",
  (data: boolean) => ({
    data,
  })
);

export const clearUserInfo = createCustomAction("auth/clearUserInfo");

const actions = {
  setAuthorization,
  setUserInfo,
  clearUserInfo,
  setUserLoading,
};
type Action = ActionType<typeof actions>;

export default function authReducer(
  state: AuthState = { loading: false },
  action: Action
) {
  switch (action.type) {
    case getType(setAuthorization):
      return { ...state, auth: action.data };
    case getType(setUserInfo):
      return { ...state, user: action.data };
    case getType(setUserLoading):
      return { ...state, loading: action.data };
    case getType(clearUserInfo):
      return { loading: false };
    default:
      return state;
  }
}
