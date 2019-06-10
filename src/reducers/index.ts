import { combineReducers } from 'redux'
import { State, Action, ActionType } from 'types/'
import { setterActionReducer } from './utils'

export const initialState: State = {
  remainingTime: 0,
  exercises: [],
}

const remainingTime = (prevState: number, action: Action): number => {
  switch (action.type) {
    case ActionType.SetRemainingTime: return action.payload
    case ActionType.TickTimer: return Math.max(0, prevState - 1)
    default: return prevState
  }
}

const exercises = setterActionReducer(ActionType.SetExercises, initialState.exercises)


export const rootReducer = combineReducers({
  remainingTime,
  exercises,
})
