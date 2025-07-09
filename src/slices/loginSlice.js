import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginPost } from '../api/auth/authApi'

// localStorage에서 로그인 정보 로딩
import { getStorage, removeStorage, setStorage } from '../util/localStorageUtil'

const initState = {
  email: '',
}

//createAsyncThunk()를 사용해서 loginPost() 호출
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)
})

//스토리지에서 로그인 정보 로딩
const loadMemberStorage = () => {
  const memberInfo = getStorage('member')

  //로그인 후 주소창 새로고침 해도 로그인유지
  if (memberInfo && memberInfo.name) {
    memberInfo.email = decodeURIComponent(memberInfo.name)
  }

  return memberInfo
}

const loginSlice = createSlice({
  name: 'LoginSlice',
  initialState: loadMemberStorage() || initState, //로컬스토리지가 없다면 초깃값사용
  reducers: {
    login: (state, action) => {
      //새로운 상태
      return { email: action.payload.name }
    },
    logout: (state, action) => {
      console.log('로그아웃...')
      removeStorage('member')
      return { ...initState }
    },
  },

  //비동기 통신상태에 따라 동작하는 코드 작성
  extraReducers: (builder) => {
    builder
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log('fulfilled')

        const payload = action.payload //{name: 'duly@naver.com', accessToken: '...', refreshToken: 'moved to cookie'}

        //정상적인 로그인시에만 저장
        if (!payload.error) setStorage('member', payload, 10) //10분

        return payload
      })

      .addCase(loginPostAsync.pending, (state, action) => {
        console.log('pending')
      })
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log('rejected')
      })
  },
})

export const { login, logout } = loginSlice.actions

export default loginSlice.reducer
