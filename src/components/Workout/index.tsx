import * as React from 'react'
import { View, ViewStyle, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { State, Dispatch, Workout, Route, RouteParams } from 'types/'
import { setWorkout } from 'actions/'
import { getWorkout } from 'selectors/'
import { StackScreenProps } from '@react-navigation/stack'
import { WorkoutEditor } from './WorkoutEditor'

interface WorkoutProps extends StackScreenProps<RouteParams, Route.Workout> {

}

interface StateProps {
  workout: Workout
}

interface DispatchProps {
  save: (workout: Workout) => void
}

type Props = WorkoutProps & StateProps & DispatchProps

const WorkoutComponent: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const [isEditing, setIsEditing] = React.useState(props.route.params.isEditing)
  const [title, setTitle] = React.useState(props.workout.name)
  const [exercises, setExercises] = React.useState(props.workout.exercises)

  const save = () => props.save({
    ...props.workout,
    name: title,
    exercises,
  })

  React.useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            if (isEditing) {
              save()
            }
            setIsEditing(!isEditing)
          }}
          title={ isEditing ? 'Save' : 'Edit' }
        />
      ),
    });
  }, [props.navigation, isEditing, save])

  if (isEditing) {
    return (
      <WorkoutEditor
        title={ title }
        setTitle={ setTitle }
        exercises={ exercises }
        setExercises={ setExercises }
      />
    )
  } else {
    return (
      <View>

      </View>
    )
  }
}

const mapStateToProps = (state: State, ownProps: WorkoutProps): StateProps => ({
  workout: getWorkout(state, ownProps.route.params.workoutId)
})

const mapDispatchToProps = (dispatch: Dispatch, ownProps: WorkoutProps): DispatchProps => ({
  save: (workout: Workout) => dispatch(setWorkout(ownProps.route.params.workoutId as number, workout))
})

export const WorkoutScreen = connect(mapStateToProps, mapDispatchToProps)(WorkoutComponent)
