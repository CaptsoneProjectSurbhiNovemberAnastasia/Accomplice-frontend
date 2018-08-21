import React, { Component } from 'react'
import * as Talk from 'talkjs'

import { connect } from 'react-redux'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.talkSession = undefined
  }
  async componentDidMount() {
    try {
      await Talk.ready
      const { loggedInUser, matches } = this.props
      const chatPartner = matches.find(
        user => user.id === +this.props.match.params.id
      )
      console.log(loggedInUser, chatPartner)
      const me = new Talk.User({
        id: loggedInUser.id,
        name: loggedInUser.firstName + ' ' + loggedInUser.lastName,
        photoUrl: loggedInUser.imageUrl,
      })
      console.log(process.env)
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
          <div ref={c => (this.container = c)}>Loading...</div>
        </span>
      </div>
    )
  }
}

const mapState = state => ({
  loggedInUser: state.user,
  matches: state.matches,
})

export default connect(
  mapState,
  null
)(Chat)
