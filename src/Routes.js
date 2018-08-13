import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  // Redirect,
  withRouter,
  Route,
  Switch
  // Switch,
  // BrowserRouter as Router
} from 'react-router-dom'
import Navbar from './components/navbar'
import User from './components/user'
import MatchedUsers from './components/matchedUsers'
import AuthForm from './components/auth-form'
import AllUsers from './components/allUsers'
//import Home from './Home'
// import {
//   Login,
//   Navbar
//   // Login,
//   // UserHome,
//   // CreateProfile,
//   // UpdateProfile,
//   // userTypes,
//   // Matches,
//   // MatchSingle,
//   // EmailPreview
// } from './components'
// import App from './App'
// import { me } from './store'

class Routes extends Component {
  render() {
    // const { isLoggedIn } = this.props
    console.log('Inside Routes **********')
    return (
      <div>
        <Switch>
          {/* <Route path="/createProfile" component={CreateProfile} /> */}
          <Route path="/navbar" component={Navbar} />
          <Route exact path="/" component={AuthForm} />
          <Route path="/user" component={User} />
          <Route path="/matchedUsers" component={MatchedUsers} />
          <Route path="/allUsers" component={AllUsers} />
        </Switch>
      </div>
    )
  }
}
export default withRouter(
  connect(
    null,
    null
  )(Routes)
)
// export default Routes
