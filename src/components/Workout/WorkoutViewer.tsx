import * as React from 'react'
import { View, ViewStyle, StyleSheet, FlatList, Text, TextStyle } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, WorkoutExercise, TimerState, ExerciseType } from 'types/'
import { startPauseTimer, nextExercise, activateWorkout, logStartOfTheWorkout } from 'actions/'
import { getWorkout } from 'selectors/'
import { RoundButton } from 'components/common'
import { Colors } from 'constants/'

interface WorkoutViewerProps {
  workoutId: number
}

interface StateProps {
  exercises: WorkoutExercise[]
  isTimerActive: boolean
  remainingTime: string
}

interface DispatchProps {
  startPauseTimer: () => void
  nextExercise: () => void
  repeat: () => void
}

type Props = WorkoutViewerProps & StateProps & DispatchProps

const WorkoutViewerComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const currentExerciseType = props.exercises[0]?.type ?? ExerciseType.Pause
  const title = currentExerciseType === ExerciseType.Exercise ? props.exercises[0]?.name : currentExerciseType
  const firstExerciseIndex = props.exercises.findIndex((item) => item.type === ExerciseType.Exercise)
  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.activeTitle }>{ title ?? '' }</Text>
        {
          props.exercises[0]?.description != null &&
          <Text style={ styles.activeDuration }>{ props.exercises[0]?.description }</Text>
        }
        {
          ([ExerciseType.Pause, ExerciseType.Done].includes(currentExerciseType) || props.exercises[0].duration === 0) ||
          <Text style={ [styles.timer, { color: getColorForExerciseType(currentExerciseType) }] }>{ props.remainingTime }</Text>
        }
        <View style={ styles.buttonContainer }>
          {
            props.isTimerActive &&
            <RoundButton onPress={ props.startPauseTimer } title='Pause' color={ Colors.navy }/>
          }
          {
            currentExerciseType === ExerciseType.Pause && !props.isTimerActive &&
            <RoundButton onPress={ props.nextExercise } title='Start' color={ Colors.navy }/>
          }
          {
            currentExerciseType === ExerciseType.Start && !props.isTimerActive &&
            <RoundButton onPress={ props.startPauseTimer } title='Start'/>
          }
          {
            currentExerciseType === ExerciseType.Done && !props.isTimerActive &&
            <RoundButton onPress={ props.repeat } title='Restart' color={ Colors.red }/>
          }
          {
             ![ExerciseType.Start, ExerciseType.Pause, ExerciseType.Done].includes(currentExerciseType) && !props.isTimerActive && props.exercises[0].duration !== 0 &&
            <RoundButton onPress={ props.startPauseTimer } title='Resume'/>
          }
          {
            ![ExerciseType.Start, ExerciseType.Pause, ExerciseType.Done].includes(currentExerciseType) && !props.isTimerActive &&
            <RoundButton onPress={ props.nextExercise } title='Next' color={ Colors.navy }/>
          }
        </View>
      </View>
      <FlatList
        data={ props.exercises.slice(firstExerciseIndex) }
        renderItem={ ({ item, index }) => {
          if (item.type === ExerciseType.Exercise) {
            return (
              <View style={ [styles.exerciseTile, index === 0 && { backgroundColor: '#00000010' }] }>
                <Text style={ styles.title }>{ item.name }</Text>
                {
                  item.description &&
                  <Text style={ styles.description }>{ item.description }</Text>
                }
              </View>
            )
          } else {
            return <View style={ [styles.separator, { backgroundColor: item.type === ExerciseType.Rest ? Colors.navy : Colors.green }] }/>
          }
        } }
        keyExtractor={ (item) => `${item.id}` }
        contentContainerStyle={ styles.listContent }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  } as ViewStyle,
  header: {
    backgroundColor: Colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingVertical: 16,
  } as ViewStyle,
  timer: {
    marginBottom: 16,
    fontSize: 72,
    lineHeight: 80,
    color: Colors.black,
    fontWeight: '500',
    textAlign: 'center',
  } as TextStyle,
  exerciseTile: {
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
    backgroundColor: '#ffffff',
  } as ViewStyle,
  title: {
    fontSize: 24,
  } as TextStyle,
  description: {
    fontSize: 17,
    marginTop: 8,
    opacity: 0.8,
  } as TextStyle,
  activeTitle: {
    fontSize: 32,
    color: Colors.black,
    marginBottom: 16,
  } as TextStyle,
  activeDuration: {
    fontSize: 20,
    color: Colors.black,
    marginBottom: 16,
    opacity: 0.8,
    textAlign: 'center',
  } as TextStyle,
  separator: {
    marginHorizontal: 8,
    marginVertical: 4,
    height: 4,
    borderRadius: 2,
  } as ViewStyle,
  listContent: {
    paddingVertical: 4,
  } as ViewStyle,
  buttonContainer: {
    flexDirection: 'row',
  } as ViewStyle,
})

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

const mapStateToProps = (state: State, ownProps: WorkoutViewerProps): StateProps => {
  const activeExerciseId = state.exercises[0]?.id ?? 0
  const workout = getWorkout(state, ownProps.workoutId)
  const activeExerciseIndex = Math.max(workout.exercises.findIndex((item) => item.id === activeExerciseId), 0)
  return {
    remainingTime: `${('00' + Math.trunc(state.remainingTime / 60)).slice(-2)}:${('00' + state.remainingTime % 60).slice(-2)}`,
    isTimerActive: state.timerState === TimerState.Active,
    exercises: workout.exercises.slice(activeExerciseIndex),
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: WorkoutViewerProps): DispatchProps => ({
  startPauseTimer: () => {
    dispatch(startPauseTimer())
    dispatch(logStartOfTheWorkout(ownProps.workoutId))
  },
  nextExercise: () => dispatch(nextExercise()),
  repeat: () => dispatch(activateWorkout(ownProps.workoutId))
})

export const WorkoutViewer = connect(mapStateToProps, mapDispatchToProps)(WorkoutViewerComponent)
