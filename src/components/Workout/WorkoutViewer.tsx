import * as React from 'react'
import { View, ViewStyle, StyleSheet, FlatList, Text, TextStyle } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, WorkoutExercise, TimerState, ExerciseType } from 'types/'
import { startPauseTimer, nextExercise } from 'actions/'
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
}

type Props = WorkoutViewerProps & StateProps & DispatchProps

const WorkoutViewerComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const currentExerciseType = props.exercises[0]?.type ?? ExerciseType.Pause
  const isWorkoutPused = currentExerciseType === ExerciseType.Pause
  const title = currentExerciseType === ExerciseType.Exercise ? props.exercises[0]?.name : currentExerciseType
  const firstExerciseIndex = props.exercises.findIndex((item) => item.type === ExerciseType.Exercise)
  return (
    <View style={ styles.container }>
      <View style={ styles.header }>
        <Text style={ styles.activeTitle }>{ title ?? '' }</Text>
        {
          isWorkoutPused ||
          <Text style={ [styles.timer, { color: getColorForExerciseType(currentExerciseType) }] }>{ props.remainingTime }</Text>
        }
        {
          props.isTimerActive &&
          <RoundButton onPress={ props.startPauseTimer } title='Pause' color={ Colors.navy }/>
        }
        {
          isWorkoutPused && !props.isTimerActive &&
          <RoundButton onPress={ props.nextExercise } title='Start' color={ Colors.navy }/>
        }
        {
          !isWorkoutPused && !props.isTimerActive &&
          <RoundButton onPress={ props.startPauseTimer } title='Resume'/>
        }
      </View>
      <FlatList
        data={ props.exercises.slice(firstExerciseIndex) }
        renderItem={ ({ item, index }) => {
          if (item.type === ExerciseType.Exercise) {
            return (
              <View style={ [styles.exerciseTile, index === 0 && { backgroundColor: '#00000010' }] }>
                <Text style={ styles.title }>{ item.name }</Text>
              </View>
            )
          } else {
            return <View style={ [styles.separator, { backgroundColor: item.type === ExerciseType.Pause ? Colors.navy : Colors.green }] }/>
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
  activeTitle: {
    fontSize: 32,
    color: Colors.black,
    marginBottom: 16,
  },
  separator: {
    marginHorizontal: 8,
    marginVertical: 4,
    height: 4,
    borderRadius: 2,
  } as ViewStyle,
  listContent: {
    paddingVertical: 4,
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

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  startPauseTimer: () => dispatch(startPauseTimer()),
  nextExercise: () => dispatch(nextExercise()),
})

export const WorkoutViewer = connect(mapStateToProps, mapDispatchToProps)(WorkoutViewerComponent)
