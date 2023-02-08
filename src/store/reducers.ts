import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import PersistStorage from 'redux-persist/lib/storage'
import auth from './slice/auth'

const persistConfig = {
  key: 'root',
  version: 1,
  whiteList: ['auth'],
  storage: PersistStorage,
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth,
  }),
)

export default persistedReducer
