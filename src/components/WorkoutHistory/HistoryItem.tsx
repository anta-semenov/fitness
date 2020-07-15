import * as React from 'react'
import { View, ViewStyle, StyleSheet, Text, TextStyle } from 'react-native'
import { Colors } from 'constants/'
import { WorkoutHistoryScreenItem } from 'types/'
import { format } from 'date-fns'

interface HistoryItemProps {
  item: WorkoutHistoryScreenItem
}

type Props = HistoryItemProps

export const HistoryItem: React.StatelessComponent<Props> = (props): React.ReactElement => {
  const end = props.item.start === props.item.end ? 'Not completed' : format(props.item.end, 'HH:mm')
  return (
    <View style={ styles.container }>
      <Text style={ styles.title }>{ props.item.name }</Text>
      <Text style={ styles.date }>{ format(props.item.start, 'dd.MM.yyyy') }</Text>
      <Text style={ styles.time }>{ `${format(props.item.start, 'HH:mm')}  -  ${end}` }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: Colors.white,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  title: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.black
  } as TextStyle,
  date: {
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'center',
    color: Colors.black,
    opacity: 0.6,
    marginVertical: 8,
  } as TextStyle,
  time: {
    fontWeight: '500',
    fontSize: 17,
    textAlign: 'center',
    color: Colors.black,
    opacity: 0.6,
    marginVertical: 8,
  } as TextStyle
})
