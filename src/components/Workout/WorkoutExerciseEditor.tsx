import * as React from 'react'
import { View, ViewStyle, StyleSheet } from 'react-native'
import { WorkoutExercise } from 'types/'
import { Picker } from '@react-native-community/picker'

interface WotkoutExerciseEditorProps {
  exercise: WorkoutExercise
  updateExercise: (newValue: WorkoutExercise) => void
}

type Props = WotkoutExerciseEditorProps

export const WotkoutExerciseEditor: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <View style={ styles.container }>
      <Picker/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:
})
