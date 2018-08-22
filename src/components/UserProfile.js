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
    this.setState({
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      age: this.props.user.age || 0,
      description: this.props.user.description || '',
      imageUrl: this.props.user.imageUrl || '',
    })
  }

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      firstName: '',
      lastName: '',
      age: 0,
      description: '',
      image: '',
      editing: false,
      options: false,
    }
  }

  handleChange = evt => {
    evt.preventDefault()

    if (evt.target.files) {
      this.setState({ image: evt.target.files })
    } else {
      this.setState({
        [evt.target.name]: evt.target.value,
      })
    }
  }

  handleSubmit = async (evt, user) => {
    evt.preventDefault()
    const id = user.id

    const { imageUrl, firstName, lastName, age, description } = this.state
    let imageUrlToUse = imageUrl
    if (this.state.image) {
      const formData = new FormData()
      formData.append('file', this.state.image[0])
      await this.props.uploadS3Image(formData)
      imageUrlToUse = this.props.s3ImageUrl
    }

    this.props.updateUser(
      id,
      firstName,
      lastName,
      imageUrlToUse,
      age,
      description
    )
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
              <img src={user.imageUrl} />
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
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  state={this.state}
                  // handleFileUpload={this.handleFileUpload}
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
