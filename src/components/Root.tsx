import * as React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from 'store/'
import { AppNavigator } from './AppNavigator'
import 'majime'
import { Store } from 'redux'
import { State } from 'types/'
import { initTimer } from 'actions/'

export const Root = () => {
  const store = loadStore()
  if (store == null) {
    return null
  }
  return (
    <Provider store={ store }>
      <AppNavigator/>
    </Provider>
  )
}

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
