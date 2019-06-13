import { SetTimerStateAction, SetRemainingTimeAction, TickTimerAction, TimerState, ActionType, ThunkAction } from 'types/'

export const setTimerState = (payload: TimerState): SetTimerStateAction => ({ type: ActionType.SetTimerState, payload })
export const tickTimer = (): TickTimerAction => ({ type: ActionType.TickTimer })

let interval

export const initTimer = (): ThunkAction => (dispatch) => {
  if (interval != null) {
    clearInterval(interval)
  }

  interval = setInterval(() => dispatch(everySecond()), 1000)
}

const everySecond = (): ThunkAction => (dispatch, getState) => {
  if (getState().timerState === TimerState.Active && getState().remainingTime > 0) {
    dispatch(tickTimer())
  } else if (getState().timerState === TimerState.Active && getState().remainingTime === 0) {
    dispatch(setTimerState(TimerState.Pause))
    dispatch(timerFinished())
  }
}

export const setRemainingTime = (payload: number): SetRemainingTimeAction => ({ type: ActionType.SetRemainingTime, payload })

const timerFinished = (): ThunkAction => () => {}
