import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { NavLink } from 'react-router-dom'
import CurrentLocation from './currentLocation'
import Activity from './Activity'
import { fetchMatches, fetchTags, fetchActivity, me } from '../store'
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
          <NavLink to="/suggestedmatches">Don't know? Get Swiping!</NavLink>
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
    dispatch(me())
  },
})

export default withRouter(
  connect(
    mapState,
    mapDispatch
  )(InputQuestion)
)
