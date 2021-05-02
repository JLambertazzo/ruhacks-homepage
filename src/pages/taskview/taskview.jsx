import React, { Component } from 'react'
import io from 'socket.io-client'
import './taskview.scss'

const socket = io('/', {
  extraHeaders: {
    'Access-Control-Allow-Origin': '*'
  }
})

export class TaskView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      // hardcoded tasks
      user1: [['', false]],
      user2: [['', false]],
      u1Ready: false,
      u2Ready: false,
      u1Prog: '0',
      u2Prog: '0',
      messages: [],
      message: ''
    }
    this.handleCheck = this.handleCheck.bind(this)
    this.handleReady = this.handleReady.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSend = this.handleSend.bind(this)
    this.addTask = this.addTask.bind(this)
  }

  componentDidMount () {
    socket.emit('client-event')
    socket.on('u2Ready', user2 => {
      const rdy = !this.state.u2Ready
      this.setState({ u2Ready: rdy, user2: user2 })
    })
    socket.on('u1Checked', index => {
      let prev = this.state.user1
      prev[index][1] = !prev[index][1]
      let newProg = this.getProg(prev)
      this.setState({ user1: prev, u1Prog: newProg })
    })
    socket.on('message', message => {
      const messages = this.state.messages
      if (messages.length > 4) {
        messages.shift()
      }
      messages.push(`User2: ${message}`)
      this.setState({ messages: messages })
    })
  }

  handleCheck (e, key) {
    const oldUser2 = this.state.user2
    oldUser2[key][1] = !oldUser2[key][1]
    let newProg = this.getProg(oldUser2)
    this.setState({
      user2: oldUser2,
      u2Prog: newProg
    })
    socket.emit('u2Checked', key)
  }

  handleReady (e) {
    if (e.target.nextSibling) {  
      const prev = this.state.u1Ready
      this.setState({
        u1Ready: !prev
      })
      socket.emit('u1Ready', this.state.user1 )
    } else {
      const prev = this.state.u2Ready
      this.setState({
        u2Ready: !prev
      })
    }
  }

  getProg (user) {
    let completed = 0
    user.forEach(task => {
      if (task[1]) {
        completed++
      }
    })
    return Math.ceil(completed * 100 / Object.keys(user).length).toString()
  }

  handleChange (e, key, userNum) {
    if (userNum === 1) {
      let prev = this.state.user1
      prev[key][0] = e.target.value
      this.setState({
        user1: prev
      })
    } else {
      let prev = this.state.user2
      prev[key][0] = e.target.value
      this.setState({
        user2: prev
      })
    }
  }

  addTask (e, userNum) {
    if (userNum === 1) {
      let prev = this.state.user1
      prev.push(['', false])
      this.setState({
        user1: prev
      })
    } else {
      let prev = this.state.user2
      prev.push(['', false])
      this.setState({
        user2: prev
      })
    }
  }

  handleSend () {
    const messages = this.state.messages
    if (messages.length > 4) {
      messages.shift()
    }
    const message = this.state.message
    messages.push(`You: ${message}`)
    this.setState({ messages: messages, message: '' })
    socket.emit('message', this.state.message)
  }

  render () {
    return (
      <div className='task-view-container'>
        <div className='task-view'>
          <div className='header'>
            <h1>Tasks to Complete</h1>
          </div>
          <div className='task-content'>
            <div className='task-left'>
              <h2>My tasks</h2>
              <progress id='my-prog' value={this.state.u1Prog} max='100' />
              {this.state.user1.map((task, index) =>
                <div className='checkbox-div' key={index}>
                  <input type="checkbox" disabled checked={task[1]} name={task[0]} id={task[0]} />
                  <label htmlFor={task[0]} className={this.state.u1Ready ? '' : 'none'} onDoubleClick={console.log}>{task[0]}</label>
                  <input type='text' value={task[0]} className={this.state.u1Ready ? 'none' : ''} onChange={(event) => this.handleChange(event, index, 1)} />
                </div>
              )}
              <button className={this.state.u1Ready ? 'none' : 'btn'} onClick={(event) => this.addTask(event, 1)}>+ New Task</button>
              <br />
              <p><em>only your study buddy can check off your tasks</em></p>
            </div>
            <div className='task-right'>
              <h2>User2's tasks</h2>
              <progress id='buddy-prog' value={this.state.u2Prog} max='100' />
              {this.state.user2.map((task, index) =>
                <div className='checkbox-div' key={index}>
                  <input type="checkbox" checked={task[1]} onClick={(event) => this.handleCheck(event, index)} name={task[0]} id={task[0]} />
                  <label htmlFor={task[0]} className={this.state.u2Ready ? '' : 'none'} onDoubleClick={console.log}>{task[0]}</label>
                </div>
              )}
            </div>
          </div>
          <div className={this.state.u1Ready && this.state.u2Ready ? 'none' : 'button-container'}>
            <button className={this.state.u1Ready ? 'ready' : 'unready'} onClick={this.handleReady}>Ready</button>
            <button disabled className={this.state.u2Ready ? 'ready' : 'unready'} onClick={this.handleReady}>Ready</button>
          </div>
          <div className='text-chat'>
            <h2>Chat:</h2>
            {this.state.messages.map((message, index) => <p key={index}><em>{message}</em></p>)}
            <input type="text" value={this.state.message} onChange={(event) => this.setState({ message: event.target.value })} />
            <button onClick={this.handleSend}>Send</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskView
