import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import PersistStorage from 'redux-persist/lib/storage'
import auth from './slice/auth'
import restaurant from './slice/restaurant'

const persistConfig = {
  key: 'root',
  version: 1,
  whiteList: ['auth'],
  storage: PersistStorage,
}

const restaurantConfig = {
  key: 'root',
  version: 1,
  whiteList: ['restaurant'],
  storage: PersistStorage,
}

const persistedReducer = combineReducers({
  auth: persistReducer(persistConfig, auth),
  restaurant: persistReducer(restaurantConfig, restaurant),
})

export default persistedReducer
