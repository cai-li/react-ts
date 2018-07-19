import { combineReducers, Reducer } from 'redux'
import { StoreState } from 'store/storeState'

import HelloReducer from './helloReducer'
import ChatReducer from './chatReducer'

const rootReducer: Reducer<StoreState> = combineReducers<StoreState>({
    helloCount: HelloReducer,
    chatProps: ChatReducer,
})

export default rootReducer
