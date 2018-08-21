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
      <div>
        {user.id && !user.firstName ?
        <div>
          <h2>Welcome to Accomplice!</h2>
          <h4>Please edit your profile below before taking our personality quiz and swipping for matches.</h4>
        </div> :
        <div>
          <h2>Hi {user.firstName}!</h2>
        </div>
        }
        <div className="form nopadding">
        <div className="form">
          <div className=" ">
          {user.imageUrl === '#' ? <img src="/no_profile_pic.png" alt="" /> : <img src={user.imageUrl} alt="" />}
            <img src={user.imageUrl} alt="" />
          </div>
          <div>
            <button
              className="mb-2 mt-2"
              type="button"
              onClick={() => this.setState({ editing: !editing })}
            >
              {editing ? 'Done' : 'Edit Profile'}{' '}
            </button>
            {editing ? (
              <UserProfileForm
                user={user}
                handleSubmit={this.props.handleSubmit}
              />
            ) : (
              <div className="mb-2" />
            )}
            <NavLink to="/options">
              <button type="button" className="button">
                Update Activity and Tags
              </button>
            </NavLink>
            <NavLink to="/quiz" className="pt-2">
              <button type="button" className="button">Retake Personality Quiz</button>
            </NavLink>
            <button
              className="btnWidth"
              type="button"
              onClick={this.props.handleClick}
            >
              Logout
            </button>
          </div>
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
