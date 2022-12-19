import { ActionType } from "../action-types";
import {
  LoginAction,
  AddErrorAction,
  ClearErrorAction,
  LogoutAction,
} from "../actions";
import { UserData } from "../../interfaces";

export const loginUser = function (user: UserData): LoginAction {
  return {
    type: ActionType.LOGIN_USER,
    user: user,
  };
};

export const fetchLoginStatus = function (user: UserData): LoginAction {
  return { type: ActionType.LOGIN_USER, user: user };
};

export const logoutUser = function (): LogoutAction {
  return {
    type: ActionType.LOGOUT_USER,
  };
};

export const addError = function (error: string[]): AddErrorAction {
  return { type: ActionType.ADD_ERROR, error: error };
};

export const clearError = function (): ClearErrorAction {
  return { type: ActionType.CLEAR_ERROR, error: [] };
};
