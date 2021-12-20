import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { crypto } from '../features/CryptoPrices/slice'
import { profileSlice } from '../features/Profile/slice'

const combinedReducer = combineReducers({
	profile: profileSlice.reducer,
	crypto: crypto.reducer
})

const store = configureStore({
	reducer: combinedReducer
})

export default store
