import React from 'react'
import { NavLink } from 'react-router-dom'

const MatchedUser = props => {
  const { user } = props
  return (
    <li key={user.id}>
      <div>{user.firstName + ' ' + user.lastName}</div>

      <NavLink to={`/chat/${user.id}`}>
        <button type="button">Chat!</button>
      </NavLink>
    </li>
  )
}

export default MatchedUser
