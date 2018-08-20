import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import logo from '../styles/logo_try.png'
import { auth, facebookauth } from '../store'
import FacebookLogin from 'react-facebook-login'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const { handleSubmit, facebookLogin } = props
  const { error } = props
  let type
  const responseFacebook = response => {
    console.log('Inside responseFacebook', response)
    facebookLogin(response)
  }
  const componentClicked = response => {
    console.log('Inside componentClicked', response)
  }
  return (
    <div className="splash">
      <div className="form animated flipInX login-html">
        <div className="img-container">
          <img id="logo" src={logo} alt="accomplice logo" />
        </div>
        <input
          id="tab-1"
          type="radio"
          name="tab"
          className="sign-in"
          defaultChecked
        />
        <label htmlFor="tab-1" className="tab">
          Log In
        </label>
        <input id="tab-2" type="radio" name="tab" className="sign-up" />
        <label htmlFor="tab-2" className="tab">
          Sign Up
        </label>
        <div className="login-form">
          <div className="sign-in-htm">
            <form onSubmit={event => handleSubmit(event, type)}>
              <div className="group">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>
              <div className="group">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="group">
                {error ? 'Please enter valid email and password' : null}
                <button
                  type="submit"
                  onClick={() => {
                    type = 'login'
                  }}
                >
                  Log In
                </button>
              </div>
            </form>
            <FacebookLogin
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
<<<<<<< HEAD
              cssClass="my-facebook-button-class"
              // icon="fa-facebook mr-4"
              // icon={<SocialIcon url="http://facebook.com/in/jaketrent" />}
=======
>>>>>>> master
            />
          </div>
          <div className="sign-up-htm">
            <form onSubmit={event => handleSubmit(event, type)}>
              <div className="group">
                <label htmlFor="email">
                  <small>Email</small>
                </label>
                <input name="email" type="text" />
              </div>

              <div className="group">
                <label htmlFor="password">
                  <small>Password</small>
                </label>
                <input name="password" type="password" />
              </div>
              <div className="group">
                <button
                  type="submit"
                  onClick={() => {
                    type = 'signup'
                  }}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = state => ({
  error: state.user.error
})

const mapDispatch = (dispatch) => ({
  handleSubmit: (evt, type) => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(auth(email, password, type))
  },
  facebookLogin: response => {
    console.log('dispatching gfacebooklogin')
    const type = 'facebookLogin'
    const email = response.email
    const name = response.name
    const imageUrl = response.picture.data.url

    dispatch(facebookauth(email, name, imageUrl, type))
  }
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(AuthForm)
)
