import { ThunkAction } from 'types/'
import { setRemainingTime } from './timer'

export const initWorkout = (): ThunkAction => (dispatch) => {
  dispatch(setRemainingTime(40))
}
