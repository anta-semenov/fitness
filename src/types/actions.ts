import { State } from './states'
import { ActionType } from './actionTypes'
import { SetterActionBase, ActionBase } from './actionBase'
import { Exercise } from './exercise'

export type GetState = () => State

export type ThunkAction = (getState: GetState, dispatch: Dispatch) => void
export type ChainableThunkAction<T> = (getState: GetState, dispatch: Dispatch) => Promise<T>

export interface Dispatch {
  <T>(action: ChainableThunkAction<T>): Promise<T>
  (action: Action | ThunkAction ): void
}

export type Action = TickTimerAction
| SetRemainingTime
| SetExercises


export interface TickTimerAction extends ActionBase<ActionType.TickTimer> {}

export interface SetRemainingTime extends SetterActionBase<ActionType.SetRemainingTime, number> {}

export interface SetExercises extends SetterActionBase<ActionType.SetExercises, Exercise[]> {}
