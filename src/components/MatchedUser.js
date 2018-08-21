import React from 'react'
import { NavLink } from 'react-router-dom'

const MatchedUser = props => {
  const { user } = props
  return (
    <div>
      <li key={user.id}>
        <div className="mt-5">
          {user.firstName + ' ' + user.lastName}

          <NavLink className="ml-4" to={`/chat/${user.id}`}>
            <button type="button">Chat!</button>
          </NavLink>
        </div>
      </li>
    </div>
  )
}

export default MatchedUser
