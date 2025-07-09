import axios from 'axios'
import { API_SERVER_HOST } from '../books/bookApi' //'http://localhost:8080'

const uriNotice = `${API_SERVER_HOST}/api/notice`

//공지목록
export const noticeList = async () => {
  try {
    const token = localStorage.getItem('accessToken') // 저장 방식에 따라 다름
    const res = await axios.get(`${uriNotice}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true, // 토큰도 같이 전송하려면 필요
    })
    return res.data
  } catch (err) {
    console.error('noticeList error:', err)
    return { notice: [] }
  }
}

//개별공지글
export const noticeCont = async (noticeId) => {
  try {
    const res = await axios.get(`${uriNotice}/${noticeId}`)
    return res.data
  } catch (err) {
    console.error('noticeCont error:', err)
    return { data: {} }
  }
}
