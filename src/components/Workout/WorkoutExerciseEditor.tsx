import * as React from 'react'
import { View, ViewStyle, StyleSheet, StyleProp, TextInput, TextStyle, LayoutAnimation, Button } from 'react-native'
import { WorkoutExercise, ExerciseType } from 'types/'
import { PickerWithButton } from 'components/common/'
import { range } from 'majime'

interface WotkoutExerciseEditorProps {
  exercise: WorkoutExercise
  updateExercise: (newValue: WorkoutExercise) => void
  removeExercise: () => void
  addExerciseAfter: () => void
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
        [ExerciseType.Done, ExerciseType.Pause, ExerciseType.Rest, ExerciseType.Start].includes(props.exercise.type) ||
        <>
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
          <View style={ styles.separator }/>
          <TextInput
            style={ styles.description }
            value={ props.exercise.description }
            onChangeText={ (value) => props.updateExercise({
              ...props.exercise,
              description: value,
            }) }
            multiline={ true }
            numberOfLines={ 3 }
            placeholder='Description?'
            clearButtonMode='while-editing'
          />
        </>
      }
      {
        [ExerciseType.Done, ExerciseType.Pause].includes(props.exercise.type) ||
        <PickerWithButton
          title='Duration:'
          selectedValue={ props.exercise.duration ?? 'Default duration' }
          onSelect={ (value: 'Default duration' | number) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            props.updateExercise({
              ...props.exercise,
              duration: value === 'Default duration' ? undefined : value,
            })
          } }
          items={ ['Default duration', ...range(0, 9), ...range(2, 24).map((item) => item * 5), ...range(13, 30).map((item) => item * 10)] }
        />
      }
      <View style={ styles.actionsContainer }>
        <Button title='Delete' onPress={ props.removeExercise } color='#d72626'/>
        <Button title='Add after' onPress={ props.addExerciseAfter }/>
      </View>
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopColor: '#00000010',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    paddingVertical: 8,
    marginTop: 8,
    paddingHorizontal: 24,
  } as ViewStyle,
  description: {
    fontSize: 17,
    paddingVertical: 8,
  } as TextStyle,
  separator: {
    alignSelf: 'stretch',
    backgroundColor: '#000000',
    opacity: 0.1,
    height: 1,
  } as ViewStyle,
})
