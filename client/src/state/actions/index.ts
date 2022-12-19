import { ActionType } from "../action-types";

export interface LoginAction {
  type: ActionType.LOGIN_USER;
  user: {
    id: number;
    username: string;
  };
}

export interface LogoutAction {
  type: ActionType.LOGOUT_USER;
}

export interface AddErrorAction {
  type: ActionType.ADD_ERROR;
  error: string[];
}
export interface ClearErrorAction {
  type: ActionType.CLEAR_ERROR;
  error: string[];
}

export type Action =
  | LoginAction
  | AddErrorAction
  | ClearErrorAction
  | LogoutAction;
