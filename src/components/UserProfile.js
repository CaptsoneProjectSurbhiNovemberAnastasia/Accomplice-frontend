import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'
import { updateUser } from '../store/user'
import { NavLink } from 'react-router-dom'
import UserProfileForm from './UserProfileForm'

class UserProfile extends Component {
  state = { editing: false, options: false }
  render() {
    const { user } = this.props
    const { editing } = this.state

    if (user && !user.id) {
      return null
    }
    return (
      <div className="form nopadding">
        <div className="form">
          <div className=" ">
            <h2>Hi {user.firstName}!</h2>
            <img src={user.imageUrl} alt="" />
          </div>
          <div>
            <button onClick={() => this.setState({ editing: !editing })}>
              {editing ? 'Done' : 'Edit Profile'}{' '}
            </button>
            {editing ? (
              <UserProfileForm
                user={user}
                handleSubmit={this.props.handleSubmit}
                handleClick={this.props.handleClick}
              />
            ) : (
              <div className="mb-2" />
            )}
            <NavLink to="/options"><button className="button">Options</button></NavLink>
            <button className="btnWidth" type="button" onClick={this.handleClick}>
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      dispatch(logout())
    },
    handleSubmit(evt, user) {
      const id = user.id
      evt.preventDefault()
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const age = evt.target.age.value
      const imageUrl = evt.target.imageUrl.value
      const description = evt.target.description.value

      dispatch(
        updateUser({
          id,
          firstName,
          lastName,
          imageUrl,
          age,
          description
        })
      )
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserProfile)
