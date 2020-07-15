import * as React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { configureStore } from 'store/'
import { WorkoutList } from './WorkoutList'
import 'majime'
import { Store } from 'redux'
import { State, Route } from 'types/'
import { initTimer } from 'actions/'
import { WorkoutScreen } from './Workout'
import { WorkoutHistory } from './WorkoutHistory'

export const Root = () => {
  const store = loadStore()
  if (store == null) {
    return null
  }
  return (
    <Provider store={ store }>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='Train'>
            { () => (
              <Stack.Navigator initialRouteName={ Route.WorkoutList }>
                <Stack.Screen name={ Route.WorkoutList } component={ WorkoutList } />
                <Stack.Screen name={ Route.Workout } component={ WorkoutScreen } />
              </Stack.Navigator>
            ) }
          </Tab.Screen>
          <Tab.Screen name='History' component={ WorkoutHistory } />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator()

const loadStore = (): Store<State> | null => {
  const [store, setStore] = React.useState(null)

  React.useEffect(() => {
    configureStore().then((newStore) => {
      newStore.dispatch(initTimer() as any)
      setStore(newStore)
    })
  }, [])
  return store
}
