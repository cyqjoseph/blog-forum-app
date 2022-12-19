import { ActionType } from "../action-types";
import { Action } from "../actions";

const errorReducer = function (state: string[] = [], action: Action): string[] {
  switch (action.type) {
    case ActionType.ADD_ERROR:
      return action.error;
    case ActionType.CLEAR_ERROR:
      return [];
    default:
      return state;
  }
};

export default errorReducer;
