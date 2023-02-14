import persistStore from 'redux-persist/es/persistStore'
import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist'
// import persistedReducer from './reducers'
import auth from './slice/auth'

// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }).concat(logger),
//   devTools: process.env.NODE_ENV !== 'production',
// })

export const storeRedux = configureStore({
  reducer: { auth },
})

// export const persistor = persistStore(store)

export type RootState = ReturnType<typeof storeRedux.getState>
export type AppDispatch = typeof storeRedux.dispatch
