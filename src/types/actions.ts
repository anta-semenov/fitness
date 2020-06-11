import { State, TimerState, WorkoutStage } from './states'
import { ActionType } from './actionTypes'
import { SetterActionBase, ActionBase } from './actionBase'
import { Exercise } from './exercise'

export type GetState = () => State

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => void
export type ChainableThunkAction<T> = (dispatch: Dispatch, getState: GetState) => Promise<T>
export type AllActions = Action | ThunkAction

export interface Dispatch {
  <T>(action: ChainableThunkAction<T>): Promise<T>
  (action: Action | ThunkAction ): void
}

export type Action = TickTimerAction
| SetRemainingTimeAction
| SetExercisesAction
| SetTimerStateAction
| SetWorkoutStageAction
| AddSetForExerciseAction


export interface TickTimerAction extends ActionBase<ActionType.TickTimer> {}

export interface SetRemainingTimeAction extends SetterActionBase<ActionType.SetRemainingTime, number> {}

export interface SetExercisesAction extends SetterActionBase<ActionType.SetExercises, Exercise[]> {}

export interface SetTimerStateAction extends SetterActionBase<ActionType.SetTimerState, TimerState> {}

export interface SetWorkoutStageAction extends SetterActionBase<ActionType.SetWorkoutStage, WorkoutStage> {}

export interface AddSetForExerciseAction extends ActionBase<ActionType.AddSetForExercise> {
  date: number
  exerciseId: string
  numberOfRepetitions: number
}
