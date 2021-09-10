import {useEffect, useState} from 'react';
import axios from 'axios'

export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect(() => {
    getToken()
  }, [code])

  useEffect(() => {
    doRefreshToken()
  },[expiresIn,refreshToken])

  const getToken = async () => {

    try {
      const res = await axios.post('http://localhost:9000/login', {code})

      const {accessToken, refreshToken, expiresIn} = res.data;

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setExpiresIn(expiresIn)

      window.history.pushState({}, null, '/')

    } catch (e) {
      window.location = "/"
    }
  }

  const doRefreshToken = async () => {

    if (!refreshToken || !expiresIn) return

    const interval = setInterval(async () => {
      try {
        const res = await axios.post('http://localhost:9000/refresh', {refreshToken})

        const {accessToken, expiresIn} = res.data;

        setAccessToken(accessToken)
        setExpiresIn(expiresIn)

        // window.history.pushState({}, null, '/')

      } catch (e) {
        window.location = "/"
      }
    }, ((expiresIn - 60)* 1000));

    return () => clearInterval(interval)

  }

  return accessToken
}
