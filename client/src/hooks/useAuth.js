import {useEffect, useState} from 'react';
import axios from 'axios'

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    getToken()
  }, [code])

  const getToken = async () => {

    try {
      const res = await axios.post('http://localhost:9000/login', {code})

      const {accessToken, refreshToken, expiresIn} = res.data;

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setExpiresIn(expiresIn)

      window.history.pushState({}, null, '/')

    } catch (e) {
      console.error(e);
    }
  }

  return accessToken
}
