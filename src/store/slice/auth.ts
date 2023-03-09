// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { LoginDataResponse } from 'shared'

export interface AuthState {
  isLoggedIn: boolean
  authData: LoginDataResponse
}

const initialState: AuthState = {
  isLoggedIn: false,
  authData: {
    uuid: '',
    token: '',
    refresh_token: '',
    expired_at: {
      seconds: 0,
      nanos: 0,
    },
    role_access: {
      role: {
        uuid: '',
        name: '',
        is_internal: false,
      },
      access: [],
    },
  },
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (
      state: AuthState,
      action: PayloadAction<LoginDataResponse>,
    ) => {
      state.isLoggedIn = true
      state.authData = action.payload
    },
    onLogout: (state: AuthState) => {
      state.isLoggedIn = false
      state.authData = {
        uuid: '',
        token: '',
        refresh_token: '',
        expired_at: {
          seconds: 0,
          nanos: 0,
        },
        role_access: {
          role: {
            uuid: '',
            name: '',
            is_internal: false,
          },
          access: [],
        },
      }
    },
  },
})

export const { authSuccess, onLogout } = AuthSlice.actions
export default AuthSlice.reducer
