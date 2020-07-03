import * as React from 'react'
import { View, ViewStyle, StyleSheet, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native'

interface Props {
  onPress: () => void
  title: string
  subtitle?: string
  id: number
  style?: StyleProp<ViewStyle>
}

export const WorkoutListRow: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <TouchableOpacity onPress={ props.onPress }>
      <View style={ [styles.container, props.id < 0 ? styles.centerAlign : undefined, props.style] }>
        <Text style={ styles.title }>{ props.title }</Text>
      </View>
    </TouchableOpacity>

  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  } as ViewStyle,
  title: {
    fontWeight: '400',
    fontSize: 24,
  } as TextStyle,
  centerAlign: {
    alignItems: 'center'
  } as ViewStyle,
})
