import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, fetchMatches, fetchTags, fetchActivity, me } from '../store'
import { updateUser } from '../store/user'
import { NavLink } from 'react-router-dom'
import UserProfileForm from './UserProfileForm'
import { uploadS3Image } from '../store/awsupload'

class UserProfile extends Component {
  componentDidMount() {
    this.props.loadUserData(this.props.user.id)
  }
  constructor(props) {
    super(props)
    this.handleFileUpload = this.handleFileUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = { editing: false, options: false, file1: null }
  }
  async handleFileUpload(evt) {
    evt.preventDefault()
    console.log(evt.target.files)
    await this.setState({ file1: evt.target.files })
  }
  async handleSubmit(evt, user) {
    evt.preventDefault()
    const id = user.id
    const firstName = evt.target.firstName.value
    const lastName = evt.target.lastName.value
    const age = evt.target.age.value
    const description = evt.target.description.value

    const formData = new FormData()
    formData.append('file', this.state.file1[0])
    await this.props.uploadS3Image(formData)
    let imageUrl = this.props.s3ImageUrl

    this.props.updateUser(id, firstName, lastName, imageUrl, age, description)
  }

  render() {
    const { user } = this.props
    const { editing } = this.state
    if (user && !user.id) {
      return null
    }
    return (
      <div>
        {user.id && !user.firstName ? (
          <div>
            <h2 className="h2font">Welcome to Accomplice!</h2>
            <h4 className="h4font">
              Please edit your profile below before taking our personality quiz
              and swiping for matches.
            </h4>
          </div>
        ) : (
          <div>
            <h2>Hi {user.firstName}!</h2>
          </div>
        )}
        <div className="form nopadding">
          <div className="form">
            <div className="imgsize ">
              {user.imageUrl === '#' ? (
                <img src="/no_profile_pic.png" alt="" />
              ) : (
                <img src={user.imageUrl} alt="" />
              )}
            </div>
            <div>
              <button
                className="mb-1 mt-1 btnfontsize"
                type="button"
                onClick={() => this.setState({ editing: !editing })}
              >
                {editing ? 'Done' : 'Edit Profile'}{' '}
              </button>
              {editing ? (
                <UserProfileForm
                  user={user}
                  handleSubmit={this.handleSubmit}
                  file={this.state.file1}
                  handleFileUpload={this.handleFileUpload}
                />
              ) : (
                <div />
              )}
              <NavLink to="/options">
                <button type="button" className="button mb-1 mt-1 btnfontsize">
                  Change Activity and Tags
                </button>
              </NavLink>
              {}
              <NavLink to="/quiz" className="">
                <button type="button" className="button mb-1 mt-1 btnfontsize">
                  Personality Quiz
                </button>
              </NavLink>
              <button
                className="button mb-1 mt-1 btnfontsize"
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
    user: state.user,
    s3ImageUrl: state.awsupload,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick(evt) {
      evt.preventDefault()
      dispatch(logout())
    },
    async uploadS3Image(file) {
      await dispatch(uploadS3Image(file))
    },
    updateUser(id, firstName, lastName, imageUrl, age, description) {
      dispatch(
        updateUser({
          id,
          firstName,
          lastName,
          imageUrl,
          age,
          description,
        })
      )
    },
    loadUserData: id => {
      dispatch(fetchMatches(id))
      dispatch(fetchTags())
      dispatch(fetchActivity())
      dispatch(me())
    },
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserProfile)
