import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer, initialState } from 'reducers/'
import { State } from 'types/'
import { loadState, saveState } from 'utils/'
import { initWorkout } from 'actions/'
import { defaultExercises } from './defaultExercises'

export const configureStore = async (): Promise<Store<State>> => {
  const loadedState = await loadState()

  let state = loadedState == null
    ? initialState
    : { ...initialState, ...loadedState }

  if (Object.keys(state.workouts).length === 0) {
    state = {
      ...state,
      workouts: defaultExercises.workouts,
    }
  }

  const store = createStore(rootReducer, state, applyMiddleware(thunk)) as Store<State>

  if (loadedState == null) {
    store.dispatch(initWorkout() as any)
  }

  store.subscribe(() => saveState(store.getState()))

  return store
}
