import { combineReducers, Reducer } from 'redux'
import { StoreState } from 'store/storeState'

import HelloReducer from './helloReducer'

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    helloCount: HelloReducer,
})

export default rootReducer
