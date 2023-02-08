import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import persistStore from 'redux-persist/es/persistStore'
import persistedReducer from './reducers'

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})

const persistor = persistStore(store)

export { store, persistor }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
