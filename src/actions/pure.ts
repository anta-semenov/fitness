import { SetTimerStateAction, SetRemainingTimeAction, TickTimerAction, TimerState, ActionType, Exercise, SetExercisesAction, AddSetForExerciseAction, Workout, SetWorkoutAction, RemoveWorkoutAction } from 'types/'

export const setTimerState = (payload: TimerState): SetTimerStateAction => ({ type: ActionType.SetTimerState, payload })
export const tickTimer = (): TickTimerAction => ({ type: ActionType.TickTimer })
export const setRemainingTime = (payload: number): SetRemainingTimeAction => ({ type: ActionType.SetRemainingTime, payload })
export const setExercises = (payload: Exercise[]): SetExercisesAction => ({ type: ActionType.SetExercises, payload })
export const addExerciseStats = (exerciseId: string, date: number, numberOfRepetitions: number): AddSetForExerciseAction => ({ type: ActionType.AddSetForExercise, exerciseId, date, numberOfRepetitions })
export const setWorkout = (id: number, workout: Workout): SetWorkoutAction => ({ type: ActionType.SetWorkout, id, workout })
export const removeWorkout = (id: number): RemoveWorkoutAction => ({ type: ActionType.RemoveWorkout, id })
