import { AsyncStorage } from 'react-native'
import { Exercise, ExerciseType, State } from 'types/'

const previousExercisesKey = 'previousExercisesKey'

 export const loadPreviousExercises = async (): Promise<Exercise[][]> => {
  try {
    const previousExercisesRaw = await AsyncStorage.getItem(previousExercisesKey)
    if (previousExercisesRaw == null) {
      return []
    }
    return JSON.parse(previousExercisesRaw) as Exercise[][]
  } catch {
    return []
  }
}

export const saveTodaysExercises = async (exercises: Exercise[]) => {
  const previousExercises = await loadPreviousExercises()
  try {
    AsyncStorage.setItem(previousExercisesKey, JSON.stringify([exercises.filter((exercise) => exercise.type === ExerciseType.Exercise), ...previousExercises.slice(0, 6)]))
  } catch {
    //
  }
}

const stateKey = 'fitnessAppState'

export const loadState = async (): Promise<State | undefined> => {
  try {
    const state = await AsyncStorage.getItem(stateKey)
    if (stateKey == null) {
      return undefined
    }
    return JSON.parse(state) as State
  } catch {
    return undefined
  }
}

export const saveState = async (state: State): Promise<void> => {
  try {
    AsyncStorage.setItem(stateKey, JSON.stringify(state))
  } catch {
    //
  }
}
