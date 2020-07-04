import * as React from 'react'
import { View, ViewStyle, StyleSheet, TextInput, TextStyle, FlatList, LayoutAnimation } from 'react-native'
import { WorkoutExercise, ExerciseType } from 'types/'
import { WotkoutExerciseEditor } from './WorkoutExerciseEditor'
import { WorkoutListRow } from 'components/WorkoutList/WorkoutListRow'
import { PickerWithButton } from 'components/common/'
import { range } from 'majime'

interface WorkoutEditorProps {
  title: string
  setTitle: (newValue: string) => void
  exercises: WorkoutExercise[]
  setExercises: (exercises: WorkoutExercise[]) => void
  defaultExerciseDuration: number
  setDefaultExerciseDuration: (value: number) => void
  defaultRestDuration: number
  setDefaultRestDuration: (value: number) => void
}

type Props = WorkoutEditorProps

export const WorkoutEditor: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const [isFocused, setIsFocused] = React.useState(!props.title)
  return (
    <View style={ styles.container }>
      <FlatList
        style={ { flex: 1, alignSelf: 'stretch' } }
        data={ props.exercises }
        renderItem={ ({ item, index }) => (
          <WotkoutExerciseEditor
            style={ styles.row }
            exercise={ item as WorkoutExercise }
            removeExercise={ () => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
              props.setExercises([...props.exercises.slice(0, index), ...props.exercises.slice(index + 1)])
            } }
            updateExercise={ (value: WorkoutExercise) => props.setExercises([
              ...props.exercises.slice(0, index),
              value,
              ...props.exercises.slice(index + 1),
            ]) }
          />
        ) }
        contentContainerStyle={ styles.listContent }
        ListHeaderComponent={ (
          <View style={ [styles.header, styles.row] }>
            <TextInput
              style={ [styles.title, isFocused ? styles.titleHighlighted : undefined] }
              value={ props.title }
              onChangeText={ props.setTitle }
              onFocus={ () => setIsFocused(true) }
              onBlur={ () => setIsFocused(false) }
            />
            <PickerWithButton
              title='Default exercise duration:'
              selectedValue={ props.defaultExerciseDuration }
              onSelect={ props.setDefaultExerciseDuration }
              items={ range(1, 24).map((item) => item * 5) }
              addSeparator={ true }
            />
            <PickerWithButton
              title='Default rest duration:'
              selectedValue={ props.defaultRestDuration }
              onSelect={ props.setDefaultRestDuration }
              items={ range(1, 30) }
              addSeparator={ false }
            />
          </View>
        ) }
        ListFooterComponent={ (
          <WorkoutListRow
            onPress={ () => {
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
              props.setExercises([...props.exercises, { type: ExerciseType.Pause, name: '', id: Date.now() }])
            } }
            title={ '+ Add exercise' }
            id={ -1 }
            style={ [styles.row, { alignItems: 'center' }] }
          />
        ) }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
  } as ViewStyle,
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 40,
    paddingBottom: 8,
    alignSelf: 'stretch',
    alignItems: 'center',
  } as ViewStyle,
  title: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    fontSize: 24,
    fontWeight: '400',
    minWidth: 100,
    maxWidth: 300,
    textAlign: 'center',
  } as TextStyle,
  titleHighlighted: {
    borderRadius: 16,
    backgroundColor: '#00000010',
  } as TextStyle,
  row: {
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 16,
    backgroundColor: '#ffffff',
  } as ViewStyle,
  listContent: {
    paddingVertical: 4,
  } as ViewStyle,
})
