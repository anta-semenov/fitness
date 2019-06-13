import * as React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from 'store/'
import { AppNavigator } from './AppNavigator'
import { initWorkout, initTimer } from 'actions/'

const store = configureStore()

export const Root = () => {
  React.useEffect(() => {
    store.dispatch(initWorkout() as any)
    store.dispatch(initTimer() as any)
  })
  return (
    <Provider store={ store }>
      <AppNavigator/>
    </Provider>
  )
}
