import * as React from 'react'
import { View, ViewStyle, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, Workout, Route } from 'types/'
import { setWorkout } from 'actions/'
import { WorkoutListRow } from './WorkoutListRow'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getWorkouts } from 'selectors/'

interface WorkoutListProps extends StackScreenProps<any> {

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
      renderItem={ ({ item }) => <WorkoutListRow title={ item.name } subtitle={ item.description } onPress={ () => props.onPress(item.id) }/> }
      style={ StyleSheet.absoluteFill }
    />
  )
}

const styles = StyleSheet.create({

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
      ownProps.navigation.navigate(Route.Workout, { workoutId: newId })
    } else {
      ownProps.navigation.navigate(Route.Workout, { workoutId })
    }
  }
})

export const WorkoutList = connect(mapStateToProps, mapDispatchToProps)(WorkoutListComponent)
