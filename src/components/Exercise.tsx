import * as React from 'react'
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import { Colors } from 'constants/'
import { Exercise, ExerciseType } from 'types/'
import { RoundButton } from 'components/common'

interface Props {
  exercise: Exercise
  isActive: boolean
  onButtonPress: () => void
  shouldHide: boolean
}

export const ExerciseRow = (props: Props) => {
  if (props.shouldHide) {
    return null
  }
  const containerStyles = [
    styles.container,
    props.isActive ? styles.active : null,
    props.exercise.type === ExerciseType.Rest ? { height: 30 } : null,
    { backgroundColor: props.exercise.type === ExerciseType.Rest || props.exercise.type === ExerciseType.Pause ? Colors.lightNavy : Colors.lightGreen }
  ].filterNull()
  return (
    <View style={ containerStyles }>
      <Text style={ [styles.title, props.isActive ? styles.activeTitle : null] }>{ props.exercise.name }</Text>
      {
        props.exercise.description != null &&
        <Text style={ styles.description }> { props.exercise.description }</Text>
      }
      {
        props.isActive && (props.exercise.type === ExerciseType.Pause || props.exercise.duration === 0) &&
        <RoundButton onPress={ props.onButtonPress } color={ Colors.black } title={ props.exercise.type === ExerciseType.Pause ? 'Start' : 'Next' }/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    justifyContent: 'center',
    paddingHorizontal: 16,
    alignItems: 'center',
  } as ViewStyle,
  active: {
    height: 250,
    alignItems: 'center',
  } as ViewStyle,
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.white,
  } as TextStyle,
  activeTitle: {
    fontSize: 40,
    marginBottom: 24,
  } as TextStyle,
  description: {
    fontSize: 15,
    fontWeight: '500',
    color: Colors.white,
    marginTop: 12,
  } as TextStyle,
})
