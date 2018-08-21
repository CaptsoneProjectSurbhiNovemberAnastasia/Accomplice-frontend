import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setActivity, setActivityTags, fetchActivity } from '../store'
import TagSelect from './TagSelect'

class Activity extends Component {
  state = { activity: '' }

  componentDidMount() {
    this.props.loadActivity()
    if (this.props.activity)
      this.setState({ activity: this.props.activity.name })
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    this.props.chooseActivity(this.state.activity)
    if (this.props.onClick) this.props.onClick()
  }

  render() {
    const { editing } = this.props

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="activity col-6" className="block">
            <div>
              {editing ? 'Your Activity: ' : 'What are you going to do today?'}
            </div>
          </label>
          <input
            name="activity"
            type="text"
            placeholder="e.g. Go on a hike"
            onChange={this.handleChange}
          />

          <button type="submit" className="goBtn">
            {editing ? 'Set' : 'Go!'}
          </button>
        </form>
        <div className="selectWidth">
          <TagSelect
            className="mb-2 mr-5 ml-5"
            text="Tag your activity: "
            tagMethod={this.props.chooseActivityTags}
            activity={true}
          />
        </div>
      </div>
    )
  }
}
const mapState = state => ({ activity: state.activity })
const mapDispatch = dispatch => ({
  loadActivity: () => dispatch(fetchActivity()),
  chooseActivity: activity => dispatch(setActivity(activity)),
  chooseActivityTags: tags => dispatch(setActivityTags(tags)),
})

export default connect(
  mapState,
  mapDispatch
)(Activity)
