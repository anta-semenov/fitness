import { ThunkAction, Exercise } from 'types/'
import { setExercises, setRemainingTime } from './pure'
import { pause, warmUpRest, exerciseRest, warmUpLegs, warmUpBody, warmUpArms, pullUps, pushUps, handStandPushUps, optionalExercisesPart1, optionalExercisesPart2, exerciseRoundRest, afterWorkout } from 'data/'
import { getRandomBoolean } from 'majime'
import { loadPreviousExercises, saveTodaysExercises } from 'utils/'

export const initWorkout = (): ThunkAction => async (dispatch) => {
  const previousExercises = await loadPreviousExercises()
  const previousExercisesNamesAll = new Set(previousExercises.flatten().map((exercise) => exercise.name))
  const previousExercisesNames2Days = new Set(previousExercises.slice(0, 2).flatten().map((exercise) => exercise.name))
  const filterPreviousExercises = (exercise: Exercise): boolean => !previousExercisesNamesAll.has(exercise.name)

  let exercises: Exercise[] = []

  // Warm Up
  const warmUp: Exercise[] = [warmUpBody[0], ...[...warmUpLegs, ...warmUpBody, ...warmUpArms, ...warmUpBody].shuffle()]
    .slice(0, 20)
    .unique()
    .slice(0, 8)
    .map((exercise, index) => [
      exercise,
      index === 7 ? undefined : warmUpRest,
    ].filterNull())
    .flatten()
  exercises = [pause(), warmUpRest, ...warmUp, pause('Warm up completed!')]

  // Workout
  const pushUp = pushUps.filter(filterPreviousExercises).randomElement()
  const usedEqupment = pushUp.equipment != null ? [pushUp.equipment] : []

  const filterByEquipment = (exercise: Exercise) => exercise.equipment == null || !usedEqupment.includes(exercise.equipment)

  let optional1 = optionalExercisesPart1.filter(filterPreviousExercises).filter(filterByEquipment).randomElement()
  let optional2 = optionalExercisesPart2.filter(filterPreviousExercises).filter(filterByEquipment).randomElement()
  if (optional1.needPair) {
    optional2 = {
      ...optional1,
      name: `${optional1.name} L`
    }
    optional1 = {
      ...optional1,
      name: `${optional1.name} R`
    }
  }

  const optionals = [optional1, optional2].shuffle()
  optionals.forEach((exercise) => {
    if (exercise.equipment != null) {
      usedEqupment.push(exercise.equipment)
    }
  })

  let pullUp: Exercise
  let handStandPushUp: Exercise
  if (getRandomBoolean()) {
    pullUp = pullUps.filter(filterByEquipment).filter((exercise) => !previousExercisesNames2Days.has(exercise.name)).randomElement()
    if (pullUp.equipment != null) {
      usedEqupment.push(pullUp.equipment)
    }
    handStandPushUp = handStandPushUps.filter(filterByEquipment).randomElement()
  } else {
    handStandPushUp = handStandPushUps.filter(filterByEquipment).randomElement()
    if (handStandPushUp.equipment != null) {
      usedEqupment.push(handStandPushUp.equipment)
    }
    pullUp = pullUps.filter(filterByEquipment).randomElement()
  }

  const workOut: Exercise[] = [
    pullUp,
    pushUp,
    handStandPushUp,
  ]
    .shuffle()
    .map((exercise, index) => [
      exercise,
      index === 2 ? undefined : exerciseRest,
      index === 2 ? undefined : (index === 0 ? optionals[0] : optionals[1]),
      index === 2 ? undefined : exerciseRest,
    ].filterNull())
    .flatten()

  exercises = [...exercises, warmUpRest, ...workOut, exerciseRoundRest, ...workOut, pause('Main workout completed!'), ...afterWorkout]

  dispatch(setExercises(exercises))
  dispatch(setRemainingTime(exercises[0].duration))
  saveTodaysExercises(exercises)
}
