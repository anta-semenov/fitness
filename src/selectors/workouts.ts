import { createSelector } from 'reselect'
import { State } from 'types/'

export const getWorkouts = createSelector(
  (state: State) => state.workouts,
  (workoutsDictionary) => Object.values(workoutsDictionary).sortedByProperty((item) => item.id),
)

export const getWorkout = (state: State, id: number) => state.workouts[id]
