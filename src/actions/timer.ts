import { TimerState, ThunkAction, AudioEffect, ExerciseType } from 'types/'
import { playSound } from './audio'
import { tickTimer, setRemainingTime, setTimerState, setExercises } from './pure'
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake'

let interval

export const initTimer = (): ThunkAction => (dispatch) => {
  if (interval != null) {
    clearInterval(interval)
  }

  interval = setInterval(() => dispatch(everySecond()), 1000)
}

const everySecond = (): ThunkAction => (dispatch, getState) => {
  const remainingTime = getState().remainingTime
  const activeExercise = getState().exercises[0]
  if (getState().timerState === TimerState.Active && remainingTime > 0) {
    dispatch(tickTimer())
    if (remainingTime === 6) {
      dispatch(playSound(AudioEffect.Attention))
    } else if (remainingTime === 3 || remainingTime === 2) {
      dispatch(playSound(AudioEffect.Ready))
    } else if (remainingTime === 1) {
      dispatch(playSound(AudioEffect.Go))
    } else if (remainingTime === 22 && activeExercise != null && activeExercise.switchInTheMiddle) {
      dispatch(playSound(AudioEffect.Attention))
    }
  } else if (getState().timerState === TimerState.Active && getState().remainingTime === 0) {
    dispatch(setTimerState(TimerState.Pause))
    deactivateKeepAwake()
    dispatch(nextExercise())

  }
}

export const nextExercise = (): ThunkAction => (dispatch, getState) => {
  const state = getState()
  if (state.exercises.length > 1) {
    const newExercises = state.exercises.slice(1)
    dispatch(setExercises(newExercises))
    dispatch(setRemainingTime(newExercises[0].duration))
    if (newExercises[0].type !== ExerciseType.Pause && newExercises[0].type !== ExerciseType.Done && newExercises[0].type !== ExerciseType.Start && newExercises[0].duration !== 0) {
      dispatch(setTimerState(TimerState.Active))
      activateKeepAwake()
    }
  }
}

export const startPauseTimer = (start?: boolean): ThunkAction => (dispatch, getState) => {
  if (start !== true && getState().timerState === TimerState.Active) {
    dispatch(setTimerState(TimerState.Pause))
    if (getState().exercises[0].incrementTimeOnPause === true) {
      dispatch(setRemainingTime(getState().remainingTime + 5))
    }
    deactivateKeepAwake()
  } else {
    dispatch(setTimerState(TimerState.Active))
    activateKeepAwake()
  }
}
