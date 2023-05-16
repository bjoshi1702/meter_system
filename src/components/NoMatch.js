import React from 'react'
import { Link } from 'react-router-dom'

const NoMatch = ({message}) => {
  return (
    <div>
        <h1>{message}</h1>
        <h2>Click below button to go back to the home page</h2>
        <Link to="/">Meter List</Link>
    </div>
  )
}

export default NoMatch