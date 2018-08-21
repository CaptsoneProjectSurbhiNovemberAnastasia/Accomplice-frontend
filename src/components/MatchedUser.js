import React from 'react'
import { NavLink } from 'react-router-dom'

const MatchedUser = props => {
  const { user } = props
  return (
    <li key={user.id}>
      <div>{user.firstName + ' ' + user.lastName}</div>
      <button type="button">
        <NavLink to={`/chat/${user.id}`}>Chat!</NavLink>
      </button>
    </li>
  )
}

export default MatchedUser
