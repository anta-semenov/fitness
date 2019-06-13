import { Exercise } from './exercise'

export enum WorkoutStage {
  WarmUp = 'WarmUp',
  Main = 'Main',
  Additional = 'Additional',
  Idle = 'Idle',
}

export enum TimerState {
  Active = 'Active',
  Pause = 'Pause',
}

export interface State {
  remainingTime: number
  exercises: Exercise[]
  timerState: TimerState
  workoutStage: WorkoutStage
}
