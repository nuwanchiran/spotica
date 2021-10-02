import { useEffect, useState } from 'react';
import axios from 'axios'

export default function useAuth( code )
{
  const [accessToken, setAccessToken] = useState()
  const [refreshToken, setRefreshToken] = useState()
  const [expiresIn, setExpiresIn] = useState()

  useEffect( () =>
  {
    getToken()
  }, [code] )

  useEffect( () =>
  {
    doRefreshToken()
  }, [expiresIn, refreshToken] )

  const getToken = async () =>
  {

    try
    {
      const res = await axios.post( 'http://localhost:9000/login', { code } )

      setAccessToken( res.data.accessToken )
      setRefreshToken( res.data.refreshToken )
      setExpiresIn( res.data.expiresIn )

      window.history.pushState( {}, null, '/' )

    } catch ( e )
    {
      console.log("error",e)
      //window.location = "/"
    }
  }

  const doRefreshToken = async () =>
  {

    if ( !refreshToken || !expiresIn ) return

    const interval = setInterval( async () =>
    {
      try
      {
        const res = await axios.post( 'http://localhost:9000/refresh', { refreshToken } )

        setAccessToken( res.data.accessToken )
        setExpiresIn( res.data.expiresIn )

      } catch ( e )
      {
        window.location = "/"
      }
    }, ( ( expiresIn - 60 ) * 1000 ) );

    return () => clearInterval( interval )

  }

  return accessToken
}
