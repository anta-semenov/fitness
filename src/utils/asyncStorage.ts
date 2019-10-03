import { AsyncStorage } from 'react-native'
import { Exercise, ExerciseType } from 'types/'

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
