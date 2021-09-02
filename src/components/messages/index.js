import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import moment from 'moment'
import './index.scss'

class Message extends Component {

  componentWillReceiveProps(newProps) {
    this.setState({
      messages: newProps.messages
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }
  render() {
    let { auth } = this.props
    let { messages } = this.state
  
    if (!this.props.auth.uid) {
      return <Redirect to='/' />
    }

    console.log('sdsa', messages)
    let myMessages = []
    if (messages) {
      myMessages = Object.values(messages).filter((item) => {
        return item.OwnerID === auth.uid
      })
    }
    console.log('MYMESSAGES', myMessages)
    return (
          <div className='user-messages'>
            <ul>
              {myMessages ? myMessages.map((message, i) => {
                return (
                  <li key={i}>
                    <p>Email: {message.Email}</p>
                    <p>Phone Number: {message.phoneNumber}</p>
                    <p>Car: {message.carType} {message.carModel}</p>
                    <p>
                      <b>FROM - TO:</b>
                      {message.date.map((date, i) => {
                        return (
                          <span key={i}>{moment(date.toDate()).calendar()}</span>
                        )
                      })}
                    </p>
                  </li>
                )
              }) : null}
            </ul>
          </div>
       
    )
  }
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    user: state.firebase.profile,
    projects: state.firestore.ordered.project,
    messages: state.firestore.data.messages
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'users' },
    { collection: 'messages' },
    { collection: 'project', orderBy: ['createdAt', 'desc'] }
  ])
)(Message)