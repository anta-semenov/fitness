export enum ExerciseType {
  WarmUp = 'WarmUp',
  Exercise = 'Exercise',
}

export interface Exercise {
  type: ExerciseType
  name: string
  description: string
}
