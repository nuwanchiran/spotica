import React from 'react'
import useAuth from '../hooks/useAuth'

const Dashboard = ({code}) => {
  const accessToken = useAuth(code)
  return (
    <div>
      <h3>{code}</h3>
    </div>
  )
}

export default Dashboard
