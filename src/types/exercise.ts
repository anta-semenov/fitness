export enum ExerciseType {
  WarmUp = 'WarmUp',
  Exercise = 'Exercise',
  RequiredExercise = 'RequiredExercise',
  Rest = 'Rest',
  Pause = 'Pause',
  Done = 'Done',
}

export enum Equipment {
  Rubber = 'Rubber',
}

export interface Exercise {
  type: ExerciseType
  name: string
  sort: number
  description?: string
  duration: number
  needPair?: boolean
  switchInTheMiddle?: boolean
  equipment?: Equipment
  incrementTimeOnPause?: boolean
}

export interface WorkoutExercise {
  type: ExerciseType
  name: string
  description?: string
  duration: number
}
