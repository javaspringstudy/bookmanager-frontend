import { createSlice } from '@reduxjs/toolkit'

const initState = {
  email: '',
}

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: initState,
  reducers: {
    login: (state, action) => {
      console.log('로그인....')

      //{email, password 로 구성}
      const data = action.payload

      //새로운 상태
      return { email: data.email }
    },
    logout: (state, action) => {
      console.log('로그아웃...')
      return { ...initState }
    },
  },
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer
