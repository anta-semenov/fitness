import * as React from 'react'
import { View, ViewStyle, StyleSheet, Button, Text, TextStyle, LayoutAnimation } from 'react-native'
import { Picker } from '@react-native-community/picker'

interface PickerWithButtonProps<T = string | number> {
  title: string
  items: T[]
  onSelect: (value: T) => void
  selectedValue: T
  addSeparator?: boolean
}

type Props = PickerWithButtonProps

export const PickerWithButton: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const [isPickerActive, setPickerActive] = React.useState(false)

  const switchPicker = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setPickerActive(!isPickerActive)
  }

  return (
    <View style={ styles.container }>
      <View style={ styles.row }>
        <Text style={ styles.title }>{ props.title }</Text>
        <Button onPress={ switchPicker } title={ `${props.selectedValue}` }/>
      </View>
      {
        isPickerActive &&
        <Picker
          selectedValue={ props.selectedValue }
          onValueChange={ props.onSelect }
        >
          { props.items.map((item) => <Picker.Item value={ item } key={ item } label={ `${item}` }/>) }
        </Picker>
      }
      {
        props.addSeparator && <View style={ styles.separator }/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  } as ViewStyle,
  title: {
    fontSize: 18,
    opacity: 0.6,
  } as TextStyle,
  separator: {
    alignSelf: 'stretch',
    backgroundColor: '#000000',
    opacity: 0.1,
    height: 1,
  } as ViewStyle,
  container: {
    alignSelf: 'stretch',
  } as ViewStyle,
})
