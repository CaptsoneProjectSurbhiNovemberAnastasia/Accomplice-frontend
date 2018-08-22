import React, { Component } from 'react'
import { connect } from 'react-redux'
import { matchWith } from '../store'

class UserCard extends Component {
  handleClick = evt => {
    evt.preventDefault()
    this.props.matchWithUser(this.props.user.id)
  }
  render() {
    const { user } = this.props
    let activityTags = []
    if (user.activityId) {
      const tagNames = user.activity.tags.map(tag => tag.name)

      if (user.activity.tags.length > 1) {
        let lastTag = tagNames[tagNames.length - 1]
        lastTag = 'and ' + lastTag
        activityTags = tagNames
          .slice(0, -1)
          .concat([lastTag])
          .join(', ')
      } else {
        activityTags = tagNames
      }
    }
    return (
      <div id="userCard" className="collapsed">
        <div>
          <div id="picContainer">
            <img className="userPic rounded" src={user.imageUrl} alt="" />
          </div>
          <li className="text-justify-center">
            <h4>{user.firstName + ' ' + user.lastName}</h4>
            <p>{user.description}</p>
            <p className="font-weight-bold h5">
              {user.firstName}{' '}
              {user.activityId
                ? `wants to ${
                    user.activity.name
                  }. This activity is ${activityTags}.`
                : `doesn't know what they want to do.`}
            </p>
          </li>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  matchWithUser: id => dispatch(matchWith(id)),
})
export default connect(
  null,
  mapDispatch
)(UserCard)
