import * as React from 'react'
import { View, ViewStyle, StyleSheet, Text, TouchableOpacity, TextStyle, StyleProp } from 'react-native'

interface Props {
  onPress: () => void
  title: string
  subtitle?: string
  id: number
  style?: StyleProp<ViewStyle>
  titleStyle?: StyleProp<TextStyle>
}

export const WorkoutListRow: React.StatelessComponent<Props> = (props): React.ReactElement => {
  return (
    <TouchableOpacity onPress={ props.onPress } activeOpacity={ 0.9 }>
      <View style={ [styles.container, props.style] }>
        <Text style={ [styles.title, props.titleStyle] }>{ props.title }</Text>
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
})
