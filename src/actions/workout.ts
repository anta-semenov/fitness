import { ThunkAction, Exercise } from 'types/'
import { setExercises, setRemainingTime } from './pure'
import { pause, warmUpRest, exerciseRest, warmUpLegs, warmUpBody, warmUpArms, pullUps, pushUps, handStandPushUps, optionalExercisesPart1, optionalExercisesPart2, exerciseRoundRest, afterWorkout } from 'data/'


export const initWorkout = (): ThunkAction => (dispatch) => {
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
  let optional1 = optionalExercisesPart1.randomElement()
  let optional2 = optionalExercisesPart2.randomElement()
  if (optional1.needPair) {
    optional1 = {
      ...optional1,
      name: `${optional1.name} R`
    }
    optional2 = {
      ...optional1,
      name: `${optional1.name} L`
    }
  }

  const optionals = [optional1, optional2].shuffle()

  const workOut: Exercise[] = [
    pullUps,
    pushUps.randomElement(),
    handStandPushUps,
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
}
