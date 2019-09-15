export enum ExerciseType {
  WarmUp = 'WarmUp',
  Exercise = 'Exercise',
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
  description?: string
  duration: number
  needPair?: boolean
  switchInTheMiddle?: boolean
  equipment?: Equipment
}
