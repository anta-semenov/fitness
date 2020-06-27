import * as React from 'react'
import { View, ViewStyle, StyleSheet, Text } from 'react-native'

interface Props {
  onPress: () => void
  title: string
  subtitle?: string
}

export const WorkoutListRow: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <View style={ styles.container }>
      <Text>{ props.title }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  } as ViewStyle,
})
