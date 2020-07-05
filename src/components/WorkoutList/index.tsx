import * as React from 'react'
import { View, ViewStyle, StyleSheet, TextStyle, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, Workout, Route, RouteParams } from 'types/'
import { setWorkout, removeWorkout, copyWorkout, activateWorkout } from 'actions/'
import { WorkoutListRow } from './WorkoutListRow'
import { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types'
import { getWorkouts } from 'selectors/'
import { SwipeListView } from 'react-native-swipe-list-view'

interface WorkoutListProps extends StackScreenProps<RouteParams, Route.WorkoutList> {

}

interface StateProps {
  workouts: Workout[]
}

interface DispatchProps {
  onPress: (id: number) => void
  addWorkout: () => void
  deleteWorkout: (id: number) => void
  copyWorkout: (id: number) => void
}

type Props = WorkoutListProps & StateProps & DispatchProps

const WorkoutListComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <SwipeListView
      data={ props.workouts }
      renderItem={ ({ item }) => <WorkoutListRow title={ item.name } subtitle={ item.description } onPress={ () => props.onPress(item.id) } id={ item.id } style={ styles.rowStyle }/> }
      renderHiddenItem={ ({ item }, rowMap) => (
        <View style={ styles.hiddenRow }>
          <TouchableOpacity onPress={ () => {
            rowMap[`${item.id}`]?.closeRow()
            props.deleteWorkout(item.id)
          } }>
            <View style={ [styles.button] }>
              <Text style={ [styles.buttonTitle, { color: '#d72626' }] }>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => {
            rowMap[`${item.id}`]?.closeRow()
            props.copyWorkout(item.id)
          } }>
            <View style={ [styles.button] }>
              <Text style={ [styles.buttonTitle, { color: '#15651f' }] }>Copy</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) }
      rightOpenValue={ -170 }
      style={ styles.container }
      ItemSeparatorComponent={ () => <View style={ styles.separator }/> }
      ListFooterComponent={ <WorkoutListRow title={ '+ Add workout' } onPress={ props.addWorkout } id={ -1 } style={ styles.addButton } titleStyle={ styles.buttonTitle }/> }
      keyExtractor={ (item) => `${item.id}` }
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
  hiddenRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flex: 1,
    alignItems: 'center',
  } as ViewStyle,
  button: {
    alignItems: 'center',
    width: 85,
    height: 130,
    justifyContent: 'center',
    // borderLeftWidth: 1,
    // borderLeftColor: '#00000010',
  } as ViewStyle,
  buttonTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  } as TextStyle,
  rowStyle: {
    backgroundColor: '#ffffff',
  } as ViewStyle,
  addButton: {
    alignSelf: 'center',
    marginVertical: 8,
    marginHorizontal: 40,
    borderRadius: 12,
    backgroundColor: '#4098e0',
    paddingVertical: 16,
  } as ViewStyle,
})

const mapStateToProps = (state: State): StateProps => ({
  workouts: getWorkouts(state),
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: WorkoutListProps): DispatchProps => ({
  onPress: (workoutId: number) => {
    dispatch(activateWorkout(workoutId))
    ownProps.navigation.navigate(Route.Workout, { workoutId, isEditing: false })
  },
  addWorkout: () => {
    const newId = Date.now()
    dispatch(setWorkout(newId, {
      id: newId,
      name: `New workout`,
      exercises: [],
      defaultExerciseDuration: 50,
      defaultRestDuration: 4,
    }))
    dispatch(activateWorkout(newId))
    ownProps.navigation.navigate(Route.Workout, { workoutId: newId, isEditing: true })
  },
  deleteWorkout: (id: number) => dispatch(removeWorkout(id)),
  copyWorkout: (id: number) => {
    const newId = Date.now()
    dispatch(copyWorkout(id, newId))
    dispatch(activateWorkout(newId))
    ownProps.navigation.navigate(Route.Workout, { workoutId: newId, isEditing: true })
  },
})

export const WorkoutList = connect(mapStateToProps, mapDispatchToProps)(WorkoutListComponent)
