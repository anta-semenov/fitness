import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer, initialState } from 'reducers/'
import { State } from 'types/'
import { loadState, saveState } from 'utils/'
import { initWorkout } from 'actions/'

export const configureStore = async (): Promise<Store<State>> => {
  const loadedState = await loadState()

  const state = loadedState == null
    ? initialState
    : { ...initialState, ...loadedState }

  const store = createStore(rootReducer, state, applyMiddleware(thunk)) as Store<State>

  if (loadedState == null) {
    store.dispatch(initWorkout() as any)
  }

  store.subscribe(() => saveState(store.getState()))

  return store
}
