import { createSelector } from 'reselect'
import { State, WorkoutHistoryType, WorkoutHistoryScreenItem } from 'types/'
import { oneHourValue } from 'majime'

export const getWorkouts = createSelector(
  (state: State) => state.workouts,
  (workoutsDictionary) => Object.values(workoutsDictionary).sortedByProperty((item) => item.id),
)

export const getWorkout = (state: State, id: number) => state.workouts[id]

export const getWorkoutHistory = createSelector(
  (state: State) => state.workoutHistory || [],
  (workoutHistoryRaw): WorkoutHistoryScreenItem[] => {
    if (workoutHistoryRaw.length === 0) { return [] }
    const result: WorkoutHistoryScreenItem[] = []
    let currentResultItem = {
      id: workoutHistoryRaw[0].id,
      name: workoutHistoryRaw[0].name,
      start: workoutHistoryRaw[0].date,
      end: workoutHistoryRaw[0].date,
    }
    workoutHistoryRaw.forEach((item) => {
      if (item.id !== currentResultItem.id) {
        result.push({ ...currentResultItem })
        currentResultItem = {
          id: item.id,
          name: item.name,
          start: item.date,
          end: item.date,
        }
      } else if (Math.abs(item.date - currentResultItem.start) > oneHourValue) {
        result.push({ ...currentResultItem })
        currentResultItem = {
          id: item.id,
          name: item.name,
          start: item.date,
          end: item.date,
        }
      } else if (item.type === WorkoutHistoryType.Start) {
        currentResultItem.start = Math.min(item.date, currentResultItem.start)
      } else if (item.type === WorkoutHistoryType.End) {
        currentResultItem.end = Math.max(item.date, currentResultItem.end)
      }
    })
    result.push({ ...currentResultItem })
    return result
  }
)

export const isBeginningOfWorkout = (state: State, workoutId: number): boolean => {
  const workout = getWorkout(state, workoutId)
  if (workout == null) {
    return false
  }

  if (state.exercises.length === 0) {
    return false
  }

  if (state.exercises.length !== workout.exercises.length) {
    return false
  }

  if (state.exercises[0].id !== workout.exercises[0].id) {
    return false
  }

  if (state.exercises[0].duration !== state.remainingTime) {
    return false
  }

  return true
}

export const getActiveWorkout = (state: State) => getWorkout(state, state.activeWorkoutId)
