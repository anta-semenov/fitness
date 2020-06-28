export enum Route {
  WorkoutList = 'WorkoutList',
  Workout = 'Workout',
}

export interface RouteParams extends Record<string, object> {
  [Route.Workout]: {
    workoutId: number
    isEditing: boolean
  }
  [Route.WorkoutList]: {}
}
