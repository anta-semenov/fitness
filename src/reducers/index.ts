import { combineReducers } from 'redux'
import { State, Action, ActionType,TimerState, WorkoutStage, ExerciseStats, Workout } from 'types/'
import { setterActionReducer } from './utils'
import { pause } from 'data/'
import { omit } from 'majime'

export const initialState: State = {
  remainingTime: 0,
  exercises: [pause()],
  timerState: TimerState.Pause,
  workoutStage: WorkoutStage.Idle,
  exerciseStats: {},
  workouts: {},
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

const exerciseStats = (prevState: ExerciseStats = initialState.exerciseStats, action: Action): ExerciseStats => {
  switch (action.type) {
    case ActionType.AddSetForExercise:
    return {
      ...prevState,
      [action.exerciseId]: addSetToExerciseStats(prevState[action.exerciseId], action.date, action.numberOfRepetitions),
    }
    default: return prevState
  }
}

const addSetToExerciseStats = (prevStats: { [date: number]: number[] } = {}, date: number, numberOfRepetitions: number): { [date: number]: number[] } => {
  const prevDateStats = prevStats[date] || []
  return {
    ...prevStats,
    [date]: [...prevDateStats, numberOfRepetitions],
  }
}

const workouts = (prevState: { [id: number]: Workout } = initialState.workouts, action: Action): { [id: number]: Workout } => {
  switch (action.type) {
    case ActionType.SetWorkout:
      return {
        ...prevState,
        [action.id]: action.workout,
      }
    case ActionType.RemoveWorkout:
      return omit(action.id, prevState)
    default: return prevState
  }
}

export const rootReducer = combineReducers({
  remainingTime,
  exercises,
  timerState,
  workoutStage,
  exerciseStats,
  workouts,
})
