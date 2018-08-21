import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import TagSelect from './TagSelect'
import { connect } from 'react-redux'
import { setTags, fetchTags, fetchActivity, me } from '../store'
import Activity from './Activity'

class Options extends Component {
  state = { editingActivity: false }
  componentDidMount() {
    this.props.loadData()
  }
  render() {
    const { editingActivity } = this.state
    const { activity } = this.props
    return (
      <div>
        <TagSelect
          className="mb-2 mr-5 ml-5"
          text="You are seeing users doing things tagged with:"
          tagMethod={this.props.chooseTags}
          activity={false}
        />

        {editingActivity ? (
          <Activity
            onClick={() => this.setState({ editingActivity: false })}
            editing={true}
          />
        ) : (
          <div>
            <div>
              Your Activity is: {activity ? activity.name : 'Loading...'}
            </div>
            <button
              className="button mt-3"
              onClick={() => this.setState({ editingActivity: true })}
            >
              Edit Your Activity
            </button>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({ activity: state.activity })
const mapDispatch = dispatch => ({
  chooseTags: tags => dispatch(setTags(tags)),

  loadData: () => {
    dispatch(fetchTags())
    dispatch(fetchActivity())
    dispatch(me())
  },
})
export default connect(
  mapState,
  mapDispatch
)(Options)
