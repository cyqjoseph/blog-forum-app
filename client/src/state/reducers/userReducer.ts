import { ActionType } from "../action-types";
import { Action } from "../actions";

interface LoginState {
  isLoggedIn: boolean;
  id: number | null;
  username: string;
  // blogs: []
}

const initialState: LoginState = {
  isLoggedIn: false,
  id: null,
  username: "",
};

const userReducer = function (
  state: LoginState = initialState,
  action: Action
): LoginState {
  switch (action.type) {
    case ActionType.LOGIN_USER:
      return {
        isLoggedIn: true,
        id: action.user.id,
        username: action.user.username,
      };
    case ActionType.LOGOUT_USER:
      return {
        isLoggedIn: false,
        id: null,
        username: "",
      };
    default:
      return state;
  }
};

export default userReducer;
