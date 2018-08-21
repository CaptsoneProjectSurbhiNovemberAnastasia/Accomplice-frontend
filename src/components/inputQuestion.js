import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import CurrentLocation from './currentLocation'
import Activity from './Activity'
import { fetchMatches, fetchTags, fetchActivity } from '../store'
import { connect } from 'react-redux'

class InputQuestion extends Component {
  componentDidMount() {
    this.props.loadUserData(this.props.user.id)
  }
  render() {
    return (
      <div id="questionForm">
        <Activity />
        <div className="group row">
          <NavLink to="/suggestedmatches">See people to match with!</NavLink>
        </div>

        <div className="group row">
          <label htmlFor="question">
            <NavLink to="/undecided">Don't know... get a clue!</NavLink>
          </label>
        </div>
        <CurrentLocation />
      </div>
    )
  }
}

const mapState = state => ({ user: state.user })

const mapDispatch = dispatch => ({
  loadUserData: id => {
    dispatch(fetchMatches(id))
    dispatch(fetchTags())
    dispatch(fetchActivity())
  },
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(InputQuestion)
)
