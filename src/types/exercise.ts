export enum ExerciseType {
  WarmUp = 'WarmUp',
  Exercise = 'Exercise',
  Rest = 'Rest',
  Pause = 'Pause',
  Done = 'Done',
}

export interface Exercise {
  type: ExerciseType
  name: string
  description?: string
  duration: number
  needPair?: boolean
  switchInTheMiddle?: boolean
}
