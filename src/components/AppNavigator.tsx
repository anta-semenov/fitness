import * as React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native'
import { State, Dispatch, WorkoutStage, TimerState } from 'types/'
import { setTimerState, initWorkout } from 'actions/'
import { Colors } from 'constants/'
import { RoundButton } from 'components/common'

const AppNavigatorComponent = (props: StateProps & DispatchProps) => {
  return (
    <View style={ styles.container }>
      <Text style={ styles.timer }>{ props.remainingTime }</Text>
      {
        props.isTimerActive
        ?
          <RoundButton onPress={ () => props.startPauseTimer(props.isTimerActive) } title='Pause' color={ Colors.navy }/>
        :
          <View style={ styles.row }>
            <RoundButton onPress={ () => props.startPauseTimer(props.isTimerActive) } title='Resume'/>
            <RoundButton onPress={ props.resetWorkout } title='Reset' color={ Colors.red }/>
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    padding: 24,
  } as ViewStyle,
  timer: {
    marginVertical: 16,
    fontSize: 72,
    lineHeight: 80,
    color: Colors.black,
    fontWeight: '500',
  } as TextStyle,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  } as ViewStyle,
})

interface StateProps {
  isTimerActive: boolean
  workoutStage: WorkoutStage
  remainingTime: string
}

const mapStateToProps = (state: State): StateProps => {
  const remainingTime = `${('00' + Math.trunc(state.remainingTime / 60)).slice(-2)}:${('00' + state.remainingTime % 60).slice(-2)}`
  return ({
    isTimerActive: state.timerState === TimerState.Active,
    workoutStage: state.workoutStage,
    remainingTime,
  })
}

interface DispatchProps {
  startPauseTimer: (isActive: boolean) => void
  resetWorkout: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  startPauseTimer: (isActive: boolean) => dispatch(setTimerState(isActive ? TimerState.Pause : TimerState.Active)),
  resetWorkout: () => dispatch(initWorkout()),
})

export const AppNavigator = connect(mapStateToProps, mapDispatchToProps)(AppNavigatorComponent)
