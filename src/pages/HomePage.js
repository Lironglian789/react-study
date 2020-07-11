import React, { Component } from 'react'

export default class HomePage extends Component {
  componentDidMount () {
    console.log(this.props)
  }
  render () {
    return (
      <div>
        <h3>HomePage</h3>
      </div>
    )
  }
}