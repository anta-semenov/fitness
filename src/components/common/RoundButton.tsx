import * as React from 'react'
import { View, ViewStyle, Text, TouchableOpacity, StyleSheet, TextStyle } from 'react-native'
import { Colors } from 'constants/'

interface Props {
  onPress: () => void
  title: string
  color?: string
  size?: number
}

export const RoundButton = ({ onPress, title, size, color }: Props) => (
  <TouchableOpacity onPress={ onPress }>
    <View style={ [styles.container, !!size ? { width: size, height: size, borderRadius: size / 2 } : undefined, !!color ? { borderColor: color } : undefined] }>
      <Text style={ [styles.title, !!color ? { color } : undefined] }>{ title }</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.green,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginHorizontal: 8,
  } as ViewStyle,
  title: {
    fontSize: 22,
    color: Colors.green,
  } as TextStyle
})
