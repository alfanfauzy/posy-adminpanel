// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DataLogin } from '@/domain/auth/models'

export interface AuthState {
  isLoggedIn: boolean
  authData: DataLogin
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
        accesses: null,
      },
      accesses: [],
    },
  },
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSuccess: (state: AuthState, action: PayloadAction<DataLogin>) => {
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
            accesses: null,
          },
          accesses: [],
        },
      }
    },
  },
})

export const { authSuccess, onLogout } = AuthSlice.actions
export default AuthSlice.reducer
