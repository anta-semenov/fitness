import * as React from 'react'
import { ViewStyle, StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, WorkoutHistoryScreenItem } from 'types/'
import { getWorkoutHistory } from 'selectors/'
import { HistoryItem } from './HistoryItem'

interface WorkoutHistoryProps {

}

interface StateProps {
  workoutHistoryItems: WorkoutHistoryScreenItem[]
}

interface DispatchProps {

}

type Props = WorkoutHistoryProps & StateProps & DispatchProps

const WorkoutHistoryComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <FlatList
      data={ props.workoutHistoryItems }
      renderItem={ ({ item }) => <HistoryItem item={ item }/> }
      contentContainerStyle={ styles.content }
      style={ styles.container }
    />
  )
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  } as ViewStyle,
  content: {
    paddingVertical: 50
  } as ViewStyle,
})

const mapStateToProps = (state: State): StateProps => ({
  workoutHistoryItems: getWorkoutHistory(state),
})

const mapDispatchToProps = (_: Dispatch): DispatchProps => ({

})

export const WorkoutHistory = connect(mapStateToProps, mapDispatchToProps)(WorkoutHistoryComponent)
