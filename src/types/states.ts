import { Exercise, WorkoutExercise } from './exercise'

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

export interface ExerciseStats {
  [exerciseId: string]: { [date: number]: number[] }
}

export interface Workout {
  id: number
  name: string
  description?: string
  exercises: WorkoutExercise[]
  defaultExerciseDuration: number
  defaultRestDuration: number
}

export enum WorkoutHistoryType {
  Start = 'Start',
  End = 'End',
}

export interface WorkoutHistoryItem {
  id: number
  name: string
  date: number
  type: WorkoutHistoryType
}

export interface WorkoutHistoryScreenItem {
  id: number
  name: string
  start: number
  end: number
}

export interface State {
  remainingTime: number
  exercises: Exercise[]
  timerState: TimerState
  workoutStage: WorkoutStage
  exerciseStats: ExerciseStats
  activeWorkoutId: number
  workouts: { [workoutId: number]: Workout }
  workoutHistory: WorkoutHistoryItem[]
}
