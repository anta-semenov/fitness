import { combineReducers } from 'redux'
import { State, Action, ActionType,TimerState, WorkoutStage } from 'types/'
import { setterActionReducer } from './utils'

export const initialState: State = {
  remainingTime: 0,
  exercises: [],
  timerState: TimerState.Pause,
  workoutStage: WorkoutStage.Idle,
}

const remainingTime = (prevState: number = initialState.remainingTime, action: Action): number => {
  switch (action.type) {
    case ActionType.SetRemainingTime: return action.payload
    case ActionType.TickTimer: return Math.max(0, prevState - 1)
    default: return prevState
  }
}

const exercises = setterActionReducer(ActionType.SetExercises, initialState.exercises)

const timerState = setterActionReducer(ActionType.SetTimerState, initialState.timerState)

const workoutStage = setterActionReducer(ActionType.SetWorkoutStage, initialState.workoutStage)

export const rootReducer = combineReducers({
  remainingTime,
  exercises,
  timerState,
  workoutStage,
})
