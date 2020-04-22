import { AsyncStorage, Alert } from 'react-native'
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
    const newExercises = [exercises.filter((exercise) => exercise.type === ExerciseType.Exercise), ...previousExercises.slice(0, 20)]
    AsyncStorage.setItem(previousExercisesKey, JSON.stringify(newExercises))
  } catch {
    Alert.alert('Can\'t save previous exwrcises')
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
