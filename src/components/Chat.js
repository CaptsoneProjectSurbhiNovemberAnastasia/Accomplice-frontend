import React, { Component } from 'react'
import * as Talk from 'talkjs'
import { fetchMatches } from '../store'
import { connect } from 'react-redux'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.talkSession = undefined
  }
  async componentDidMount() {
    this.props.loadMatches(this.props.loggedInUser.id)

    try {
      await Talk.ready
      const { loggedInUser, matches } = this.props
      console.log(matches)
      const chatPartner = matches.find(
        user => user.id === +this.props.match.params.id
      )

      const me = new Talk.User({
        id: loggedInUser.id,
        name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        photoUrl: loggedInUser.imageUrl,
      })
      this.talkSession = new Talk.Session({
        appId: process.env.REACT_APP_TALKJS_APP_ID,
        me: me,
      })

      const other = new Talk.User({
        id: chatPartner.id,
        name: chatPartner.firstName + ' ' + chatPartner.lastName,
        photoUrl: chatPartner.imageUrl || null,
      })

      const conversationId = Talk.oneOnOneId(me, other)

      const conversation = this.talkSession.getOrCreateConversation(
        conversationId
      )
      conversation.setParticipant(me)
      conversation.setParticipant(other)

      const inbox = this.talkSession.createInbox({
        selected: conversation,
      })
      inbox.mount(this.container)
    } catch (e) {
      console.error(e)
    }
  }
  render() {
    return (
      <div>
        <span>
          <div id="talkjs-container" ref={c => (this.container = c)}>
            Loading...
          </div>
        </span>
      </div>
    )
  }
}

const mapState = state => ({
  matches: state.matches,
  loggedInUser: state.user,
})

const mapDispatch = dispatch => ({
  loadMatches: id => dispatch(fetchMatches(id)),
})

export default connect(
  mapState,
  mapDispatch
)(Chat)
