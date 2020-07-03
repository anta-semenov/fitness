import * as React from 'react'
import { View, ViewStyle, StyleSheet, StyleProp, TextInput, TextStyle, LayoutAnimation } from 'react-native'
import { WorkoutExercise, ExerciseType } from 'types/'
import { PickerWithButton } from 'components/common/'

interface WotkoutExerciseEditorProps {
  exercise: WorkoutExercise
  updateExercise: (newValue: WorkoutExercise) => void
  removeExercise: () => void
  style?: StyleProp<ViewStyle>
}

type Props = WotkoutExerciseEditorProps

export const WotkoutExerciseEditor: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <View style={ [styles.container, props.style] }>
      <PickerWithButton
        title='Type:'
        selectedValue={ props.exercise.type }
        onSelect={ (value: ExerciseType) => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          props.updateExercise({
            ...props.exercise,
            type: value,
          })
        } }
        items={ ExerciseType.all }
      />
      {
        [ExerciseType.Done, ExerciseType.Pause, ExerciseType.Rest].includes(props.exercise.type) ||
        <TextInput
          style={ styles.title }
          value={ props.exercise.name }
          onChangeText={ (value) => props.updateExercise({
            ...props.exercise,
            name: value,
          }) }
          placeholder='Name'
          clearButtonMode='while-editing'
        />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  } as ViewStyle,
  title: {
    fontSize: 20,
    paddingVertical: 8,
  } as TextStyle,
})
