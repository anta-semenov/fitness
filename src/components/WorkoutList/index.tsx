import * as React from 'react'
import { View, ViewStyle, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, Workout, Route, RouteParams } from 'types/'
import { setWorkout } from 'actions/'
import { WorkoutListRow } from './WorkoutListRow'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getWorkouts } from 'selectors/'

interface WorkoutListProps extends StackScreenProps<RouteParams, Route.WorkoutList> {

}

interface StateProps {
  workouts: Workout[]
}

interface DispatchProps {
  onPress: (id: number) => void
}

type Props = WorkoutListProps & StateProps & DispatchProps

const WorkoutListComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <FlatList
      data={ [...props.workouts, { id: -1, name: '+ Add workout', exercises: [] }] }
      renderItem={ ({ item }) => <WorkoutListRow title={ item.name } subtitle={ item.description } onPress={ () => props.onPress(item.id) } id={ item.id }/> }
      style={ styles.container }
      ItemSeparatorComponent={ () => <View style={ styles.separator }/> }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  } as ViewStyle,
  separator: {
    alignSelf: 'stretch',
    marginHorizontal: 16,
    backgroundColor: '#000000',
    opacity: 0.1,
    height: 1,
  } as ViewStyle,
})

const mapStateToProps = (state: State): StateProps => ({
  workouts: getWorkouts(state),
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: WorkoutListProps): DispatchProps => ({
  onPress: (workoutId: number) => {
    if (workoutId < 0) {
      const newId = Date.now()
      dispatch(setWorkout(newId, {
        id: newId,
        name: '',
        exercises: [],
      }))
      ownProps.navigation.navigate(Route.Workout, { workoutId: newId, isEditing: true })
    } else {
      ownProps.navigation.navigate(Route.Workout, { workoutId, isEditing: false })
    }
  }
})

export const WorkoutList = connect(mapStateToProps, mapDispatchToProps)(WorkoutListComponent)
