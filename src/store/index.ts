import { applyMiddleware, createStore, Store } from 'redux'
import thunk from 'redux-thunk'
import { rootReducer } from 'reducers/'
import { State } from 'types/'

export const configureStore = (): Store<State> => {
  return createStore(rootReducer, applyMiddleware(thunk))
}
