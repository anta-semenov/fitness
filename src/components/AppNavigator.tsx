import * as React from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, ViewStyle, TextStyle, ScrollView } from 'react-native'
import { State, Dispatch, WorkoutStage, TimerState, Exercise, ExerciseType } from 'types/'
import { startPauseTimer, initWorkout, nextExercise } from 'actions/'
import { Colors } from 'constants/'
import { RoundButton } from 'components/common'
import { ExerciseRow } from './Exercise'

const AppNavigatorComponent = (props: StateProps & DispatchProps) => {
  const currentExercise = props.exercises[0]
  const isWorkoutPused = currentExercise.type === ExerciseType.Pause
  const isCompleted = currentExercise.type === ExerciseType.Done
  const shouldGoNext = currentExercise.duration === 0 && currentExercise.type === ExerciseType.Exercise
  return (
    <View style={ [styles.container] }>
      <Text style={ [styles.timer, { color: getColorForExerciseType(currentExercise.type) }] }>{ props.remainingTime }</Text>
      {
        props.isTimerActive &&
        <RoundButton onPress={ props.startPauseTimer } title='Pause' color={ Colors.navy }/>
      }
      {
        isCompleted &&
        <RoundButton onPress={ props.resetWorkout } title='Restart' color={ Colors.red }/>
      }
      {
        !props.isTimerActive && !isCompleted &&
        <View style={ styles.row }>
          {
            isWorkoutPused && !shouldGoNext &&
            <RoundButton onPress={ props.nextExercise } title='Start' color={ Colors.navy }/>
          }
          {
            shouldGoNext && !isWorkoutPused &&
            <RoundButton onPress={ props.startPauseTimer } title='Next'/>
          }
          {
            !isWorkoutPused && !shouldGoNext &&
            <RoundButton onPress={ props.startPauseTimer } title='Resume'/>
          }
          <RoundButton onPress={ props.resetWorkout } title='Reset' color={ Colors.red }/>
        </View>
      }
      <ScrollView style={ styles.scroll }>
        { props.exercises.map((exercise, index) => {
          const isActive = index === props.exercises.findIndex(({ type }) => type !== ExerciseType.Pause && type !== ExerciseType.Rest)
          return (
            <ExerciseRow
              key={ `${exercise.name}_${index}` }
              exercise={ exercise }
              isActive={ isActive }
              onButtonPress={ exercise.type === ExerciseType.Pause ? props.startPauseTimer : props.nextExercise }
              shouldHide={ exercise.type === ExerciseType.Pause && index === 0 }
            />
          )
        }) }
      </ScrollView>
    </View>
  )
}

const getColorForExerciseType = (type: ExerciseType): string => {
  switch(type) {
    case ExerciseType.Rest:
      return Colors.navy
    case ExerciseType.Exercise:
    case ExerciseType.WarmUp:
      return Colors.green
    default:
      return Colors.black
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ededed',
    alignItems: 'center',
    paddingTop: 24,
  } as ViewStyle,
  timer: {
    marginVertical: 16,
    fontSize: 72,
    lineHeight: 80,
    color: Colors.black,
    fontWeight: '500',
    textAlign: 'center',
  } as TextStyle,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  } as ViewStyle,
  scroll: {
    marginTop: 24,
    alignSelf: 'stretch'
  }
})

interface StateProps {
  isTimerActive: boolean
  workoutStage: WorkoutStage
  remainingTime: string
  exercises: Exercise[]
}

const mapStateToProps = (state: State): StateProps => {
  const remainingTime = `${('00' + Math.trunc(state.remainingTime / 60)).slice(-2)}:${('00' + state.remainingTime % 60).slice(-2)}`
  return ({
    isTimerActive: state.timerState === TimerState.Active,
    workoutStage: state.workoutStage,
    remainingTime,
    exercises: state.exercises,
  })
}

interface DispatchProps {
  startPauseTimer: () => void
  resetWorkout: () => void
  nextExercise: () => void
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  startPauseTimer: () => dispatch(startPauseTimer()),
  resetWorkout: () => dispatch(initWorkout()),
  nextExercise: () => dispatch(nextExercise())
})

export const AppNavigator = connect(mapStateToProps, mapDispatchToProps)(AppNavigatorComponent)
