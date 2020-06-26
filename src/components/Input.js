import React, { Component } from 'react'

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  render () {
    const {value = '', ...otherProps} = this.props
    return (
      <div style={{padding: 10}}>
        <input style={{outline: 'none'}} value={value} {...otherProps} />
      </div>
    )
  }
}