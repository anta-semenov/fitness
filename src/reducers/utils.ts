import { ActionType, SetterActionBase } from 'types/'

export const setterActionReducer = <S>(actionType: ActionType, defaultState: S) =>
  (previousState: S = defaultState, action: SetterActionBase<ActionType, S>): S => {
    if (action.type === actionType) {
      return action.payload
    } else {
      return previousState
    }
  }
