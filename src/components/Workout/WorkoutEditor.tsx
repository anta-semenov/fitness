import * as React from 'react'
import { View, ViewStyle, StyleSheet, TextInput, TextStyle, FlatList } from 'react-native'
import { WorkoutExercise } from 'types/'

interface WorkoutEditorProps {
  title: string
  setTitle: (newValue: string) => void
  exercises: WorkoutExercise[]
  setExercises: (exercises: WorkoutExercise[]) => void
}

type Props = WorkoutEditorProps

export const WorkoutEditor: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const [isFocused, setIsFocused] = React.useState(!props.title)
  return (
    <View style={ styles.container }>
      <TextInput
        style={ [styles.title, isFocused ? styles.titleHighlighted : undefined] }
        value={ props.title }
        onChangeText={ props.setTitle }
        onFocus={ () => setIsFocused(true) }
        onBlur={ () => setIsFocused(false) }
      />
      <FlatList
        data={}
        renderItem={  }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 40,
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
})
