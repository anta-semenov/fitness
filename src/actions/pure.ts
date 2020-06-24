import { SetTimerStateAction, SetRemainingTimeAction, TickTimerAction, TimerState, ActionType, Exercise, SetExercisesAction, AddSetForExerciseAction } from 'types/'

export const setTimerState = (payload: TimerState): SetTimerStateAction => ({ type: ActionType.SetTimerState, payload })
export const tickTimer = (): TickTimerAction => ({ type: ActionType.TickTimer })
export const setRemainingTime = (payload: number): SetRemainingTimeAction => ({ type: ActionType.SetRemainingTime, payload })
export const setExercises = (payload: Exercise[]): SetExercisesAction => ({ type: ActionType.SetExercises, payload })
export const addExerciseStats = (exerciseId: string, date: number, numberOfRepetitions: number): AddSetForExerciseAction => ({ type: ActionType.AddSetForExercise, exerciseId, date, numberOfRepetitions })
