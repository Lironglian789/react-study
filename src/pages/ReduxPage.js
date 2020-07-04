import React, { Component } from 'react'
import store from '../store/index'

export default class ReduxPage extends Component {
  componentDidMount() {
    // 也可以放在index文件添加订阅
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  add = () => {
    store.dispatch({type: 'ADD'})
  }
  minus = () => {
    store.dispatch({type: 'MINUS'})
  }
  render () {
    console.log('store', store);
    return (
      <div>
        <h3>ReduxPage</h3>
        <p>{store.getState()}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.minus}>minus</button>
      </div>
    )
  }
}